import { getMenuSections } from "./api.js";

const tabs = document.querySelectorAll(".menu-tab");
const contentPanel = document.querySelector("#contentPanel");
const signupScreen = document.querySelector("#signupScreen");
const signupForm = document.querySelector("#signupForm");
const createAccountBtn = document.querySelector("#createAccountBtn");
const signupModal = document.querySelector("#signupModal");
const signupModalBackdrop = document.querySelector("#signupModalBackdrop");
const closeSignupModal = document.querySelector("#closeSignupModal");
const createAccountForm = document.querySelector("#createAccountForm");
const modalPassword = document.querySelector("#modalPassword");
const toggleModalPassword = document.querySelector("#toggleModalPassword");
const signinFromModal = document.querySelector("#signinFromModal");
const topLogoutBtn = document.querySelector("#topLogoutBtn");
const ambulanceIconBtn = document.querySelector("#ambulanceIconBtn");
const settingsIconBtn = document.querySelector("#settingsIconBtn");
const menuHero = document.querySelector("#menuHero");
const menuTabs = document.querySelector("#menuTabs");
const systemContent = document.querySelector("#systemContent");
const sections = getMenuSections();
const costaRicaCenter = [9.9361, -84.0804];
const costaRicaBounds = [
  [8.03, -85.95],
  [11.22, -82.45],
];
let trackingMap;
let trackingRouteLayer;
let trackingMarkerLayer;
let startSelectedPlace = null;
let endSelectedPlace = null;

const activeTabClasses = [
  "bg-red-700/80",
  "text-white",
  "border-white/60",
  "shadow-[inset_0_1px_0_rgba(255,255,255,.45),0_16px_36px_rgba(153,27,27,.22)]",
  "backdrop-blur-2xl",
];
const inactiveTabClasses = [
  "bg-white/35",
  "text-emerald-900",
  "border-white/75",
  "hover:bg-white/65",
  "shadow-[inset_0_1px_0_rgba(255,255,255,.7),0_14px_30px_rgba(6,78,59,.1)]",
  "backdrop-blur-2xl",
];

function setupTabs() {
  tabs.forEach((tab) => {
    tab.classList.add(
      "min-h-12",
      "rounded-full",
      "border",
      "px-4",
      "text-sm",
      "font-bold",
      "transition",
      "active:scale-[.98]",
    );

    tab.addEventListener("click", () => {
      renderSection(tab.dataset.section);
    });
  });
}

