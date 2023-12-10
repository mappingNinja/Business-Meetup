import { useCallback, useContext, useRef, useState } from "react";
import { ReactComponent as Close2Icon } from "../assets/images/close2-icon.svg";
import profilePic from "../assets/images/profile.png";
import Cancel from "../assets/images/cancel.png";
import PostImage2 from "../assets/images/social1.jpg";
import PostImage3 from "../assets/images/social2.jpg";
import ProductImagePlaceholder from "../assets/images/product-image-placeholder.png";
import PostImage4 from "../assets/images/social3.jpg";
import { useEffect } from "react";
import { UseEffectOnce } from "../Hook/UseEffectOnce";
import { getAuthConfig, post, postwithOu } from "../libs/http-hydrate";
import Select from "react-select";
import { ReactComponent as EditIcon } from "../assets/images/edit-icon2.svg";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Cropper from "react-easy-crop";
import getCroppedImg from "./Crop";
import FieldValidationError from "../components/error-messages/field-validation-error";
import getCroppedImgr, {
  convertDataURIToBinary,
  dataURLtoFile,
  getBase64Image,
} from "../utils/dataURLtoFile";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
function PostSocialModal(props) {
  const [PostArray, setProductArray] = useState([]);
  const [PostSubCategoryArray, setProductSubCategoryArray] = useState([]);
  const [imageArray, setImageArray] = useState([]);
  const navigate = useNavigate();
  const [PostData, setPostData] = useState({
    social_post_type_id: "",
    social_sub_post_type_id: "",
    icon: "",
    social_post_type_value: "",
    social_sub_post_type_value: "",
    description: "",
  });
  const [PostDataErr, setPostDataErr] = useState({
    social_post_type_id: false,
    social_sub_post_type_id: false,
    descrition: "",
    image: false,
  });
  const [ImageIndex, setImageIndex] = useState();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);

  const CloseRef = useRef();
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);
  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(
        imageArray[ImageIndex],
        croppedAreaPixels,
        rotation
      );
      console.log("donee", { croppedImage });
      imageArray[ImageIndex] = croppedImage;
      setCroppedImage(croppedImage);
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels, rotation, imageArray]);
  function intialCat() {
    post("/general/category_listing", { type: "social_post_type", page: 1 })
      .then((response) => {
        setProductArray(response.data.data);
      })
      .catch((e) => {
        alert("this is the errror", e);
      });
  }
  function SubCat() {
    post("/general/category_listing", {
      type: "social_sub_post_type",
      page: 1,
      parent_id: PostData?.social_post_type_id,
    })
      .then((response) => {
        setProductSubCategoryArray(response.data.data);
      })
      .catch((e) => {
        alert("this is the errror", e);
      });
  }
  async function SubmitPost(e) {
    e.preventDefault();
    if (PostData?.social_post_type_value.trim() === "") {
      setPostDataErr((p) => ({ ...p, social_post_type_id: true }));
      return false;
    }
    if (PostData?.social_sub_post_type_value.trim() === "") {
      setPostDataErr((p) => ({ ...p, social_sub_post_type_id: true }));
      return false;
    }
    if (PostData?.description.trim() === "") {
      setPostDataErr((p) => ({ ...p, descrition: true }));
      return false;
    }
    if (imageArray.length === 0) {
      setPostDataErr((p) => ({ ...p, image: true }));
      return false;
    }

    const formdata = new FormData();
    formdata.append(
      "social_sub_post_type_id",
      PostData?.social_sub_post_type_id
    );
    formdata.append("description", PostData?.description);



    imageArray.map(async (item, index) => {
      if (item?.substring(0, 4) == "blob") {

        const ddata = await getCroppedImgr(item);

        formdata.append(`media[${index}] `, dataURLtoFile(ddata, "left.jpeg"));


      } else {
     
        formdata.append(`media[${index}]`, dataURLtoFile(item, "left.jpeg"));      
      
      }
    });

    const url = "/social_post/store";
    setTimeout(async()=>{
      const response = await postwithOu(url, getAuthConfig(), formdata)
      .then((res) => {
        if (res.status === 200) {
          swal(
            "Success!",
            "Post for social is created SuccessFully!",
            "success"
          );
          CloseRef.current.click();
          props.UpdateTrue();
          navigate("/home", { state: "scrollToDiv" });
        }
      })
      .catch((err) => {
        alert(err.response.message);
      });

    },1000)
  
  }
  console.log(imageArray[0])
  return (
    <>
      <div
        className="modal fade post-social-modal"
        id="PostSocialModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="PostSocialModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Create Post For Social
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                ref={CloseRef}
              >
                <span aria-hidden="true">
                  <Close2Icon />
                </span>
              </button>
            </div>
            <div className="modal-body">
              <div className="post-social-head row">
                <div className="user-profile col-sm">
                  <div className="user-profile-image">
                    <img
                      src={props?.data?.profile_image}
                      className="profile-pic"
                    />
                  </div>
                  <div className="user-profile-content">
                    <div className="user-profile-name">
                      <h6>
                        {props?.data?.name}
                        <span>(Profile ID: 302101)</span>
                      </h6>
                      <p>{props?.data?.about}</p>
                      <span className="post-tag">
                        {props?.data?.is_buyer === 1 ? "Buyer" : "Seller"}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="select-wrap col-sm">
                  <div className="row">
                    <div className="col-sm">
                      <Select
                        placeholder="Select Post Type"
                        id="category"
                        onFocus={(e) => {
                          e.preventDefault();
                          intialCat();
                        }}
                        options={PostArray.map(function (productArray) {
                          return {
                            value: productArray.id,
                            label: productArray.name,
                          };
                        })}
                        onKeyDown={(e) => {
                          console.log("e.target.value", e.target.value);
                        }}
                        onChange={(e) => {
                          setProductSubCategoryArray([]);

                          setPostData((p) => ({
                            ...p,
                            social_post_type_id: e.value,
                          }));
                          setPostData((p) => ({
                            ...p,
                            social_post_type_value: e.label,
                          }));
                          setPostData((p) => ({
                            ...p,
                            social_sub_post_type_id: "",
                          }));
                          setPostDataErr((p) => ({
                            ...p,
                            social_post_type_id: false,
                          }));
                        }}
                        onBlur={(e) => {
                          e.preventDefault();
                        }}
                      ></Select>

                      {PostDataErr?.social_post_type_id === true ? (
                        <FieldValidationError message="Please select post type" />
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="col-sm">
                      <Select
                        placeholder=" Post Sub Type"
                        id="category"
                        onFocus={(e) => {
                          e.preventDefault();
                          if (PostData?.social_post_type_id != "") {
                            SubCat();
                          }
                        }}
                        options={PostSubCategoryArray.map(function (
                          productArray
                        ) {
                          return {
                            value: productArray.id,
                            label: productArray.name,
                            icon: productArray.icon,
                          };
                        })}
                        onKeyDown={(e) => {
                          console.log("e.target.value", e.target.value);
                        }}
                        onChange={(e) => {
                          console.log(e);
                          setPostData((p) => ({
                            ...p,
                            social_sub_post_type_id: e.value,
                          }));
                          setPostData((p) => ({
                            ...p,
                            icon: e.icon,
                          }));

                          setPostData((p) => ({
                            ...p,
                            social_sub_post_type_value: e.label,
                          }));
                          setPostDataErr((p) => ({
                            ...p,
                            social_sub_post_type_id: false,
                          }));
                        }}
                        onBlur={(e) => {
                          e.preventDefault();
                        }}
                      ></Select>
                      {PostDataErr?.social_sub_post_type_id === true ? (
                        <FieldValidationError message="Please select sub post type" />
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="post-social-description">
                <textarea
                  className="form-input"
                  placeholder="Write What you want"
                  onChange={(e) => {
                    console.log(e.target.value);

                    setPostData((p) => ({ ...p, description: e.target.value }));
                    setPostDataErr((p) => ({ ...p, descrition: false }));
                  }}
                ></textarea>

                {PostDataErr?.descrition === true ? (
                  <FieldValidationError message="Please enter some description" />
                ) : (
                  ""
                )}
              </div>
              <div className="upload-social-images field-set">
                <div className="field-set-label">
                  <label>Uploaded Images</label>
                </div>
                <div className="row">
                  <div class="col-sm-3">
                    <div className="form-field">
                      <div className="file-upload upload-button">
                        <input
                          type="file"
                          id="upload_prod_img1"
                          accept="image/*"
                          onChange={(e) => {
                            if (
                              !(
                                e.target.files[0].type === "image/png" ||
                                e.target.files[0].type === "image/jpg" ||
                                e.target.files[0].type === "image/jpeg" ||
                                e.target.files[0].type === "image/gif" ||
                                e.target.files[0].type === "image/svg"
                              )
                            ) {
                              alert("Only images allowed");
                              return false;
                            } else if (e.target.files[0].size > 2097152) {
                              alert("Not More than 2 MB is allowded");
                              return false;
                            } else {
                              setImageArray((current) => [
                                ...current,
                                URL.createObjectURL(e.target.files[0]),
                              ]);

                              setPostDataErr((p) => ({ ...p, image: false }));
                            }
                          }}
                        />
                        <label htmlFor="upload_prod_img1">
                          <img src={ProductImagePlaceholder} />
                          Upload Images
                        </label>
                      </div>
                    </div>
                  </div>
                  {PostDataErr?.image === true ? (
                    <FieldValidationError message="Please add Atleast one image" />
                  ) : (
                    ""
                  )}

                  {imageArray.length > 0 &&
                    imageArray.map((item, index) => {
                      return (
                        <>
                          <div class="col-sm-2">
                            <div className="form-field">
                              <div className="file-upload upload-prod-image">
                                <input type="file" id="upload_social_img1" />
                                <label htmlFor="upload_social_img1">
                                  <img src={item} />
                                  <button className="cancel-button">
                                    <img
                                      src={Cancel}
                                      onClick={(e) => {
                                        e.preventDefault();
                                        const filtered = imageArray.filter(
                                          (obj) => {
                                            return obj === item;
                                          }
                                        );

                                        if (filtered.length >= 1) {
                                          setImageArray((current) =>
                                            current.filter(
                                              (fruit) => fruit !== item
                                            )
                                          );
                                        }
                                      }}
                                    />
                                  </button>
                                </label>
                              </div>
                            </div>

                            <span
                              onClick={(e) => {
                                setImageIndex(index);
                                setShow(true);
                              }}
                            >
                              <EditIcon />
                            </span>
                          </div>
                        </>
                      );
                    })}
                </div>
              </div>
              <div className="social-post-type field-set">
                <div className="field-set-label">
                  <label>Post Type</label>
                  <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item">
                        {PostData?.social_post_type_value}
                      </li>
                      <li
                        className="breadcrumb-item active"
                        aria-current="page"
                      >
                        {PostData?.social_sub_post_type_value}
                      </li>
                    </ol>
                  </nav>
                </div>
                <div className="social-post-image">
                  <img src={PostData?.icon} height={200} />
                </div>
              </div>
            </div>
            <div className="card-footer">
              <button
                className="button button-primary"
                onClick={(e) => {
                  SubmitPost(e);
                }}
              >
                Submit and Post
              </button>
            </div>
          </div>
        </div>
      </div>

      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Modal.Title>
            <h3>Crop Your Image</h3>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div
              className="col-lg-12 col-md-12 col-12"
              style={{ height: "60vh" }}
            >
              <Cropper
                image={imageArray[ImageIndex]}
                crop={crop}
                rotation={rotation}
                zoom={zoom}
                zoomSpeed={4}
                maxZoom={3}
                zoomWithScroll={true}
                showGrid={true}
                aspect={4 / 3}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
                onRotationChange={setRotation}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              showCroppedImage();
              handleClose();
            }}
          >
            Save
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              handleClose();
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default PostSocialModal;
