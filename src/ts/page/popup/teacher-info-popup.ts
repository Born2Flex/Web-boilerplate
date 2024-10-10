import './map';
import {appContext} from "../../context/app-context.ts";
import {FormattedUser} from "../../utils/interfaces.ts";
import "leaflet/dist/leaflet.css";
import dayjs from "dayjs";

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

function updateTeacherInfoPopup(user: FormattedUser) {
    const teacherInfoElem = document.querySelector<HTMLElement>('.main-teacher-info');
    teacherInfoElem?.setAttribute('data-user-id', user.id);
    const teacherImage = teacherInfoElem?.children[0];
    teacherImage?.children[0].setAttribute("src", user.picture_large ?? '/src/images/photo.jpg');

    const teacherInfo = teacherInfoElem?.children[1].children as HTMLCollection;
    updateElementText(teacherInfo[0], user.full_name);
    updateElementText(teacherInfo[1], user.course);
    updateElementText(teacherInfo[2], `${user.city}, ${user.country}`);
    updateElementText(teacherInfo[3], `${user.age}, ${user.gender}`);
    updateElementText(teacherInfo[4], user.email ?? 'email@gmail.com');
    updateElementText(teacherInfo[5], user.phone ?? '097 781 8811');
    updateElementText(teacherInfo[6].children[1], getDaysUntilNextBirthday(user).toString());
    updateElementText(teacherInfo[7], user.favorite ? '★' : '☆');

    const description = document.querySelector<HTMLElement>('.description');
    if (description) {
        description.innerText = user.note;
    }

}

function getDaysUntilNextBirthday(teacher: FormattedUser): number {
    const today = dayjs().startOf('day');
    let nextBirthday = dayjs(teacher.b_day).year(today.year()).startOf('day');
    if (nextBirthday.isBefore(today, 'day')) {
        nextBirthday = nextBirthday.add(1, 'year');
    }
    return nextBirthday.diff(today, 'day');
}

function updateElementText(element: Element | undefined, text: string) {
    if (element) {
        (element as HTMLElement).innerText = text;
    }
}

[document.querySelector('.all-teachers'), document.querySelector('.scroll')].forEach(elem => addShowPopupEvent(elem));
