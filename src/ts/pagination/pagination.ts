import {validatedUsers} from "../data";

const recordsPerPage = 6;
const numOfPages = Math.ceil(validatedUsers.length / recordsPerPage);
const pagePagination = document.querySelector('.pagination');

function setupPagination() {
    const pagination = document.createElement('div');
    pagination.classList.add('pagination');

    let paginationElements = '<a href="#" class="page-link">1</a>';
    for (let i = 0; i < numOfPages - 1; i++) {
        paginationElements += `<a href="#" class="page-link">${i + 1}</a>`;
    }
    paginationElements += '<a href="#" class="page-link">Last</a>';

}
// 1
// 1 Last
// 1 2 Last
// 1 2 3 Last

// 1 2 3 ... Last
// ... 2 3 4 Last

// ... 3 4 5 Last
// ... 4 5 6 Last

`
<div class="pagination">
    <a href="#" class="page-link">1</a>
    <a href="#" class="page-link">2</a>
    <a href="#" class="page-link">3</a>
    <span>...</span>
    <a href="#" class="page-link">Last</a>
</div>
`
