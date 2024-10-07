import {appContext} from "../../context/app-context.ts";
import {FormattedUser} from "../../utils/interfaces.ts";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const teacherInfoCloseBtn = document.querySelector<HTMLElement>('#info-close-btn');
const teacherInfoPopup = document.querySelector<HTMLDialogElement>('#teacher-info');

function addShowPopupEvent(element: Element | null) {
    element?.addEventListener('click', event => {
        const card = (event.target as HTMLElement).closest('.card');
        if (!card) return;

        const userID = card.getAttribute('data-user-id');
        if (userID) {
            const teacher = appContext.getTeacherById(userID);
            if (teacher) {
                appContext.currentTeacher = teacher;
                updateTeacherInfoPopup(teacher);
            }
        }
        teacherInfoPopup?.showModal();
    });
}

teacherInfoCloseBtn?.addEventListener('click', () => {
    if (mapDiv) {
        mapDiv.classList.toggle('map-invisible');
    }
    teacherInfoPopup?.close();
});

function updateTeacherInfoPopup(user: FormattedUser) {
    const teacherInfoElem = document.querySelector<HTMLElement>('.main-teacher-info');
    teacherInfoElem?.setAttribute('data-user-id', user.id);

    const teacherImage = teacherInfoElem?.children[0];
    teacherImage?.children[0].setAttribute("src", user.picture_large ?? '../images/photo.jpg');

    const teacherInfo = teacherInfoElem?.children[1].children as HTMLCollection;
    updateElementText(teacherInfo[0], user.full_name);
    updateElementText(teacherInfo[1], user.course);
    updateElementText(teacherInfo[2], `${user.city}, ${user.country}`);
    updateElementText(teacherInfo[3], `${user.age}, ${user.gender}`);
    updateElementText(teacherInfo[4], user.email ?? 'email@gmail.com');
    updateElementText(teacherInfo[5], user.phone ?? '097 781 8811');
    updateElementText(teacherInfo[6], user.favorite ? '★' : '☆');

    const description = document.querySelector<HTMLElement>('.description');
    if (description) {
        description.innerText = user.note;
    }

}

function addMap(teacher: FormattedUser) {
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

function updateElementText(element: Element | undefined, text: string) {
    if (element) {
        (element as HTMLElement).innerText = text;
    }
}

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

const teacherGrid = document.querySelector('.all-teachers');
const teacherScroll = document.querySelector('.scroll');

addShowPopupEvent(teacherGrid);
addShowPopupEvent(teacherScroll);
