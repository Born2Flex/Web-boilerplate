import {FormattedUser} from "../../utils/interfaces.ts";
import {appContext} from "../../context/app-context.ts";
import L from "leaflet";

const toggleMapButton = document.querySelector('#show-map');
const mapDiv = document.querySelector('#map');

toggleMapButton?.addEventListener('click', () => {
    if (mapDiv) {
        mapDiv.classList.toggle('map-invisible');
    }
    setTimeout(() => {
        if (appContext.currentTeacher) {
            addMap(appContext.currentTeacher);
        }
    }, 100);
});

export function addMap(teacher: FormattedUser) {
    if(appContext.map !== undefined) {
        appContext.map.off();
        appContext.map.remove();
    }
    const m_mono = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    });
    const coords: [number, number] = [
        Number(teacher.coordinates?.latitude ?? 50.4645),
        Number(teacher.coordinates?.longitude ?? 30.519394197007927)
    ];
    appContext.map = L.map('map', {
        center: coords,
        zoom: 11,
        zoomControl: true,
        layers: [m_mono]
    });

    L.control.scale({
        imperial: false,
        maxWidth: 300
    }).addTo(appContext.map);

    L.marker(coords).addTo(appContext.map);
}

const teacherInfoCloseBtn = document.querySelector<HTMLElement>('#info-close-btn');
const teacherInfoPopup = document.querySelector<HTMLDialogElement>('#teacher-info');

teacherInfoCloseBtn?.addEventListener('click', () => {
    if (mapDiv) {
        mapDiv.classList.add('map-invisible');
    }
    teacherInfoPopup?.close();
});
