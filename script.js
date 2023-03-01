'use-strict';

// Getting IDs

const getId = (id) => document.getElementById(id);

// Fetching data

const fetchPhones = async (searchValue, dataLimit) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchValue}`;
  const response = await fetch(url);
  const data = await response.json();
  showPhones(data.data, dataLimit);
};

// Showing phones
const showPhones = (phones, dataLimit) => {
  // phone-wrapper selection and empty the wrapper
  const phoneWrapper = getId('phone-wrapper');
  phoneWrapper.textContent = '';
  // display specific number of phones or all phones
  const showAllWrap = getId('show-all-wrap');
  if (dataLimit && phones.length > 10) {
    phones = phones.slice(0, 10);
    showAllWrap.classList.remove('d-none');
  } else {
    showAllWrap.classList.add('d-none');
  }
  // Bad search result

  const warningMessage = getId('warning-message');
  if (phones.length === 0) {
    /*
    
    Here when we search something wrong then phones array becomes empty
    phones or data.data = []
    
    */

    warningMessage.classList.remove('d-none');
  } else {
    warningMessage.classList.add('d-none');
  }

  phones.forEach((phone) => {
    const { image, phone_name } = phone;
    const div = document.createElement('div');
    div.classList.add('col');
    div.innerHTML = `

    <div class="card p-2">
      <img src="${image}" class="card-img-top" alt="..." />
      <div class="card-body">
          <h5 class="card-title">${phone_name}</h5>
          <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer</p>
      </div>
    </div>
    
    `;

    phoneWrapper.appendChild(div);
  });

  // stop spinner

  toggleSpinner(false);
};

// Getting text from search field

// Need to declare a variable to store the search value

let searchStoredValue;
const searchPhone = (dataLimit) => {
  // start spinner

  toggleSpinner(true);
  const search = getId('search-field');
  const getSearchValue = search.value;

  // If something in the search we store them in the search variable

  if (getSearchValue) {
    searchStoredValue = getSearchValue;
  }

  // Value is getting cleared here

  search.value = '';

  // Data limit is used to specify the number of data

  fetchPhones(searchStoredValue, dataLimit);

  /*

  If we pass the direct search value without storing it then it's already cleared,
  and pass the null value
  
  */

  // fetchPhones(getSearchValue, dataLimit);
};

// Implementing spinner logic

const toggleSpinner = (isLoading) => {
  const loadSpinner = getId('load-spinner');
  if (isLoading) {
    loadSpinner.classList.remove('d-none');
  } else {
    loadSpinner.classList.add('d-none');
  }
};

const btnShowAll = getId('btn-show-all');
btnShowAll.addEventListener('click', function () {
  searchPhone();
});

// We have hide fetchPhones() function otherwise it will be called and page will be loaded
// fetchPhones();
