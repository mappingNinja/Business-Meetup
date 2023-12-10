import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Header from "../common/header";
import Breadcrumb from "../common/breadcrumb";
import "../common/scss/pages/product-protfolio.scss";
import { ReactComponent as EditIcon } from "../assets/images/edit-icon2.svg";
import { ReactComponent as CompleteIcon } from "../assets/images/complete-icon.svg";
import { ReactComponent as InfoIcon } from "../assets/images/info.svg";
import { ReactComponent as DeleteIcon } from "../assets/images/delete-icon.svg";
import Drill from "../assets/images/drill.png";
import HandTool from "../assets/images/hand-tools.png";
import Abrasives from "../assets/images/abrasives.png";
import PowerTool from "../assets/images/powertool.png";
import ProductImage from "../assets/images/product-image1.png";
import { ReactComponent as ArrowDownIcon } from "../assets/images/arrow-down.svg";
import { get, getAuthConfig } from "../libs/http-hydrate";
import { useNavigate } from "react-router-dom";
import ProductPortfolio from "./product-portfolio";
import swal from "sweetalert";
import { PuffLoader } from "react-spinners";
import { UseEffectOnce } from "../Hook/UseEffectOnce";
import { ReactComponent as CaretDownIcon } from "../assets/images/caret-down.svg";

