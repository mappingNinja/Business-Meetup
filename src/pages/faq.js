import React, { useEffect, useState } from "react";
import "../common/scss/pages/faq.scss";
import Header from "../common/header";
import { ReactComponent as SearchIcon } from "../assets/images/search-icon.svg";
import { get } from "../libs/http-hydrate";
import Auth from "../libs/auth";

function Faq() {
  const user = Auth.getCurrentUser();
  const [faqData, setFaqData] = useState([]);
  const [search, setSearch] = useState(null);

  const getFaqs = (value) => {
    const baseUrl = `/general/content?${
      value ? `search=${value}&` : ""
    }type=support_faq`;

    get(baseUrl, {
      headers: { Authorization: `Bearer ${user.token}` },
    })
      .then((response) => {
        setFaqData(response.data.data);
      })
      .catch((err) => {
        console.log("🚀 HMR ~ file: faq.js:26 ~ getFaqs ~ err", err);
      });
  };

  const handleSearchChange = (e) => {
    const { value } = e.target;

    setSearch(value);
  };

  useEffect(() => {
    getFaqs(search);
  }, [search]);

  return (
    <>
      <Header home />

      <div className="grey-bg">
        <div className="page-banner">
          <div className="content">
            <h6>Help FAQs</h6>
            <h1>Ask us anything</h1>
            <p>Have any questions? We're here to assist you.</p>
            <div className="search-box">
              <input
                type="text"
                className="form-input"
                style={{ color: "#000" }}
                name="search"
                value={search}
                onChange={handleSearchChange}
                placeholder="Search"
              />
              <button className="search-button">
                <SearchIcon />
              </button>
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <div className="faqs row">
            {faqData?.length > 0 &&
              faqData.map((item) => (
                <div key={item?.id} className="col-sm-4">
                  <div className="icon"><img src={item?.icon} /></div>
                  <h6>{item?.title}</h6>
                  <p>{item?.content}</p>
                </div>
              ))}
          </div>
          <div className="cta-section">
            <div className="cta-section--left">
              <h6>Still have questions?</h6>
              <p>
                Can’t find the answer you’re looking for? Please chat to our
                friendly team.
              </p>
            </div>
            <div className="cta-section--right">
              <a href="/contact-us" className="button">
                Get in touch
              </a>
            </div>
          </div>
          <div className="space-bottom"></div>
        </div>
      </div>
    </>
  );
}

export default Faq;
