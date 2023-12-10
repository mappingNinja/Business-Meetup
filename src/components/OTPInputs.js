import React from "react";

export default function OTPInputs(props) {
  const { verificationCode, setCallError, setClickEvent, setVerificationCode } =
    props;

  const onChange = (e, field) => {
    e.preventDefault();
    setCallError("changePassword", false, "");
    setClickEvent("changePassword", false);
    const { value, name } = e.target;
    const [fieldName, index] = name.split("-");
    // making sure user can enter only one digit number.
    const v = value.charAt(value.length - 1);
    if (v !== null && v !== "") {
      setVerificationCodeValue(v, field);
      // Get the next input field using it's name
      const nextfield = document.querySelector(
        `input[name=${fieldName}-${parseInt(index) + 1}]`
      );

      // If found, focus the next field
      if (nextfield !== null) {
        nextfield.focus();
      }
    } else {
      setVerificationCodeValue("", field);
      const nextfield = document.querySelector(
        `input[name=${fieldName}-${parseInt(index) - 1}]`
      );
      if (nextfield !== null) {
        nextfield.focus();
      }
    }
  };

  const setVerificationCodeValue = (value, field) => {
    const newCode = [...verificationCode];
    newCode[field] = value;
    setVerificationCode(newCode);
  };

  return (
    <>
      <div className="form-field">
        <input
          type="text"
          name="otp-1"
          className="form-input"
          value={verificationCode[0]}
          onChange={(e) => onChange(e, 0)}
          required
        />
        <input
          type="text"
          name="otp-2"
          className="form-input"
          required
          value={verificationCode[1]}
          onChange={(e) => onChange(e, 1)}
        />
        <input
          type="text"
          name="otp-3"
          className="form-input"
          required
          value={verificationCode[2]}
          onChange={(e) => onChange(e, 2)}
        />
        <input
          type="text"
          name="otp-4"
          className="form-input"
          required
          value={verificationCode[3]}
          onChange={(e) => onChange(e, 3)}
        />
        <input
          type="text"
          name="otp-5"
          className="form-input"
          required
          value={verificationCode[4]}
          onChange={(e) => onChange(e, 4)}
        />
        <input
          type="text"
          name="otp-6"
          className="form-input"
          required
          value={verificationCode[5]}
          onChange={(e) => onChange(e, 5)}
        />
      </div>
    </>
  );
}
