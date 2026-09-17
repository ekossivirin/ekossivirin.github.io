const ctx = document.getElementById('myChart');
const currencySelector = document.getElementById('currencySelect');
const startDate = document.getElementById('startDate');
const endDate = document.getElementById('endDate');
const form = document.querySelector('form');
let rates = [];
const currencyCodes = [
    { code: 'USD', name: 'US Dollar' },
    { code: 'EUR', name: 'Euro' },
    { code: 'GBP', name: 'British Pound' },
];
const minDateString = new Date("1996-09-02").toLocaleDateString('en-CA');
const currentDateString = new Date().toLocaleDateString('en-CA');
let chartInstance = null;

[startDate, endDate].forEach(input => {
    input.value = currentDateString;
    input.min = minDateString;
    input.max = currentDateString;
});

startDate.addEventListener('change', function () {
    if (startDate.value > endDate.value) {
        endDate.value = startDate.value;
    }
    endDate.min = startDate.value;
});

window.addEventListener("DOMContentLoaded", function () {
    currencyCodes.forEach(currency => {
        const option = document.createElement('option');
        option.value = currency.code;
        option.textContent = currency.name;
        currencySelector.appendChild(option);
    });
});

form.addEventListener('submit', async function (e) {
    e.preventDefault();
    let startDateValue = startDate.value;
    let endDateValue = endDate.value;
    let currencyCode = currencySelector.value;
    const success = await getRates(startDateValue.replaceAll('-', ''), endDateValue.replaceAll('-', ''), currencyCode);
    if (success) {
        renderChart();
    }
});

/**
 * @param {String} startD
 * @param {String} endD
 * @param {String} code
 */
async function getRates(startD, endD, code) {
    try {
        const response = await fetch(`https://bank.gov.ua/NBU_Exchange/exchange_site?start=${startD}&end=${endD}&valcode=${code}&sort=exchangedate&order=asc&json`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        rates = await response.json();
        return true;
    } catch (error) {
        console.log(error.message);
        return false;
    }
}

function renderChart() {
    const labels = rates.map(rate => rate.exchangedate);
    const data = rates.map(rate => rate.rate_per_unit);

    if (chartInstance) {
        chartInstance.destroy();
    }

    chartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: `Exchange Rate for ${currencySelector.value}`,
                data: data,
            }]
        },
    })
};