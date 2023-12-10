import React, { useEffect, useRef, useState } from "react";
import Header from "../common/header";
import Breadcrumb from "../common/breadcrumb";
import "../common/scss/pages/product-protfolio.scss";
import { ReactComponent as EditIcon } from "../assets/images/edit-icon2.svg";
import { ReactComponent as CompleteIcon } from "../assets/images/complete-icon.svg";
import { ReactComponent as InfoIcon } from "../assets/images/info.svg";
import { ReactComponent as AttachmentIcon } from "../assets/images/attachment.svg";
import ProductImage from "../assets/images/product-image.png";
import ProductImagePlaceholder from "../assets/images/product-image-placeholder.png";
import { ReactComponent as ArrowDownIcon } from "../assets/images/arrow-down.svg";
import Cancel from "../assets/images/cancel.png";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { get, getAuthConfig, post, postwithOu } from "../libs/http-hydrate";
import Select from "react-select";
import FieldValidationError from "../components/error-messages/field-validation-error";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Cropper from "react-easy-crop";
import getCroppedImg, { createImage } from "./Crop";
import { PuffLoader } from "react-spinners";
import { ReactComponent as Close2Icon } from "../assets/images/close2-icon.svg";
import getCroppedImgr, {
  convertDataURIToBinary,
  dataURLtoFile,
  getBase64Image,
} from "../utils/dataURLtoFile";

