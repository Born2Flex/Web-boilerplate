import {formatShortTeacherCard, formatTeacherCard} from "./teacher-card/teacher-card";
import {addTeachersInTable} from "./operations/sorting";
import {appContext} from "../context/app-context";
import {addPagination} from "./pagination/pagination";
import {updateChart} from "./chart/chart.ts";


const teacherGrid = document.querySelector('.all-teachers');
const teacherScroll = document.querySelector('.scroll');

export function addTeachersOnPage() {
    addAllTeachersOnGrid();
    addFavTeachersOnScroll();
    addTeachersInTable();
    addPagination();
    updateChart();
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
