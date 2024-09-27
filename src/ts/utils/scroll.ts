const scrollContainer = document.querySelector('.scroll') as HTMLElement;
const leftBtn = document.querySelector('.scroll-btn.left') as HTMLElement;
const rightBtn = document.querySelector('.scroll-btn.right') as HTMLElement;

leftBtn.addEventListener('click', () => {
    if (window.innerWidth > 600) {
        scrollContainer.scrollBy({
            left: -200,
            behavior: 'smooth'
        });
    } else {
        scrollContainer.scrollBy({
            left: -282,
            behavior: 'smooth'
        });
    }
});

rightBtn.addEventListener('click', () => {
    if (window.innerWidth > 600) {
        scrollContainer.scrollBy({
            left: 200,
            behavior: 'smooth'
        });
    } else {
        scrollContainer.scrollBy({
            left: 282,
            behavior: 'smooth'
        });
    }
});
