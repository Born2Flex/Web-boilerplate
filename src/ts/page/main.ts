import {formatShortTeacherCard, formatTeacherCard} from "./teacher-card/teacher-card";
import {FormattedUser} from "../utils/interfaces";
import {clearFilters} from "./operations/filtering";
import {addTeachersInTable} from "./operations/sorting";
import {appContext} from "../context/app-context";
import {addPagination} from "./pagination/pagination";

const teacherGrid = document.querySelector('.all-teachers');
const teacherScroll = document.querySelector('.scroll');

export function addTeachersOnPage() {
    addAllTeachersOnGrid();
    addFavTeachersOnScroll();
    addTeachersInTable();
    addPagination();
}

export function addAllTeachersOnGrid() {
    let html = '';
    appContext.getDisplayedTeachers().forEach(user => {
        html += formatTeacherCard(user);
    })
    if (teacherGrid) {
        teacherGrid.innerHTML = html;
    }
}

function addFavTeachersOnScroll() {
    let html = '';
    appContext.getDisplayedTeachers().filter(user => user.favorite)
        .forEach(user => {
            html += formatShortTeacherCard(user);
        })
    if (teacherScroll) {
        teacherScroll.innerHTML = html;
    }
}

// Teacher info popup

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
                updateTeacherInfoPopup(teacher);
            }
        }
        teacherInfoPopup?.showModal();
    });
}

addShowPopupEvent(teacherGrid);
addShowPopupEvent(teacherScroll);

teacherInfoCloseBtn?.addEventListener('click', () => {
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

function updateElementText(element: Element | undefined, text: string) {
    if (element) {
        (element as HTMLElement).innerText = text;
    }
}

// Favorite Btn

const favoriteBtn = document.querySelector(".favorite-btn") as HTMLElement;

favoriteBtn.addEventListener('click', event => {
    const teacherInfoElem = (event.target as HTMLElement).closest<HTMLElement>('.main-teacher-info');
    const userID = teacherInfoElem?.getAttribute('data-user-id');
    if (userID) {
        const teacher = appContext.getTeacherById(userID);
        if (teacher) {
            teacher.favorite = !teacher.favorite;
        }
    }
    favoriteBtn.innerText = favoriteBtn.innerText === '☆' ? '★' : '☆';
    addTeachersOnPage();
    clearFilters();
});

