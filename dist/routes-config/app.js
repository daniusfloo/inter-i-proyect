import { getRouteConfigurationItems } from "./api.js";

const menuLink = document.querySelector("#menuLink");

menuLink.href = window.location.pathname.includes("frontend-routes-config")
  ? "../frontend-menu/index.html"
  : "../menu/";

getRouteConfigurationItems();
