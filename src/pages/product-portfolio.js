import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Header from "../common/header";
import "../common/scss/pages/product-protfolio.scss";
import ProductImage from "../assets/images/product-image1.png";
import { ReactComponent as AttachmentIcon } from "../assets/images/attachment.svg";
import { ReactComponent as InfoIcon } from "../assets/images/info.svg";
import { Link, useLocation } from "react-router-dom";
import { get, getAuthConfig } from "../libs/http-hydrate";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { ReactComponent as Close2Icon } from "../assets/images/close2-icon.svg";
import { UseEffectOnce } from "../Hook/UseEffectOnce";
function ProductPortfolio() {
  const [nav1, setNav1] = useState();
  const [nav2, setNav2] = useState();
  const slider1 = useRef(null);
  const slider2 = useRef(null);

  const location = useLocation();
  const [ProductDetail, setProductDetail] = useState({ test: "" });
  const [PortfolioData, setPortfolioData] = useState({ credit_policy: "" });
  const [show, setShow] = useState(false);
  const [images, setImages] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    setNav1(slider1.current);
    setNav2(slider2.current);
  }, [images]);
  UseEffectOnce(() => {
    get(`/product/detail/${location.state.id}`, getAuthConfig())
      .then((response) => {
        setProductDetail((p) => ({ ...p, test: response.data.data.product }));

        response.data.data.product.media.map((itemt, indext) => {
          if (itemt.type == "attachment") {
            return false;
          } else {
            setImages((arr) => [...arr, itemt]);
          }
        });
      })
      .catch((e) => {
        alert("this is the errror", e);
      });
    GetCompanydDetails();
  }, []);
  const settingsMain = {
    dots: false,
    arrows: true,
    infinite: false,
    autoplay: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    lazyLoad: "on-demand",
  };
  const settingsThumbs = {
    dots: false,
    arrows: false,
    infinite: false,
    autoplay: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 3,
        },
      },
    ],
  };
  let [num, setNum] = useState(0);
  const [DisableCredit, setDisableCredit] = useState(false);
  const [DisableAdvance, setDisableAdvance] = useState(false);

  let incNum = () => {
    if (num < 10) {
      setNum(Number(num) + 1);
    }
    setDisableCredit(true);
  };
  let decNum = () => {
    if (num >= 0) {
      if (num == 1) {
        setNum(num - 1);
        setDisableCredit(false);
      } else if (num == 0) {
        setDisableCredit(false);
      } else {
        setNum(num - 1);
        setDisableCredit(true);
      }
    }
  };
  let handleChange = (e) => {
    setNum(e.target.value);
    if (num == 0) {
      setDisableCredit(false);
    } else {
      setDisableCredit(true);
    }
  };
  let [num2, setNum2] = useState(0);
  let incNum2 = () => {
    if (num2 < 10) {
      setNum2(Number(num2) + 1);
    }
    setDisableAdvance(true);
  };
  let decNum2 = () => {
    if (num2 >= 0) {
      if (num2 == 1) {
        setNum2(num2 - 1);
        setDisableAdvance(false);
      } else if (num2 === 0) {
        setDisableAdvance(false);
      } else {
        setNum2(num2 - 1);
        setDisableAdvance(true);
      }
    }
  };
  let handleChange2 = (e) => {
    setNum2(e.target.value);
    if (num2 == 0) {
      setDisableAdvance(false);
    } else {
      setDisableAdvance(true);
    }
  };
  function openInNewTab() {
    let Url = null;
    ProductDetail?.test?.media.map((item) => {
      if (item.type === "attachment") {
        Url = item.file;
      }
    });

    window.open(Url, "_blank", "noopener,noreferrer");
  }

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
  const [SoValue, setSoValue] = useState(0);
  console.log(images);
  return (
    <>
      <Header home />
      <div className="page">
        <div className="container-fluid">
          <div className="content-main">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb" style={{ overflow: "hidden" }}>
                <li className="breadcrumb-item">
                  <Link to="/product-portfolio-initial">Product Portfolio</Link>
                </li>
                <li className="breadcrumb-item">
                  <a href="#">{ProductDetail?.test?.category?.parent?.name}</a>
                </li>
                <li className="breadcrumb-item">
                  <a href="#">{ProductDetail?.test?.category?.name}</a>
                </li>
                <li className="breadcrumb-item">
                  <a href="#">{ProductDetail?.test?.name}</a>
                </li>
              </ol>
            </nav>

            <div className="row productView">
              <div className="col-sm-4 productView-image">
                <div className="product">
                  <div className="product-image">
                    <div className="main-image">
                      {images.length > 0 && (
                        <Slider
                          asNavFor={nav2}
                          ref={slider1}
                          arrows={true}
                          {...settingsMain}
                        >
                          {images.length > 0 &&
                            images.map((itemt, indext) => {
                              return (
                                <>
                                  <div className="image-block">
                                    <img src={itemt?.file} alt="" />
                                  </div>
                                </>
                              );
                            })}
                        </Slider>
                      )}
                    </div>

                    <div className="product-thumb">
                      <Slider
                        asNavFor={nav1}
                        ref={slider2}
                        swipeToSlide={true}
                        focusOnSelect={true}
                        {...settingsThumbs}
                      >
                        {images.length > 0 &&
                          images.map((itemt, indext) => {
                            return (
                              <>
                                <div className="image-block">
                                  <img src={itemt?.file} alt="" />
                                </div>
                              </>
                            );
                          })}
                      </Slider>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-8 productView-detail">
                <h1 className="product-title">{ProductDetail?.test?.name}</h1>
                <div className="productView-price">
                  <ul>
                    <li>
                      Min Order Value:{" "}
                      <strong>{ProductDetail?.test?.min_order_value}/-</strong>
                    </li>
                    <li>
                      MOQ: <strong>{ProductDetail?.test?.order_qty} pc</strong>
                    </li>
                  </ul>
                </div>
                <h6
                  dangerouslySetInnerHTML={{
                    __html: ProductDetail?.test?.description,
                  }}
                ></h6>
                <dl>
                  <dt>{ProductDetail?.test?.name} item code:</dt>
                  <dd>
                    {ProductDetail?.test?.product_code
                      ? ProductDetail?.test?.product_code
                      : "N/A"}
                  </dd>

                  <dt>Product Differentiation :</dt>
                  <dd>
                    {ProductDetail?.test?.size ? (
                      <>
                        <dt> Size :</dt>
                        <dd>{ProductDetail?.test?.size}</dd>
                      </>
                    ) : (
                      ""
                    )}
                  </dd>

                  <dd>
                    {ProductDetail?.test?.color_id ? (
                      <>
                        <dt> , Color : </dt>
                        <dd>{ProductDetail?.test?.color?.name}</dd>
                      </>
                    ) : (
                      ""
                    )}
                  </dd>

                  <dd>
                    {ProductDetail?.test?.material_type ? (
                      <>
                        <dt> , Material type : </dt>
                        <dd>{ProductDetail?.test?.material_type}</dd>
                      </>
                    ) : (
                      ""
                    )}
                  </dd>

                  <dd>
                    {ProductDetail?.test?.brand_id ? (
                      <>
                        <dt> , Brand : </dt>
                        <dd>{ProductDetail?.test?.brand?.name}</dd>
                      </>
                    ) : (
                      ""
                    )}
                  </dd>

                  <dd>
                    {ProductDetail?.test?.shape ? (
                      <>
                        <dt> , Shape : </dt>
                        <dd>{ProductDetail?.test?.shape}</dd>
                      </>
                    ) : (
                      ""
                    )}
                  </dd>

                  <dd>
                    {ProductDetail?.test?.storage_capacity ? (
                      <>
                        <dt> , Capacity : </dt>
                        <dd>{ProductDetail?.test?.storage_capacity}</dd>
                      </>
                    ) : (
                      ""
                    )}
                  </dd>
                </dl>

                <dl>
                  <dt>Delivery Time :</dt>

                  {ProductDetail?.test?.delivery_details
                    ?.delivery_outside_state ? (
                    <dd>
                      <dt>Delivery Outside State : </dt>
                      <dd>
                        {" "}
                        {
                          ProductDetail?.test?.delivery_details
                            ?.delivery_outside_state
                        }{" "}
                      </dd>
                    </dd>
                  ) : (
                    ""
                  )}

                  {ProductDetail?.test?.delivery_details
                    ?.delivery_outside_state ? (
                    <dd>
                      <dt>&nbsp; Delivery Within State : </dt>
                      <dd>
                        {" "}
                        {
                          ProductDetail?.test?.delivery_details
                            ?.delivery_within_state
                        }
                      </dd>
                    </dd>
                  ) : (
                    ""
                  )}
                </dl>
                <p>&nbsp;</p>
                <div className="product-certification">
                  <h6>Product Certificates</h6>
                  <a onClick={() => openInNewTab()}>
                    <AttachmentIcon />
                    View Certificates
                  </a>
                </div>
                <div className="credit-policy">
                  <div className="row">
                    <div
                      className="col-sm-6"
                      style={{ opacity: DisableAdvance === true ? "30%" : "" }}
                      onClick={(e) => {
                        e.preventDefault();
                        if (DisableAdvance === true) {
                          return false;
                        }
                      }}
                    >
                      <div className="credit-policy-box">
                        <div className="counter">
                          <div className="counter-text">
                            Advance
                            <span>
                              ₹{" "}
                              {ProductDetail?.test?.amount
                                ? ProductDetail?.test?.amount
                                : "N/A"}{" "}
                            </span>
                          </div>
                          <div class="input-group increment">
                            <div class="input-group-prepend">
                              <button
                                class="btn btn-outline-primary"
                                type="button"
                                // onClick={decNum}
                                onClick={(e) => {
                                  e.preventDefault();
                                  if (DisableAdvance === true) {
                                    return false;
                                  } else {
                                    decNum();
                                  }
                                }}
                                disabled={
                                  ProductDetail?.test?.amount === null
                                    ? true
                                    : false
                                }
                              >
                                -
                              </button>
                            </div>
                            <input
                              type="text"
                              class="form-control"
                              value={num}
                              onChange={handleChange}
                              disabled={
                                DisableAdvance === true ||
                                ProductDetail?.test?.amount === null
                                  ? true
                                  : false
                              }
                            />
                            <div class="input-group-prepend">
                              <button
                                class="btn btn-outline-primary"
                                type="button"
                                disabled={
                                  ProductDetail?.test?.amount === null
                                    ? true
                                    : false
                                }
                                onClick={(e) => {
                                  e.preventDefault();
                                  if (DisableAdvance === true) {
                                    return false;
                                  } else {
                                    incNum();
                                  }
                                }}
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                        <p>
                          {" "}
                          {ProductDetail?.test?.freight_charges}% Freight and{" "}
                          {ProductDetail?.test?.gst_rate}% GST extra
                        </p>
                      </div>
                    </div>
                    <div
                      className="col-sm-6"
                      style={{ opacity: DisableCredit === true ? "30%" : "" }}
                    >
                      <div className="credit-policy-box">
                        <div className="counter">
                          <div className="counter-text">
                            Credit Terms
                            <span>
                              ₹
                              {ProductDetail?.test?.credit_amount
                                ? ProductDetail?.test?.credit_amount
                                : "N/A"}
                            </span>
                          </div>
                          <div class="input-group increment">
                            <div class="input-group-prepend">
                              <button
                                class="btn btn-outline-primary"
                                type="button"
                                disabled={
                                  ProductDetail?.test?.credit_amount === null
                                    ? true
                                    : false
                                }
                                onClick={(e) => {
                                  e.preventDefault();
                                  if (DisableCredit === true) {
                                    return false;
                                  } else {
                                    decNum2();
                                  }
                                }}
                              >
                                -
                              </button>
                            </div>
                            <input
                              type="text"
                              class="form-control"
                              value={num2}
                              onChange={handleChange2}
                              disabled={
                                DisableCredit === true ||
                                ProductDetail?.test?.credit_amount === null
                                  ? true
                                  : false
                              }
                            />
                            <div class="input-group-prepend">
                              <button
                                class="btn btn-outline-primary"
                                type="button"
                                disabled={
                                  ProductDetail?.test?.credit_amount === null
                                    ? true
                                    : false
                                }
                                onClick={(e) => {
                                  e.preventDefault();
                                  if (DisableCredit === true) {
                                    return false;
                                  } else {
                                    incNum2();
                                  }
                                }}
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                        <p>
                          {" "}
                          {ProductDetail?.test?.freight_charges}% Freight and{" "}
                          {ProductDetail?.test?.gst_rate}% GST extra
                        </p>
                      </div>
                    </div>
                  </div>
                  <Link
                    to=""
                    className="credit-policy-link"
                    data-toggle="modal"
                    data-target="#CreditPolicyModal"
                  >
                    <AttachmentIcon />
                    Credit Policy
                  </Link>
                </div>
                <div className="productView-button">
                  <Link to={""} className="button button-primary">
                    Add more in Short Order
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="productView-bottom">
          <div className="container-fluid">
            <ul>
              <li>
                Total SO value:{" "}
                <strong>
                  <span className="heighlight">
                    {DisableAdvance === false && DisableCredit === false
                      ? SoValue
                      : DisableAdvance === true
                      ? ProductDetail?.test?.credit_amount * num2
                      : DisableCredit === true
                      ? ProductDetail?.test?.amount * num
                      : ""}{" "}
                    INR
                  </span>{" "}
                  + Freight & GST
                </strong>
              </li>
              <li>
                Nos. of Qty in SO:{" "}
                <strong>
                  <span className="heighlight">10</span>
                </strong>
              </li>
              <li>
                Nos. of items in SO:{" "}
                <strong>
                  <span className="heighlight">2</span>
                </strong>
              </li>
              <li>
                <Link to={"/product-short-order"}>
                  View Short Order{" "}
                  <strong>
                    <InfoIcon />
                  </strong>
                </Link>
              </li>
              <li>
                Saved Drafts: <strong>2</strong>
              </li>
            </ul>
          </div>
        </div>
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
      </div>
    </>
  );
}

export default ProductPortfolio;
