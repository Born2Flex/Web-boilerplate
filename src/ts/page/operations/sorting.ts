import {FormattedUser} from "../../utils/interfaces";
import {Order, sortUsers} from "../../operations/sorting";
import {appContext} from "../../context/app-context";
import {addPagination, recordsPerPage} from "../pagination/pagination";

const table = document.querySelector('#table')
const tableHeader = document.querySelector('#table-header')
const headerCells = table.querySelectorAll('th');

let direction: Order = 'asc';
let sortColumn = null;

const map = {
    'Name': 'full_name',
    'Specialty': 'course',
    'Age': 'b_day',
    'Gender': 'gender',
    'Nationality': 'country'
};

tableHeader.addEventListener('click', event => {
   const column = event.target as HTMLElement;

   clearSorting();
   if (sortColumn !== null && sortColumn === map[column.innerText]) {
       direction = direction === 'asc'? 'desc' : 'asc';
   } else {
       sortColumn = map[column.innerText];
       direction = 'asc';
   }

   column.classList.add('sorted-' + direction);
   appContext.setDisplayedTeachers(sortUsers(appContext.getDisplayedTeachers(), sortColumn, direction));
   addTeachersInTable();
   addPagination();
});

export function clearSorting() {
    headerCells.forEach(column => column.classList.remove('sorted-asc', 'sorted-desc'));
}

export function addTeachersInTable() {
    const offset = recordsPerPage * (appContext.currentPage  - 1)
    let html = '';
    appContext.getDisplayedTeachers().slice(offset, offset + recordsPerPage).forEach(user => {
        html += formatTableRow(user);
    })
    table.innerHTML = html;
    table.prepend(tableHeader);
}

function formatTableRow(teacher: FormattedUser) {
    return `
        <tr>
            <td>${teacher.full_name}</td>
            <td>${teacher.course}</td>
            <td>${teacher.age}</td>
            <td>${teacher.gender}</td>
            <td>${teacher.country}</td>
        </tr>
    `;
}
