const loadPhone = async (searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhone(data.data, dataLimit);
}

const displayPhone = (phones, dataLimit) => {
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.innerHTML = ``;
    const showAll = document.getElementById('show-all');
    if (dataLimit && phones.length > 10) {
        phones = phones.slice(0, 10);
        showAll.classList.remove('d-none');
    }
    else {
        showAll.classList.add('d-none');
    }
    //-------- display no phone found message------
    const nothingFound = document.getElementById('nothing-found');
    if (phones.length === 0) {
        nothingFound.classList.remove('d-none')
    }
    else {
        nothingFound.classList.add('d-none')
    }
    phones.forEach(phone => {
        // console.log(phone);
        const newDiv = document.createElement('div');
        newDiv.classList.add('col');
        newDiv.innerHTML = `
                    <div class="card p-3">
                        <img src="${phone.image}" class="card-img-top" alt="...">
                        <div class="card-body">
                        <h5 class="card-title">${phone.phone_name}</h5>
                        <p class="card-text">This is a longer card  with           supporting text below as a natural
                                lead-in to additional content. This content is a little bit longer.
                         </p>
                         <button onclick="loadPhoneDetails('${phone.slug}')" class="btn btn-primary"  data-bs-toggle="modal" data-bs-target="#phoneDetailsModal" >Show Details</button>
                        </div>
                    </div>
        `;
        phoneContainer.appendChild(newDiv);
    });
    //loading function is called for stoping
    toggleSpinner(false);
}
const searchProcess = dataLimit => {
    toggleSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhone(searchText, dataLimit);
}
document.getElementById('search-btn').addEventListener('click', function () {
    // loading function is called for starting
    searchProcess(10)
})
//search input field enter hendler
document.getElementById('search-field').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        searchProcess(10)
    }
});



// loading spinner function section
const toggleSpinner = isLoding => {
    const bringLoader = document.getElementById('loader');
    if (isLoding) {
        bringLoader.classList.remove('d-none')
    }
    else {
        bringLoader.classList.add('d-none')
    }
}
//see all button function
document.getElementById('show-all-btn').addEventListener('click', function () {
    searchProcess()
})

// displaying phone details section 
const loadPhoneDetails = async id => {
    const url = ` https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetails(data.data);
}

const displayPhoneDetails = phone => {
    console.log(phone);
    const modalTitle = document.getElementById('phoneDetailsModalLabel');
    modalTitle.innerText = phone.name;
    const modalDetails = document.getElementById('phone-details');
    modalDetails.innerHTML = `
    <p>Release Date:-${phone.releaseDate ? phone.releaseDate : 'Release date is not declared'}</p>
    <p>Memory and Storage:- ${phone.mainFeatures ? phone.mainFeatures.memory : 'Details is not found'}</p>
    `;

}


loadPhone('apple');