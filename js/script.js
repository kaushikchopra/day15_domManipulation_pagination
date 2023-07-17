// Create h1 element
const title = document.createElement('h1');
title.textContent = 'Pagination using DOM Manipulation';
title.id = 'title';

// Create p element
const description = document.createElement('p');
description.textContent = 'Pagination is the process of dividing content or data into separate pages for easier navigation and presentation.';
description.id = 'description';

// Append title and description to the document body
document.body.appendChild(title);
document.body.appendChild(description);

// Create table element
const table = document.createElement('table');
table.className = 'table table-bordered';
table.style.borderCollapse = 'collapse';
table.style.width = '100%';

// Create table header
const thead = document.createElement('thead');
const headerRow = document.createElement('tr');
['ID', 'Name', 'Email'].forEach((column) => {
    const th = document.createElement('th');
    th.textContent = column;
    th.style.border = '1px solid black';
    th.style.padding = '8px';
    th.style.textAlign = 'left';
    headerRow.appendChild(th);
});
thead.appendChild(headerRow);
table.appendChild(thead);

// Create table body
const tbody = document.createElement('tbody');
table.appendChild(tbody);

// Create pagination container
const paginationContainer = document.createElement('div');
paginationContainer.id = 'buttons';
paginationContainer.className = 'pagination d-flex justify-content-center';
paginationContainer.style.display = 'flex';
paginationContainer.style.justifyContent = 'center';
paginationContainer.style.marginTop = '20px';

// Create pagination info container
const paginationInfoContainer = document.createElement('div');
paginationInfoContainer.className = 'pagination-info';
paginationInfoContainer.style.textAlign = 'center';
paginationInfoContainer.style.marginTop = '10px';

// Create div element for table container
const tableContainer = document.createElement('div');
tableContainer.className = 'table-responsive';

// Append table to the table container
tableContainer.appendChild(table);

// Append table container to the document body
document.body.appendChild(tableContainer);

// Append table, pagination container, and pagination info container to the document body
document.body.appendChild(paginationContainer);
document.body.appendChild(paginationInfoContainer);

// Pagination variables
let currentPage = 1;
let totalPages = 0;

// Function to create table rows
function createTableRow(data) {
    const row = document.createElement('tr');
    const idCell = document.createElement('td');
    idCell.textContent = data.id;
    const nameCell = document.createElement('td');
    nameCell.textContent = data.name;
    const emailCell = document.createElement('td');
    emailCell.textContent = data.email;
    row.appendChild(idCell);
    row.appendChild(nameCell);
    row.appendChild(emailCell);
    tbody.appendChild(row);
}

// Function to render table rows
function renderTableRows(data) {
    tbody.innerHTML = '';
    data.forEach(createTableRow);
}

// Function to create pagination buttons if they don't exist
function createPaginationButton(className, text, clickHandler) {
    let button = paginationContainer.querySelector(className);
    if (!button) {
        button = document.createElement('button');
        button.textContent = text;
        button.className = className;
        button.addEventListener('click', clickHandler);
        paginationContainer.appendChild(button);
    }
    return button;
}

// Function to render pagination buttons
function renderPaginationButtons() {
    paginationContainer.innerHTML = '';

    createPaginationButton('.pagination-first', '<<', handleFirstClick);
    createPaginationButton('.pagination-previous', '<', handlePreviousClick);

    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(startPage + 4, totalPages);

    for (let i = startPage; i <= endPage; i++) {
        const numberButton = createPaginationButton('.pagination-number', i, () => {
            currentPage = i;
            fetchDataAndRender();
        });
        if (i === currentPage) {
            numberButton.classList.add('pagination-current');
        }
    }

    createPaginationButton('.pagination-next', '>', handleNextClick);
    createPaginationButton('.pagination-last', '>>', handleLastClick);
}


// Function to render pagination info
function renderPaginationInfo() {
    paginationInfoContainer.textContent = `Page ${currentPage} of ${totalPages}`;
}

// Function to handle previous button click
function handlePreviousClick() {
    if (currentPage > 1) {
        currentPage--;
        fetchDataAndRender();
    }
}

// Function to handle next button click
function handleNextClick() {
    if (currentPage < totalPages) {
        currentPage++;
        fetchDataAndRender();
    }
}

// Function to handle first button click
function handleFirstClick() {
    if (currentPage !== 1) {
        currentPage = 1;
        fetchDataAndRender();
    }
}

// Function to handle last button click
function handleLastClick() {
    if (currentPage !== totalPages) {
        currentPage = totalPages;
        fetchDataAndRender();
    }
}

// Function to fetch data and render table
async function fetchDataAndRender() {
    const jsonUrl = 'https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json';
    try {
        const response = await fetch(jsonUrl);
        const data = await response.json();
        const perPage = 10;
        const startIndex = (currentPage - 1) * perPage;
        const endIndex = startIndex + perPage;
        const currentData = data.slice(startIndex, endIndex);
        totalPages = Math.ceil(data.length / perPage);
        renderTableRows(currentData);
        renderPaginationButtons();
        renderPaginationInfo();
    } catch (error) {
        console.error('Error:', error);
    }
}

// Fetch data and render table
fetchDataAndRender();
