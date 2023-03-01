'use-strict';

//getting IDs

const getId = (id) => document.getElementById(id);

// fetching data

const fetchPhones = async (searchValue) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchValue}`;
  const response = await fetch(url);
  const data = await response.json();
  showPhones(data.data);
};

// showing phones
const showPhones = (phones) => {
  // bad search result

  const warningMessage = getId('warning-message');
  if (phones.length === 0) {
    //here when we search something wrong then phones array becomes empty
    // phones or data.data = []
    warningMessage.classList.remove('d-none');
  } else {
    warningMessage.classList.add('d-none');
  }

  const phoneWrapper = getId('phone-wrapper');
  phoneWrapper.innerHTML = '';
  phones.forEach((phone) => {
    const { image, phone_name, brand } = phone;
    const div = document.createElement('div');
    div.classList.add('col');
    div.innerHTML = `
    <div class="card p-2">
      <img src="${image}" class="card-img-top" alt="..." />
      <div class="card-body">
          <h5 class="card-title">${phone_name}</h5>
          <p class="card-text"> This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer</p>
      </div>
    </div>
    
    `;

    phoneWrapper.appendChild(div);
    console.log(phone);
  });

  //stop spinner

  toggleSpinner(false);
};

// getting text from search field

const searchPhone = () => {
  //start spinner

  toggleSpinner(true);
  const search = getId('search-field');
  const getSearchValue = search.value;
  search.value = '';
  fetchPhones(getSearchValue);
};

// implementing spinner logic

const toggleSpinner = (isLoading) => {
  const loadSpinner = getId('load-spinner');
  if (isLoading) {
    loadSpinner.classList.remove('d-none');
  } else {
    loadSpinner.classList.add('d-none');
  }
};
//We have hide fetchPhones() function otherwise it will be called and page will be loaded
// fetchPhones();
