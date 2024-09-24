import {FormattedUser} from "./utils/interfaces";
import {Order, sortUsers} from "./utils/sorting";
import {validatedUsers} from "./data";

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

   headerCells.forEach(column => column.classList.remove('sorted-asc', 'sorted-desc'))
   if (sortColumn !== null && sortColumn === map[column.innerText]) {
       direction = direction === 'asc'? 'desc' : 'asc';
   } else {
       sortColumn = map[column.innerText];
       direction = 'asc';
   }

   column.classList.add('sorted-' + direction)
   addTeachersInTable(sortUsers(validatedUsers, sortColumn, direction));
});

export function addTeachersInTable(teachers: FormattedUser[]) {
    let html = '';
    teachers.forEach(user => {
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