function renderSection(sectionId) {
  const section = sections[sectionId] ?? sections.configuraciones;

  tabs.forEach((tab) => {
    const isActive = tab.dataset.section === sectionId;
    tab.classList.remove(...activeTabClasses, ...inactiveTabClasses);
    tab.classList.add(...(isActive ? activeTabClasses : inactiveTabClasses));
  });

  if (section.type === "tracking") {
    contentPanel.innerHTML = `
      <div class="grid gap-5">
        <div>
          <p class="text-sm font-bold uppercase text-red-700">Mapa abierto tipo Waze</p>
          <h2 class="mt-1 text-2xl font-bold text-slate-900">${section.title}</h2>
          <p class="mt-2 max-w-2xl text-slate-500">${section.intro}</p>
        </div>

        <form id="routeSearchForm" class="grid gap-3 rounded-lg border border-emerald-100 bg-white/90 p-4 shadow-sm md:grid-cols-[1fr_1fr_auto]">
          <label class="grid gap-2 text-sm font-bold text-emerald-950">
            Primera parte del lugar
            <span class="relative">
              <input
                id="routeStartInput"
                class="min-h-11 w-full rounded-md border border-emerald-100 bg-emerald-50 px-3 text-slate-900 outline-none focus:border-red-700 focus:ring-2 focus:ring-red-100"
                placeholder="Ej: Hospital Mexico"
                value="Hospital Mexico"
                autocomplete="off"
              />
              <div id="routeStartOptions" class="absolute left-0 right-0 top-[calc(100%+6px)] z-30 hidden max-h-64 overflow-y-auto rounded-lg border border-emerald-100 bg-white shadow-xl"></div>
            </span>
          </label>
          <label class="grid gap-2 text-sm font-bold text-emerald-950">
            Buscar la otra ubicacion
            <span class="relative">
              <input
                id="routeEndInput"
                class="min-h-11 w-full rounded-md border border-emerald-100 bg-emerald-50 px-3 text-slate-900 outline-none focus:border-red-700 focus:ring-2 focus:ring-red-100"
                placeholder="Ej: Hospital Calderon Guardia"
                value="Hospital Calderon Guardia"
                autocomplete="off"
              />
              <div id="routeEndOptions" class="absolute left-0 right-0 top-[calc(100%+6px)] z-30 hidden max-h-64 overflow-y-auto rounded-lg border border-emerald-100 bg-white shadow-xl"></div>
            </span>
          </label>
          <button
            class="self-end rounded-full border border-white/50 bg-[linear-gradient(135deg,rgba(255,255,255,.28),rgba(220,38,38,.82)_42%,rgba(153,27,27,.86))] px-5 py-3 text-sm font-bold text-white shadow-[inset_0_1px_0_rgba(255,255,255,.55),0_18px_42px_rgba(153,27,27,.24)] backdrop-blur-2xl transition hover:border-white/80 active:scale-[.98]"
            type="submit"
          >
            Calcular camino
          </button>
        </form>

        <p id="routeSearchStatus" class="rounded-lg border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-900">
          Escribe origen y destino para calcular el camino con datos abiertos.
        </p>

        <div class="overflow-hidden rounded-lg border border-emerald-100 bg-emerald-50 shadow-sm">
          <div id="trackingMap" class="relative z-0 h-[560px] min-h-[560px] w-full bg-white"></div>
        </div>
        <div class="grid gap-3 md:grid-cols-3">
          <article class="rounded-lg border border-emerald-100 bg-white p-4 shadow-sm">
            <p class="text-xs font-bold uppercase text-red-700">Motor</p>
            <p class="mt-1 font-bold text-emerald-950">Leaflet + OpenStreetMap</p>
          </article>
          <article class="rounded-lg border border-emerald-100 bg-white p-4 shadow-sm">
            <p class="text-xs font-bold uppercase text-red-700">Rutas</p>
            <p class="mt-1 font-bold text-emerald-950">OSRM</p>
          </article>
          <article class="rounded-lg border border-emerald-100 bg-white p-4 shadow-sm">
            <p class="text-xs font-bold uppercase text-red-700">Personas real-time</p>
            <p class="mt-1 font-bold text-emerald-950">Traccar / OwnTracks</p>
          </article>
        </div>
      </div>
    `;
    requestAnimationFrame(setupTrackingMap);
    return;
  }

  contentPanel.innerHTML = `
    <p class="text-sm font-bold uppercase text-red-700">Seccion</p>
    <h2 class="mt-1 text-2xl font-bold text-slate-900">${section.title}</h2>
    <p class="mt-2 max-w-2xl text-slate-500">${section.intro}</p>

    <div class="mt-6 grid gap-3">
      ${section.items
        .map(
          (item) => `
            <article class="rounded-lg border border-emerald-100 bg-emerald-50/70 p-4 shadow-sm">
              ${renderSectionItem(item)}
            </article>
          `,
        )
        .join("")}
    </div>
  `;
}

function renderSectionItem(item) {
  if (typeof item === "string") {
    return `<p class="text-slate-700">${item}</p>`;
  }

  const itemRoutes = {
    alerts: {
      sourcePath: "../frontend-alerts/index.html",
      buildPath: "../alerts/",
    },
    "routes-config": {
      sourcePath: "../frontend-routes-config/index.html",
      buildPath: "../routes-config/",
    },
    "maps-config": {
      sourcePath: "../frontend-maps-config/index.html",
      buildPath: "../maps-config/",
    },
  };
  const route = itemRoutes[item.href];
  const href = route
    ? (isSourceMenu() ? route.sourcePath : route.buildPath)
    : "#";

  return `
    <a
      class="font-bold text-red-700 transition hover:text-red-900"
      href="${href}"
    >
      ${item.label}
    </a>
  `;
}

