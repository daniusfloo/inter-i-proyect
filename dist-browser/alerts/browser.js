function getAlertTypes() {
  return ["alerta ruidosa", "alerta original", "alerta personalizada"];
}


const menuLink = document.querySelector("#menuLink");

menuLink.href = window.location.pathname.includes("frontend-alerts")
  ? "../frontend-menu/index.html"
  : "../menu/";

getAlertTypes();
