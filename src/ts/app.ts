import './utils/scroll';
import '../css/app.css';
import './teacher-form'
import {addTeachersOnPage} from "./task1";
import './task2'
import './task4'
import {validatedUsers} from "./data";

console.log(`Hello world!`);

addTeachersOnPage(validatedUsers);
