import {FormattedUser} from "../../utils/interfaces";
import {Order, SortingField, sortUsers} from "../../operations/sorting.ts";
import {appContext} from "../../context/app-context";
import {addPagination, recordsPerPage} from "../pagination/pagination";

const table = document.querySelector('#table')
const tableHeader = document.querySelector('#table-header')
const headerCells = table?.querySelectorAll('th');

let direction: Order = 'asc';
let sortColumn: string | null = null;

const map: { [key: string]: string } = {
    'Name': 'full_name',
    'Specialty': 'course',
    'Age': 'b_day',
    'Gender': 'gender',
    'Nationality': 'country'
};

tableHeader?.addEventListener('click', event => {
    const columnElement = event.target as HTMLElement;
    clearSorting();

    const col = columnElement.innerText;
    if (col in map) {
        const mappedCol = map[col];
        if (sortColumn !== null && sortColumn === mappedCol) {
            direction = direction === 'asc' ? 'desc' : 'asc';
        } else {
            sortColumn = mappedCol;
            direction = 'asc';
        }
    }
    columnElement.classList.add('sorted-' + direction);
    appContext.setDisplayedTeachers(sortUsers(appContext.getDisplayedTeachers(), sortColumn as SortingField, direction));
    addTeachersInTable();
    addPagination();
});

export function clearSorting() {
    headerCells?.forEach(column => column.classList.remove('sorted-asc', 'sorted-desc'));
}

export function addTeachersInTable() {
    const offset = recordsPerPage * (appContext.currentPage - 1)
    let html = '';
    appContext.getDisplayedTeachers().slice(offset, offset + recordsPerPage).forEach(user => {
        html += formatTableRow(user);
    })
    if (table) {
        table.innerHTML = html;
        if (tableHeader) {
            table.prepend(tableHeader);
        }
    }
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