function setupTrackingMap() {
  const mapElement = document.querySelector("#trackingMap");
  const form = document.querySelector("#routeSearchForm");
  const status = document.querySelector("#routeSearchStatus");
  const startInput = document.querySelector("#routeStartInput");
  const endInput = document.querySelector("#routeEndInput");
  const startOptions = document.querySelector("#routeStartOptions");
  const endOptions = document.querySelector("#routeEndOptions");

  if (!mapElement || mapElement.clientWidth === 0) {
    setTimeout(setupTrackingMap, 80);
    return;
  }

  if (trackingMap) {
    trackingMap.off();
    trackingMap.remove();
    trackingMap = null;
  }

  trackingMap = L.map(mapElement, {
    maxBounds: costaRicaBounds,
    maxBoundsViscosity: 0.75,
    preferCanvas: true,
    scrollWheelZoom: true,
    zoomControl: true,
  });

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    minZoom: 7,
    attribution: "&copy; OpenStreetMap contributors",
    crossOrigin: true,
  }).addTo(trackingMap);

  trackingMap.fitBounds(costaRicaBounds, { padding: [22, 22] });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    status.textContent = "Buscando ubicaciones y calculando ruta...";

    try {
      const startQuery = startInput.value;
      const endQuery = endInput.value;
      const start = startSelectedPlace?.label === startQuery
        ? startSelectedPlace
        : await geocodeCostaRica(startQuery);
      const end = endSelectedPlace?.label === endQuery
        ? endSelectedPlace
        : await geocodeCostaRica(endQuery);
      const route = await getOsrmRoute(start, end);
      renderTrackingRoute(start, end, route);
      status.textContent = `Ruta calculada: ${(route.distance / 1000).toFixed(1)} km, ${(route.duration / 60).toFixed(0)} min aprox.`;
    } catch (error) {
      status.textContent = "No se pudo calcular la ruta. Prueba con nombres mas especificos.";
    }
  });

  setupPlaceAutocomplete(startInput, startOptions, (place) => {
    startSelectedPlace = place;
  });
  setupPlaceAutocomplete(endInput, endOptions, (place) => {
    endSelectedPlace = place;
  });

  mapElement.__leafletReady = true;
  fitCostaRicaMap();
  setTimeout(fitCostaRicaMap, 120);
  setTimeout(fitCostaRicaMap, 350);
  setTimeout(fitCostaRicaMap, 800);
}

function fitCostaRicaMap() {
  if (!trackingMap) {
    return;
  }

  trackingMap.invalidateSize(true);
  trackingMap.fitBounds(costaRicaBounds, { padding: [22, 22] });
}

function setupPlaceAutocomplete(input, optionsContainer, onSelect) {
  let timeoutId;

  input.addEventListener("input", () => {
    onSelect(null);
    clearTimeout(timeoutId);

    const query = input.value.trim();
    if (query.length < 3) {
      hideOptions(optionsContainer);
      return;
    }

    timeoutId = setTimeout(async () => {
      try {
        const places = await searchCostaRicaPlaces(query);
        renderPlaceOptions(optionsContainer, places, (place) => {
          input.value = place.label;
          onSelect(place);
          hideOptions(optionsContainer);
        });
      } catch (error) {
        hideOptions(optionsContainer);
      }
    }, 350);
  });

  input.addEventListener("blur", () => {
    setTimeout(() => hideOptions(optionsContainer), 160);
  });
}

function renderPlaceOptions(container, places, onSelect) {
  if (places.length === 0) {
    container.innerHTML = `<p class="px-3 py-3 text-sm text-slate-500">Sin resultados en Costa Rica.</p>`;
    container.classList.remove("hidden");
    return;
  }

  container.innerHTML = places
    .map(
      (place, index) => `
        <button
          class="block w-full border-b border-emerald-50 px-3 py-3 text-left text-sm text-slate-700 transition last:border-b-0 hover:bg-emerald-50"
          data-place-index="${index}"
          type="button"
        >
          <span class="block font-bold text-emerald-950">${place.shortName}</span>
          <span class="mt-1 block text-xs text-slate-500">${place.label}</span>
        </button>
      `,
    )
    .join("");

  container.querySelectorAll("[data-place-index]").forEach((button) => {
    button.addEventListener("mousedown", (event) => {
      event.preventDefault();
      onSelect(places[Number(button.dataset.placeIndex)]);
    });
  });

  container.classList.remove("hidden");
}

function hideOptions(container) {
  container.classList.add("hidden");
  container.innerHTML = "";
}

async function searchCostaRicaPlaces(query) {
  const url = new URL("https://nominatim.openstreetmap.org/search");
  url.searchParams.set("format", "jsonv2");
  url.searchParams.set("limit", "6");
  url.searchParams.set("countrycodes", "cr");
  url.searchParams.set("addressdetails", "1");
  url.searchParams.set("q", `${query}, Costa Rica`);

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Place search failed");
  }

  const results = await response.json();
  return results.map((result) => ({
    label: result.display_name,
    shortName: result.name || result.display_name.split(",")[0],
    latitude: Number(result.lat),
    longitude: Number(result.lon),
  }));
}

