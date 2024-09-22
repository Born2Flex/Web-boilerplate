import './scroll'
import '../css/app.css';

console.log(`Hello world!`);

const addTeacherBtn = document.querySelectorAll('.add-teacher');
const addTeacherPopup = document.querySelector('#add-teacher') as HTMLDialogElement;
const addTeacherCloseBtn = document.querySelector('#add-close-btn') as HTMLElement;
const teacherInfoCloseBtn = document.querySelector('#info-close-btn') as HTMLElement;

const teachersImages = document.querySelectorAll('.teacher-image');
const teacherInfoPopup = document.querySelector('#teacher-info') as HTMLDialogElement;


addTeacherBtn.forEach(btn => btn.addEventListener('click', () => {
    addTeacherPopup.showModal();
}));

addTeacherCloseBtn.addEventListener('click', () => {
    addTeacherPopup.close();
});

teachersImages.forEach(teacher => teacher.addEventListener('click', () => {
    teacherInfoPopup.showModal();
}));

teacherInfoCloseBtn.addEventListener('click', () => {
    teacherInfoPopup.close();
});
