const addTeacherBtn = document.querySelectorAll('.add-teacher');
const addTeacherPopup = document.querySelector<HTMLDialogElement>('#add-teacher');
const addTeacherCloseBtn = document.querySelector<HTMLElement>('#add-close-btn');

addTeacherBtn.forEach(btn => btn.addEventListener('click', () => {
    addTeacherPopup.showModal();
}));

addTeacherCloseBtn.addEventListener('click', () => {
    addTeacherPopup.close();
});
