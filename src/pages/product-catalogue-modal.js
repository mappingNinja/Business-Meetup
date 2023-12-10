import { useContext, useEffect, useRef, useState } from "react";
import { ReactComponent as Close2Icon } from "../assets/images/close2-icon.svg";
import { ReactComponent as EditIcon } from "../assets/images/edit-icon2.svg";
import { ReactComponent as DeleteIcon } from "../assets/images/delete-icon.svg";
import { ReactComponent as UploadIcon } from "../assets/images/upload-icon.svg";
import { ReactComponent as Edit2Icon } from "../assets/images/edit-icon2.svg";
import Bosch from "../assets/images/bosch.png";
import FieldValidationError from "../components/error-messages/field-validation-error";
import { get, getAuthConfig, postwithOu } from "../libs/http-hydrate";
import { PuffLoader } from "react-spinners";
import axios from "axios";
import Auth from "../libs/auth";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { UseEffectOnce } from "../Hook/UseEffectOnce";
function ProductCatalogueModal(props) {
  const { setPortfolioDataCatalog, PortfolioDataCatalog } = props;
  const user = Auth.getCurrentUser();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const ref = useRef();
  const EditRef = useRef();

  const [Catalogue, setCatelogue] = useState({
    logo: "",
    title: "",
    description: "",
  });
  const [Catalogueer, setCatelogueer] = useState({
    logo: false,
    title: false,
    description: false,
  });
  const [catelogueLoad, setCatelogueLoad] = useState({
    catalog: false,
  });
  const [Image, setImage] = useState("");

  // const [PortfolioData, setPortfolioData] = useState({
  //   catalog: "",
  // });
  const [EditData, setEditData] = useState({});

  const [EditCatalogueer, EditsetCatelogueer] = useState({
    logo: false,
    title: false,
    description: false,
  });

  async function GetProductPortfolio() {
    const response = await axios
      .get("https://api.busimeet.com/api/V1/product/portfolio", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
        console.log(res.data.data.product);
        if (res?.data?.status === 200) {
          console.log(res.data);
          PortfolioDataCatalog((p) => ({
            ...p,
            catalog: res.data.data.product.product_catalogue,
          }));
        }
        if (res?.data?.status === 401) {
          navigate("/login");
        }
      });
  }
  async function editPortfolio(e) {
    e.preventDefault();
    if (Catalogue?.title.trim() === "") {
      setCatelogueer({ ...Catalogueer, title: true });
      setCatelogueLoad((p) => ({ ...p, catalog: false }));

      return false;
    } else if (Catalogue?.description.trim() === "") {
      setCatelogueer({ ...Catalogueer, description: true });
      setCatelogueLoad((p) => ({ ...p, catalog: false }));

      return false;
    } else if (Catalogue?.logo.trim() === "") {
      setCatelogueer({ ...Catalogueer, logo: true });
      setCatelogueLoad((p) => ({ ...p, catalog: false }));

      return false;
    }

    const formdata = new FormData();
    formdata.append("logo", Image);
    formdata.append("description", Catalogue.description);
    formdata.append("title", Catalogue.title);
    formdata.append("type", "catalogue");

    const url = "/user/profile/show_case/create";
    const res = await postwithOu(url, getAuthConfig(), formdata)
      .then((response) => {
        if (response.status === 200) {
          setCatelogueLoad((p) => ({ ...p, catalog: false }));
          setCatelogue((p) => ({ ...p, logo: "" }));
          setCatelogue((p) => ({ ...p, description: "" }));
          setCatelogue((p) => ({ ...p, title: "" }));

          ref.current.click();
          GetProductPortfolio();
          props.UpdateTrue();
        }
      })
      .catch((e) => {
        alert("Something Went Wrong");
      });
  }
  async function deleteShowCaseWithId(Id) {
    const url = "/user/profile/show_case/delete/" + Id;
    const res = await get(url, getAuthConfig())
      .then((response) => {
        if (response.status === 200) {
          GetProductPortfolio();
          props.UpdateTrue();
        }
      })
      .catch((e) => {
        alert("Something Went Wrong");
      });
  }

  async function EditCatalog(e) {
    e.preventDefault();

    if (EditData?.title.trim() === "") {
      EditsetCatelogueer({ ...Catalogueer, title: true });
      setCatelogueLoad((p) => ({ ...p, catalog: false }));
      return false;
    } else if (EditData?.description.trim() === "") {
      EditsetCatelogueer({ ...Catalogueer, description: true });
      setCatelogueLoad((p) => ({ ...p, catalog: false }));
      return false;
    } else if (Image === "") {
      EditsetCatelogueer({ ...Catalogueer, logo: true });
      setCatelogueLoad((p) => ({ ...p, catalog: false }));
      return false;
    }

    setCatelogueLoad(true);
    const formdata = new FormData();

    formdata.append("logo", Image);
    formdata.append("description", EditData.description);
    formdata.append("title", EditData.title);
    formdata.append("type", "catalogue");
    const url = "/user/profile/show_case/update/" + EditData?.id;
    const res = await postwithOu(url, getAuthConfig(), formdata)
      .then((response) => {
        if (response.status === 200) {
          setImage("");
          setEditData("");
          EditRef.current.click();
          GetProductPortfolio();
          props.UpdateTrue();
        }
      })
      .catch((e) => {
        alert("Something Went Wrong");
      });
  }
  return (
    <>
      <div
        className="modal fade certifications-modal product-catelogue-modal"
        id="ProductCatalogueModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="ProductCatalogueModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Upload Product Catalogue
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                ref={ref}
              >
                <span aria-hidden="true">
                  <Close2Icon />
                </span>
              </button>
            </div>
            <div className="modal-body">
              {PortfolioDataCatalog?.catalog.length === 2 ? (
                " "
              ) : (
                <div className="upload">
                  <div>
                    <div className="upload-image">
                      <input
                        className="img-block"
                        type="file"
                        id="company_logo"
                        accept="image/png,image/gif,image/jpeg,image/jpg,application/pdf,application/msword"
                        onChange={(e) => {
                          if (
                            !(
                              e.target.files[0].type === "image/png" ||
                              e.target.files[0].type === "image/jpg" ||
                              e.target.files[0].type === "image/jpeg" ||
                              e.target.files[0].type === "image/gif" ||
                              e.target.files[0].type === "application/pdf" ||
                              e.target.files[0].type === "application/msword"
                            )
                          ) {
                            alert("Only images,pdf,doc,docx allowded");
                            return false;
                          }

                          if (e.target.files[0].size > 2097152) {
                            alert("Not more than 2MB Allowded");
                            return false;
                          }
                          setCatelogue({
                            ...Catalogue,
                            logo: URL.createObjectURL(e.target.files[0]),
                          });
                          setImage(e.target.files[0]);
                          setCatelogueer({
                            ...Catalogueer,
                            logo: false,
                          });
                        }}
                      />
                      <label htmlFor="company_logo">
                        {Catalogue?.logo ? (
                          <>
                            <UploadIcon />
                            <span>
                              Drag n Drop here Or{" "}
                              <span className="color-primary">Browse</span>
                            </span>
                            <span className="text-start">{Image?.name} </span>
                          </>
                        ) : (
                          <>
                            <UploadIcon />
                            <span>
                              Drag n Drop here Or{" "}
                              <span className="color-primary">Browse</span>
                            </span>
                          </>
                        )}
                      </label>
                    </div>

                    {Catalogueer?.logo === true ? (
                      <span className="error-message">
                        <FieldValidationError message="Please Upload Catalogue" />
                      </span>
                    ) : (
                      ""
                    )}
                    <span className="error-message" style={{ color: "black" }}>
                      Only allow doc,image,pdf with the size of 2MB
                    </span>
                  </div>
                  <div className="upload-fields">
                    <div className="form-field">
                      <label className="form-label">
                        Catalogue name <span className="mendatory">*</span>
                      </label>
                      <input
                        type="text"
                        name="cname"
                        id="cname"
                        className="form-input"
                        placeholder="Enter Catalogue name"
                        value={Catalogue?.title}
                        onChange={(e) => {
                          setCatelogue({
                            ...Catalogue,
                            title: e.target.value,
                          });
                          setCatelogueer({
                            ...Catalogueer,
                            title: false,
                          });
                        }}
                      />

                      {Catalogueer?.title === true ? (
                        <FieldValidationError message="Please enter Catalogue Name " />
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="form-field">
                      <label className="form-label">
                        Description <span className="mendatory">*</span>
                      </label>
                      <textarea
                        className="form-input"
                        placeholder="Description"
                        value={Catalogue?.description}
                        onChange={(e) => {
                          setCatelogue({
                            ...Catalogue,
                            description: e.target.value,
                          });
                          setCatelogueer({
                            ...Catalogueer,
                            description: false,
                          });
                        }}
                      />

                      {Catalogueer?.description === true ? (
                        <FieldValidationError message="Please enter Catalogue Description " />
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
              )}
              {PortfolioDataCatalog?.catalog &&
                PortfolioDataCatalog?.catalog.map((item) => (
                  <div className="upload-lists">
                    <div className="upload-lists--item">
                      <div className="img-block">
                        <img src={item?.file} />
                      </div>
                      <div className="content">
                        <h6>{item?.title}</h6>
                        <p>{item?.description}</p>
                        <button
                          className="edit-button"
                          onClick={(e) => {
                            e.preventDefault();
                            ref.current.click();
                            setEditData(item);
                            setShow(true);
                          }}
                        >
                          <Edit2Icon />
                        </button>
                        <button
                          className="delete-button"
                          onClick={(e) => {
                            e.preventDefault();

                            swal({
                              title: "Are you sure?",
                              text: "Once deleted, you will not be able to recover this imaginary file!",
                              icon: "warning",
                              buttons: true,
                              dangerMode: true,
                            }).then((willDelete) => {
                              if (willDelete) {
                                deleteShowCaseWithId(item?.id);
                              } else {
                              }
                            });
                          }}
                        >
                          <DeleteIcon />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="button button-primary"
                onClick={(e) => {
                  setCatelogueLoad((p) => ({ ...p, catalog: true }));
                  editPortfolio(e);
                }}
              >
                {catelogueLoad?.catalog === true ? <PuffLoader /> : "Save"}
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
            <h3>Edit Product Catalogue</h3>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="upload">
            <div>
              <div className="upload-image">
                <input
                  className="img-block"
                  type="file"
                  id="company_logo"
                  accept="image/png,image/gif,image/jpeg,image/jpg,application/pdf,application/msword"
                  onChange={(e) => {
                    if (
                      !(
                        e.target.files[0].type === "image/png" ||
                        e.target.files[0].type === "image/jpg" ||
                        e.target.files[0].type === "image/jpeg" ||
                        e.target.files[0].type === "image/gif" ||
                        e.target.files[0].type === "application/pdf" ||
                        e.target.files[0].type === "application/msword"
                      )
                    ) {
                      alert("Only images,pdf,doc,docx allowded");
                      return false;
                    }

                    if (e.target.files[0].size > 2097152) {
                      alert("Not more than 2MB Allowded");
                      return false;
                    }
                    setEditData((p) => ({
                      ...p,
                      logo: e.target.files[0],
                    }));
                    setImage(e.target.files[0]);
                    EditsetCatelogueer({
                      ...EditCatalogueer,
                      logo: false,
                    });
                  }}
                />
                <label htmlFor="company_logo">
                  {Image?.name ? (
                    <>
                      <UploadIcon />
                      <span>
                        Drag n Drop here Or{" "}
                        <span className="color-primary">Browse</span>
                      </span>
                      <span className="text-start">{Image?.name} </span>
                    </>
                  ) : (
                    <>
                      <UploadIcon />
                      <span>
                        Drag n Drop here Or{" "}
                        <span className="color-primary">Browse</span>
                      </span>
                    </>
                  )}
                </label>
              </div>
              {EditCatalogueer?.logo === true ? (
                <span className="error-message">
                  <FieldValidationError message="Please Upload Catalogue" />
                </span>
              ) : (
                ""
              )}
              <span className="error-message" style={{ color: "black" }}>
                Only allow doc,image,pdf with the size of 2MB
              </span>
            </div>
            <div className="upload-fields">
              <div className="form-field">
                <label className="form-label">
                  Catalogue name <span className="mendatory">*</span>
                </label>
                <input
                  type="text"
                  name="cname"
                  id="cname"
                  className="form-input"
                  placeholder="Enter Catalogue name"
                  value={EditData?.title}
                  onChange={(e) => {
                    setEditData((p) => ({ ...p, title: e.target.value }));
                    EditsetCatelogueer({
                      ...EditCatalogueer,
                      title: false,
                    });
                  }}
                />
                {EditCatalogueer?.title === true ? (
                  <FieldValidationError message="Please enter Catalogue Name " />
                ) : (
                  ""
                )}
              </div>
              <div className="form-field">
                <label className="form-label">
                  Description <span className="mendatory">*</span>
                </label>
                <textarea
                  className="form-input"
                  placeholder="Description"
                  value={EditData?.description}
                  onChange={(e) => {
                    setEditData((p) => ({ ...p, description: e.target.value }));
                    EditsetCatelogueer({
                      ...EditCatalogueer,
                      description: false,
                    });
                  }}
                />
                {EditCatalogueer?.description === true ? (
                  <FieldValidationError message="Please enter Catalogue Description " />
                ) : (
                  ""
                )}

                <div className="form-field">
                  <label className="form-label">Catelogue Image</label>
                  <img src={EditData?.file} height={100} width={100} />
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="button-primary"
            onClick={(e) => {
              EditCatalog(e);
            }}
          >
            {catelogueLoad === true ? <PuffLoader /> : "Save "}
          </Button>
          <Button variant="ssecondary" onClick={handleClose} ref={EditRef}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ProductCatalogueModal;
