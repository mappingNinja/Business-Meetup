import React, { useEffect, useRef, useState } from "react";
import Header from "../common/header";
import Breadcrumb from "../common/breadcrumb";
import "../common/scss/pages/product-protfolio.scss";
import { ReactComponent as EditIcon } from "../assets/images/edit-icon2.svg";
import { ReactComponent as NoProduct } from "../assets/images/no-product.svg";
import { ReactComponent as CompleteIcon } from "../assets/images/complete-icon.svg";
import { ReactComponent as InfoIcon } from "../assets/images/info.svg";
import MinimumOrderModal from "./minimum-order-modal";
import FreightChargesModal from "./freight-charges-modal";
import ProductCatalogueModal from "./product-catalogue-modal";
import PriceHideModal from "./price-hide-modal";
import { Link } from "react-router-dom";
import Auth from "../libs/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { get, getAuthConfig, postwithOu } from "../libs/http-hydrate";
import swal from "@sweetalert/with-react";
import ProductPortfolioList from "./product-portfolio-list";
import { PuffLoader } from "react-spinners";
import { UseEffectOnce } from "../Hook/UseEffectOnce";
import FieldValidationError from "../components/error-messages/field-validation-error";
import validator from "validator";

function ProductPortfolioInitial() {
  const { isLength, isMobilePhone, isStrongPassword, isEmail, isNumeric } =
    validator;
  const user = Auth.getCurrentUser();
  const navigate = useNavigate();
  const [Update, setSupdate] = useState(false);
  const [PortfolioData, setPortfolioData] = useState({});
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);
  const [Negotiation, setNegotiation] = useState({
    negotiation: false,
  });
  const [Verfid, setVerfid] = useState({
    gstPay: false,
    gst: false,
    pay: false,
  });
  const [CategoryList, setCategoryList] = useState({
    category: "",
  });

  const [ProductList, setProductList] = useState({});

  const [PortfolioDataCatalog, setPortfolioDataCatalog] = useState({
    catalog: "",
  });
  const [ProfileVerified, setProfileVerified] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [CreditPolicy, setCreditPolicy] = useState({
    advance_transaction: "",
    credit_period: "",
    delay_interest: "",
    advance_transaction: "",
    credit_period_start: "",
    interest_period: "",
  });
  const [NullValidationCred, setNullValidationCred] = useState({
    credit_period: false,
    delay_interest: false,
    advance_transaction: false,
    credit_period_start: false,
    interest_period: false,
  });

  const [ValidationCred, setValidationCred] = useState({
    credit_period: false,
    delay_interest: false,
    advance_transaction: false,
    credit_period_start: false,
  });
  const [EditLoading, setEditLoading] = useState({
    EdCm: false,
    EdPd: false,
    EdCn: false,
    EdCp: false,
  });
  const [showCred, setShowCred] = useState(false);
  const gstRef = useRef();
  const handleCloseCred = () => setShowCred(false);
  const handleShowCred = () => setShowCred(true);

  UseEffectOnce(() => {
    const user = Auth.getCurrentUser();
    if (!user) {
      navigate("/login");
    }
    GetProductPortfolio();
    getProductDetailsList();
    Verify();
  }, []);
  useEffect(() => {
    if (Update === true) {
      GetProductPortfolio();
      getProductDetailsList();
      setSupdate(false);
    }
  }, [Update]);
  function UpdateTrue() {
    setSupdate(true);
  }

  async function GetProductPortfolio() {
    console.log("calling");
    const response = await axios
      .get("https://api.busimeet.com/api/V1/product/portfolio", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
        setPortfolioDataCatalog((p) => ({
          ...p,
          catalog: res.data.data.product.product_catalogue,
        }));

        console.log(res.data.data.category, "res.data.data.category");
        setCategoryList((p) => ({ ...p, category: res.data.data.category }));

        console.log(res.data.data.product);
        if (res?.data?.status === 200) {
          setPortfolioData(res.data.data.product);
          setNegotiation({
            ...Negotiation,
            negotiation: res.data.data.product.negotiation,
          });
          localStorage.setItem(
            "min_order_value",
            res.data.data.product.min_order_value
          );
          localStorage.setItem(
            "freight_charges",
            res.data.data.product.fried_charge
          );
        }
        if (res?.data?.status === 401) {
          navigate("/login");
        }
      });
  }

  async function editPortfolio(e) {
    e.preventDefault();
    const formdata = new FormData();
    if (Negotiation?.negotiation == 0) {
      formdata.append("negotiation", "1");
    } else {
      formdata.append("negotiation", "0");
    }
    const url = "/product/portfolio";
    const res = await postwithOu(url, getAuthConfig(), formdata);
    if (res) {
      GetProductPortfolio();
    }
  }
  async function Verify(Redirect) {
    const data = await get(
      "/user/setting/get_prefilled_details",
      getAuthConfig()
    )
      .then((data) => {
        if (data.status === 200) {
          if (
            data.data.data.company_details.gst_number === null &&
            Object.keys(data.data.data.payment_details).length == 0
          ) {
            setVerfid((p) => ({ ...p, gstPay: true }));
            setShowModal(true);
          } else if (Object.keys(data.data.data.payment_details).length == 0) {
            setVerfid((p) => ({ ...p, pay: true }));

            setShowModal(true);
          } else if (data.data.data.company_details.gst_number === null) {
            setVerfid((p) => ({ ...p, gst: true }));

            setShowModal(true);
          } else {
            setProfileVerified(true);
            if (Redirect) {
              navigate("/create-product-portfolio");
            }
          }
        }
      })
      .catch(() => {
        alert("Something went wrong");
      });
  }

  async function getProductDetailsList() {
    setLoading(true);
    const url = "/product/listing?" + "page=1";
    const data = await get(url, getAuthConfig()).then((res) => {
      if (res.status === 200) {
        console.log(res.data.data);
        setProductList(res.data.data);
        setLoading(false);
      }
    });
  }

  async function CateGoryFilter() {}
  // function UpdateTrue() {
  //   getProductDetailsList()
  // }

  console.log(NullValidationCred);
  async function EditCreditPolicy(e) {
    e.preventDefault();
    if (CreditPolicy?.delay_interest == "") {
      setNullValidationCred({ ...NullValidationCred, delay_interest: true });
      setEditLoading({ ...EditLoading, EdCp: false });
      return false;
    }

    if (CreditPolicy?.credit_period == "") {
      setNullValidationCred({ ...NullValidationCred, credit_period: true });
      setEditLoading({ ...EditLoading, EdCp: false });
      return false;
    }
    if (CreditPolicy?.advance_transaction == "") {
      setNullValidationCred({
        ...NullValidationCred,
        advance_transaction: true,
      });
      setEditLoading({ ...EditLoading, EdCp: false });

      return false;
    }

    if (CreditPolicy?.credit_period_start === "") {
      alert("wq");
      setNullValidationCred({
        ...NullValidationCred,
        credit_period_start: true,
      });
      setEditLoading({ ...EditLoading, EdCp: false });

      return false;
    }

    if (CreditPolicy?.interest_period == "") {
      setNullValidationCred({
        ...NullValidationCred,
        interest_period: true,
      });
      setEditLoading({ ...EditLoading, EdCp: false });
      return false;
    }

    const baseurl = "/user/setting/credit_policy";

    const data = await postwithOu(baseurl, getAuthConfig(), CreditPolicy);
    if (data.status === 200) {
      setEditLoading({ ...EditLoading, EdCp: false });
      handleCloseCred();
      GetProductPortfolio();
    } else {
      setEditLoading({ ...EditLoading, EdCp: false });
      handleCloseCred();
    }
  }
  return (
    <>
      <Header home />
      <div className="page">
        <div className="container-fluid">
          <Breadcrumb props={"List"} />
          <div className="page-heading d-flex align-items-center justify-content-between">
            <h6>Product Portfolio</h6>
          </div>
          <div className="row protfolio-boxes">
            <div class="col-sm">
              <div className="chips chips--white">
                <div className="chips--text">Minimum Order Value</div>
                <div className="chips--value">
                  {PortfolioData?.min_order_value} INR
                </div>
                {ProfileVerified === true ? (
                  <>
                    <button
                      className="button-edit"
                      data-toggle="modal"
                      data-target="#MinimumOrderModal"
                      onClick={() => {
                        Verify();
                      }}
                    >
                      <EditIcon />
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="button-edit"
                      onClick={() => {
                        Verify();
                        // alert(PortfolioData?.min_order_value)
                      }}
                    >
                      <EditIcon />
                    </button>
                  </>
                )}
              </div>
            </div>
            <div class="col-sm">
              <div className="chips chips--white">
                <div className="chips--text">Freight Charges</div>
                <div className="chips--value">
                  {PortfolioData?.fried_charge}%
                </div>

                {ProfileVerified === true ? (
                  <>
                    {" "}
                    <button
                      className="button-edit"
                      data-toggle="modal"
                      data-target="#FreightChargesModal"
                      onClick={() => {
                        Verify();
                      }}
                    >
                      <EditIcon />
                    </button>{" "}
                  </>
                ) : (
                  <>
                    <button
                      className="button-edit"
                      onClick={() => {
                        Verify();
                      }}
                    >
                      <EditIcon />
                    </button>
                  </>
                )}
              </div>
            </div>
            <div class="col-sm">
              <div className="chips chips--white">
                <div className="chips--text">
                  Credit Policy
                  <CompleteIcon className="complete" />
                </div>
                <div className="chips--value">
                  {PortfolioData?.credit_policy ? (
                    <span className="text-small" onClick={setShow}>
                      <InfoIcon />
                      Info
                    </span>
                  ) : (
                    <span className="text-small" onClick={handleShowCred}>
                      <button className="btn btn-sm btn-warning"> Add</button>
                    </span>
                  )}
                </div>
                {/* <button className="button-edit">
                  <EditIcon />
                </button> */}
              </div>
            </div>
            <div class="col-sm">
              <div className="chips chips--white">
                <div className="chips--text">Product Catalogue</div>
                <div className="chips--value">
                  {PortfolioData?.product_catalogue?.length}/2
                </div>

                {ProfileVerified === true ? (
                  <>
                    <button
                      className="button-edit"
                      data-toggle="modal"
                      data-target="#ProductCatalogueModal"
                      onClick={() => {
                        Verify();
                      }}
                    >
                      <EditIcon />
                    </button>
                  </>
                ) : (
                  <>
                    <button className="button-edit" onClick={() => Verify()}>
                      <EditIcon />
                    </button>
                  </>
                )}
              </div>
            </div>

            <div class="col-sm">
              <div className="chips chips--white">
                <div className="chips--text">Negotiation</div>
                <div className="chips--value">
                  <div className="switch-box switch-box--withLabel switch-box--small">
                    {ProfileVerified === true ? (
                      <>
                        {" "}
                        <input
                          type="checkbox"
                          checked={Negotiation?.negotiation == 1 ? true : false}
                          id="negotiation_switch"
                          onChange={(e) => {
                            editPortfolio(e);
                          }}
                        />{" "}
                      </>
                    ) : (
                      <>
                        <input
                          type="checkbox"
                          checked={Negotiation?.negotiation == 1 ? true : false}
                          id="negotiation_switch"
                          onClick={() => {
                            Verify();
                          }}
                        />
                      </>
                    )}

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
                <div className="chips--text">Price Hide From</div>
                <div className="chips--value">
                  <span className="color-red">
                    {PortfolioData?.price_hide_from}
                  </span>{" "}
                  Users
                </div>

                {ProfileVerified === true ? (
                  <>
                    <button
                      className="button-edit"
                      data-toggle="modal"
                      data-target="#PriceHideModal"
                      onClick={() => Verify()}
                    >
                      <EditIcon />
                    </button>
                  </>
                ) : (
                  <>
                    {" "}
                    <button className="button-edit" onClick={() => Verify()}>
                      <EditIcon />
                    </button>
                  </>
                )}
              </div>
            </div>
            <div class="col-sm">
              {ProductList?.list?.length === 0 ? (
                ""
              ) : (
                <Button
                  className="button button-primary"
                  onClick={(e) => {
                    e.preventDefault();
                    Verify(true);
                  }}
                >
                  + Add Product
                </Button>
              )}
            </div>
          </div>

          {Loading === true ? (
            <div
              className="align-items-center "
              style={{ "margin-left": "40%" }}
            >
              {" "}
              <PuffLoader size={150} />{" "}
            </div>
          ) : ProductList?.list?.length === 0 ? (
            <>
              <div className="create-order-placeholder">
                <div className="placeholder-image">
                  <NoProduct />
                  <div className="placeholder-label">No Product Available</div>
                </div>
                <div className="placeholder-button">
                  <Button
                    className="button button-primary"
                    onClick={(e) => {
                      e.preventDefault();
                      Verify(true);
                    }}
                  >
                    + Create Product Portfolio
                  </Button>
                </div>
              </div>
            </>
          ) : ProductList?.list?.length >= 1 ? (
            <ProductPortfolioList
              UpdateTrue={UpdateTrue}
              CategoryList={CategoryList}
              setCategoryList={setCategoryList}
            />
          ) : (
            ""
          )}
        </div>
      </div>
      <MinimumOrderModal UpdateTrue={UpdateTrue} />
      <FreightChargesModal UpdateTrue={UpdateTrue} />
      <ProductCatalogueModal
        UpdateTrue={UpdateTrue}
        setPortfolioDataCatalog={setPortfolioDataCatalog}
        PortfolioDataCatalog={PortfolioDataCatalog}
      />
      <PriceHideModal />

      <Modal show={show} onHide={handleClose}>
        <Modal.Header
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Modal.Title>
            <h3>Credit Policy Data</h3>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="policy-info">
            <form>
              <div className="info-box row justify-content-center">
                <div className="col-lg-1"></div>
                <div className="info-item col-lg-4 col-md-6 col-sm-12 col-12">
                  <label>Nos of Advance Transactions for Credit</label>

                  <span>
                    {PortfolioData?.credit_policy?.advance_transaction}
                  </span>
                </div>
                <div className="col-lg-3"></div>
                <div className="info-item  col-lg-4 col-md-6 col-sm-12 col-12 ">
                  <label>Credit Period (Days)</label>

                  <span className="info-days">
                    {PortfolioData?.credit_policy?.credit_period}
                  </span>
                </div>

                <div className="col-lg-1"></div>

                <div className="info-item col-lg-4 col-md-6 col-sm-12 col-12">
                  <label>Interest Rate</label>

                  <span className="info-per">
                    {PortfolioData?.credit_policy?.delay_interest}
                  </span>
                </div>
                <div className="col-lg-3"></div>
                <div className="info-item col-lg-4 col-md-6 col-sm-12 col-12">
                  <label>Credit Period Starts from</label>

                  <span className="info-item">
                    {PortfolioData?.credit_policy?.credit_period_start}
                  </span>
                </div>
                <div className="col-lg-1"></div>
                <div className="info-item col-lg-4 col-md-6 col-sm-12 col-12">
                  <label>Interest Period</label>

                  <span>{PortfolioData?.credit_policy?.interest_period}</span>
                </div>
                <div className="col-lg-3"></div>

                <div className="info-item  col-lg-4 col-md-6 col-sm-12 col-12">
                  <label>Other Terms</label>

                  <span>{PortfolioData?.credit_policy?.other_terms}</span>
                </div>
              </div>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal size="lg" show={showCred} onHide={handleCloseCred}>
        <Modal.Header>
          <Modal.Title className="text-center">
            Add Credit Policy Details{" "}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="flex-box">
            <div className="flex-item">
              <div className="form-field">
                <label className="form-label">
                  Nos of Advance Transactions for Credit
                </label>
                <input
                  required
                  type="number"
                  name="cname"
                  min="1"
                  id="cname"
                  className="form-input"
                  placeholder="Enter Advance Transactions for Credit"
                  value={CreditPolicy?.advance_transaction}
                  onChange={(e) => {
                    setCreditPolicy({
                      ...CreditPolicy,
                      advance_transaction: e.target.value,
                    });

                    setNullValidationCred({
                      ...NullValidationCred,
                      advance_transaction: false,
                    });
                    setValidationCred({
                      ...ValidationCred,
                      advance_transaction: false,
                    });
                  }}
                />

                {NullValidationCred?.advance_transaction === true ? (
                  <FieldValidationError message="Advance Transaction must required" />
                ) : (
                  ""
                )}

                {ValidationCred?.advance_transaction === true ? (
                  <FieldValidationError message="Advance Transaction must be Number" />
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="flex-item">
              <div className="form-field">
                <label className="form-label">Credit Period (Days)</label>
                <select
                  className="form-input"
                  required
                  onChange={(e) => {
                    setCreditPolicy({
                      ...CreditPolicy,
                      credit_period: e.target.value,
                    });
                  }}
                >
                  <option value={""}>Select Credit period</option>
                  <option value={0}> 0</option>
                  <option value={15}> 15</option>
                  <option value={30}> 30</option>
                  <option value={45}> 45</option>
                  <option value={60}> 60</option>
                  <option value={75}> 75</option>

                  {/* 0, 15, 20, 45, 60, 75, 90 */}
                </select>

                {NullValidationCred?.credit_period === true ? (
                  <FieldValidationError message="Please select credit period" />
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
          <div className="flex-box">
            <div className="flex-item">
              <div className="form-field">
                <label className="form-label">
                  Interest Per Week After Due Date
                </label>
                <input
                  required
                  style={{}}
                  type="number"
                  min="0"
                  name="cname"
                  id="cname"
                  className="form-input"
                  placeholder="Enter Interest Per Week After Due Date"
                  value={CreditPolicy?.delay_interest}
                  onChange={(e) => {
                    setCreditPolicy({
                      ...CreditPolicy,
                      delay_interest: e.target.value,
                    });

                    setNullValidationCred({
                      ...NullValidationCred,
                      delay_interest: false,
                    });
                    setValidationCred({
                      ...ValidationCred,
                      delay_interest: false,
                    });
                  }}
                />

                {NullValidationCred?.delay_interest === true ? (
                  <FieldValidationError message="Please enter valid delay interest" />
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="flex-item">
              <div className="form-field">
                <label className="form-label">Credit Period Starts from</label>

                <select
                  className="form-input"
                  required
                  onChange={(e) => {
                    setCreditPolicy({
                      ...CreditPolicy,
                      credit_period_start: e.target.value,
                    });
                  }}
                >
                  <option value={""}> Select Credit period </option>

                  <option value={"Delivery date"}> Delivery date</option>

                  {/* 0, 15, 20, 45, 60, 75, 90 */}
                </select>
              </div>
            </div>
          </div>
          <div className="flex-box">
            <div className="flex-item">
              <div className="form-field">
                <label className="form-label">Interest Period </label>
                <select
                  className="form-input"
                  value={CreditPolicy?.interest_period}
                  required
                  onChange={(e) => {
                    setNullValidationCred({
                      ...NullValidationCred,
                      interest_period: false,
                    });
                    setCreditPolicy({
                      ...CreditPolicy,
                      interest_period: e.target.value,
                    });
                  }}
                >
                  <option value={"  "}>Select Interest Period</option>
                  <option value={"Days"}> Days</option>
                  <option value={"Week"}> Week</option>
                  <option value={"Month"}> Month</option>
                  <option value={"Year"}> Year</option>
                </select>

                {NullValidationCred?.interest_period === true ? (
                  <FieldValidationError message="Interest Period is Required " />
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="flex-item">
              <div className="form-field">
                <label className="form-label">Other Terms</label>
                <input
                  type="text"
                  name="cname"
                  id="cname"
                  className="form-input"
                  placeholder="Enter Your Other Terms"
                  value={CreditPolicy?.other_terms}
                  onChange={(e) => {
                    setCreditPolicy({
                      ...CreditPolicy,
                      other_terms: e.target.value,
                    });
                  }}
                />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="btn btn-warning"
            onClick={(e) => {
              setEditLoading({ ...EditLoading, EdCp: true });

              EditCreditPolicy(e);
            }}
          >
            {EditLoading?.EdCp === true ? (
              <PuffLoader loading={true} size={15} />
            ) : (
              "Save Details"
            )}
          </Button>
          <Button variant="secondary" onClick={handleCloseCred}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        size="lg"
        show={showModal}
        onHide={handleCloseModal}
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          overflow: "hidden",
          height: "fit-content",
        }}
      >
        <Modal.Body>
          <div className="">
            <div className="alert alert--highlight text-center">
              <p>
                For authenticate users we take the correct company details and
                payment details.
              </p>
            </div>
            <div className="row ">
              {Verfid?.gstPay === true ? (
                <>
                  <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                    <div className="img-block">
                      <img src="/static/media/gst.723d5a8e7bfab714e36c.png" />
                    </div>

                    <Link
                      ref={gstRef}
                      className="button button-primary"
                      to={"/settings"}
                      state={{ gst: "true", PreFilled: "true" }}
                    >
                      Verify GST Number
                    </Link>
                  </div>

                  <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                    <div className="img-block">
                      <img src="/static/media/bank.3d3a35d49c4e1099a2c0.png" />
                    </div>
                    <Link
                      className="button button-primary"
                      to={"/settings"}
                      state={{ pay: "true", PreFilled: "true" }}
                    >
                      Verify Bank Details
                    </Link>
                  </div>
                </>
              ) : Verfid.pay === true ? (
                <>
                  <div className="col-lg-12 col-md-12 col-sm-12 col-12 text-center">
                    <div className="img-block">
                      <img src="/static/media/bank.3d3a35d49c4e1099a2c0.png" />
                    </div>
                    <Link
                      className="button button-primary"
                      to={"/settings"}
                      state={{ pay: "true", PreFilled: "true" }}
                    >
                      Verify Bank Details
                    </Link>
                  </div>
                </>
              ) : Verfid?.gst === true ? (
                <>
                  <div className="col-lg-12 col-md-12 col-sm-12 col-12 text-center">
                    <div className="img-block">
                      <img src="/static/media/gst.723d5a8e7bfab714e36c.png" />
                    </div>

                    <Link
                      ref={gstRef}
                      className="button button-primary"
                      to={"/settings"}
                      state={{ gst: "true", PreFilled: "true" }}
                    >
                      Verify GST Number
                    </Link>
                  </div>
                </>
              ) : (
                ""
              )}
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ProductPortfolioInitial;
