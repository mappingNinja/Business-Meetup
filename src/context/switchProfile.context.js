import React, { createContext, useState } from "react";

const { buyer, buyerAccount } = (localStorage || {})
console.log('check this is  : ', buyer, buyerAccount)
const initialState = {
  buyer: localStorage.buyer || false,
  buyerAccount: localStorage.buyerAccount || false
};

// console.log('check initial states ; ', initialState)
export const SwitchProfile = createContext();

export const SwitchProfileProvider = (props) => {
  const [accountFor, setAccountFor] = useState(initialState);

  const setBuyer = () => {
    setAccountFor({ buyer: true });
    localStorage.setItem("buyer", true);
  };
  const setSeller = () => {
    setAccountFor({ buyer: false });
    localStorage.setItem("buyer", false);
  };

  const setBuyerAccount = () => {
    console.log('check before set buyer : ', localStorage.buyer, localStorage.buyerAccount)
    setAccountFor({ buyer: true });
    localStorage.setItem("buyer", true);
    localStorage.setItem("buyerAccount", true);
    console.log('check after set buyer : ', localStorage.buyer, localStorage.buyerAccount)
  };
  const setSellerAccount = () => {
    console.log('check before set seller : ', localStorage.buyer, localStorage.buyerAccount)
    setAccountFor({ buyer: false });
    localStorage.setItem("buyer", false);
    localStorage.setItem("buyerAccount", false);
    console.log('check before set seller : ', localStorage.buyer, localStorage.buyerAccount)

  };

  const toggleAccount = () => {
    setAccountFor((prev) => {
      console.log('check this is the buyer for check prev : ', prev)
      localStorage.setItem("buyer", !prev.buyer);
      localStorage.setItem("buyerAccount", !prev.buyer);

      return {
        buyer: !prev.buyer,
        buyerAccount: !prev.buyer
      };
    });
  };

  return (
    <SwitchProfile.Provider
      value={{
        accountFor,
        setBuyer,
        setSeller,
        toggleAccount,
        setBuyerAccount,
        setSellerAccount,
      }}
    >
      {props.children}
    </SwitchProfile.Provider>
  );
};
