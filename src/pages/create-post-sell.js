import React, { useCallback, useEffect, useRef, useState } from "react";
import Header from "../common/header";
import Breadcrumb from "../common/breadcrumb";
import "../common/scss/pages/product-protfolio.scss";
import { ReactComponent as EditIcon } from "../assets/images/edit-icon2.svg";
import { ReactComponent as CompleteIcon } from "../assets/images/complete-icon.svg";
import { ReactComponent as InfoIcon } from "../assets/images/info.svg";
import { ReactComponent as AttachmentIcon } from "../assets/images/attachment.svg";
import ProductImage from "../assets/images/product-image.png";
import ProductImagePlaceholder from "../assets/images/product-image-placeholder.png";
import Cancel from "../assets/images/cancel.png";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { get, getAuthConfig, post, postwithOu } from "../libs/http-hydrate";
import Select from "react-select";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Cropper from "react-easy-crop";
import FieldValidationError from "../components/error-messages/field-validation-error";
import getCroppedImg, { createImage } from "./Crop";
import { PuffLoader } from "react-spinners";
import { ReactComponent as Close2Icon } from '../assets/images/close2-icon.svg'
import getCroppedImgr, {
  convertDataURIToBinary,
  dataURLtoFile,
  getBase64Image,
} from "../utils/dataURLtoFile";
import { useLocation, useNavigate } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import { UseEffectOnce } from "../Hook/UseEffectOnce";

function CreatePostToSell() {
  const [PortfolioData, setPortfolioData] = useState({ credit_policy: "" });
  function GetCompanydDetails() {
    get("/user/setting/get_prefilled_details", getAuthConfig()).then((res) => {
      console.log(res.data);
      if (res?.data?.status === 200) {
        setPortfolioData((p) => ({
          ...PortfolioData,
          credit_policy: res.data.data.credit_policy,
        }));
      }
    });
  }
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };
  const [croppedImages, setCroppedImages] = useState({
    Front_Image: false,
    Back_Image: false,
    Upper_Image: false,
    Lower_Image: false,
    Left_Image: false,
    Right_Image: false,
  });
  const navigate = useNavigate();
  const [availableColor, setAvailableColor] = useState([]);
  const [availableUnit, setAvailableUnit] = useState([]);
  const [BrandArray, setBrandArray] = useState([{ id: "", name: "other" }]);
  const [Loading, setLoading] = useState(false);
  const [productArrayCat, setProductArrayCat] = useState([]);
  const [productSubCategoryArray, setProductSubCategoryArray] = useState([]);
  const [ProductData, setProductData] = useState({
    name: "",
    category_id: "",
    sub_category_id: "",
    size: "",
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
    freight_charges:"0",
    min_order_value:"0",
    negotiation : 0 ,
    template:""
  });
  const [ProductDataErr, setProductDataErr] = useState({
    name: false,
    category_id: false,
    sub_category_id: false,
    size: false,
    material_type: false,
    code: false,
    shape: false,
    capacity: false,
    color_id: false,
    brand_id: false,
    min_order_qty: false,
    quality_standard: false,
    certificate: false,
    unit_id: false,
    for_advance_payment: false,
    for_credit_payment: false,
    hsn_code: false,
    gst_rate: false,
    delivery_within_state: false,
    delivery_outside_state: false,
    description: false,
    Front_Image: false,
    template:false,
    descriptionlen:false
  });
  const [templateArray , setTemplateArray ]= useState([])

  const selectInputRef = useRef();
