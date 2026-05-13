export function getMenuSections() {
  return {
    configuraciones: {
      title: "Configuraciones",
      intro: "Opciones generales para preparar el uso del sistema.",
      items: [
        "configuraciones de alertas",
        "configuracion de rutas",
        "configuracion de maps",
      ],
    },
    ayuda: {
      title: "Ayuda",
      intro: "Guia rapida para entender las pantallas disponibles.",
      items: [
        "no se puede iniciar sesion",
        "atencion al cliente",
        "modo conducir",
      ],
    },
    registro: {
      title: "Acceso a cuenta",
      intro: "Formulario visual para iniciar sesion en el sistema.",
      type: "login",
      items: [],
    },
    informacion: {
      title: "Informacion",
      intro: "Datos generales de S.E.A.",
      items: [
        "S.E.A significa Servicio de Emergencia en Ambulancia.",
        "El sistema muestra ambulancias, hospitales y ubicaciones de emergencia.",
        "La vista de mensajes esta pensada para recibir informacion sin modificarla.",
      ],
    },
    numeros: {
      title: "Numeros de emergencia",
      intro: "Contactos utiles para situaciones criticas.",
      items: [
        "Emergencias Costa Rica: 9-1-1.",
        "Cruz Roja Costarricense: consulta local segun region.",
        "Bomberos: 9-1-1 para atencion inmediata.",
      ],
    },
  };
}
