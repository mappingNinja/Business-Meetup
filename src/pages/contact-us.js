/**
 * This is an example file in case you want to create a new component.
 * Jest copy contents from this and start editing html.
 * function returns JSX so you will want to convert your HTMl into JSX
 * before pasting it in here.
 * go here to convert HTML to JSX: https://transform.tools/html-to-jsx
 */
import React, { useState } from "react";
import Header from "../common/header";
import "../common/scss/pages/landing.scss";
import ContactVector from "../assets/images/contact-vector.svg";
import isEmail from "validator/lib/isEmail";
import FieldValidationError from "../components/error-messages/field-validation-error";
import { post } from "../libs/http-hydrate";

function ContactUs() {
  const initialValue = {
    name: { value: "", validation: true },
    email: { value: "", validation: true },
    message: { value: "", validation: true },
  };
  const [fields, setFields] = useState(initialValue);
  const [submitted, setSubmitted] = useState({
    clickEvent: false,
    validation: false,
    done: false,
    loading: false,
    error: "",
  });

  const setFieldValue = (name, value) => {
    setFields((prev) => {
      return {
        ...prev,
        [name]: {
          ...prev[name],
          value,
          validation: true,
        },
      };
    });
    setSubmitted((prev) => {
      return {
        ...prev,
        clickEvent: false,
        done: false,
        loading: false,
        error: "",
      };
    });
  };

  const setFieldValidation = (name, validation) => {
    setFields((prev) => {
      return {
        ...prev,
        [name]: {
          ...prev[name],
          validation,
        },
      };
    });
  };

  const validateFields = () => {
    const { name, email, message } = fields;
    if (
      name.value &&
      name.validation &&
      email.value &&
      email.validation &&
      message.validation &&
      message.value
    ) {
      setSubmitted((prev) => {
        return {
          ...prev,
          validation: true,
        };
      });
      return true;
    } else {
      setSubmitted((prev) => {
        return {
          ...prev,
          validation: false,
          loading: false,
          error: "Please enter valid information for us to get back to you.",
        };
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted((prev) => {
      return {
        ...prev,
        clickEvent: true,
        loading: true,
      };
    });
    if (validateFields()) {
      console.log(fields);
      const formData = new FormData();
      formData.append("name", fields.name.value);
      formData.append("email", fields.email.value);
      formData.append("description", fields.message.value);
      try {
        const response = await post("/contact_us", formData);
        if (response.status === 200) {
          setSubmitted((prev) => {
            return {
              ...prev,
              done: true,
              loading: false,
            };
          });
          setFields(initialValue);
        }
      } catch (error) {
        setSubmitted((prev) => {
          return {
            ...prev,
            done: false,
            error: error.response.data.message,
          };
        });
      }
    }
  };

  return (
    <>
      <Header home />
      <div className="landing-page contact-page">
        <div className="container-fluid">
          <div className="landing-page--left">
            <div className="heading">
              <h4>
                Contact{" "}
                <span className="color-primary">Business Social Media !</span>{" "}
              </h4>
              <h5>Want to get in touch? We'd love to hear from you.</h5>
            </div>
            <div className="form">
              <form onSubmit={handleSubmit}>
                <div className="form-field">
                  <label className="form-label">Name</label>
                  <input
                    required
                    type="text"
                    name="name"
                    className="form-input"
                    placeholder="Enter full name"
                    onInvalid={(e) =>
                      e.target.setCustomValidity("Please enter your full name")
                    }
                    onInput={(e) => e.target.setCustomValidity("")}
                    value={fields.name.value}
                    onChange={(e) => setFieldValue("name", e.target.value)}
                    onBlur={(e) => {
                      !fields.name.value && setFieldValidation("name", false);
                    }}
                  />
                  {!fields.name.validation && (
                    <FieldValidationError message="Please enter a valid name" />
                  )}
                </div>
                <div className="form-field">
                  <label className="form-label">Email</label>
                  <input
                    required
                    onInvalid={(e) =>
                      e.target.setCustomValidity("Please enter your email")
                    }
                    onInput={(e) => e.target.setCustomValidity("")}
                    type="email"
                    name="email"
                    className="form-input"
                    placeholder="Enter your email id"
                    value={fields.email.value}
                    onChange={(e) => setFieldValue("email", e.target.value)}
                    onBlur={(e) =>
                      setFieldValidation("email", isEmail(e.target.value))
                    }
                  />
                  {!fields.email.validation && (
                    <FieldValidationError message="Please enter a valid email" />
                  )}
                </div>
                <div className="form-field">
                  <label className="form-label">Message</label>
                  <textarea
                    name="message"
                    required
                    onInvalid={(e) =>
                      e.target.setCustomValidity("Please enter the details")
                    }
                    onInput={(e) => e.target.setCustomValidity("")}
                    className="form-input"
                    placeholder="Enter message"
                    value={fields.message.value}
                    onChange={(e) => setFieldValue("message", e.target.value)}
                    onBlur={(e) => {
                      !fields.message.value &&
                        setFieldValidation("message", false);
                    }}
                  />
                  {!fields.message.validation && (
                    <FieldValidationError message="Please enter a valid message" />
                  )}
                </div>
                <div className="form-button">
                  <input
                    className={`button button-primary ${
                      submitted.clickEvent
                        ? submitted.loading
                          ? ""
                          : submitted.done
                          ? "button-green"
                          : "button-red"
                        : "Submit"
                    }`}
                    type="submit"
                    value={
                      submitted.clickEvent
                        ? submitted.loading
                          ? "loading..."
                          : submitted.done
                          ? "Sent!"
                          : "Submit"
                        : "Submit"
                    }
                  />
                </div>
              </form>
              {submitted.clickEvent &&
                !submitted.loading &&
                (!submitted.validation || !submitted.done) && (
                  <FieldValidationError message={submitted.error} />
                )}
            </div>
          </div>
          <div className="landing-page--right">
            <img src={ContactVector} alt="ContactVector" />
          </div>
        </div>
      </div>
    </>
  );
}

export default ContactUs;