function ProductPortfolioList(props) {
  console.log(props.CategoryList, "CategoryList");
  const CategoryList = props.CategoryList;
  const setCategoryList = props.setCategoryList;
  const navigate = useNavigate();
  const [nav1, setNav1] = useState();
  const [nav2, setNav2] = useState();
  const [Loading, setLoading] = useState(false);
  const slider1 = useRef(null);
  const slider2 = useRef(null);
  const [ProductList, setProductList] = useState({});

  let DelId = "";
  const [CateGoryFilterBy, setCategoryFilter] = useState([]);
  const [SUBCateGoryFilterBy, setSUBCategoryFilter] = useState([]);
  const [count, setCount] = useState(0);
  const [has_more, setHasMore] = useState(true);
  UseEffectOnce(() => {
    setNav1(slider1.current);
    setNav2(slider2.current);
    getProductDetailsList();
    // GetProductPortfolio();
  }, [false]);
  const settings = {
    dots: false,
    arrows: true,
    infinite: false,
    autoplay: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };
  const settingsMain = {
    dots: false,
    arrows: false,
    infinite: false,
    autoplay: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 0,
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
  UseEffectOnce(() => {
    filterData();
  }, [SUBCateGoryFilterBy]);
  useEffect(() => {
    if (count === 0) {
    } else {
      getProductDetailsList();
    }
  }, [count]);
  useEffect(() => {
    if (CateGoryFilterBy.length > 0) {
      getProductDetailsList(true);
    }
  }, [CateGoryFilterBy, SUBCateGoryFilterBy]);

  async function getProductDetailsList(filter) {
    let url = "/product/listing?";
    if (filter) {
      url = url + `category_id=`;

      CateGoryFilterBy.map((item, i) => {
        if (i != 0) {
          url = url + ",";
        }
        url = url + item;
      });

      if (SUBCateGoryFilterBy.length > 0) {
        url = url + `&sub_category_id=`;
        SUBCateGoryFilterBy.map((item, i) => {
          if (i != 0) {
            url = url + ",";
          }
          url = url + item;
        });
      }
    } else {
      url = url + `page=${count + 1}`;
    }
    const data = await get(url, getAuthConfig()).then((res) => {
      if (res.status === 200) {
        console.log(ProductList);
        console.log(res.data.data);
        if (Object.keys(ProductList).length == 0) {
          setProductList(res.data.data);
        } else {

          res.data.data.list((item,index)=>{


            const filtered = ProductList?.list.filter(
              (obj) => {
                return obj === item?.id;
              }
            );
            if (filtered.length >= 1) {
            
            } else {

              setProductList((p) => ({
                ...p,
                list: ProductList.list.concat(item),
              }));
            }


          })
          // setProductList((p) => ({
          //   ...p,
          //   list: ProductList.list.concat(res.data.data.list),
          // }));
          setProductList((p) => ({ ...p, has_more: res.data.data.has_more }));
        }
      }
    });
  }


  async function RemoveDuplicate(){

    const uniqueNames = ProductList?.list.filter((val, id, array) => {
      return array.indexOf(val) == id;  
   });

   setProductList((p) => ({
    ...p,
    list: ProductList.list.concat(uniqueNames),
  }));
  }
  async function filterData() {
    if (CateGoryFilterBy.length > 0) {
      let url = "/product/listing?category_id=";
      CateGoryFilterBy.map((index) => {
        url = url + index + ",";
      });
      url = url + "sub_category_id=";
      console.log("urleeee", SUBCateGoryFilterBy);
      SUBCateGoryFilterBy.map((index) => {
        url = url + index + ",";
      });
      const data = await get(url, getAuthConfig()).then((res) => {
        if (res.status === 200) {
          console.log(res.data.data);
          setProductList(res.data.data);
        }
      });
    }
  }

  function GetProductPortfolio() {
    get("/product/portfolio", getAuthConfig()).then((response) => {
      setCategoryList((p) => ({ ...p, category: response.data.data.category }));
    });
  }

  function DeletProductId(id) {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      dangerMode: true,
      buttons: ["cancel", "ok"],
    }).then((willDelete) => {
      if (willDelete) {
        setLoading(true);
        get(`/product/delete/${id}`, getAuthConfig())
          .then((response) => {
            setLoading(false);
            GetProductPortfolio();
            getProductDetailsList();
            props.UpdateTrue();
          })
          .catch((err) => {
            setLoading(false);
          });
      } else {
      }
    });
  }

  console.log("cat", CateGoryFilterBy);
  console.log("sub", SUBCateGoryFilterBy);

  const addItems = (item) => {
    setCategoryFilter((arr) => [...arr, item]);

    //     CateGoryFilterBy = [...new Set(CateGoryFilterBy)];

    // console.log(CateGoryFilterBy)
  };

  const [CurCategory, setCurCategory] = useState("");
  const [SubCurCategory, setCurSubCategory] = useState("");

  function inc(cat, sub) {
    setCurCategory(cat);
    setCurSubCategory(sub);
  }
  const checkboxRef = useRef();
  return (
    <>
      {/* <Header home /> */}
      <div className="">
        <div className="">
          {/* <Breadcrumb />
          <div className='page-heading'>
            <h6>Product Portfolio</h6>
          </div> */}
          {/* <div className='row protfolio-boxes'>
            <div className="col-sm">
              <div className='chips chips--white'>
                <div className='chips--text'>Minimum Order Valule</div>
                <div className='chips--value'>10000 INR</div>
                <button className='button-edit'><EditIcon /></button>
              </div>
            </div>
            <div className="col-sm">
            <div className='chips chips--white'>
                <div className='chips--text'>Freight Charges</div>
                <div className='chips--value'>NIL / 2%</div>
                <button className='button-edit'><EditIcon /></button>
              </div>
            </div>
            <div className="col-sm">
            <div className='chips chips--white'>
                <div className='chips--text'>Credit Policy<CompleteIcon className='complete' /></div>
                <div className='chips--value'><span className='text-small'><InfoIcon />Info</span></div>
                <button className='button-edit'><EditIcon /></button>
              </div>
            </div>
            <div className="col-sm">
            <div className='chips chips--white'>
                <div className='chips--text'>Product Catalogue</div>
                <div className='chips--value'>3</div>
                <button className='button-edit'><EditIcon /></button>
              </div>
            </div>
            <div className="col-sm">
            <div className='chips chips--white'>
                <div className='chips--text'>Negotiation</div>
                <div className='chips--value'>
                  <div className='switch-box switch-box--withLabel switch-box--small'>
                    <input type='checkbox' id='negotiation_switch' />
                    <label htmlFor='negotiation_switch'>
                      <span className='switch-icon off'>OFF</span>
                      <span className='switch-icon on'>ON</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm">
            <div className='chips chips--white'>
                <div className='chips--text'>Price Hide From</div>
                <div className='chips--value'><span className='color-red'>5</span> Users</div>
                <button className='button-edit'><EditIcon /></button>
              </div>
            </div>
            <div className="col-sm"></div>
          </div> */}
          <div className="sidebar">
            <div className="sidebar-block">
              <div className="sidebar-title">
                <h6>
                  Category{" "}
                  <a
                    className="collapse-button"
                    data-toggle="collapse"
                    href="#collap_categories"
                    role="button"
                    aria-expanded="false"
                    aria-controls="collap_categories"
                  >
                    <ArrowDownIcon />
                  </a>
                </h6>
              </div>
              <div className="collapse show" id="collap_categories">
                {CategoryList?.category.length > 0 ? (
                  <>
                    <Slider {...settings} className="categories">
                      {CategoryList?.category.map((item, i) => {
                        return (
                          <div
                            className="category"
                            onMouseUp={() => {
                              const filtered = CateGoryFilterBy.filter(
                                (obj) => {
                                  return obj === item?.id;
                                }
                              );

                              if (filtered.length >= 1) {
                                setCategoryFilter((current) =>
                                  current.filter((fruit) => fruit !== item?.id)
                                );
                              } else {
                                addItems(item?.id);
                              }
                            }}
                          >
                            <div className="form-field" ref={checkboxRef}>
                              <input
                                type="checkbox"
                                name={`category` + i}
                                id={`category` + i}
                              />
                              <label htmlFor={`category` + i}>
                                <div className="category-img">
                                  <img src={item?.icon} />
                                </div>
                                <div className="category-name">
                                  <h6>{item.name}</h6>
                                </div>
                              </label>
                            </div>
                          </div>
                        );
                      })}{" "}
                    </Slider>
                  </>
                ) : (
                  ""
                )}
              </div>
            </div>

            {CateGoryFilterBy.length > 0 ? (
              <div className="sidebar-block">
                <div className="sidebar-title">
                  <h6>
                    Sub Category{" "}
                    <a
                      className="collapse-button"
                      data-toggle="collapse"
                      href="#collapse_subcategories"
                      role="button"
                      aria-expanded="false"
                      aria-controls="collap_categories"
                    >
                      <ArrowDownIcon />
                    </a>
                  </h6>
                </div>
                <div className="collapse show" id="collapse_subcategories">
                  <Slider {...settings} className="categories">
                    {CateGoryFilterBy.length > 0
                      ? CateGoryFilterBy.map((itemF, indeF) => {
                          return (
                            <>
                              {CategoryList?.category &&
                                CategoryList?.category.map((itemL, index) => {
                                  return (
                                    <>
                                      {itemL?.children.map((itemC, index2) => {
                                        return (
                                          <>
                                            {itemC.parent_id === itemF ? (
                                              <>
                                                <div className="category">
                                                  <div
                                                    className="form-field"
                                                    onMouseUp={() => {
                                                      const filtered =
                                                        SUBCateGoryFilterBy.filter(
                                                          (obj) => {
                                                            return (
                                                              obj === itemC.id
                                                            );
                                                          }
                                                        );

                                                      if (
                                                        filtered.length >= 1
                                                      ) {
                                                        // alert("r");
                                                        setSUBCategoryFilter(
                                                          (current) =>
                                                            current.filter(
                                                              (fruit) =>
                                                                fruit !==
                                                                itemC.id
                                                            )
                                                        );
                                                      } else {
                                                        setSUBCategoryFilter(
                                                          SUBCateGoryFilterBy.concat(
                                                            itemC.id
                                                          )
                                                        );
                                                      }
                                                      //                             setCategoryFilter([
                                                      //   ...CateGoryFilterBy.slice(0, index),
                                                      //   ...products.slice(index + 1, products.length)
                                                      // ]);
                                                    }}
                                                  >
                                                    <input
                                                      type="checkbox"
                                                      name={
                                                        `subcategory` + indeF
                                                      }
                                                      id={`subcategory` + indeF}
                                                    />
                                                    <label
                                                      htmlFor={
                                                        `subcategory` + indeF
                                                      }
                                                    >
                                                      <div className="category-img">
                                                        <img
                                                          src={itemC?.icon}
                                                        />
                                                      </div>
                                                      <div className="category-name">
                                                        <h6>{itemC?.name}</h6>
                                                      </div>
                                                    </label>
                                                  </div>
                                                </div>
                                              </>
                                            ) : (
                                              " "
                                            )}
                                          </>
                                        );
                                      })}
                                      {/* {itemL.children.map((itemC, iC) => {
                                      return (
                                        <>
                                          {itemC?.parent_id === itemF ? (
                                            <> {itemC}</>
                                          ) : (
                                            " "
                                          )}
                                        </>
                                      );
                                    })} */}
                                    </>
                                  );
                                })}
                            </>
                          );

                          {
                            /* CategoryList?.category.map((itemL, iL) => {
                        
                        return(
                            <>
                         <h1>testing</h1>
                        
                        
                        </>
                        )

                       itemL.children.map((itemC, iC) => {
                        

                            return(
                              <>

                                {itemC?.parent_id === itemF ?  <> {itemC}</> : " "}

                              </>


                            )

                          
                     
                     
                     
                      }) 



                     
                     
                      }) */
                          }
                        })
                      : " "}

                    {/* <div className="category">
                        <div className="form-field">
                          <input
                            type="checkbox"
                            name="sub_category2"
                            id="sub_category2"
                          />
                          <label htmlFor="sub_category2">
                            <div className="category-img">
                              <img src={HandTool} />
                            </div>
                            <div className="category-name">
                              <h6>Tile Cutter</h6>
                            </div>
                          </label>
                        </div>
                      </div>
                     */}
                  </Slider>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="content-main productGrid">
            {/* <nav aria-label="breadcrumb">
              <ol className="breadcrumb" style={{ overflow: "hidden" }}>
                <li className="breadcrumb-item">
                  <a href="#">Product Portflio</a>
                </li>
                {ProductList?.list &&
                  ProductList?.list.map((item) =>
                    CateGoryFilterBy.length > 0 ? (
                      <>
                        {CateGoryFilterBy.map((index) => {
                          return (
                            <>
                              {SUBCateGoryFilterBy.length > 0 ? (
                                <>
                                  {SUBCateGoryFilterBy.map((indexS) => {
                                    return (
                                      <>
                                        {index === item.category_id &&
                                        indexS === item.sub_category_id ? (
                                          <>
                                            <>
                                               <li className="breadcrumb-item">
                                <span>{item?.category?.parent?.name}</span>
                              </li>
                                              <li className="breadcrumb-item">
                                                <span>
                                                  {item?.category?.name}
                                                </span>
                                              </li>
                                              <li
                                                className="breadcrumb-item active"
                                                aria-current="page"
                                              >
                                                {count}
                                              </li>
                                            </>
                                          </>
                                        ) : (
                                          ""
                                        )}{" "}
                                      </>
                                    );
                                  })}{" "}
                                </>
                              ) : (
                                ""
                              )}{" "}
                            </>
                          );
                        })}{" "}
                      </>
                    ) : (
                      ""
                    )
                  )}
              </ol>
            </nav> */}

            <div className="row">
              {ProductList?.list &&
                ProductList?.list.map((item) =>
                  CateGoryFilterBy.length > 0 ? (
                    <>
                      {CateGoryFilterBy.map((index) => {
                        return (
                          <>
                            {SUBCateGoryFilterBy.length > 0 ? (
                              <>
                                {SUBCateGoryFilterBy.map((indexS) => {
                                  return (
                                    <>
                                      {index === item.category_id &&
                                      indexS === item.sub_category_id ? (
                                        <>
                                          {/* {CateGoryFilterBy.length >= 1 && SUBCateGoryFilterBy.length >= 1 ?  
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb" style={{"overflow":"hidden"}}>
                <li className="breadcrumb-item">
                  <a href="#">Product Portflio</a>
                </li>
                <li className="breadcrumb-item">
                  <span>{item?.category?.parent?.name}</span>
                </li>
                <li className="breadcrumb-item">
                  <span >{item?.category?.name}</span>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  {count }
                </li>
              </ol>
            </nav>


: "" } */}

                                          <div className="col-lg-2 col-sm-4">
                                            <div className="product">
                                              <div className="product-image">
                                                <div
                                                  className="main-image"
                                                  onClick={() => {
                                                    navigate(
                                                      "/product-portfolio",
                                                      {
                                                        state: item,
                                                      }
                                                    );
                                                  }}
                                                >
                                                  <Slider
                                                    {...settingsMain}
                                                    asNavFor={nav2}
                                                    ref={slider1}
                                                  >
                                                    {item?.thumb_image && (
                                                      <div className="image-block">
                                                        <img
                                                          src={
                                                            item?.thumb_image
                                                              ?.file
                                                          }
                                                          alt=""
                                                        />
                                                      </div>
                                                    )}
                                                  </Slider>
                                                  <div className="action">
                                                    <button
                                                      className="edit-button"
                                                      onClick={(e) => {
                                                        e.preventDefault();
                                                        navigate(
                                                          "/edit-product",
                                                          { state: item }
                                                        );
                                                      }}
                                                    >
                                                      <EditIcon />
                                                    </button>
                                                    <button
                                                      className="delete-button"
                                                      onClick={(e) => {
                                                        e.preventDefault();
                                                        DelId = item.id;
                                                        DeletProductId(item.id);
                                                      }}
                                                    >
                                                      <DeleteIcon />
                                                    </button>
                                                  </div>
                                                </div>
                                                {/* <div className="product-thumb">
                                                  <Slider
                                                    {...settingsThumbs}
                                                    asNavFor={nav1}
                                                    ref={slider2}
                                                    focusOnSelect={true}
                                                  >
                                                    {item?.media &&
                                                      item?.media.map(
                                                        (itemt, indext) => (
                                                          <div className="image-block">
                                                            <img
                                                              src={itemt?.file}
                                                              alt=""
                                                            />
                                                          </div>
                                                        )
                                                      )}
                                                  </Slider>
                                                </div> */}
                                              </div>
                                              <div
                                                className="product-content"
                                                onClick={() => {
                                                  navigate(
                                                    "/product-portfolio",
                                                    {
                                                      state: item,
                                                    }
                                                  );
                                                }}
                                              >
                                                <h4 className="product-title">
                                                  {item?.name}
                                                </h4>
                                                {/*<div className="product-body">
                                                  <ul>
                                                    <li>
                                                      Min Order Value:{" "}
                                                      <strong>
                                                        {item?.min_order_value}
                                                        /-
                                                      </strong>
                                                    </li>
                                                     <li>
                                                      Stock Available:{" "}
                                                      <strong>500 pcs</strong>
                                                    </li> 
                                                    <li>
                                                      MOQ:{" "}
                                                      <strong>
                                                        {item?.order_qty} pc
                                                      </strong>
                                                    </li>
                                                  </ul>
                                                </div>*/}
                                              </div>
                                            </div>
                                          </div>
                                        </>
                                      ) : (
                                        " "
                                      )}
                                    </>
                                  );
                                })}
                              </>
                            ) : (
                              <>
                                {index === item.category_id ? (
                                  <>
                                    <div className="col-lg-2 col-sm-4">
                                      <div className="product">
                                        <div className="product-image">
                                          <div
                                            className="main-image"
                                            onClick={() => {
                                              navigate("/product-portfolio", {
                                                state: item,
                                              });
                                            }}
                                          >
                                            <Slider
                                              {...settingsMain}
                                              asNavFor={nav2}
                                              ref={slider1}
                                            >
                                              {item?.thumb_image && (
                                                <div className="image-block">
                                                  <img
                                                    src={
                                                      item?.thumb_image?.file
                                                    }
                                                    alt=""
                                                  />
                                                </div>
                                              )}
                                            </Slider>
                                            <div className="action">
                                              <button
                                                className="edit-button"
                                                onClick={(e) => {
                                                  e.preventDefault();
                                                  navigate("/edit-product", {
                                                    state: item,
                                                  });
                                                }}
                                              >
                                                <EditIcon />
                                              </button>
                                              <button
                                                className="delete-button"
                                                onClick={(e) => {
                                                  e.preventDefault();

                                                  DeletProductId(item.id);
                                                }}
                                              >
                                                <DeleteIcon />
                                              </button>
                                            </div>
                                          </div>
                                          {/* <div className="product-thumb">
                                            <Slider
                                              {...settingsThumbs}
                                              asNavFor={nav1}
                                              ref={slider2}
                                              focusOnSelect={true}
                                            >
                                              {item?.media &&
                                                item?.media.map(
                                                  (itemt, indext) => (
                                                    <div className="image-block">
                                                      <img
                                                        src={itemt?.file}
                                                        alt=""
                                                      />
                                                    </div>
                                                  )
                                                )}
                                            </Slider>
                                          </div> */}
                                        </div>
                                        <div
                                          className="product-content"
                                          onClick={() => {
                                            navigate("/product-portfolio", {
                                              state: item,
                                            });
                                          }}
                                        >
                                          <h4 className="product-title">
                                            {item?.name}
                                          </h4>
                                          {/*<div className="product-body">
                                            <ul>
                                              <li>
                                                Min Order Value:{" "}
                                                <strong>
                                                  {item?.min_order_value}/-
                                                </strong>
                                              </li>
                                               <li>
                                                Stock Available:{" "}
                                                <strong>500 pcs</strong>
                                              </li>
                                              <li>
                                                MOQ:{" "}
                                                <strong>
                                                  {item?.order_qty} pc
                                                </strong>
                                              </li>
                                            </ul>
                                          </div> */}
                                        </div>
                                      </div>
                                    </div>
                                  </>
                                ) : (
                                  " "
                                )}
                              </>
                            )}
                          </>
                        );
                      })}
                    </>
                  ) : (
                    <>
                      <div className="col-lg-2 col-sm-4">
                        <div className="product">
                          <div className="product-image">
                            <div
                              className="main-image"
                              onClick={() => {
                                navigate("/product-portfolio", {
                                  state: item,
                                });
                              }}
                            >
                              <Slider
                                {...settingsMain}
                                asNavFor={nav2}
                                ref={slider1}
                              >
                                {item?.thumb_image && (
                                  <div className="image-block">
                                    <img src={item?.thumb_image?.file} alt="" />
                                  </div>
                                )}
                              </Slider>
                              <div className="action">
                                <button
                                  className="edit-button"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    navigate("/edit-product", { state: item });
                                  }}
                                >
                                  <EditIcon />
                                </button>
                                <button
                                  className="delete-button"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    DelId = item.id;
                                    DeletProductId(item.id);
                                  }}
                                >
                                  {Loading && item.id == DelId ? (
                                    <PuffLoader loading={true} size={15} />
                                  ) : (
                                    <DeleteIcon />
                                  )}
                                </button>
                              </div>
                            </div>
                            {/* <div className="product-thumb">
                              <Slider
                                {...settingsThumbs}
                                asNavFor={nav1}
                                ref={slider2}
                                focusOnSelect={true}
                              >
                                {item?.media &&
                                  item?.media.map((itemt, indext) => (
                                    <div className="image-block">
                                      <img src={itemt?.file} alt="" />
                                    </div>
                                  ))}
                              </Slider>
                            </div> */}
                          </div>
                          <div
                            className="product-content"
                            onClick={() => {
                              navigate("/product-portfolio", { state: item });
                            }}
                          >
                            <h4 className="product-title">{item?.name}</h4>
                            {/*<div className="product-body">
                              <ul>
                                <li>
                                  Min Order Value:{" "}
                                  <strong>{item?.min_order_value}/-</strong>
                                </li>
                                 <li>
                                  Stock Available: <strong>500 pcs</strong>
                                </li>
                                <li>
                                  MOQ: <strong>{item?.order_qty} pc</strong>
                                </li>
                              </ul>
                            </div>*/}
                          </div>
                        </div>
                      </div>
                    </>
                  )
                )}
            </div>
          </div>
        </div>

        {ProductList.has_more === true ? (
          <div className="card-footer">
            <button
              className="seemore-link"
              onClick={() => {
                let co = count + 1;
                setCount(co);
              }}
            >
              View More <CaretDownIcon />
            </button>
          </div>
        ) : (
          " "
        )}
      </div>
    </>
  );
}
export default ProductPortfolioList;
