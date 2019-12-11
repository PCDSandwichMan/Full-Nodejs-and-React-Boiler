import constants from "../constants";
import axios from "axios";

const authSet = token => {
  const formatToken = `Bearer ${token}`;
  localStorage.setItem("token", formatToken);
  axios.defaults.headers.common["Authorization"] = formatToken;
};

