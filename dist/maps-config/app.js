import { getMapStyles } from "./api.js";

const menuLink = document.querySelector("#menuLink");

menuLink.href = window.location.pathname.includes("frontend-maps-config")
  ? "../frontend-menu/index.html"
  : "../menu/";

getMapStyles();
