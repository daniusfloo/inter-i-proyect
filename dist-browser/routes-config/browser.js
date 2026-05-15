function getRouteConfigurationItems() {
  return [
    "ruta congestionada",
    "ruta mas optima para un viaje",
    "ruta de frecuente movilizacion de servicios de emergencia",
  ];
}


const menuLink = document.querySelector("#menuLink");

menuLink.href = window.location.pathname.includes("frontend-routes-config")
  ? "../frontend-menu/index.html"
  : "../menu/";

getRouteConfigurationItems();