async function geocodeCostaRica(query) {
  const url = new URL("https://nominatim.openstreetmap.org/search");
  url.searchParams.set("format", "jsonv2");
  url.searchParams.set("limit", "1");
  url.searchParams.set("countrycodes", "cr");
  url.searchParams.set("q", `${query}, Costa Rica`);

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Geocoding failed");
  }

  const results = await response.json();
  if (!results.length) {
    throw new Error("Location not found");
  }

  return {
    label: results[0].display_name,
    name: results[0].display_name,
    latitude: Number(results[0].lat),
    longitude: Number(results[0].lon),
  };
}

async function getOsrmRoute(start, end) {
  const coordinates = `${start.longitude},${start.latitude};${end.longitude},${end.latitude}`;
  const url = `https://router.project-osrm.org/route/v1/driving/${coordinates}?overview=full&geometries=geojson`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Route failed");
  }

  const data = await response.json();
  if (!data.routes?.[0]) {
    throw new Error("Route not found");
  }

  return data.routes[0];
}

function renderTrackingRoute(start, end, route) {
  if (trackingRouteLayer) {
    trackingRouteLayer.remove();
  }

  if (trackingMarkerLayer) {
    trackingMarkerLayer.remove();
  }

  const points = route.geometry.coordinates.map(([longitude, latitude]) => [
    latitude,
    longitude,
  ]);

  trackingRouteLayer = L.polyline(points, {
    color: "#dc2626",
    opacity: 0.92,
    weight: 6,
  }).addTo(trackingMap);

  trackingMarkerLayer = L.layerGroup([
    L.marker([start.latitude, start.longitude]).bindPopup(`Origen: ${start.label ?? start.name}`),
    L.marker([end.latitude, end.longitude]).bindPopup(`Destino: ${end.label ?? end.name}`),
  ]).addTo(trackingMap);

  trackingMap.fitBounds(trackingRouteLayer.getBounds(), { padding: [28, 28] });
}

function isSourceMenu() {
  return window.location.pathname.includes("frontend-menu");
}

function enterSystem() {
  closeCreateAccountModal();
  signupScreen.classList.add("hidden");
  menuHero.classList.remove("hidden");
  menuTabs.classList.remove("hidden");
  menuTabs.classList.add("grid");
  systemContent.classList.remove("hidden");
  renderSection("tracking");
}

function openCreateAccountModal() {
  signupModal.classList.remove("hidden");
  signupModal.classList.add("flex");
  signupModal.setAttribute("aria-hidden", "false");
}

function closeCreateAccountModal() {
  signupModal.classList.add("hidden");
  signupModal.classList.remove("flex");
  signupModal.setAttribute("aria-hidden", "true");
}

setupTabs();
signupForm.addEventListener("submit", (event) => {
  event.preventDefault();
  enterSystem();
});
createAccountBtn.addEventListener("click", openCreateAccountModal);
topLogoutBtn.addEventListener("click", () => {
  signupForm.reset();
  closeCreateAccountModal();
  menuHero.classList.add("hidden");
  menuTabs.classList.add("hidden");
  menuTabs.classList.remove("grid");
  systemContent.classList.add("hidden");
  signupScreen.classList.remove("hidden");
});
ambulanceIconBtn.addEventListener("click", () => {
  renderSection("tracking");
  setTimeout(fitCostaRicaMap, 120);
});
settingsIconBtn.addEventListener("click", () => {
  renderSection("configuraciones");
});
closeSignupModal.addEventListener("click", closeCreateAccountModal);
signupModalBackdrop.addEventListener("click", closeCreateAccountModal);
signinFromModal.addEventListener("click", closeCreateAccountModal);
createAccountForm.addEventListener("submit", (event) => {
  event.preventDefault();
  enterSystem();
});
toggleModalPassword.addEventListener("click", () => {
  const isHidden = modalPassword.type === "password";
  modalPassword.type = isHidden ? "text" : "password";
  toggleModalPassword.textContent = isHidden ? "Hide" : "Show";
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !signupModal.classList.contains("hidden")) {
    closeCreateAccountModal();
  }
});