const templateRef=useRef()
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
  useEffect(() => {}, []);
  function intialCat() {
    post("/general/category_listing", { type: "product", page: 1 })
      .then((response) => {
        setProductArrayCat(response.data.data);
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
  function BrandGet(value) {
    post("/general/category_listing", {
      type: "brand",
      page: 1,
      parent_id: value,
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

  function TemplateFunction() {
    get("/general/content?search&type=post_to_sell")
      .then((response) => {
        setTemplateArray(response.data.data)
      })
      .catch((e) => {
        alert("this is the errror", e);
      });
  }
  const categoryRef = useRef();
  const DifferentiationRef = useRef();
  const OtherRef = useRef();
  const PricingRef = useRef();
  const TaxRef = useRef();
  const DeliveryRef = useRef();
  const descriptionRef = useRef();
  const imagesRef = useRef();
  const nameRef = useRef();

  async function handleProductCreate(e) {
    e.preventDefault();
    var bool = false;
    if (ProductData?.template === "") {
      bool = true;
      setProductDataErr((p) => ({ ...p, template: true }));
      templateRef.current.scrollIntoView({ behavior: "smooth" });
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
    if (ProductData?.description.trim() === "") {
      bool = true;

      setProductDataErr((p) => ({ ...p, description: true }));
      descriptionRef.current.scrollIntoView({ behavior: "smooth" });
    }
    if (ProductData?.delivery_outside_state.trim() === "") {
      bool = true;

      setProductDataErr((p) => ({ ...p, delivery_outside_state: true }));
      DeliveryRef.current.scrollIntoView({ behavior: "smooth" });
    }
    if (ProductData?.delivery_within_state.trim() === "") {
      bool = true;

      setProductDataErr((p) => ({ ...p, delivery_within_state: true }));
      DeliveryRef.current.scrollIntoView({ behavior: "smooth" });
    }

    if (ProductData?.gst_rate.trim() === "") {
      bool = true;

      setProductDataErr((p) => ({ ...p, gst_rate: true }));
      TaxRef.current.scrollIntoView({ behavior: "smooth" });
    }
    if (ProductData?.hsn_code.trim() === "") {
      bool = true;

      setProductDataErr((p) => ({ ...p, hsn_code: true }));
      TaxRef.current.scrollIntoView({ behavior: "smooth" });
    }
    if (
      ProductData?.for_advance_payment === "" &&
      ProductData?.for_credit_payment === ""
    ) {
      bool = true;

      setProductDataErr((p) => ({ ...p, for_advance_payment: true }));
      PricingRef.current.scrollIntoView({ behavior: "smooth" });
    }
    if (ProductData?.unit_id === "") {
      bool = true;

      setProductDataErr((p) => ({ ...p, unit_id: true }));
      OtherRef.current.scrollIntoView({ behavior: "smooth" });
    }
    if (ProductData?.min_order_qty === "") {
      bool = true;

      setProductDataErr((p) => ({ ...p, min_order_qty: true }));
      OtherRef.current.scrollIntoView({ behavior: "smooth" });
    }
    if (
      ProductData?.size === "" &&
      ProductData?.color_id === "" &&
      ProductData?.material_type === "" &&
      ProductData?.brand_id === "" &&
      ProductData?.code === "" &&
      ProductData?.shape === "" &&
      ProductData?.capacity === ""
    ) {
      bool = true;

      setProductDataErr((p) => ({ ...p, size: true }));
      DifferentiationRef.current.scrollIntoView({ behavior: "smooth" });
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
      
    if (ProductData?.name === "") {
      bool = true;

      setProductDataErr((p) => ({ ...p, name: true }));
      nameRef.current.scrollIntoView({ behavior: "smooth" });
    }
    if (
      ProductDataErr?.category_id === true ||
      ProductDataErr?.sub_category_id === true ||
      ProductDataErr?.size === true ||
      ProductDataErr?.min_order_qty === true ||
      ProductDataErr?.unit_id === true ||
      ProductDataErr?.for_advance_payment === true ||
      ProductDataErr?.hsn_code === true ||
      ProductDataErr?.gst_rate === true ||
      ProductDataErr?.delivery_outside_state === true ||
      ProductDataErr?.delivery_within_state === true ||
      ProductDataErr?.description === true ||
      ProductDataErr?.name === true ||
      ProductDataErr?.template === true 
    ) {
      setLoading(false);
      bool = true;
      return false;
    }

    if (bool === true) {
      return false;
    }

    setLoading(true);
    const formdata = new FormData();
    if (ProductData?.brand_id === "other") {
      const BrandFromData = new FormData();
      BrandFromData.append("sub_category_id", ProductData?.sub_category_id);
      BrandFromData.append("name", ProductData?.otherBrandName);

      const url = "/product/brand/create";
      const response = await postwithOu(url, getAuthConfig(), BrandFromData)
        .then((res) => {
          if (res.status === 200) {
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

    formdata.append("type", "post_to_sell");

    formdata.append("category_id", ProductData?.category_id);
    formdata.append("sub_category_id", ProductData?.sub_category_id);
    formdata.append("size", ProductData?.size);
    formdata.append("post_template_id", ProductData?.template)
    if(ProductData?.color_id != undefined)
    {
      formdata.append("color_id", ProductData?.color_id);
    }
    formdata.append("material_type", ProductData?.material_type);
    formdata.append("code", ProductData?.code);
    formdata.append("shape", ProductData?.shape);
    formdata.append("storage_capacity", ProductData?.capacity);
    formdata.append("order_qty", ProductData?.min_order_qty);
    formdata.append("attachment", ProductData?.certificate);
    formdata.append("unit_id", ProductData?.unit_id);
    formdata.append("amount", ProductData?.for_advance_payment);
    formdata.append("credit_amount", ProductData?.for_credit_payment);
    formdata.append("hsn_code", ProductData?.hsn_code);
    formdata.append("gst_rate", ProductData?.gst_rate);
    formdata.append(
      "delivery_within_state",
      ProductData?.delivery_within_state
    );
    formdata.append(
      "delivery_outside_state",
      ProductData?.delivery_outside_state
    );
    formdata.append(
      "negotiation",
      ProductData?.negotiation
    );
    formdata.append(
      "min_order_value",
      ProductData?.min_order_value
    );
    formdata.append(
      "freight_charges",
      ProductData?.freight_charges
    );
    formdata.append(
      "description",
      ProductData?.description
    );
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

  return (
    <>
      <Header home />
      <div className="page">
        <div className="container-fluid">
          <div className="create-post" ref={imagesRef}>
            <div className="page-heading">
              <h6>Create Post For Sell</h6>
            </div>
            <form>
              <div className="field-set">
                <div className="field-set-label">
                  <label>Upload Product Images</label>
                  <span className="info">
                    Min-1 and Max 5
                    <span className="tooltip-icon">
                      <OverlayTrigger
                        key="mobile-tip"
                        placement="top"
                        overlay={
                          <Tooltip id="tooltip-mobile-tip">
                            Min-1 and Max 5
                          </Tooltip>
                        }
                      >
                        <InfoIcon />
                      </OverlayTrigger>
                    </span>
                  </span>
                </div>
                {/* <div className='row'>
                <div class="col-sm-2">
                  <div className='form-field'>
                  <div className='file-upload upload-prod-image'>
                    <input type='file' id='upload_prod_img1' />
                    <label htmlFor='upload_prod_img1'>
                      <img src={ProductImagePlaceholder} />
                      <button className='cancel-button'><img src={Cancel} /></button>
                      <div className='image-type'>Front</div>
                    </label>
                  </div> 
                  </div>
                </div>
                <div class="col-sm-2">
                  <div className='form-field'>
                  <div className='file-upload upload-prod-image'>
                    <input type='file' id='upload_prod_img1' />
                    <label htmlFor='upload_prod_img1'>
                      <img src={ProductImagePlaceholder} />
                      <div className='image-type'>Back</div>
                    </label>
                  </div> 
                  </div>
                </div>
                <div class="col-sm-2">
                  <div className='form-field'>
                  <div className='file-upload upload-prod-image'>
                    <input type='file' id='upload_prod_img1' />
                    <label htmlFor='upload_prod_img1'>
                      <img src={ProductImagePlaceholder} />
                      <div className='image-type'>Upper</div>
                    </label>
                  </div> 
                  </div>
                </div>
                <div class="col-sm-2">
                  <div className='form-field'>
                  <div className='file-upload upload-prod-image'>
                    <input type='file' id='upload_prod_img1' />
                    <label htmlFor='upload_prod_img1'>
                      <img src={ProductImagePlaceholder} />
                      <div className='image-type'>Lower</div>
                    </label>
                  </div> 
                  </div>
                </div>
                <div class="col-sm-2">
                  <div className='form-field'>
                  <div className='file-upload upload-prod-image'>
                    <input type='file' id='upload_prod_img1' />
                    <label htmlFor='upload_prod_img1'>
                      <img src={ProductImagePlaceholder} />
                      <div className='image-type'>Right Side</div>
                    </label>
                  </div> 
                  </div>
                </div>
                <div class="col-sm-2">
                  <div className='form-field'>
                  <div className='file-upload upload-prod-image'>
                    <input type='file' id='upload_prod_img1' />
                    <label htmlFor='upload_prod_img1'>
                      <img src={ProductImagePlaceholder} />
                      <div className='image-type'>Left</div>
                    </label>
                  </div> 
                  </div>
                </div>
                </div> */}
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
              <div className="field-set" ref={categoryRef}>
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
                <div className="row">
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
                      )}{" "}
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
                      )}{" "}
                    </div>
                  </div>
                </div>
              </div>

              <div className="field-set">
                <div className="field-set-label" ref={DifferentiationRef}>
                  <label>
                    Product Differentiation<span className="mendatory">*</span>
                  </label>
                  <span className="info">
                    Any one must be filled. and All or Multiple can be filled
                    <span className="tooltip-icon">
                      <OverlayTrigger
                        key="mobile-tip"
                        placement="top"
                        overlay={
                          <Tooltip id="tooltip-mobile-tip">
                            Any one must be filled. and All or Multiple can be
                            filled
                          </Tooltip>
                        }
                      >
                        <InfoIcon />
                      </OverlayTrigger>
                    </span>
                  </span>
                </div>
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
                          setProductDataErr({ ...ProductDataErr, size: false });
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
                      ></Select>
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

                          setProductDataErr({ ...ProductDataErr, size: false });
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
                      ></Select>
                    </div>
                  </div>
                </div>
                {ProductData?.brand_id === "other" ? (
                  <div className="row">
                    <div className="col-sm"></div>
                    <div className="col-sm"></div>
                    <div className="col-sm-6">
                      <div className="form-field">
                        <label className="form-label">Enter Brand Name </label>
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
                          setProductDataErr({ ...ProductDataErr, size: false });
                        }}
                      />
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
                          setProductDataErr({ ...ProductDataErr, size: false });
                        }}
                      />{" "}
                    </div>
                  </div>
                  <div class="col-sm">
                    <div className="form-field">
                      <label className="form-label">Storage Capacity</label>
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
                          setProductDataErr({ ...ProductDataErr, size: false });
                        }}
                      />
                    </div>
                  </div>
                </div>

                {ProductDataErr?.size === true ? (
                  <FieldValidationError message="Please enter atleast one field to complete " />
                ) : (
                  ""
                )}
              </div>

              <div className="field-set">
                <div className="field-set-label" ref={OtherRef}>
                  <label>Other Details</label>
                </div>
                <div className="row">
                  <div class="col-sm">
                    <div className="form-field">
                      <label className="form-label">
                        Minimum Order Qty<span className="mendatory">*</span>
                      </label>

                      <input
                        type="number"
                        value={ProductData?.min_order_qty}
                        name="orde_qty"
                        id="orde_qty"
                        className="form-input"
                        placeholder="Enter Value"
                        onChange={(e) => {
                          setProductData({
                            ...ProductData,
                            min_order_qty: e.target.value
                          });

                          setProductDataErr({
                            ...ProductDataErr,
                            min_order_qty: false
                          });
                        }}
                      />
                      {ProductDataErr?.min_order_qty === true ? (
                        <FieldValidationError message="Please enter minimum order quantity " />
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div class="col-sm">
                    <div className="form-field">
                      <label className="form-label">
                        Please select Unit<span className="mendatory">*</span>
                      </label>

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

                      {ProductDataErr?.unit_id === true ? (
                        <FieldValidationError message="Please select unit" />
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div class="col-sm">
                    <div className="form-field">
                      <label className="form-label">Certificate if Any</label>
                      <div className="file-upload">
                        <input
                          type="file"
                          id="upload_certificate"
                          accept="image/png,image/gif,image/jpeg,image/jpg,application/pdf,application/msword"
                          onChange={(e) => {
                            if (
                              !(
                                e.target.files[0].type === "image/png" ||
                                e.target.files[0].type === "image/jpg" ||
                                e.target.files[0].type === "image/jpeg" ||
                                e.target.files[0].type === "image/gif" ||
                                e.target.files[0].type === "application/pdf" ||
                                e.target.files[0].type ===
                                  "application/msword" ||
                                e.target.files[0].type ===
                                  "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                              )
                            ) {
                              alert("Only images,pdf,doc,docx allowded");
                              return false;
                            }
                            if (e.target.files[0].size > 2097152) {
                              alert("Not More than 2 MB is allowded");
                              return false;
                            }
                            setProductData({
                              ...ProductData,
                              certificate: e.target.files[0]
                            });
                          }}
                        />
                        <label htmlFor="upload_certificate">
                          {ProductData?.certificate?.name
                            ? ProductData?.certificate?.name
                            : "Browse"}
                          <span className="icon">
                            <AttachmentIcon />
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="field-set">
                <div className="field-set-label" ref={PricingRef}>
                  <label>
                    Pricing<span className="mendatory">*</span>
                  </label>
                  <span className="info">
                    Any one must be filled
                    <span className="tooltip-icon">
                      <OverlayTrigger
                        key="mobile-tip"
                        placement="top"
                        overlay={
                          <Tooltip id="tooltip-mobile-tip">
                            Any one must be filled
                          </Tooltip>
                        }
                      >
                        <InfoIcon />
                      </OverlayTrigger>
                    </span>
                  </span>
                </div>
                <div className="row">
                  <div class="col-sm">
                    <div className="form-field">
                      <label className="form-label">
                        Pricing For Advanced Payment
                      </label>

                      <input
                        type="number"
                        value={ProductData?.for_advance_payment}
                        name="advance_payment"
                        id="advance_payment"
                        className="form-input"
                        placeholder="Enter Your Pricing for advanced payement"
                        onChange={(e) => {
                          setProductData({
                            ...ProductData,
                            for_advance_payment: e.target.value
                          });
                          setProductDataErr({
                            ...ProductDataErr,
                            for_advance_payment: false
                          });
                        }}
                      />
                    </div>
                  </div>
                  <div class="col-sm">
                    <div className="form-field">
                      <label className="form-label">
                        Price for Credit Payment
                      </label>
                      <input
                        type="number"
                        value={ProductData?.for_credit_payment}
                        name="credit_payment"
                        id="credit_payment"
                        className="form-input"
                        placeholder="Enter Your Price for credit payment"
                        onChange={(e) => {
                          setProductData({
                            ...ProductData,
                            for_credit_payment: e.target.value
                          });
                          setProductDataErr({
                            ...ProductDataErr,
                            for_advance_payment: false
                          });
                        }}
                      />
                    </div>
                  </div>
                </div>

                {ProductDataErr?.for_advance_payment === true ? (
                  <FieldValidationError message="Please add data in the atleast one field" />
                ) : (
                  ""
                )}
              </div>

              <div className="field-set">
                <div className="field-set-label" ref={TaxRef}>
                  <label>
                    Tax Details<span className="mendatory">*</span>
                  </label>
                  <span className="info">
                    Both must be filled
                    <span className="tooltip-icon">
                      <OverlayTrigger
                        key="mobile-tip"
                        placement="top"
                        overlay={
                          <Tooltip id="tooltip-mobile-tip">
                            Both must be filled
                          </Tooltip>
                        }
                      >
                        <InfoIcon />
                      </OverlayTrigger>
                    </span>
                  </span>
                </div>
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

                          setProductDataErr({
                            ...ProductDataErr,
                            hsn_code: false
                          });
                        }}
                      />
                      {ProductDataErr?.hsn_code === true ? (
                        <FieldValidationError message="Please enter valid HSN code" />
                      ) : (
                        ""
                      )}
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
                          if (!(e.target.value >= 0 && e.target.value <= 100)) {
                            return false;
                          }
                          setProductData({
                            ...ProductData,
                            gst_rate: e.target.value
                          });
                          setProductDataErr({
                            ...ProductDataErr,
                            gst_rate: false
                          });
                        }}
                      />
                      {ProductDataErr?.gst_rate === true ? (
                        <FieldValidationError message="Please enter valid GST rate" />
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="field-set">
                <div className="field-set-label" ref={DeliveryRef}>
                  <label>Delivery Time</label>
                </div>
                <div className="row">
                  <div class="col-sm">
                    <div className="form-field">
                      <label className="form-label">
                        Delivery Within State
                      </label>

                      <input
                        type="text"
                        value={ProductData?.delivery_within_state}
                        name="within_state"
                        id="within_state"
                        className="form-input"
                        placeholder="Enter Your Delivery Within State Time"
                        onChange={(e) => {
                          setProductData({
                            ...ProductData,
                            delivery_within_state: e.target.value
                          });
                          setProductDataErr({
                            ...ProductDataErr,
                            delivery_within_state: false
                          });
                        }}
                      />
                      {ProductDataErr?.delivery_within_state === true ? (
                        <FieldValidationError message="Please enter delivery time within state " />
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div class="col-sm">
                    <div className="form-field">
                      <label className="form-label">
                        Delivery Outside State
                      </label>
                      <input
                        type="text"
                        value={ProductData?.delivery_outside_state}
                        name="outside_state"
                        id="outside_state"
                        className="form-input"
                        placeholder="Enter Your Delivery Outside Time"
                        onChange={(e) => {
                          setProductData({
                            ...ProductData,
                            delivery_outside_state: e.target.value
                          });
                          setProductDataErr({
                            ...ProductDataErr,
                            delivery_outside_state: false
                          });
                        }}
                      />
                      {ProductDataErr?.delivery_outside_state === true ? (
                        <FieldValidationError message="Please enter delivery time outside state " />
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="field-set">
                <div className="field-set-label" ref={descriptionRef}>
                  <label>Other Description</label>
                </div>
                <div className="row">
                  <div class="col-sm">
                    <div className="form-field">
                      <label className="form-label">Description</label>
                      <Editor
                        apiKey="5ti6dhxcp0v40nnj6xwi874c19ixiq2qtqucc2zlvfxxxs8j"
                        value={ProductData?.description}
                        init={{
                          height: 200,
                          menubar: false
                        }}
                        onEditorChange={(content, editor) => {
                          if (content.length > 255) {
                            alert("character limit 255");
                            return false;
                          }

                          setProductDataErr((p) => ({
                            ...p,
                            descriptionlen: true
                          }));

                          setProductData({
                            ...ProductData,
                            description: content
                          });

                          setProductDataErr((p) => ({
                            ...p,
                            description: false
                          }));
                        }}
                      />

                      {/* <textarea
                        style={{ backgroundColor: "#00000000", color: "black" }}
                        value={ProductData?.description}
                        name="description"
                        id="description"
                        className="form-control"
                        onChange={(e) => {
                          setProductData({
                            ...ProductData,
                            description: e.target.value,
                          });
                          setProductDataErr({
                            ...ProductDataErr,
                            description: false,
                          });
                        }}
                        rows={6}
                        cols={100}
                      /> */}
                      {ProductDataErr?.description === true ? (
                        <FieldValidationError message="Please enter description of the product " />
                      ) : (
                        ""
                      )}
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
              <div className="row protfolio-boxes">
                <div class="col-sm">
                  <div className="chips chips--white">
                    <div className="chips--text">Minimum Order Value</div>
                    <div className="chips--value">
                      {ProductData?.min_order_value} INR
                    </div>
                    <button
                      className="button-edit"
                      data-toggle="modal"
                      data-target="#MinimumOrderModal"
                      onClick={(e) => {
                        e.preventDefault();
                        GetCompanydDetails();
                      }}
                    >
                      <EditIcon />
                    </button>
                  </div>
                </div>
                <div class="col-sm">
                  <div className="chips chips--white">
                    <div className="chips--text">Freight Charges</div>
                    <div className="chips--value">
                      {ProductData?.freight_charges}%
                    </div>
                    <button
                      className="button-edit"
                      data-toggle="modal"
                      data-target="#FreightChargesModal"
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                    >
                      <EditIcon />
                    </button>
                  </div>
                </div>
                <div
                  class="col-sm"
                  data-toggle="modal"
                  data-target="#CreditPolicyModal"
                  onClick={(e) => {
                    e.preventDefault();
                    GetCompanydDetails();
                  }}
                >
                  <div className="chips chips--white">
                    <div className="chips--text">
                      Credit Policy
                      <CompleteIcon className="complete" />
                    </div>
                    <div className="chips--value">
                      <span className="text-small">
                        <InfoIcon />
                        Info
                      </span>
                    </div>
                    {/* <button className='button-edit'><EditIcon /></button> */}
                  </div>
                </div>
                <div class="col-sm">
                  <div className="chips chips--white">
                    <div className="chips--text">Negotiation</div>
                    <div className="chips--value">
                      <div className="switch-box switch-box--withLabel switch-box--small">
                        <input
                          type="checkbox"
                          id="negotiation_switch"
                          checked={ProductData?.negotiation == 1 ? true : false}
                          onChange={(e) => {
                            if (ProductData?.negotiation === 0) {
                              setProductData((p) => ({ ...p, negotiation: 1 }));
                            }
                            if (ProductData?.negotiation === 1) {
                              setProductData((p) => ({ ...p, negotiation: 0 }));
                            }
                          }}
                        />
                        <label htmlFor="negotiation_switch">
                          <span className="switch-icon off">OFF</span>
                          <span className="switch-icon on">ON</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-sm">
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
              <div className="form-button">
                <button
                  className="button button-primary"
                  onClick={(e) => {
                    handleProductCreate(e);
                  }}
                >
                  {Loading === true ? <PuffLoader /> : "Submit and Post"}
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

      <div
        className="modal fade credit-policy-modal"
        id="CreditPolicyModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="CreditPolicyModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Credit Policy Data
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">
                  <Close2Icon />
                </span>
              </button>
            </div>
            <div className="modal-body">
              <div className="policy-info">
                <form>
                  <div className="info-box row justify-content-start">
                    <div className="info-item col-lg-6 col-md-6 col-sm-12 col-12">
                      <label>Nos of Advance Transactions for Credit</label>

                      <span>
                        {PortfolioData?.credit_policy?.advance_transaction}
                      </span>
                    </div>
                    <div className="info-item  col-lg-6 col-md-6 col-sm-12 col-12 ">
                      <label>Credit Period (Days)</label>

                      <span className="info-days">
                        {PortfolioData?.credit_policy?.credit_period}
                      </span>
                    </div>
                    <div className="info-item col-lg-6 col-md-6 col-sm-12 col-12">
                      <label>Interest Rate</label>

                      <span className="info-per">
                        {PortfolioData?.credit_policy?.delay_interest}
                      </span>
                    </div>
                    <div className="info-item col-lg-6 col-md-6 col-sm-12 col-12">
                      <label>Credit Period Starts from</label>

                      <span className="info-item">
                        {PortfolioData?.credit_policy?.credit_period_start}
                      </span>
                    </div>
                    <div className="info-item col-lg-6 col-md-6 col-sm-12 col-12">
                      <label>Interest Period</label>

                      <span contenteditable="true">
                        {PortfolioData?.credit_policy?.interest_period}
                      </span>
                    </div>
                    <div className="info-item col-lg-6 col-md-6 col-sm-12 col-12">
                      <label>Other Terms</label>

                      <span contenteditable="true">
                        {PortfolioData?.credit_policy?.other_terms}
                      </span>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade modal-small"
        id="MinimumOrderModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="MinimumOrderModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Minimum Order Value
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">
                  <Close2Icon />
                </span>
              </button>
            </div>
            <div className="modal-body">
              <div className="form-field">
                <label className="form-label">Enter Minimum Amount</label>
                <input
                  type="number"
                  name="minOrder"
                  className="form-input"
                  placeholder="Enter Amount"
                  value={ProductData?.min_order_value}
                  onChange={(e) => {
                    setProductData((p) => ({
                      ...p,
                      min_order_value: e.target.value
                    }));
                    setProductDataErr((p) => ({
                      ...p,
                      min_order_value: false
                    }));
                  }}
                />
                {ProductDataErr?.min_order_value === true ? (
                  <FieldValidationError message="Please Enter Valid Minimum order value " />
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="button button-primary"
                onClick={(e) => {
                  e.preventDefault();
                }}
                data-dismiss="modal"
                aria-label="Close"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade modal-small"
        id="FreightChargesModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="FreightChargesModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Freight Charges
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">
                  <Close2Icon />
                </span>
              </button>
            </div>
            <div className="modal-body">
              <div className="form-field">
                <label className="form-label">Enter Freight Charges</label>
                <div className="row">
                  <div className="col-sm">
                    <input
                      type="number"
                      name="minOrder"
                      value={ProductData?.freight_charges}
                      className="form-input"
                      placeholder="Enter Freight Charges in Percentage "
                      onChange={(e) => {
                        if (!(e.target.value >= 0 && e.target.value <= 100)) {
                          return false;
                        }
                        setProductData({
                          ...ProductData,
                          freight_charges: e.target.value
                        });
                      }}
                    />
                    {ProductDataErr?.freight_charges === true ? (
                      <FieldValidationError message="Please Enter Valid Freight Charges" />
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="col-sm-3">
                    <select className="form-input">
                      <option>%</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="button button-primary"
                data-dismiss="modal"
                aria-label="Close"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreatePostToSell;
