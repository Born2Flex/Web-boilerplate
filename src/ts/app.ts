console.log("Hello world!");

import '../css/app.css';



const addTeacherBtn = document.querySelectorAll('.add-teacher');
const addTeacherPopup = document.querySelector('#add-teacher') as HTMLElement;
const addTeacherCloseBtn = document.querySelector('#add-close-btn') as HTMLElement;
const teacherInfoCloseBtn = document.querySelector('#info-close-btn') as HTMLElement;

const teachersImages = document.querySelectorAll('.teacher-image');
const teacherInfoPopup = document.querySelector('#teacher-info') as HTMLElement;


addTeacherBtn.forEach(btn => btn.addEventListener('click', () => {
    addTeacherPopup.classList.add('visible');
}));

teachersImages.forEach(teacher => teacher.addEventListener('click', () => {
    teacherInfoPopup.classList.add('visible');
}));

addTeacherCloseBtn.addEventListener('click', () => {
    addTeacherPopup.classList.remove('visible');
});

teacherInfoCloseBtn.addEventListener('click', () => {
    teacherInfoPopup.classList.remove('visible');
});
