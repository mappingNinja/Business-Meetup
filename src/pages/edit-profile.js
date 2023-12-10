import React, { useState, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../common/scss/pages/edit-profile.scss";
import Header from "../common/header";
import profilePic from "../assets/images/profile.png";
import profilePlaceholder from "../assets/images/profile-placeholder.svg";
import coverPlaceHolder from "../assets/images/img-placeholder.svg";
import profileCover from "../assets/images/profile-cover.jpg";
import { ReactComponent as Edit2Icon } from "../assets/images/edit-icon2.svg";
import { ReactComponent as CameraIcon } from "../assets/images/camera-icon.svg";
import { ReactComponent as MapIcon } from "../assets/images/map-icon.svg";
import { ReactComponent as VisitingCardIcon } from "../assets/images/vc-icon.svg";
import { ReactComponent as ButtonEditIcon } from "../assets/images/button-edit-icon.svg";
import { ReactComponent as TickIcon } from "../assets/images/tick-icon.svg";
import { ReactComponent as InfoIcon } from "../assets/images/info.svg";
import { ReactComponent as ArrowDownIcon } from "../assets/images/arrow-down.svg";
import { ReactComponent as CertificateIcon } from "../assets/images/certificate-icon.svg";
import { ReactComponent as ViewIcon } from "../assets/images/view-icon.svg";
import { ReactComponent as EditIcon } from "../assets/images/edit-icon2.svg";
import { ReactComponent as DeleteIcon } from "../assets/images/delete-icon.svg";
import { ReactComponent as AwardIcon } from "../assets/images/award-icon.svg";
import { ReactComponent as MyActivityIcon } from "../assets/images/my-activity-icon.svg";
import { ReactComponent as BusinessIcon } from "../assets/images/business-icon.svg";
import { ReactComponent as ContactIcon } from "../assets/images/contact-icon.svg";
import { ReactComponent as ProtfolioIcon } from "../assets/images/protfolio-icon.svg";
import { ReactComponent as CaretDownIcon } from "../assets/images/caret-down.svg";
import { ReactComponent as BrandIcon } from "../assets/images/brand-icon.svg";
import { ReactComponent as OfferSentIcon } from "../assets/images/offer-sent-icon.svg";
import { ReactComponent as NegotiationsIcon } from "../assets/images/negotiations-icon.svg";
import { ReactComponent as FinalOfferIcon } from "../assets/images/final-offer-icon.svg";
import { ReactComponent as RejectedOfferIcon } from "../assets/images/rejected-offer-icon.svg";
import { ReactComponent as DraftIcon } from "../assets/images/draft-icon.svg";
import { ReactComponent as SortOrderIcon } from "../assets/images/sort-order-icon.svg";
import { ReactComponent as CreateIcon } from "../assets/images/create-icon.svg";
import { ReactComponent as PendingRequestIcon } from "../assets/images/pending-request-icon.svg";
import { ReactComponent as Close2Icon } from "../assets/images/close2-icon.svg";
import { ReactComponent as ReceivedIcon } from "../assets/images/received-icon.svg";
import { ReactComponent as Transactions2Icon } from "../assets/images/transactions2-icon.svg";
import { ReactComponent as InCompleteIcon } from "../assets/images/incomplete-icon.svg";
import { ReactComponent as CompleteIcon } from "../assets/images/complete-icon.svg";
import { ReactComponent as OngoingIcon } from "../assets/images/ongoing-icon.svg";
import { ReactComponent as RecommendationIcon } from "../assets/images/recommendation-icon.svg";
import { ReactComponent as NetworkIcon } from "../assets/images/network-icon.svg";
import { ReactComponent as TestimonialIcon } from "../assets/images/testimonial-icon.svg";
import { ReactComponent as ProductCategoryIcon } from "../assets/images/product-category-icon.svg";
import ChangeCover from "./edit-cover-photo";
import EditInfo from "./edit-profile-modal";
import CertificationModal from "./certifications-modal";
import AwardsModal from "./awards-modal";
import RequireProductsCategories from "./product-category-modal";
import ContactModal from "./contact-modal";
import BusinessMapModal from "./business-map-modal";
import ViewCertificate from "./view-certificate";
import EditCertificationModal from "./edit-certifications-modal";
import EditAwardsModal from "./edit-awards-modal";
import BrandsModal from "./brands-modal";
import EditBrandsModal from "./edit-brands-modal";
import { Link, useNavigate } from "react-router-dom";
import Auth from "../libs/auth";
import { get } from "../libs/http-hydrate";
import ViewAward from "./viewAward";
import DeleteModal from "./delete-modal";
import NetworkModal from "./network-modal";
import EditVisitingCard from "./visiting-card";
import ViewBrand from "./viewBrand";
import EditAboutModal from "./edit-about";
import { HashLoader } from "react-spinners";
import pending from "../assets/images/pending.jpg";
import { UseEffectOnce } from "../Hook/UseEffectOnce";
// switch remaining
function EditProfile() {
  let darkMode = localStorage.getItem("dark");
  if (darkMode === "false") {
    darkMode = false;
  } else {
    darkMode = true;
  }
  const [loading, setLoading] = useState();
  const [userData, setUserData] = useState({});
  const [companyData, setCompanyData] = useState({});
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const [showEditCertificationModal, setShowEditCertificationModal] =
    useState(false);
  const [showEditCertificationData, setShowEditCertificationData] = useState(
    []
  );
  const [certificateData, setShowCertificateData] = useState({});
  const [showAwardsModal, setShowAwardsModal] = useState(false);
  const [showAwardData, setShowAwardData] = useState({});
  const [showEditAwardData, setShowEditAwardData] = useState([]);
  const [showEditAwardModal, setShowEditAwardModal] = useState(false);
  const [showEditContactModal, setShowEditContactModal] = useState(false);
  const [
    showSpecificEditCertificationModal,
    setShowSpecificEditCertificationModal,
  ] = useState(false);
  const [
    showSpecificEditCertificationModalData,
    setShowSpecificEditCertificationModalData,
  ] = useState({});
  const [showSpecificEditAwardModal, setShowSpecificEditAwardModal] =
    useState(false);
  const [showSpecificEditAwardModalData, setShowSpecificEditAwardModalData] =
    useState({});
  const [showBrandsModal, setShowBrandsModal] = useState(false);
  const [showBrandsData, setShowBrandsData] = useState({});
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteModalData, setDeleteModalData] = useState({});
  const [showNetworkModal, setShowNetworkModal] = useState(false);
  const [networkModalData, setNetworkModalData] = useState({});
  const [showVisitingCard, setShowVisitingCard] = useState(false);
  const [visitingCardData, setVisitingCardData] = useState();
  const [showBrand, setShowBrand] = useState(false);
  const [brandData, setBrandData] = useState({});
  const [showSpecificEditBrand, setShowSpecificEditBrand] = useState(false);
  const [showSpecificEditBrandData, setShowSpecificEditBrandData] = useState(
    {}
  );
  const [showEditAboutModal, setShowEditAboutModal] = useState(false);
  const [showBusinessMap, setShowBusinessMap] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showCoverModal, setShowCoverModal] = useState(false);
  const [showRequiredProductCategories, setShowRequiredProductCategories] =
    useState(false);
  const isRunned = useRef(false);

  const settings = {
    dots: true,
    arrows: false,
    infinite: false,
    autoplay: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const settingsBrands = {
    dots: false,
    arrows: true,
    infinite: false,
    autoplay: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  const decapitalize = ([first, ...rest], upperRest = false) => {
    const lowercaseString =
      first.toLowerCase() +
      (upperRest ? rest.join("").toUpperCase() : rest.join(""));
    return lowercaseString.replaceAll(" ", "");
  };
  const navigate = useNavigate();

  UseEffectOnce(() => {
    if (isRunned.current) return;
    isRunned.current = true;

    setLoading(true);
    const user = Auth.getCurrentUser();
    const slug = decapitalize(user?.slug);

    if (!user) {
      navigate("/");
    }

    if (user && slug) {
      console.log(user);

      get(`/user/profile/details/${slug}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
        .then((response) => {
          setCompanyData(response?.data?.data);
          setTimeout(() => {
            setLoading(false);
          }, 2000);
          // console.log("this is the comapny data", response?.data?.data);
        })
        .catch((e) => {
          alert("this is error", e);
          console.log("what is the error in the slug apis", e);
        });
    }
  });

  const viewCertificate = (data) => {
    setShowCertificateData(data);
    setShowCertificateModal(true);
    return;
  };
  const handleEditCertificate = (data) => {
    setShowEditCertificationData(data);
    setShowEditCertificationModal(true);
    return;
  };
  const handleSpecificEditCertificate = (e, data) => {
    e.preventDefault();
    setShowSpecificEditCertificationModalData(data);
    setShowSpecificEditCertificationModal(true);
    return;
  };
  const handleSpecificEditBrandData = (e, data) => {
    e.preventDefault();
    setShowSpecificEditBrandData(data);
    setShowSpecificEditBrand(true);
    return;
  };
  const handleSpecificAwardEditModal = (e, data) => {
    e.preventDefault();
    setShowSpecificEditAwardModalData(data);
    setShowSpecificEditAwardModal(true);
    return;
  };
  const viewAward = (data) => {
    setShowAwardData(data);
    setShowAwardsModal(true);
    return;
  };
  const handleEditAward = (data) => {
    setShowEditAwardData(data);
    setShowEditAwardModal(true);
    return;
  };
  const handleBrandsData = (e, data) => {
    setShowBrandsData(data);
    setShowBrandsModal(true);
    return;
  };
  const handleDeleteModal = (data) => {
    setDeleteModalData(data);
    setShowDeleteModal(true);
    return;
  };
  const handleNetworkModal = (e) => {
    setNetworkModalData(companyData?.total_network);
    setShowNetworkModal(true);
    return;
  };
  const handleVisitingCardModal = (e) => {
    setVisitingCardData(companyData?.visiting_card || null);
    setShowVisitingCard(true);
    return;
  };
  const handleBrand = (data) => {
    setBrandData(data);
    setShowBrand(true);
    return;
  };
  const handleCoverImage = () => {
    setShowCoverModal(true);
    return;
  };
  const handleBusinessMap = () => {
    setShowBusinessMap(true);
    return;
  };
  const handleContactModal = () => {
    setShowContactModal(true);
    return;
  };
  const handleEditModal = () => {
    setShowEditModal(true);
  };
  const handleAbout = () => {
    setShowEditAboutModal(true);
  };
  const handleRequiredProductCategories = () => {
    setShowRequiredProductCategories(true);
  };

  const getStringArray = (arrayData) => {
    let initialString = "";

    arrayData?.map((str) => {
      initialString = str.name + "," + initialString;
    });

    return initialString.slice(0, -1);
  };

  const industryString = getStringArray(companyData?.company_details?.industry);

  const contactData = {
    birthDate: companyData?.birth_date,
    foundation_date: companyData?.company_details?.details?.founding_date,
    companyAddress: companyData?.company_details?.details?.office_address,
    factoryAddress: companyData?.company_details?.details?.factory_address,
    office_mail: companyData?.company_details?.details?.office_email,
    office_phone_number:
      companyData?.company_details?.details?.office_mobile_number,
  };

  return (
    <>
      <Header home />
      <>
        <div
          className="grey-bg"
          style={
            loading ? { "margin-top": "0%", "margin-bottom": "31%" } : null
          }
        >
          <div
            className="container-fluid"
            style={
              loading
                ? {
                    display: "flex",
                    "justify-content": "center",
                    "align-items": "center",

                    background: darkMode ? "#1c2226" : "white",
                  }
                : null
            }
          >
            <div
              className="layout-grid-box-profile"
              style={
                loading
                  ? {
                      display: "flex",
                      "justify-content": "center",
                      "align-items": "center",
                      "margin-top": "5%",
                    }
                  : null
              }
            >
              {/* {!loading ? ( */}
              <>
                <div className="layout-grid layout-grid--left">
                  <div className="card card--personal-info">
                    <div className="cover-image">
                      <img
                        src={companyData?.cover_image || coverPlaceHolder}
                        alt="cover Img"
                        style={
                          !companyData?.cover_image
                            ? {
                                width: "27%",
                                height: "100%",
                                position: "relative",
                                top: "10%",
                                left: "38%",
                              }
                            : null
                        }
                      />
                      <div
                        className="action"
                        data-toggle="modal"
                        data-target="#ChangeCover"
                        onClick={(e) => handleCoverImage()}
                      >
                        <CameraIcon />
                      </div>
                    </div>
                    <div className="card-body pt-0">
                      <div className="profile-details">
                        <div className="profile-details--left">
                          <div className="profile-image">
                            <img
                              alt="profileImg"
                              src={
                                companyData?.profile_image || profilePlaceholder
                              }
                            />
                          </div>
                          <h6 className="profile-name">{companyData?.name}</h6>
                          <p className="text-medium">{`${companyData?.i_am} at ${companyData?.company_details?.details?.name}`}</p>
                          <p className="text-medium text-grey">
                            <MapIcon />
                            Ahmedabad
                          </p>
                        </div>
                        <div className="profile-details--right">
                          <div className="button-wrap">
                            <button
                              className="button button-primary"
                              data-toggle="modal"
                              data-target="#EditInfo"
                              onClick={(e) => handleEditModal()}
                            >
                              <ButtonEditIcon />
                              Edit Profile
                            </button>
                            <button
                              className="button button-primary button-primary--bordered"
                              data-toggle="modal"
                              data-target="#VisitingCardModal"
                              onClick={(e) => handleVisitingCardModal(e)}
                            >
                              <VisitingCardIcon />
                              Visiting Card
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm">
                          <div className="chips">
                            <div className="chips--value">
                              {companyData?.id}
                            </div>
                            <div className="chips--text">Profile ID</div>
                          </div>
                        </div>
                        <div className="col-sm">
                          <div className="chips">
                            <div className="chips--value">0</div>
                            <div className="chips--text">Connection</div>
                          </div>
                        </div>
                        <div className="col-sm">
                          <div className="chips">
                            <div className="chips--value">0</div>
                            <div className="chips--text">Deals Closed</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card company-details">
                    <div className="card-body">
                      <div className="company-profile">
                        <div className="company-profile-image">
                          <img
                            alt=""
                            src={companyData?.company_details?.details?.logo}
                            className="profile-pic"
                          />
                        </div>
                        <div className="company-profile-content">
                          <div className="company-profile-name">
                            <h6>{companyData?.company_details?.name}</h6>
                            <ul>
                              <li>
                                <label>GST</label>:
                                <span>
                                  {companyData?.gst_number}{" "}
                                  <span className="verified">
                                    <TickIcon />
                                  </span>
                                </span>
                              </li>
                              <li>
                                <label>ESTD</label>:
                                <span>
                                  {companyData?.company_details?.details
                                    ?.establish_date || "N/A"}
                                </span>
                              </li>
                              <li>
                                <label>Industry</label>:
                                <span>{industryString || "N/A"}</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card card-about">
                    <div className="card-header card-header--large">
                      <h6>
                        <InfoIcon />
                        About
                      </h6>
                      <button
                        className="button-edit"
                        data-toggle="modal"
                        data-target="#AboutModal"
                        onClick={() => handleAbout()}
                      >
                        <ButtonEditIcon />
                      </button>
                    </div>
                    <div className="card-body">
                      <p>{companyData?.about}</p>
                    </div>
                  </div>
                  <div className="card card-certificate image-lists">
                    <div className="card-header card-header--large">
                      <h6>
                        <CertificateIcon />
                        Certifications
                      </h6>
                      <button
                        className="button-edit"
                        data-toggle="modal"
                        data-target="#CertificationsModal"
                        onClick={() =>
                          handleEditCertificate(
                            companyData.show_case.certificates
                          )
                        }
                      >
                        <ButtonEditIcon />
                      </button>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        {companyData?.show_case?.certificates?.length > 0 ? (
                          companyData?.show_case?.certificates?.map(
                            (certificate) => (
                              <div className="col-sm-4">
                                <div className="img-block">
                                  <img src={certificate?.file} />
                                  <div className="actions">
                                    <button
                                      className="button-view"
                                      data-toggle="modal"
                                      data-target="#ViewCertificate"
                                      onClick={() =>
                                        viewCertificate(certificate)
                                      }
                                    >
                                      <ViewIcon />
                                    </button>
                                    <button
                                      className="button-edit"
                                      data-toggle="modal"
                                      data-target="#EditCertificationModal"
                                      onClick={(e) =>
                                        handleSpecificEditCertificate(
                                          e,
                                          certificate
                                        )
                                      }
                                    >
                                      <EditIcon props={certificate} />
                                    </button>
                                    <button
                                      className="button-delete"
                                      data-toggle="modal"
                                      data-target="#DeleteModal"
                                      onClick={() =>
                                        handleDeleteModal(certificate)
                                      }
                                    >
                                      <DeleteIcon />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            )
                          )
                        ) : (
                          <div className="col-sm">
                            <h4 style={{ fontSize: "16px" }}>
                              To increase your profile value please add the
                              certificate if you have
                            </h4>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="card card-achivements image-lists">
                    <div className="card-header card-header--large">
                      <h6>
                        <AwardIcon />
                        Awards & Achivements
                      </h6>
                      <button
                        className="button-edit"
                        data-toggle="modal"
                        data-target="#AwardsModal"
                        onClick={() =>
                          handleEditAward(companyData.show_case.achievements)
                        }
                      >
                        <ButtonEditIcon />
                      </button>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        {companyData?.show_case?.achievements?.length > 0 ? (
                          companyData?.show_case.achievements?.map((award) => (
                            <div className="col-sm-4">
                              <div className="img-block">
                                <img src={award?.file} />
                                <div className="actions">
                                  <button
                                    className="button-view"
                                    data-toggle="modal"
                                    data-target="#ViewAward"
                                    onClick={() => viewAward(award)}
                                  >
                                    <ViewIcon />
                                  </button>
                                  <button
                                    className="button-edit"
                                    data-toggle="modal"
                                    data-target="#EditAwardsModal"
                                    onClick={(e) =>
                                      handleSpecificAwardEditModal(e, award)
                                    }
                                  >
                                    <EditIcon />
                                  </button>
                                  <button
                                    className="button-delete"
                                    data-toggle="modal"
                                    data-target="#DeleteModal"
                                    onClick={() => handleDeleteModal(award)}
                                  >
                                    <DeleteIcon />
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="col-sm">
                            <h4 style={{ fontSize: "16px" }}>
                              To increase your profile value please add the
                              Awards & Achievements if you have
                            </h4>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="card">
                    <div className="card-header card-header--large">
                      <h6>
                        <MyActivityIcon />
                        My Activity
                      </h6>
                    </div>
                    <div className="card-body">
                      <div className="card-lists">
                        {companyData?.activity?.length > 0 ? (
                          <>
                            <div className="card-lists-item user-profile">
                              <div className="user-profile-image">
                                <img
                                  src={profilePic}
                                  alt=""
                                  className="profile-pic"
                                />
                              </div>
                              <div className="user-profile-content">
                                <div className="user-profile-name">
                                  <h6>Commented on ABC Enterprise</h6>
                                  <p>
                                    Hii.. Community i’m, looking for hatch
                                    covers for cargos...
                                  </p>
                                </div>
                              </div>
                            </div>
                          </>
                        ) : (
                          <>
                            <p>No Activity Found....</p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  {companyData.is_seller === 1 ? (
                    <>
                      <div className="card">
                        <div className="card-header card-header--large">
                          <h6>
                            <BusinessIcon />
                            Business Map
                          </h6>
                          <button
                            className="button-edit"
                            data-toggle="modal"
                            data-target="#BusinessMapModal"
                            onClick={(e) => handleBusinessMap()}
                          >
                            <ButtonEditIcon />
                          </button>
                        </div>
                        <div className="card-body">
                          <div className="card-lists map">
                            {companyData?.business_timelines?.length > 0 ? (
                              <>
                                {companyData?.business_timelines?.map(
                                  (businessData) => (
                                    <div className="card-lists-item user-profile">
                                      <div className="user-profile-image icon">
                                        <img
                                          alt=""
                                          style={{
                                            width: "75%",
                                            height: "75%",
                                          }}
                                          src={businessData?.media?.file}
                                        />
                                      </div>
                                      <div className="user-profile-content">
                                        <div className="user-profile-name">
                                          <h6>{businessData?.year}</h6>
                                          <p>{businessData?.description}</p>
                                        </div>
                                      </div>
                                    </div>
                                  )
                                )}
                              </>
                            ) : (
                              <>
                                <div className="col-sm">
                                  <h4 style={{ fontSize: "16px" }}>
                                    To increase your profile value please add
                                    business map of your organization
                                  </h4>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </>
                  ) : null}

                  <div className="card card-contact">
                    <div className="card-header card-header--large">
                      <h6>
                        <ContactIcon />
                        Contact
                      </h6>
                      <button
                        className="button-edit"
                        data-toggle="modal"
                        data-target="#ContactModal"
                        onClick={(e) => handleContactModal()}
                      >
                        <ButtonEditIcon />
                      </button>
                    </div>
                    <div className="card-body">
                      <ul>
                        <li>
                          <label>Office Address</label>:
                          <span>
                            {companyData?.company_details?.details
                              ?.office_address || "N/A"}
                          </span>
                        </li>
                        <li>
                          <label>Factory Address</label>:
                          <span>
                            {companyData?.company_details?.details
                              ?.factory_address || "N/A"}
                          </span>
                        </li>
                        <li>
                          <label>Contact Number</label>:
                          <span>
                            {companyData?.company_details?.details
                              ?.office_mobile_number || "N/A"}
                          </span>
                        </li>
                        <li>
                          <label>Email Address</label>:
                          <span>
                            {companyData?.company_details?.details
                              ?.office_email || "N/A"}
                          </span>
                        </li>
                        <li>
                          <label>Company Foundation</label>:
                          <span>
                            {companyData?.company_details?.details
                              ?.founding_date || "N/A"}
                          </span>
                        </li>
                        <li>
                          <label>Owner Birthday</label>:
                          <span>{companyData?.birth_date || "N/A"}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="layout-grid layout-grid--right">
                  {companyData?.is_seller === 1 ? (
                    <>
                      <div className="card card-product-protfolio">
                        <div className="card-header card-header--large">
                          <h6>
                            <ProtfolioIcon />
                            Product Portfolio
                          </h6>
                          <Link
                            to="/product-portfolio-initial"
                            className="button-edit"
                          >
                            <ButtonEditIcon />
                          </Link>
                        </div>
                        <div className="card-body">
                          <div className="card-lists">
                            {companyData?.products?.length > 0 ? (
                              <>
                                {companyData?.products?.map((product) => (
                                  <div
                                    className="card-lists-item product-protfolio"
                                    onClick={() => {
                                      navigate("/product-portfolio", {
                                        state: product,
                                      });
                                    }}
                                  >
                                    <div className="product-protfolio-image">
                                      <img
                                        alt=""
                                        src={product?.thumb_image?.file}
                                      />
                                    </div>
                                    <div className="product-protfolio-content">
                                      <div className="product-name">
                                        <h6>{product.name}</h6>
                                        <span className="product-tag">
                                          {product?.category?.name}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </>
                            ) : (
                              <>
                                <h4 style={{ fontSize: "16px" }}>
                                  To get the business please create your product
                                  portfolio
                                </h4>
                              </>
                            )}
                          </div>
                        </div>
                        <div className="card-footer">
                          {companyData?.products?.length > 4 ? (
                            <>
                              <a
                                href="/product-portfolio-list"
                                className="seemore-link"
                              >
                                See More <CaretDownIcon />
                              </a>
                            </>
                          ) : (
                            <></>
                          )}
                        </div>
                      </div>
                      <div className="card card-brand image-lists">
                        <div className="card-header card-header--large">
                          <h6>
                            <BrandIcon />
                            Brands
                          </h6>
                        </div>
                        <div className="card-body">
                          <div className="">
                            {companyData?.show_case?.brands?.length > 0 ? (
                              <>
                                <Slider {...settingsBrands}>
                                  {companyData?.show_case?.brands?.map(
                                    (brand) => (
                                      <div className="col-sm">
                                        <div className="img-block">
                                          {brand?.status !== 1 ? (
                                            <>
                                              {" "}
                                              <img alt="" src={pending} />
                                              <span>Pending Approval</span>
                                              <div className="actions">
                                                <button
                                                  className="button-view"
                                                  data-toggle="modal"
                                                  data-target="#ViewBrand"
                                                  onClick={() =>
                                                    handleBrand(brand)
                                                  }
                                                >
                                                  <ViewIcon />
                                                </button>
                                                <button
                                                  className="button-edit"
                                                  data-dismiss="modal"
                                                  data-toggle="modal"
                                                  data-target="#EditBrandsModal"
                                                  onClick={(e) => {
                                                    handleSpecificEditBrandData(
                                                      e,
                                                      brand
                                                    );
                                                  }}
                                                >
                                                  <EditIcon />
                                                </button>
                                              </div>
                                            </>
                                          ) : (
                                            <>
                                              {" "}
                                              <img src={brand?.icon} />
                                              <div className="actions">
                                                <button
                                                  className="button-view"
                                                  data-toggle="modal"
                                                  data-target="#ViewBrand"
                                                  onClick={() =>
                                                    handleBrand(brand)
                                                  }
                                                >
                                                  <ViewIcon />
                                                </button>
                                              </div>
                                            </>
                                          )}
                                        </div>
                                      </div>
                                    )
                                  )}
                                </Slider>
                              </>
                            ) : (
                              <>
                                <div className="col-sm">
                                  <h4 style={{ fontSize: "16px" }}>
                                    People wants to know which brands you have
                                  </h4>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </>
                  ) : null}
                  {companyData?.is_buyer === 1 ? (
                    <>
                      <div className="card">
                        <div className="card-header card-header--large">
                          <h6>
                            <ProductCategoryIcon /> Require Products Categories
                          </h6>
                          <button
                            className="button-edit"
                            data-toggle="modal"
                            data-target="#ProductCategoryModal"
                            onClick={handleRequiredProductCategories}
                          >
                            <ButtonEditIcon />
                          </button>
                        </div>
                        <div className="card-body">
                          <div className="tags tags-regular">
                            {companyData?.product_categories?.map(
                              (category) => (
                                <span className="tag">{category?.name}</span>
                              )
                            )}
                          </div>
                        </div>
                      </div>
                    </>
                  ) : null}

                  <div className="card card-chips-withButton">
                    <div className="card-header card-header--large">
                      <h6>
                        <NegotiationsIcon />
                        Negotiations
                      </h6>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        {companyData?.is_buyer === 1 ? (
                          <></>
                        ) : (
                          <>
                            <div className="col-sm-6">
                            <Link to={"/negotiation-buyer"}>
                              <div className="chips chips-withButton">
                                <div className="chips--text">
                                  Initial Offer Sent
                                </div>
                                <button className="button button-blue">
                                  <OfferSentIcon />
                                </button>
                              </div>
                              </Link>
                            </div>
                            <div className="col-sm-6">
                            <Link to={"/negotiation-buyer"}>
                              <div className="chips chips-withButton">
                                <div className="chips--text">
                                  Revised Offer Request
                                </div>
                                <button className="button button-blue">
                                  <OfferSentIcon />
                                </button>
                              </div>
                              </Link>
                            </div>

                            <div className="col-sm-6">
                            <Link to={"/negotiation-buyer"}>
                              <div className="chips chips-withButton">
                                <div className="chips--value">0</div>
                                <div className="chips--text">
                                  Final Offer Sent
                                </div>
                                <button className="button button-blue">
                                  <FinalOfferIcon />
                                </button>
                              </div>
                              </Link>
                            </div>
                          </>
                        )}
                        <div className="col-sm-6">
                        <Link to={"/negotiation-buyer"}>
                          <div className="chips chips-withButton">
                            <div className="chips--value">0</div>
                            <div className="chips--text">Rejected Offers</div>
                            <button className="button button-blue">
                              <RejectedOfferIcon />
                            </button>
                          </div>
                          </Link>
                        </div>
                        <div className="col-sm-6">
                        <Link to={"/negotiation-buyer"}>
                          <div className="chips chips-withButton">
                            <div className="chips--value">0</div>
                            <div className="chips--text">Draft</div>
                            <button className="button button-blue">
                              <DraftIcon />
                            </button>
                          </div>
                          </Link>
                        </div>
                        {companyData?.is_buyer === 1 ? (
                          <>
                            <div className="col-sm-6">
                            <Link to={"/negotiation-buyer"}>
                              <div className="chips chips-withButton">
                                <div className="chips--value">0</div>
                                <div className="chips--text">
                                  Revised Offer Request
                                </div>
                                <button className="button button-blue">
                                  <DraftIcon />
                                </button>
                              </div>
                              </Link>
                            </div>
                          </>
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="card card-chips-withButton">
                    <div className="card-header card-header--large">
                      <h6>
                        <SortOrderIcon />
                        Short Orders
                      </h6>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-sm-6">
                          <button className="chips chips-create">
                            <div className="chips--text">
                              <CreateIcon />
                              Create SO
                            </div>
                          </button>
                        </div>
                        <div className="col-sm-6">
                          <Link to={"/short-order-buyer"}>
                            <div className="chips chips-withButton">
                              <div className="chips--value">0</div>
                              <div className="chips--text">
                                Pending for Acceptance
                              </div>
                              <button className="button button-blue">
                                <PendingRequestIcon />
                              </button>
                            </div>
                          </Link>
                        </div>
                        <div className="col-sm-6">
                        <Link to={"/short-order-buyer"}>
                          <div className="chips chips-withButton">
                            <div className="chips--value">0</div>
                            <div className="chips--text">
                              Pending for Documentation
                            </div>
                            <button className="button button-blue">
                              <Close2Icon />
                            </button>
                          </div>
                          </Link>
                        </div>
                        <div className="col-sm-6">
                        <Link to={"/short-order-buyer"}>
                          <div className="chips chips-withButton">
                            <div className="chips--value">0</div>
                            <div className="chips--text">
                              Pending for Purchase Order
                            </div>
                            <button className="button button-blue">
                              <ReceivedIcon />
                            </button>
                          </div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card card-chips-withButton">
                    <div className="card-header card-header--large">
                      <h6>
                        <Transactions2Icon />
                        Transactions
                      </h6>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-sm-6">
                          <button className="chips chips-create">
                            <div className="chips--text">
                              <CreateIcon />
                              New Transaction
                            </div>
                          </button>
                        </div>
                        <div className="col-sm-6">
                        <Link to={"/transaction"}>
                          <div className="chips chips-withButton">
                            <div className="chips--value">0</div>
                            <div className="chips--text">Incomplete</div>
                            <button className="button button-blue">
                              <InCompleteIcon />
                            </button>
                          </div>
                          </Link>
                        </div>
                        <div className="col-sm-6">
                        <Link to={"/transaction"}>
                          <div className="chips chips-withButton">
                            <div className="chips--value">0</div>
                            <div className="chips--text">Completed</div>
                            <button className="button button-blue">
                              <CompleteIcon />
                            </button>
                          </div>
                          </Link>
                        </div>
                        <div className="col-sm-6">
                        <Link to={"/transaction"}>
                          <div className="chips chips-withButton">
                            <div className="chips--value">0</div>
                            <div className="chips--text">Ongoing</div>
                            <button className="button button-blue">
                              <OngoingIcon />
                            </button>
                          </div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card">
                    <div className="card-header card-header--large">
                      <h6>
                        <RecommendationIcon />
                        Recommendation
                      </h6>
                    </div>
                    <div className="card-body">
                      <div className="progresses">
                        <label>Price</label>
                        <div className="progresses-bar">
                          <div
                            className="progresses-bar--value"
                            style={{ width: "90%" }}
                          ></div>
                        </div>
                      </div>
                      <div className="progresses">
                        <label>Quality</label>
                        <div className="progresses-bar">
                          <div
                            className="progresses-bar--value"
                            style={{ width: "70%" }}
                          ></div>
                        </div>
                      </div>
                      <div className="progresses">
                        <label>Service</label>
                        <div className="progresses-bar">
                          <div
                            className="progresses-bar--value"
                            style={{ width: "80%" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {companyData?.is_seller === 1 ? (
                    <>
                      <div className="card">
                        <div className="card-header card-header--large">
                          <h6>
                            <NetworkIcon />
                            Our Network
                          </h6>
                          <button
                            className="button-edit"
                            data-toggle="modal"
                            data-target="#NetworkModal"
                            onClick={(e) => handleNetworkModal(e)}
                          >
                            <ButtonEditIcon />
                          </button>
                        </div>
                        <div className="card-body">
                          <div className="row">
                            <div className="col-sm-4">
                              <div className="chips">
                                <div className="chips--value">
                                  {`${
                                    companyData?.total_network?.customers !=
                                      0 &&
                                    companyData?.total_network?.customers !==
                                      undefined
                                      ? companyData?.total_network?.customers +
                                        "+"
                                      : 0
                                  } ` || 0}{" "}
                                </div>
                                <div className="chips--text">Customers</div>
                              </div>
                            </div>
                            <div className="col-sm-4">
                              <div className="chips">
                                <div className="chips--value">
                                  {`${
                                    companyData?.total_network?.retailers !=
                                      0 &&
                                    companyData?.total_network?.retailers !==
                                      undefined
                                      ? companyData?.total_network?.retailers +
                                        "+"
                                      : 0
                                  } ` || 0}{" "}
                                </div>
                                <div className="chips--text">Retailers</div>
                              </div>
                            </div>
                            <div className="col-sm-4">
                              <div className="chips">
                                <div className="chips--value">
                                  {`${
                                    companyData?.total_network?.dealers != 0 &&
                                    companyData?.total_network?.dealers !==
                                      undefined
                                      ? companyData?.total_network?.dealers +
                                        "+"
                                      : 0
                                  } ` || 0}
                                </div>
                                <div className="chips--text">Dealers</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : null}

                  <div className="card card-testimonial">
                    <div className="card-header card-header--large">
                      <h6>
                        <TestimonialIcon />
                        Client’s Testimonials
                      </h6>
                    </div>
                    <div className="card-body">
                      <Slider {...settings} className="card-lists">
                        <div className="slide-item">
                          <div className="card-lists-item user-profile">
                            <div className="user-profile-image">
                              <img
                                src={profilePic}
                                alt=""
                                className="profile-pic"
                              />
                            </div>
                            <div className="user-profile-content">
                              <div className="user-profile-name">
                                <h6>Retailer</h6>
                                <p>M-one Enterprise</p>
                                <p className="text-medium">
                                  “We Greatly appreciated M-One Group for their
                                  kind support at every stage in terms of
                                  quality of the product, price and timely
                                  delivery”
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="slide-item">
                          <div className="card-lists-item user-profile">
                            <div className="user-profile-image">
                              <img
                                src={profilePic}
                                alt=""
                                className="profile-pic"
                              />
                            </div>
                            <div className="user-profile-content">
                              <div className="user-profile-name">
                                <h6>Retailer</h6>
                                <p>M-one Enterprise</p>
                                <p className="text-medium">
                                  “We Greatly appreciated M-One Group for their
                                  kind support at every stage in terms of
                                  quality of the product, price and timely
                                  delivery”
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Slider>
                    </div>
                  </div>
                </div>
              </>
              {/* ) : (
                <HashLoader
                  speedMultiplier={1.5}
                  color={darkMode ? "white" : "black"}
                  size={50}
                  loading={loading}
                />
              )} */}
            </div>
          </div>
        </div>
      </>
      {showCoverModal ? <ChangeCover data={companyData?.cover_image} /> : <></>}{" "}
      {/* for buyer */}
      {showEditModal ? <EditInfo data={companyData} /> : <></>}{" "}
      {/* for generic */}
      {showEditCertificationModal ? (
        <>
          <CertificationModal data={showEditCertificationData} />
        </>
      ) : (
        <></>
      )}
      {showEditAwardModal ? (
        <>
          <AwardsModal data={showEditAwardData} />
        </>
      ) : (
        <></>
      )}{" "}
      {/* for both */}
      {showRequiredProductCategories ? (
        <RequireProductsCategories />
      ) : (
        <></>
      )}{" "}
      {/* for buyer */}
      {showContactModal ? <ContactModal data={contactData} /> : <></>}{" "}
      {/* for buyer */}
      {showBusinessMap ? (
        <BusinessMapModal data={companyData.business_timelines} />
      ) : (
        <></>
      )}{" "}
      {/* for seller */}
      {showCertificateModal ? (
        <>
          <ViewCertificate data={certificateData} />
        </>
      ) : (
        <></>
      )}
      {showSpecificEditCertificationModal ? (
        <>
          <EditCertificationModal
            data={showSpecificEditCertificationModalData}
          />
        </>
      ) : (
        <></>
      )}
      {showSpecificEditAwardModal ? (
        <>
          <EditAwardsModal data={showSpecificEditAwardModalData} />
        </>
      ) : (
        <></>
      )}
      {showBrandsModal ? (
        <>
          <BrandsModal data={showBrandsData} />
        </>
      ) : (
        <></>
      )}
      {showAwardsModal ? (
        <>
          <ViewAward data={showAwardData} />
        </>
      ) : (
        <></>
      )}
      {showDeleteModal ? (
        <>
          <DeleteModal data={deleteModalData} />
        </>
      ) : (
        <></>
      )}
      {showNetworkModal ? (
        <>
          <NetworkModal data={networkModalData} />
        </>
      ) : (
        <></>
      )}
      {showVisitingCard ? (
        <>
          <EditVisitingCard data={visitingCardData} />
        </>
      ) : (
        <></>
      )}
      {showSpecificEditBrand ? (
        <>
          <EditBrandsModal data={showSpecificEditBrandData} />
        </>
      ) : (
        <></>
      )}
      {showBrand ? (
        <>
          <ViewBrand data={brandData} />
        </>
      ) : (
        <></>
      )}
      {showEditAboutModal ? (
        <>
          {" "}
          <EditAboutModal data={companyData} />{" "}
        </>
      ) : (
        <></>
      )}
    </>
  );
}

export default EditProfile;
