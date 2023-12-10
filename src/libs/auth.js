import { post } from "./http-hydrate";

const register = async (formdata) => {
  //  validate first
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  try {
    const response = await post("/register", formdata, config);
    if (response.status === 200 && response.data.type === "OK") {
      localStorage.setItem("user", JSON.stringify(response.data.data));
    }
    return response.data;
  } catch (error) {
    console.error("REGISTER ERROR!!!");
    return new Error("ERROR occured while registering new user");
  }
};

const login = async (formdata) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  try {
    const response = await post("/login", formdata, config);
    if (response.status === 200) {
      const userData = response.data.data;
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: userData.name,
          token: userData.token,
          slug: userData.slug,
          id: userData.id,
          is_buyer: userData.is_buyer,
          is_seller: userData.is_seller,
          profile_image:userData.profile_image,
          verified_at:userData.verified_at
        })
      );
    }
    return response.data;
  } catch (error) {
    console.error("LOGIN ERROR!!!", error);
    return error.response;
  }
};

const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("dark");
  localStorage.getItem("logoutThemeDark");
};

const getAuthToken = () => {
  console.log("calling get auth token");
  return localStorage.getItem("user")
    ? `Bearer ${JSON.parse(localStorage.getItem("user")).token}`
    : null;
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const Auth = { register, login, logout, getCurrentUser, getAuthToken };

export default Auth;
