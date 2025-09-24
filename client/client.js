import destinations from "./data/data.js";

const travelList = document.querySelector('.bottom-list-container');

destinations.forEach(travelDestination => {
    const card = document.createElement('div');
    card.classList.add('travel-card');
    card.innerHTML = `
        <img src="${travelDestination.image}" alt="${travelDestination.name}" height=300 width=500 class="destination-img">
        <div class="travel-text">
            <h2>${travelDestination.name}</h2>
            <p><strong>Country:</strong> ${travelDestination.country}</p>
            <p>${travelDestination.description}</p>
            <button onclick="window.location.href='/travel/${travelDestination.slug}'"> View Details </button>
        </div>
    `;
    
    travelList.appendChild(card);

})