import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
function CreatePostToBuy() {
  const [Loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [availableColor, setAvailableColor] = useState([]);
  const [availableUnit, setAvailableUnit] = useState([]);

  const [productArrayCat, setProductArrayCat] = useState([]);
  const [productArrayCity, setProductArrayCity] = useState([]);
  const [BrandArray, setBrandArray] = useState([{ id: "", name: "other" }]);
  const [templateArray , setTemplateArray ]= useState([])
  const [productSubCategoryArray, setProductSubCategoryArray] = useState([]);
  const [ProductData, setProductData] = useState({
    name: "",
    terms:"",
    category_id: "",
    required_in_days: "",
    preferred_transport: "",
    order_qty: "",
    sub_category_id: "",
    city_id: "",
    size: "",
    city:"",
    material_type: "",
    code: "",
    shape: "",
    capacity: "",
    color_id: "",
    brand_id: "",
    min_order_qty: "",
    quality_standard: "",
    certificate: "",
    unit_id: "",
    for_advance_payment: "",
    for_credit_payment: "",
    hsn_code: "",
    gst_rate: "",
    delivery_within_state: "",
    delivery_outside_state: "",
    description: "",
    Front_Image: "",
    Back_Image: "",
    Upper_Image: "",
    Lower_Image: "",
    Left_Image: "",
    Right_Image: "",
    gallery: [],
    otherBrandName: "",
    template:""
  });
  const [ProductDataErr, setProductDataErr] = useState({
    category_id: false,
    sub_category_id: false,
    qty: false,
    city: false,
    Front_Image: false,
    name:false,
    required_in_days:false,
    preferred_transport:false,
    template:false
  });
  const selectInputRef = useRef();
  useEffect(() => {}, []);
  function intialCat() {
    post("/general/category_listing", { type: "product", page: 1 })
      .then((response) => {
        setProductArrayCat(response.data.data);
      })
      .catch((e) => {
        console.log(e);
        // alert("this is the errror", e);
      });
  }
  function intialcity() {
    get("/general/region_listing?get_cities_only=1")
      .then((response) => {
        setProductArrayCity(response.data.data);
      })
      .catch((e) => {
        alert("this is the errror", e);
      });
  }
  function IntialColor() {
    post("/general/category_listing", { type: "color" })
      .then((response) => {
        setAvailableColor(response.data.data);
      })
      .catch((e) => {
        alert("this is the error", e);
      });
  }
  function IntialUnit() {
    post("/general/category_listing", { type: "unit" })
      .then((response) => {
        setAvailableUnit(response.data.data);
      })
      .catch((e) => {
        alert("this is the error", e);
      });
  }

  function searcBrand(newValue, parent_id) {
    post("/general/category_listing", {
      type: "brand",
      page: 1,
      search: newValue,
      parent_id: parent_id,
    })
      .then((response) => {
        setBrandArray(response.data.data);
        setBrandArray((oldArray) => [
          ...oldArray,
          { id: "other", name: "other" },
        ]);
      })
      .catch((e) => {
        alert("this is the errror", e);
      });
  }
  function BrandGet() {
    post("/general/category_listing", {
      type: "brand",
      page: 1,
      parent_id: ProductData?.sub_category_id,
    })
      .then((response) => {
        setBrandArray(response.data.data);

        setBrandArray((oldArray) => [
          ...oldArray,
          { id: "other", name: "other" },
        ]);
      })
      .catch((e) => {
        alert("this is the errror", e);
      });
  }
  function clear() {
    console.log(selectInputRef.current.commonProps.setValue(""));

    // selectInputRef.current.select.clearValue();
  }
  function subCategory(id) {
    post("/general/category_listing", {
      type: "product_sub_category",
      parent_id: id,
    })
      .then((response) => {
        setProductSubCategoryArray(response.data.data);
      })
      .catch((e) => {
        alert("this is the error", e);
      });
  }
  function searcCat(newValue) {
    post("/general/category_listing", {
      type: "product",
      page: 1,
      search: newValue,
    })
      .then((response) => {
        setProductArrayCat(response.data.data);
      })
      .catch((e) => {
        alert("this is the errror", e);
      });
  }
  function searcSubCat(newValue, parent_id) {
    post("/general/category_listing", {
      type: "product_sub_category",
      page: 1,
      search: newValue,
      parent_id: parent_id,
    })
      .then((response) => {
        setProductSubCategoryArray(response.data.data);
      })
      .catch((e) => {
        alert("this is the errror", e);
      });
  }

  function TemplateFunction() {
    get("/general/content?search&type=post_to_buy")
      .then((response) => {
        setTemplateArray(response.data.data)
      })
      .catch((e) => {
        alert("this is the errror", e);
      });
  }

  const [croppedImages, setCroppedImages] = useState({
    Front_Image: false,
    Back_Image: false,
    Upper_Image: false,
    Lower_Image: false,
    Left_Image: false,
    Right_Image: false,
  });
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
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);
  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(
        croppedImages?.Front_Image === true
          ? ProductData?.Front_Image
          : croppedImages?.Back_Image === true
          ? ProductData?.Back_Image
          : croppedImages?.Left_Image === true
          ? ProductData?.Left_Image
          : croppedImages?.Right_Image === true
          ? ProductData?.Right_Image
          : croppedImages?.Upper_Image === true
          ? ProductData?.Upper_Image
          : croppedImages?.Lower_Image === true
          ? ProductData?.Lower_Image
          : "",
        croppedAreaPixels,
        rotation
      );
      console.log("donee", { croppedImage });
      setCroppedImage(croppedImage);
      if (croppedImages?.Front_Image === true) {
        setProductData((p) => ({ ...p, Front_Image: croppedImage }));
      }

      if (croppedImages?.Back_Image === true) {
        setProductData((p) => ({ ...p, Back_Image: croppedImage }));
      }

      if (croppedImages?.Left_Image === true) {
        setProductData((p) => ({ ...p, Left_Image: croppedImage }));
      }

      if (croppedImages?.Lower_Image === true) {
        setProductData((p) => ({ ...p, Lower_Image: croppedImage }));
      }
      if (croppedImages?.Right_Image === true) {
        setProductData((p) => ({ ...p, Right_Image: croppedImage }));
      }
      if (croppedImages?.Upper_Image === true) {
        setProductData((p) => ({ ...p, Upper_Image: croppedImage }));
      }
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels, rotation, ProductData?.Front_Image]);

  const categoryRef = useRef();
  const DifferentiationRef = useRef();
  const OtherRef = useRef();
  const PricingRef = useRef();
  const TaxRef = useRef();
  const DeliveryRef = useRef();
  const descriptionRef = useRef();
  const imagesRef = useRef();
  const nameRef = useRef();
  const cityRef = useRef();
  const qtyRef = useRef();
  const preRef = useRef();
  const dayRef = useRef();
  const templateRef= useRef();
  async function createPostToBuy(e) {
    e.preventDefault();
    setLoading(true);
    var bool = false;

    if (ProductData?.template === "") {
      bool = true;
      setProductDataErr((p) => ({ ...p, template: true }));
      templateRef.current.scrollIntoView({ behavior: "smooth" });
    }
    if (ProductData?.preferred_transport === "") {
      bool = true;
      setProductDataErr((p) => ({ ...p, preferred_transport: true }));
      preRef.current.scrollIntoView({ behavior: "smooth" });
    }
    if (ProductData?.required_in_days === "") {
      bool = true;
      setProductDataErr((p) => ({ ...p, required_in_days: true }));
      dayRef.current.scrollIntoView({ behavior: "smooth" });
    }
    if (ProductData?.city_id === "") {
      bool = true;

      setProductDataErr((p) => ({ ...p, city: true }));
      cityRef.current.scrollIntoView({ behavior: "smooth" });
    }

    if (ProductData?.name === "") {
      bool = true;

      setProductDataErr((p) => ({ ...p, name: true }));
      nameRef.current.scrollIntoView({ behavior: "smooth" });
    }

    if (ProductData?.sub_category_id === "") {
      bool = true;

      setProductDataErr((p) => ({ ...p, sub_category_id: true }));
      categoryRef.current.scrollIntoView({ behavior: "smooth" });
    }
    if (ProductData?.category_id === "") {
      bool = true;

      setProductDataErr((p) => ({ ...p, category_id: true }));
      categoryRef.current.scrollIntoView({ behavior: "smooth" });
    }
    if (
      ProductData?.Front_Image.trim() === "" &&
      ProductData?.Back_Image.trim() === "" &&
      ProductData?.Lower_Image.trim() === "" &&
      ProductData?.Upper_Image.trim() === "" &&
      ProductData?.Left_Image.trim() === "" &&
      ProductData?.Right_Image.trim() === ""
    ) {
      bool = true;
      setProductDataErr((p) => ({ ...p, Front_Image: true }));
      imagesRef.current.scrollIntoView({ behavior: "smooth" });
    }

    if (
      ProductDataErr?.category_id === true ||
      ProductDataErr?.sub_category_id === true ||
      ProductDataErr?.city === true ||
      ProductDataErr?.qty === true ||
      ProductDataErr?.Front_Image === true ||
      ProductDataErr?.template === true
    ) {
      setLoading(false);
      bool = true;
      return false;
    }

    if (bool === true) {
      return false;
    }

    const formdata = new FormData();
    if (ProductData?.brand_id === "other") {
      const BrandFromData = new FormData();
      BrandFromData.append("sub_category_id", ProductData?.sub_category_id);
      BrandFromData.append("name", ProductData?.otherBrandName);

      const url = "/product/brand/create";
      const response = await postwithOu(url, getAuthConfig(), BrandFromData)
        .then((res) => {
          if (res.status === 200) {
            // alert(res.data.data.id);
            formdata.append("brand_id", res.data.data.id);
          }
        })
        .catch((err) => {
          alert("Brand Category Not Created or Brand Name is duplicated");
        });
    }

    if (ProductData?.brand_id != "other") {
      formdata.append("brand_id", ProductData?.brand_id);
    }


    formdata.append("name", ProductData?.name);
    formdata.append("post_template_id", ProductData?.template)
    formdata.append("type", "post_to_buy");
    formdata.append("category_id", ProductData?.category_id);
    formdata.append("sub_category_id", ProductData?.sub_category_id);
    formdata.append("order_qty", ProductData?.order_qty);
    formdata.append("required_in_city_id", ProductData?.city_id);
    formdata.append("preferred_transport", ProductData?.preferred_transport);
    formdata.append("required_in_city",ProductData?.city) 
    formdata.append("required_in_days",ProductData?.required_in_days)

    if(ProductData?.size != "")
    {
      formdata.append("size", ProductData?.size);
    }
    if(ProductData?.color_id != undefined)
    {
    formdata.append("color_id", ProductData?.color_id);
    }
    if(ProductData?.material_type != "")
    {
    formdata.append("material_type", ProductData?.material_type);
    }
    if(ProductData?.code != "")
    {
    formdata.append("code", ProductData?.code);
    }
    if(ProductData?.shape != "")
    {
    formdata.append("shape", ProductData?.shape);
    }
    if(ProductData?.capacity != "")
    {
    formdata.append("storage_capacity", ProductData?.capacity);
    }
    if(ProductData?.terms != "")
    {
    formdata.append("terms", ProductData?.terms);
    }
    if(ProductData?.amount != undefined)
    {
      formdata.append("amount", ProductData?.amount);

    }
    if(ProductData?.hsn_code != "")
    {
      formdata.append("hsn_code", ProductData?.hsn_code);

    }
    if(ProductData?.gst_rate != "")
    {
      formdata.append("gst_rate", ProductData?.gst_rate);

    }
    if(ProductData?.unit_id != "")
    {
      formdata.append("unit_id", ProductData?.unit_id);

    }
    if(ProductData?.quality_standard != ""){

      formdata.append("quality_standard", ProductData?.quality_standard);

    }

    if (ProductData?.Front_Image != "") {
      formdata.append("gallery[0][type]", "front");
      if (ProductData?.Front_Image.substring(0, 4) == "blob") {
        const ddata = await getCroppedImgr(ProductData?.Front_Image);
        formdata.append(
          "gallery[0][image]",
          dataURLtoFile(ddata, "Front.jpeg")
        );
      } else {
        formdata.append(
          "gallery[0][image]",
          dataURLtoFile(ProductData?.Front_Image, "Front.jpeg")
        );
      }
    }
    if (ProductData?.Back_Image != "") {
      formdata.append("gallery[1][type]", "back");

      if (ProductData?.Back_Image.substring(0, 4) == "blob") {
        const ddata = await getCroppedImgr(ProductData?.Back_Image);
        formdata.append("gallery[1][image]", dataURLtoFile(ddata, "Back.jpeg"));
      } else {
        formdata.append(
          "gallery[1][image]",
          dataURLtoFile(ProductData?.Back_Image, "Back.jpeg")
        );
      }
    }
    if (ProductData?.Upper_Image != "") {
      formdata.append("gallery[2][type]", "upper");
      if (ProductData?.Upper_Image.substring(0, 4) == "blob") {
        const ddata = await getCroppedImgr(ProductData?.Upper_Image);
        formdata.append(
          "gallery[2][image]",
          dataURLtoFile(ddata, "Uppper.jpeg")
        );
      } else {
        formdata.append(
          "gallery[2][image]",
          dataURLtoFile(ProductData?.Upper_Image, "Upper.jpeg")
        );
      }
    }
    if (ProductData?.Lower_Image != "") {
      formdata.append("gallery[3][type]", "lower");
      if (ProductData?.Lower_Image.substring(0, 4) == "blob") {
        const ddata = await getCroppedImgr(ProductData?.Lower_Image);
        formdata.append(
          "gallery[3][image]",
          dataURLtoFile(ddata, "lower.jpeg")
        );
      } else {
        formdata.append(
          "gallery[3][image]",
          dataURLtoFile(ProductData?.Lower_Image, "lower.jpeg")
        );
      }
    }
    if (ProductData?.Right_Image != "") {
      formdata.append("gallery[4][type]", "right");
      if (ProductData?.Right_Image.substring(0, 4) == "blob") {
        const ddata = await getCroppedImgr(ProductData?.Right_Image);
        formdata.append(
          "gallery[4][image]",
          dataURLtoFile(ddata, "right.jpeg")
        );
      } else {
        formdata.append(
          "gallery[4][image]",
          dataURLtoFile(ProductData?.Right_Image, "right.jpeg")
        );
      }
    }
    if (ProductData?.Left_Image != "") {
      formdata.append("gallery[5][type]", "left");
      if (ProductData?.Left_Image.substring(0, 4) == "blob") {
        const ddata = await getCroppedImgr(ProductData?.Left_Image);
        formdata.append("gallery[5][image]", dataURLtoFile(ddata, "left.jpeg"));
      } else {
        formdata.append(
          "gallery[5][image]",
          dataURLtoFile(ProductData?.Left_Image, "left.jpeg")
        );
      }
    }
    const url = "/product/store";
    const response = await postwithOu(url, getAuthConfig(), formdata)
      .then((res) => {
        if (res.status === 200) {
          setLoading(false);
          navigate("/", { state: 'scrollToDiv' });
        }
      })
      .catch((err) => {
        setLoading(false);
        alert(err.response.message);
      });
  }


  console.log("testeee",ProductData)
  return (
    <>
      <Header home />
      <div className="page">
        <div className="container-fluid" ref={imagesRef}>
          <div className="create-post">
            <div className="page-heading">
              <h6>Create Post For Buy</h6>
            </div>
            <form>
              <div className="field-set">
                <div className="field-set-label">
                  <label>Upload Product Images</label>
                  <span className="info">
                    Max 6 (Optional)
                    <span className="tooltip-icon">
                      <OverlayTrigger
                        key="mobile-tip"
                        placement="top"
                        overlay={
                          <Tooltip id="tooltip-mobile-tip">Max 6</Tooltip>
                        }
                      >
                        <InfoIcon />
                      </OverlayTrigger>
                    </span>
                  </span>
                </div>
                <div className="row">
                  <div class="col-sm-2">
                    <div className="form-field">
                      <div className="file-upload upload-prod-image">
                        <input
                          type="file"
                          accept="image/*"
                          id="upload_prod_img1"
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
                            }
                            if (e.target.files[0].size > 2097152) {
                              alert("Not More than 2 MB is allowded");
                              return false;
                            }
                            setProductData({
                              ...ProductData,
                              Front_Image: URL.createObjectURL(
                                e.target.files[0]
                              )
                            });
                            setProductDataErr({
                              ...ProductDataErr,
                              Front_Image: false
                            });
                            console.log(e.target.files[0]);
                          }}
                        />

                        {ProductData?.Front_Image === "" ? (
                          <label htmlFor="upload_prod_img1">
                            <img src={ProductImagePlaceholder} />
                            <div className="image-type">Front</div>
                          </label>
                        ) : (
                          <>
                            <label>
                              <img
                                src={ProductData.Front_Image}
                                // onImageLoaded={setImage}
                              />

                              <img
                                src={Cancel}
                                className="cancel-button"
                                style={{ height: "20px", width: "20px" }}
                                onClick={(e) => {
                                  e.preventDefault();
                                  setProductData({
                                    ...ProductData,
                                    Front_Image: ""
                                  });
                                }}
                              />

                              <div className="image-type">Front</div>

                              <span
                                onClick={(e) => {
                                  setShow(true);

                                  setCroppedImages((p) => ({
                                    ...p,
                                    Front_Image: true
                                  }));
                                }}
                              >
                                <EditIcon />
                              </span>
                            </label>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div class="col-sm-2">
                    <div className="form-field">
                      <div className="file-upload upload-prod-image">
                        <input
                          type="file"
                          accept="image/*"
                          id="upload_prod_img2"
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
                            }
                            if (e.target.files[0].size > 2097152) {
                              alert("Not More than 2 MB is allowded");
                              return false;
                            }
                            setProductData({
                              ...ProductData,
                              Back_Image: URL.createObjectURL(e.target.files[0])
                            });
                            setProductDataErr({
                              ...ProductDataErr,
                              Front_Image: false
                            });
                            console.log(e.target.files[0]);
                          }}
                        />

                        {ProductData?.Back_Image === "" ? (
                          <label htmlFor="upload_prod_img2">
                            <img src={ProductImagePlaceholder} />
                            <div className="image-type">Back</div>
                          </label>
                        ) : (
                          <label>
                            <img
                              src={ProductData?.Back_Image}
                              // onImageLoaded={setImage}
                            />

                            <img
                              src={Cancel}
                              className="cancel-button"
                              style={{ height: "20px", width: "20px" }}
                              onClick={(e) => {
                                e.preventDefault();
                                setProductData({
                                  ...ProductData,
                                  Back_Image: ""
                                });
                              }}
                            />
                            {/* <button
                              className="cancel-button"
                              onClick={(e) => {
                                e.preventDefault();
                                setProductData({
                                  ...ProductData,
                                  Front_Image: "",
                                });
                              }}
                            >
                              <img src={Cancel} />
                            </button> */}
                            <div className="image-type">Back</div>

                            <span
                              onClick={(e) => {
                                setShow(true);
                                setCroppedImages((p) => ({
                                  ...p,
                                  Back_Image: true
                                }));
                              }}
                            >
                              <EditIcon />
                            </span>
                          </label>
                        )}
                      </div>
                    </div>
                  </div>

                  <div class="col-sm-2">
                    <div className="form-field">
                      <div className="file-upload upload-prod-image">
                        <input
                          type="file"
                          accept="image/*"
                          id="upload_prod_img3"
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
                            }
                            if (e.target.files[0].size > 2097152) {
                              alert("Not More than 2 MB is allowded");
                              return false;
                            }
                            setProductData({
                              ...ProductData,
                              Left_Image: URL.createObjectURL(e.target.files[0])
                            });
                            setProductDataErr({
                              ...ProductDataErr,
                              Front_Image: false
                            });
                            console.log(e.target.files[0]);
                          }}
                        />

                        {ProductData?.Left_Image === "" ? (
                          <label htmlFor="upload_prod_img3">
                            <img src={ProductImagePlaceholder} />
                            <div className="image-type">Left</div>
                          </label>
                        ) : (
                          <label>
                            <img
                              src={ProductData?.Left_Image}
                              // onImageLoaded={setImage}
                            />

                            <img
                              src={Cancel}
                              className="cancel-button"
                              style={{ height: "20px", width: "20px" }}
                              onClick={(e) => {
                                e.preventDefault();
                                setProductData({
                                  ...ProductData,
                                  Left_Image: ""
                                });
                              }}
                            />
                            {/* <button
                              className="cancel-button"
                              onClick={(e) => {
                                e.preventDefault();
                                setProductData({
                                  ...ProductData,
                                  Front_Image: "",
                                });
                              }}
                            >
                              <img src={Cancel} />
                            </button> */}
                            <div className="image-type">Left</div>

                            <span
                              onClick={(e) => {
                                setShow(true);
                                setCroppedImages((p) => ({
                                  ...p,
                                  Left_Image: true
                                }));
                              }}
                            >
                              <EditIcon />
                            </span>
                          </label>
                        )}
                      </div>
                    </div>
                  </div>

                  <div class="col-sm-2">
                    <div className="form-field">
                      <div className="file-upload upload-prod-image">
                        <input
                          type="file"
                          accept="image/*"
                          id="upload_prod_img4"
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
                            }
                            if (e.target.files[0].size > 2097152) {
                              alert("Not More than 2 MB is allowded");
                              return false;
                            }
                            setProductData({
                              ...ProductData,
                              Right_Image: URL.createObjectURL(
                                e.target.files[0]
                              )
                            });
                            setProductDataErr({
                              ...ProductDataErr,
                              Front_Image: false
                            });
                            console.log(e.target.files[0]);
                          }}
                        />

                        {ProductData?.Right_Image === "" ? (
                          <label htmlFor="upload_prod_img4">
                            <img src={ProductImagePlaceholder} />
                            <div className="image-type">Right</div>
                          </label>
                        ) : (
                          <label>
                            <img
                              src={ProductData?.Right_Image}
                              // onImageLoaded={setImage}
                            />

                            <img
                              src={Cancel}
                              className="cancel-button"
                              style={{ height: "20px", width: "20px" }}
                              onClick={(e) => {
                                e.preventDefault();
                                setProductData({
                                  ...ProductData,
                                  Right_Image: ""
                                });
                              }}
                            />

                            {/* <button
                              className="cancel-button"
                              onClick={(e) => {
                                e.preventDefault();
                                setProductData({
                                  ...ProductData,
                                  Front_Image: "",
                                });
                              }}
                            >
                              <img src={Cancel} />
                            </button> */}
                            <div className="image-type">Right</div>

                            <span
                              onClick={(e) => {
                                setShow(true);
                                setCroppedImages((p) => ({
                                  ...p,
                                  Right_Image: true
                                }));
                              }}
                            >
                              <EditIcon />
                            </span>
                          </label>
                        )}
                      </div>
                    </div>
                  </div>
                  <div class="col-sm-2">
                    <div className="form-field">
                      <div className="file-upload upload-prod-image">
                        <input
                          type="file"
                          accept="image/*"
                          id="upload_prod_img5"
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
                            }
                            if (e.target.files[0].size > 2097152) {
                              alert("Not More than 2 MB is allowded");
                              return false;
                            }
                            setProductData({
                              ...ProductData,
                              Upper_Image: URL.createObjectURL(
                                e.target.files[0]
                              )
                            });
                            setProductDataErr({
                              ...ProductDataErr,
                              Front_Image: false
                            });
                            console.log(e.target.files[0]);
                          }}
                        />

                        {ProductData?.Upper_Image === "" ? (
                          <label htmlFor="upload_prod_img5">
                            <img src={ProductImagePlaceholder} />
                            <div className="image-type">Upper</div>
                          </label>
                        ) : (
                          <label>
                            <img
                              src={ProductData?.Upper_Image}
                              // onImageLoaded={setImage}
                            />

                            <img
                              src={Cancel}
                              className="cancel-button"
                              style={{ height: "20px", width: "20px" }}
                              onClick={(e) => {
                                e.preventDefault();
                                setProductData({
                                  ...ProductData,
                                  Upper_Image: ""
                                });
                              }}
                            />
                            {/* <button
                              className="cancel-button"
                              onClick={(e) => {
                                e.preventDefault();
                                setProductData({
                                  ...ProductData,
                                  Front_Image: "",
                                });
                              }}
                            >
                              <img src={Cancel} />
                            </button> */}
                            <div className="image-type">Upper</div>

                            <span
                              onClick={(e) => {
                                setShow(true);
                                setCroppedImages((p) => ({
                                  ...p,
                                  Upper_Image: true
                                }));
                              }}
                            >
                              <EditIcon />
                            </span>
                          </label>
                        )}
                      </div>
                    </div>
                  </div>

                  <div class="col-sm-2">
                    <div className="form-field">
                      <div className="file-upload upload-prod-image">
                        <input
                          type="file"
                          accept="image/*"
                          id="upload_prod_img6"
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
                            }
                            if (e.target.files[0].size > 2097152) {
                              alert("Not More than 2 MB is allowded");
                              return false;
                            }
                            setProductData({
                              ...ProductData,
                              Lower_Image: URL.createObjectURL(
                                e.target.files[0]
                              )
                            });
                            setProductDataErr({
                              ...ProductDataErr,
                              Front_Image: false
                            });
                            console.log(e.target.files[0]);
                          }}
                        />

                        {ProductData?.Lower_Image === "" ? (
                          <label htmlFor="upload_prod_img6">
                            <img src={ProductImagePlaceholder} />
                            <div className="image-type">Lower</div>
                          </label>
                        ) : (
                          <label>
                            <img
                              src={ProductData?.Lower_Image}
                              // onImageLoaded={setImage}
                            />

                            <img
                              src={Cancel}
                              className="cancel-button"
                              style={{ height: "20px", width: "20px" }}
                              onClick={(e) => {
                                e.preventDefault();
                                setProductData({
                                  ...ProductData,
                                  Lower_Image: ""
                                });
                              }}
                            />

                            {/* <button
                              className="cancel-button"
                              onClick={(e) => {
                                e.preventDefault();
                                setProductData({
                                  ...ProductData,
                                  Front_Image: "",
                                });
                              }}
                            >
                              <img src={Cancel} />
                            </button> */}
                            <div className="image-type">Lower</div>

                            <span
                              onClick={(e) => {
                                setShow(true);
                                setCroppedImages((p) => ({
                                  ...p,
                                  Lower_Image: true
                                }));
                              }}
                            >
                              <EditIcon />
                            </span>
                          </label>
                        )}
                      </div>
                    </div>
                  </div>
                  {ProductDataErr?.Front_Image === true ? (
                    <FieldValidationError message="Please add atleast one image"></FieldValidationError>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="row" ref={nameRef}>
                <div class="col-sm">
                  <div className="field-set">
                    <div className="field-set-label">
                      <label>
                        Product Name<span className="mendatory">*</span>
                      </label>
                    </div>
                  </div>
                  <div className="form-field">
                    <label className="form-label">Product Name</label>
                    <input
                      type="text"
                      value={ProductData?.name}
                      name="size"
                      id="size"
                      className="form-input"
                      placeholder="Enter Product Name "
                      onChange={(e) => {
                        setProductData({
                          ...ProductData,
                          name: e.target.value
                        });
                        setProductDataErr({ ...ProductDataErr, name: false });
                      }}
                    />

                    {ProductDataErr?.name === true ? (
                      <FieldValidationError message="Name is required" />
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
              <div className="field-set">
                <div className="field-set-label">
                  <label>
                    Product Categories<span className="mendatory">*</span>
                  </label>
                  <span className="info">
                    Both Must Be Selected
                    <span className="tooltip-icon">
                      <OverlayTrigger
                        key="mobile-tip"
                        placement="top"
                        overlay={
                          <Tooltip id="tooltip-mobile-tip">
                            Product Categories and Sub Categories
                          </Tooltip>
                        }
                      >
                        <InfoIcon />
                      </OverlayTrigger>
                    </span>
                  </span>
                </div>
                <div className="row" ref={categoryRef}>
                  <div class="col-sm">
                    <div className="form-field">
                      <label className="form-label">Category</label>

                      <Select
                        placeholder="Select Category"
                        id="category"
                        onFocus={(e) => {
                          e.preventDefault();
                          intialCat();
                        }}
                        options={productArrayCat.map(function (productArray) {
                          return {
                            value: productArray.id,
                            label: productArray.name
                          };
                        })}
                        onKeyDown={(e) => {
                          console.log("e.target.value", e.target.value);
                          searcCat(e.target.value);
                        }}
                        onChange={(e) => {
                          clear();
                          setProductSubCategoryArray([]);

                          setProductData((p) => ({
                            ...p,
                            category_id: e.value
                          }));

                          setProductDataErr({
                            ...ProductDataErr,
                            category_id: false
                          });

                          setProductData((p) => ({
                            ...p,
                            sub_category_id: ""
                          }));
                        }}
                        onBlur={(e) => {
                          e.preventDefault();
                        }}
                      ></Select>
                      {ProductDataErr?.category_id === true ? (
                        <FieldValidationError message="Please select category "></FieldValidationError>
                      ) : (
                        " "
                      )}
                    </div>
                  </div>
                  <div class="col-sm">
                    <div className="form-field">
                      <label className="form-label">Sub Category</label>
                      <Select
                        ref={selectInputRef}
                        id="subCategory"
                        placeholder="Select Sub Category"
                        onFocus={(e) => {
                          e.preventDefault();
                          subCategory(ProductData?.category_id);
                        }}
                        options={productSubCategoryArray.map(function (
                          sub_category
                        ) {
                          return {
                            value: sub_category.id,
                            label: sub_category.name
                          };
                        })}
                        onKeyDown={(e) => {
                          searcSubCat(e.target.value, ProductData?.category_id);
                        }}
                        onChange={(e) => {
                          setProductData({
                            ...ProductData,
                            sub_category_id: e.value
                          });

                          setProductDataErr({
                            ...ProductDataErr,
                            sub_category_id: false
                          });
                        }}
                      ></Select>

                      {ProductDataErr?.sub_category_id === true ? (
                        <FieldValidationError message="Please select sub category "></FieldValidationError>
                      ) : (
                        " "
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="field-set">
                <div className="field-set-label">
                  <label>Requirement Details</label>
                </div>
                <div className="row">
                  <div class="col-sm" ref={qtyRef}>
                    <div className="form-field">
                      <label className="form-label">
                        Required Quantity<span className="mendatory">*</span>
                      </label>
                      <input
                        type="number"
                        name="required_qty"
                        id="required_qty"
                        className="form-input"
                        placeholder="Enter Required Quantity"
                        value={ProductData?.order_qty}
                        onChange={(e) => {
                          setProductData((p) => ({
                            ...p,
                            order_qty: e.target.value
                          }));

                          setProductDataErr((p) => ({ ...p, qty: false }));
                        }}
                      />
                      {ProductDataErr?.qty === true ? (
                        <FieldValidationError message="Please enter valid quantity requirement "></FieldValidationError>
                      ) : (
                        " "
                      )}
                    </div>
                  </div>
                  <div class="col-sm" ref={cityRef}>
                    <div className="form-field">
                      <label className="form-label">
                        Required in City<span className="mendatory">*</span>
                      </label>
                      <Select
                        id="city"
                        placeholder="Select city"
                        onFocus={(e) => {
                          e.preventDefault();
                          intialcity();
                        }}
                        options={productArrayCity.map(function (sub_category) {
                          return {
                            value: sub_category.id,
                            label: sub_category.name
                          };
                        })}
                        onKeyDown={(e) => {}}
                        onChange={(e) => {
                          setProductData((p) => ({
                            ...p,
                            city_id: e.value
                          }));

                          setProductData((p) => ({
                            ...p,
                            city: e.label
                          }));
                          setProductDataErr({
                            ...ProductDataErr,
                            city_id: false
                          });
                          setProductDataErr((p) => ({ ...p, city: false }));
                        }}
                      ></Select>
                      {ProductDataErr?.city === true ? (
                        <FieldValidationError message="Please select city "></FieldValidationError>
                      ) : (
                        " "
                      )}{" "}
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div class="col-sm" ref={preRef}>
                    <div className="form-field">
                      <label className="form-label">
                        Preferred Transport <span className="mendatory">*</span>{" "}
                      </label>
                      <input
                        type="text"
                        name="required_qty"
                        id="required_qty"
                        className="form-input"
                        placeholder="Enter Preferred Transport"
                        value={ProductData?.preferred_transport}
                        onChange={(e) => {
                          setProductData({
                            ...ProductData,
                            preferred_transport: e.target.value
                          });
                          setProductDataErr((p) => ({
                            ...p,
                            preferred_transport: false
                          }));
                        }}
                      />
                      {ProductDataErr?.preferred_transport === true ? (
                        <FieldValidationError message="Plese enter your preferred transport "></FieldValidationError>
                      ) : (
                        " "
                      )}
                    </div>
                  </div>
                  <div class="col-sm" ref={dayRef}>
                    <div className="form-field">
                      <label className="form-label">
                        Required in Nos. of Days{" "}
                        <span className="mendatory">*</span>
                      </label>
                      <input
                        type="text"
                        name="required_days"
                        id="required_days"
                        className="form-input"
                        placeholder="Enter Required nos days"
                        value={ProductData?.required_in_days}
                        onChange={(e) => {
                          setProductData({
                            ...ProductData,
                            required_in_days: e.target.value
                          });
                          setProductDataErr((p) => ({
                            ...p,
                            required_in_days: false
                          }));
                        }}
                      />
                      {ProductDataErr?.required_in_days === true ? (
                        <FieldValidationError message="Please Enter required days "></FieldValidationError>
                      ) : (
                        " "
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="field-set">
                <div className="field-set-label ">
                  <label>Other Details</label>
                  <a
                    className="collapse-button collapsed"
                    data-toggle="collapse"
                    href="#collap_OtherDetails2"
                    role="button"
                    aria-expanded="false"
                    aria-controls="collap_OtherDetails2"
                  >
                    <ArrowDownIcon />
                  </a>
                </div>
                <div className="collapse" id="collap_OtherDetails2">
                  <div className="row">
                    <div class="col-sm">
                      <div className="form-field">
                        <label className="form-label">Size</label>
                        <input
                          type="text"
                          value={ProductData?.size}
                          name="size"
                          id="size"
                          className="form-input"
                          placeholder="Enter Your Size"
                          onChange={(e) => {
                            setProductData({
                              ...ProductData,
                              size: e.target.value
                            });
                          }}
                        />{" "}
                      </div>
                    </div>
                    <div class="col-sm">
                      <div className="form-field">
                        <label className="form-label">Colours</label>
                        <Select
                          ref={selectInputRef}
                          id="color"
                          placeholder="Select Color"
                          onFocus={(e) => {
                            e.preventDefault();
                            IntialColor();
                          }}
                          options={availableColor.map(function (color) {
                            return {
                              value: color.id,
                              label: color.name
                            };
                          })}
                          onChange={(e) => {
                            setProductData({
                              ...ProductData,
                              color_id: e.value
                            });
                          }}
                        ></Select>{" "}
                      </div>
                    </div>
                    <div class="col-sm">
                      <div className="form-field">
                        <label className="form-label">Material Type </label>
                        <input
                          type="text"
                          value={ProductData?.material_type}
                          name="type"
                          id="type"
                          className="form-input"
                          placeholder="Enter Your Material"
                          onChange={(e) => {
                            setProductData({
                              ...ProductData,
                              material_type: e.target.value
                            });

                            setProductDataErr({
                              ...ProductDataErr,
                              size: false
                            });
                          }}
                        />{" "}
                      </div>
                    </div>
                    <div class="col-sm">
                      <div className="form-field">
                        <label className="form-label">Brand</label>
                        <Select
                          onFocus={(e) => {
                            e.preventDefault();
                            if (ProductData.sub_category_id === "") {
                            } else {
                              BrandGet(ProductData?.sub_category_id);
                            }
                          }}
                          placeholder="Select Brand"
                          options={BrandArray.map(function (productArray) {
                            return {
                              value: productArray.id,
                              label: productArray.name
                            };
                          })}
                          onKeyDown={(newValue) => {
                            searcBrand(newValue, ProductData?.sub_category_id);
                          }}
                          onChange={(e) => {
                            setProductData({
                              ...ProductData,
                              brand_id: e.value
                            });
                            // setBrandArray((oldArray) => [...oldArray,{id: "other",name:"other"}])

                            setProductDataErr({
                              ...ProductDataErr,
                              brand_id: false
                            });
                          }}
                        ></Select>{" "}
                      </div>
                    </div>
                  </div>
                  {ProductData?.brand_id === "other" ? (
                    <div className="row">
                      <div className="col-sm"></div>
                      <div className="col-sm"></div>
                      <div className="col-sm-6">
                        <div className="form-field">
                          <label className="form-label">
                            Enter Brand Name{" "}
                          </label>
                          <input
                            type="text"
                            onFocus={(e) => {
                              e.preventDefault();
                              BrandGet(ProductData?.sub_category_id);
                            }}
                            onBlur={(e) => {
                              e.preventDefault();
                            }}
                            value={ProductData?.otherBrandName}
                            name="pcode"
                            id="pcode"
                            className="form-input"
                            placeholder="Enter Your Brand Name "
                            onChange={(e) => {
                              setProductData({
                                ...ProductData,
                                otherBrandName: e.target.value
                              });
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  <div className="row">
                    <div class="col-sm-6">
                      <div className="form-field">
                        <label className="form-label">Product Code</label>
                        <input
                          type="number"
                          value={ProductData?.code}
                          name="pcode"
                          id="pcode"
                          className="form-input"
                          placeholder="Enter Your Product Code"
                          onChange={(e) => {
                            setProductData({
                              ...ProductData,
                              code: e.target.value
                            });
                          }}
                        />{" "}
                      </div>
                    </div>
                    <div class="col-sm">
                      <div className="form-field">
                        <label className="form-label">Shape</label>
                        <input
                          type="text"
                          value={ProductData?.shape}
                          name="pshape"
                          id="pshape"
                          className="form-input"
                          placeholder="Enter Your Product Shape"
                          onChange={(e) => {
                            setProductData({
                              ...ProductData,
                              shape: e.target.value
                            });
                          }}
                        />{" "}
                      </div>
                    </div>
                    <div class="col-sm">
                      <div className="form-field">
                        <label className="form-label d-flex align-items-center justify-content-between">
                          Storage capacity
                        </label>
                        <input
                          type="text"
                          value={ProductData?.capacity}
                          name="capacity"
                          id="capacity"
                          className="form-input"
                          placeholder="Enter Your Storage Capacity"
                          onChange={(e) => {
                            setProductData({
                              ...ProductData,
                              capacity: e.target.value
                            });
                          }}
                        />{" "}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="field-set">
                <div className="field-set-label ">
                  <label>Pricing</label>
                  <a
                    className="collapse-button collapsed"
                    data-toggle="collapse"
                    href="#collap_Pricing"
                    role="button"
                    aria-expanded="false"
                    aria-controls="collap_Pricing"
                  >
                    <ArrowDownIcon />
                  </a>
                </div>
                <div className="collapse" id="collap_Pricing">
                  <div className="row">
                    <div class="col-sm">
                      <div className="form-field">
                        <label className="form-label">Expected Price</label>
                        <input
                          type="number"
                          value={ProductData?.amount}
                          name="advance_payment"
                          id="advance_payment"
                          className="form-input"
                          placeholder="Enter Your Pricing for advanced payement"
                          onChange={(e) => {
                            setProductData({
                              ...ProductData,
                              amount: e.target.value
                            });
                          }}
                        />{" "}
                      </div>
                    </div>
                    <div class="col-sm">
                      <div className="form-field">
                        <label className="form-label">
                          Preferred Payment Terms
                        </label>
                        <select
                          className="form-input"
                          onChange={(e) => {
                            e.preventDefault();
                            setProductData((p) => ({
                              ...p,
                              terms: e.target.value
                            }));
                          }}
                        >
                          <option value={""}>Select Terms</option>
                          <option value={"Credit"}>Credit</option>

                          <option value={"Advance"}>Advance</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="field-set">
                <div className="field-set-label">
                  <label>Tax Details</label>
                  <a
                    className="collapse-button collapsed"
                    data-toggle="collapse"
                    href="#collap_tax"
                    role="button"
                    aria-expanded="false"
                    aria-controls="collap_tax"
                  >
                    <ArrowDownIcon />
                  </a>
                </div>
                <div className="collapse" id="collap_tax">
                  <div className="row">
                    <div class="col-sm">
                      <div className="form-field">
                        <label className="form-label">HSN Code</label>
                        <input
                          type="text"
                          value={ProductData?.hsn_code}
                          name="hsn"
                          id="hsn"
                          className="form-input"
                          placeholder="Enter Your HSN Code"
                          onChange={(e) => {
                            setProductData({
                              ...ProductData,
                              hsn_code: e.target.value
                            });
                          }}
                        />{" "}
                      </div>
                    </div>
                    <div class="col-sm">
                      <div className="form-field">
                        <label className="form-label">GST Rate</label>
                        <input
                          type="number"
                          min={0}
                          max={100}
                          value={ProductData?.gst_rate}
                          name="gst"
                          id="gst"
                          className="form-input"
                          placeholder="Enter Your GST Rate"
                          onChange={(e) => {
                            if (
                              !(e.target.value >= 0 && e.target.value <= 100)
                            ) {
                              return false;
                            }
                            setProductData({
                              ...ProductData,
                              gst_rate: e.target.value
                            });
                          }}
                        />{" "}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="field-set">
                <div className="field-set-label">
                  <label>Other Details</label>
                  <a
                    className="collapse-button collapsed"
                    data-toggle="collapse"
                    href="#collap_OtherDetails"
                    role="button"
                    aria-expanded="false"
                    aria-controls="collap_OtherDetails"
                  >
                    <ArrowDownIcon />
                  </a>
                </div>
                <div className="collapse" id="collap_OtherDetails">
                  <div className="row">
                    <div class="col-sm">
                      <div className="form-field">
                        <label className="form-label">Please select Unit</label>

                        <Select
                          placeholder="Select Unit"
                          options={availableUnit.map(function (unit) {
                            return { value: unit.id, label: unit.name };
                          })}
                          onFocus={(e) => {
                            e.preventDefault();
                            IntialUnit();
                          }}
                          onChange={(e) => {
                            setProductData({
                              ...ProductData,
                              unit_id: e.value
                            });
                            setProductDataErr({
                              ...ProductDataErr,
                              unit_id: false
                            });
                          }}
                          onBlur={(e) => {
                            e.preventDefault();
                          }}
                        ></Select>
                      </div>
                    </div>
                    <div class="col-sm">
                      <div className="form-field">
                        <label className="form-label">Required Qty</label>
                        <input
                          type="text"
                          name="order_qty"
                          id="order_qty"
                          className="form-input"
                          placeholder="Enter Value"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div class="col-sm-6">
                      <div className="form-field">
                        <label className="form-label">Quality Standard</label>

                        <input
                          type="text"
                          name="order_qty"
                          id="order_qty"
                          className="form-input"
                          placeholder="Enter quality standard"
                          value={ProductData?.quality_standard}
                          onChange={(e) => {
                            e.preventDefault();
                            setProductData((p) => ({
                              ...p,
                              quality_standard: e.target.value
                            }));
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row protfolio-boxes">
                    <div class="col-sm-3">
                      <div className="chips chips--white">
                        <div className="chips--text">Post Hide From</div>
                        <div className="chips--value">
                          <span className="color-red">5</span> Users
                        </div>
                        <button
                          className="button-edit"
                          data-toggle="modal"
                          data-target="#PriceHideModal"
                          // onClick={() => Verify()}
                        >
                          <EditIcon />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row" ref={templateRef}>
                <div class="col-6 ">
                  <div className="form-field">
                    <label className="form-label">
                      Post Template <span className="mendatory">*</span>{" "}
                    </label>

                    <Select
                      placeholder="Select Post Template "
                      id="Template "
                      onFocus={(e) => {
                        e.preventDefault();
                        TemplateFunction();
                      }}
                      options={templateArray.map(function (productArray) {
                        return {
                          value: productArray.id,
                          label: productArray.content
                        };
                      })}
                      onKeyDown={(e) => {
                        e.preventDefault();
                      }}
                      onChange={(e) => {
                        setProductData((p) => ({
                          ...p,
                          template: e.value
                        }));

                        setProductDataErr({
                          ...ProductDataErr,
                          template: false
                        });
                      }}
                      onBlur={(e) => {
                        e.preventDefault();
                      }}
                    ></Select>
                    {ProductDataErr?.template === true ? (
                      <FieldValidationError message="Please select post template "></FieldValidationError>
                    ) : (
                      " "
                    )}
                  </div>
                </div>
              </div>
              <div className="form-button">
                <button
                  className="button button-primary"
                  onClick={(e) => {
                    createPostToBuy(e);
                  }}
                >
                  {Loading === true ? <PuffLoader /> : " Submit and Post"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
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
                image={
                  croppedImages?.Front_Image === true
                    ? ProductData?.Front_Image
                    : croppedImages?.Back_Image === true
                    ? ProductData?.Back_Image
                    : croppedImages?.Left_Image === true
                    ? ProductData?.Left_Image
                    : croppedImages?.Right_Image === true
                    ? ProductData?.Right_Image
                    : croppedImages?.Upper_Image === true
                    ? ProductData?.Upper_Image
                    : croppedImages?.Lower_Image === true
                    ? ProductData?.Lower_Image
                    : ""
                }
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
          {/* <button
            style={{
              display: "block",
            }}
            onClick={showCroppedImage}
          >
            Preview
          </button>
          <div className="cropped-image-container">
            {croppedImage && (
              <img className="cropped-image" src={croppedImage} alt="cropped" />
            )}
          </div> */}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              if (croppedImages?.Front_Image === true) {
                setCroppedImages((p) => ({ ...p, Front_Image: false }));
              }

              if (croppedImages?.Back_Image === true) {
                setCroppedImages((p) => ({ ...p, Back_Image: false }));
              }

              if (croppedImages?.Left_Image === true) {
                setCroppedImages((p) => ({ ...p, Left_Image: false }));
              }
              if (croppedImages?.Lower_Image === true) {
                setCroppedImages((p) => ({ ...p, Lower_Image: false }));
              }
              if (croppedImages?.Right_Image === true) {
                setCroppedImages((p) => ({ ...p, Right_Image: false }));
              }
              if (croppedImages?.Upper_Image === true) {
                setCroppedImages((p) => ({ ...p, Upper_Image: false }));
              }
              showCroppedImage();
              handleClose();
            }}
          >
            Save{" "}
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

export default CreatePostToBuy;
