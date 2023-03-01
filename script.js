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
};

const searchPhone = () => {
  const search = getId('search-field');
  const getSearchValue = search.value;
  search.value = '';
  fetchPhones(getSearchValue);
};

fetchPhones();
