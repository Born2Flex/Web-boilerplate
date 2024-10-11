import {setUpRegionChart} from "./chart.ts";
import {appContext} from "../../context/app-context.ts";

const sectionHeader = document.querySelector('#statistics-header');
const tableSection = document.querySelector('#table-section');
const chartSection = document.querySelector('#chart-section');

sectionHeader?.addEventListener('click', () => {
    tableSection?.toggleAttribute('hidden');
    chartSection?.toggleAttribute('hidden');
    setUpRegionChart();
    appContext.currentChart = 'region';
});
