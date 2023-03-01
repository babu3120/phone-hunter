const loardPhone = async (searchText,dataLimit)=>{
    const url =`https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhone(data.data,dataLimit);
}
const displayPhone = (phones,dataLimit) =>{
    const phonesContainer = document.getElementById('phone-container');
    phonesContainer.innerText='';
    // display 20 phone only
    const sohwAll = document.getElementById('show-all');
    if(dataLimit && phones.length >10){
        phones= phones.slice(0,10);
        sohwAll.classList.remove('d-none')
    }
    else{
        sohwAll.classList.add('d-none')
    }
   
    // display all phone
    const noPhone = document.getElementById('no-found-massage');
    if(phones.length === 0){
        noPhone.classList.remove('d-none')
    }
    else{
        noPhone.classList.add('d-none')
    }
    phones.forEach(phone=>{
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML=`
        <div class="card p-4">
                    <img src="${phone.image}" class="card-img-top" alt="...">
                    <div class="card-body">
                      <h5 class="card-title">${phone.phone_name }</h5>
                      <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                      <button onclick="loardPhoneDetails('${phone.slug}')" href="#" class= "btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Show Details</button>
         
                    </div>
                  </div>
        `;
        phonesContainer.appendChild(phoneDiv);
    })
    // stope toggle spiner
    toggleSpiner(false);

}
const prossenSearch = (dataLimit) =>{
    toggleSpiner(true);
    const searchFiled = document.getElementById('search-filed');
    const searchText = searchFiled.value;
    loardPhone(searchText,dataLimit );
}

document.getElementById('btn-search').addEventListener('click',function(){
    //  lorader start
   prossenSearch(10);
})
// search input filed enter hendeler 
document.getElementById('search-filed').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        prossenSearch(10);
      // code for enter
    }
});
const toggleSpiner = isloader =>{
    const loaderSection = document.getElementById('lorader');
    if(isloader){
        loaderSection.classList.remove('d-none')
    }
    else{
        loaderSection.classList.add('d-none')
    }
}
// not the  best way to loard data unlimited
document.getElementById('btn-show-all').addEventListener('click', function(){
    prossenSearch();
    
})

const loardPhoneDetails = async id =>{
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetails(data.data);
}

const displayPhoneDetails = phone =>{
const modalTitle = document.getElementById('exampleModalLabel');
modalTitle.innerText = phone.name;
const phoneDitailes = document.getElementById('phone-details');
phoneDitailes.innerHTML=`
<p>Release Date:${phone.releaseDate ? phone.releaseDate : 'No ReleaseDate Found' }</p>
<p>Storage: ${phone.mainFeatures ? phone.mainFeatures.storage : 'No Storage Information'}</p>
<p>Others: ${phone.others ? phone.others.Bluetooth : 'No Bluetooth Information'}</p>



`
}

loardPhone('apple');