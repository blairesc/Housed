let menu = document.querySelector('#menu-bars');
let navbar = document.querySelector('.navbar');
let searchInput = document.getElementById('search-input');
let searchBtn = document.querySelector('.search-icon');
let featuredList = document.querySelector('.featured-list');

menu.onclick = () =>{
    navbar.classList.toggle('active');
    menu.classList.toggle('fa-times');
}

window.onscroll = () =>{
    navbar.classList.remove('active');
    menu.classList.remove('fa-times');
}

searchBtn.addEventListener('click', getSearchList);

searchInput.addEventListener('keypress', function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        searchBtn.click();
    }
});


//Returns a boolean if input matches US state abbreviation
function validateInput(inputString){
    let regex = /^(?:(A[KLRZ]|C[AOT]|D[CE]|FL|GA|HI|I[ADLN]|K[SY]|LA|M[ADEINOST]|N[CDEHJMVY]|O[HKR]|P[AR]|RI|S[CD]|T[NX]|UT|V[AIT]|W[AIVY]))$/;
    return (regex.test(inputString)); 
};


//Returns response from API display in cards
function displayResults(response) {
    let html = ""; 
    if (response.length !== 0) {
        response.forEach(data => {
            let imgSrc = `/.netlify/functions/google-api?location=${data.latitude},${data.longitude}`;
            
            html += `
            <div class="box">
                <div class="image-container">ty676
                    <img src=${imgSrc} alt="Rental Image">
                    <div class="info">
                        <h3> ${data.daysOnMarket} days ago</h3> 
                        <h3>for rent</h3>
                    </div>
                    <div class="icons">
                        <a href="#" class="fas fa-film">
                            <h3> ${Math.floor(Math.random() * 3)} </h3>
                        </a>
                        <a href="#" class="fas fa-camera">
                            <h3> ${Math.floor(Math.random() * 12)} </h3>
                        </a>
                    </div>
                </div>
                <div class="content">
                    <div class="price">
                        <h3> ${data.price} /month</h3>
                    </div>
                    <div class="locations">
                        <p>${data.city}, ${data.state}, ${data.zipCode}</p>
                    </div>
                    <div class="details">
                        <h3> <i class="fas fa-expand"></i> ${data.squareFootage ? data.squareFootage : 'N/A'} sqft</h3>
                        <h3> <i class="fas fa-bed"></i> ${data.bedrooms ? data.bedrooms : 'N/A'} </h3>
                        <h3> <i class="fas fa-bath"></i> ${data.bathrooms ? data.bathrooms : 'N/A'} </h3>
                    </div>
                    <div class="buttons">
                        <a href="#" class="btn"> request info</a>
                        <a href="#" class="btn"> view details</a>
                    </div>
                </div>
            </div>
        `;
        });
    }
    return html; 
};


//Displays cards that shows random rental information from api
function getFeaturedList(){
    fetch(`/.netlify/functions/realty-api?state=NJ&limit=3`)
        .then(response => response.json())
        .then(response => {
           let html = displayResults(response); 
           featuredList.innerHTML = html;
        });
};

getFeaturedList();


//Displays cards that shows rental information from api based on the state entered
function getSearchList(){
    let searchInputText = searchInput.value.trim().toUpperCase();
  
    if (validateInput(searchInputText)) {
        fetch(`/.netlify/functions/realty-api?state=${searchInputText}&limit=9`)
        .then(response => response.json())
        .then(response => {
            let headingHtml = `<h1 class="heading"><span>${searchInputText}</span> listings </h1>`; 
            let html = displayResults(response);
            
            let searchListWindow = window.open("searchList.html");
            searchListWindow.onload = ()=>{
                searchListWindow.document.getElementById('search-title').innerHTML = headingHtml;
                searchListWindow.document.getElementById('search-list').innerHTML = html;
            }
        });
    } 
};