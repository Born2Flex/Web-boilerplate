const addTeacherBtn = document.querySelectorAll('.add-teacher');
const addTeacherCloseBtn = document.querySelector<HTMLElement>('#add-close-btn');
export const addTeacherPopup = document.querySelector<HTMLDialogElement>('#add-teacher');

addTeacherBtn.forEach(btn => btn.addEventListener('click', () => {
    addTeacherPopup?.showModal();
}));

addTeacherCloseBtn?.addEventListener('click', () => {
    addTeacherPopup?.close();
});
