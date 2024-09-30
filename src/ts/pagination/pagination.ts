import {appContext} from "../context/app-context";
import {addTeachersInTable} from "../sorting";

export const recordsPerPage = 10;
const pagePagination = document.querySelector('.pagination');

pagePagination.addEventListener('click', event => {
    event.preventDefault();
    const link = (event.target as HTMLElement).closest('.page-link') as HTMLAnchorElement;
    if (!link) return;
    let page = link.innerText;
    appContext.currentPage = page === 'Last'? appContext.numOfPages : Number(page);
    console.log("Current page: " + Number(page));
    addTeachersInTable();
    addPagination();
});

let paginationElems: string[] = [];

export function preparePagination() {
    appContext.numOfPages = Math.ceil(appContext.getDisplayedTeachers().length / recordsPerPage);
    for (let i = 1; i < appContext.numOfPages; i++) {
        paginationElems.push(`<a href="#" class="page-link">${i}</a>`);
    }
    paginationElems.push(`<a href="#" class="page-link">Last</a>`);
    console.log(paginationElems);
}

export function addTablePage() {
    const newElem= `<a href="#" class="page-link">${appContext.numOfPages}</a>`
    paginationElems = [
        ...paginationElems.slice(0, appContext.numOfPages - 1),
        newElem,
        ...paginationElems.slice(appContext.numOfPages - 1)
    ]
}

export function addPagination() {
    const currentPage =  appContext.currentPage;
    setupTablePaging();
    const offset = recordsPerPage * (currentPage - 1)
    console.log(offset)
    console.log(appContext.getDisplayedTeachers().slice(offset, offset + recordsPerPage))
}

function setupTablePaging() {
    let paginationElements = paginationElems[0];
    const currentPage= appContext.currentPage;
    const numOfPages = appContext.numOfPages;
    if (numOfPages <= 4) {
        for (let i = 2; i < numOfPages; i++) {
            paginationElements += paginationElems[i - 1];
        }
    } else {
        if (currentPage == 1 || currentPage == 2) { // OK
            paginationElements += paginationElems[1]; // 2
            paginationElements += paginationElems[2]; // 3
            paginationElements += '<span>...</span>';
        } else if (currentPage == numOfPages || currentPage == numOfPages - 1) { // OK
            paginationElements += '<span>...</span>';
            paginationElements += paginationElems[numOfPages - 3]; // pre pre last
            paginationElements += paginationElems[numOfPages - 2]; // pre last
        } else {
            if (currentPage - 3 <= 0) { // start
                for (let i = 0; i <= 2; i++) {
                    paginationElements += paginationElems[currentPage - 2 + i];
                }
                paginationElements += '<span>...</span>';
            } else if (currentPage + 2 >= numOfPages) { // end
                paginationElements += '<span>...</span>';
                for (let i = 0; i <= 2; i++) {
                    paginationElements += paginationElems[currentPage - 2 + i];
                }
            } else {
                paginationElements += '<span>...</span>';
                for (let i = 0; i <= 2; i++) {
                    paginationElements += paginationElems[currentPage - 2 + i];
                }
                paginationElements += '<span>...</span>';
            }
        }
    }
    if (numOfPages > 1) {
        paginationElements += paginationElems[paginationElems.length - 1];
    }
    pagePagination.innerHTML = paginationElements;
}
