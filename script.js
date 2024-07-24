document.addEventListener('DOMContentLoaded', function() {
  const vehicleList = document.getElementById('vehicle-list');
  const vehicleDetails = document.getElementById('vehicle-details');
  const salesStats = document.getElementById('sales-stats');
  const searchInput = document.getElementById('search-input');

  let vehicles = []; 
  let filteredVehicles = []; 
  
  function fetchVehicles() {
    fetch('mydb.json')
    .then(response => {
      return response.json();
    })
    .then(data => {
      vehicles = data.vehicles;
      filteredVehicles = vehicles;
      displayVehicles(filteredVehicles);
      updateSalesStats(vehicles);
    })
    .catch(error => {
      console.error('Error fetching vehicles:', error);
    });
  }

  function displayVehicles(vehicles){
    vehicleList.innerHTML = '';
    vehicles.forEach(vehicle => {
      const vehicleCard = document.createElement('div');
      vehicleCard.classList.add('vehicle-card');
      vehicleCard.innerHTML = `
      <img src="${vehicle.imageUrl}" alt="${vehicle.make} ${vehicle.model}" />
      <h2>${vehicle.make} ${vehicle.model}</h2>
      <p>Year: ${vehicle.year}</p>
      <p>Mileage: ${vehicle.mileage} miles</p>
      <p>Price: $${vehicle.price}</p>
      <button class="view-details" data-id="${vehicle.id}">View Details</button>
      `;
      vehicleList.appendChild(vehicleCard);
      
      vehicleCard.querySelector('.view-details').addEventListener('click', () => {
        showVehicleDetails(vehicle);
      });
    });
  }

  function showVehicleDetails(vehicle) {
    vehicleDetails.innerHTML = `
      <h2>${vehicle.make} ${vehicle.model}</h2>
      <img src="${vehicle.imageUrl}" alt="${vehicle.make} ${vehicle.model}" />
      <p>Year: ${vehicle.year}</p>
      <p>Mileage: ${vehicle.mileage} miles</p>
      <p>Price: $${vehicle.price}</p>
      <button id="contact-us">Contact Us</button>
    `;
    vehicleDetails.querySelector('#contact-us').addEventListener('click', () => {
      contactUs(vehicle);
    });
  }

  function contactUs(vehicle) {
    alert(`Contact us for more information about the ${vehicle.make} ${vehicle.model}`);
  }

  function updateSalesStats(vehicles) {
    const totalSales = vehicles.filter(vehicle => vehicle.availability === 'sold').length;
    const totalRevenue = vehicles.reduce((total, vehicle) => total + vehicle.price, 0);
  
    document.getElementById('total-sales').textContent = totalSales;
    document.getElementById('total-revenue').textContent = totalRevenue;
  }

  searchInput.addEventListener('keyup', () => {
    const searchTerm = searchInput.value.toLowerCase();
    filteredVehicles = vehicles.filter(vehicle => {
      return vehicle.make.toLowerCase().includes(searchTerm) ||
      vehicle.model.toLowerCase().includes(searchTerm);
    });
    displayVehicles(filteredVehicles);
  });

  document.getElementById('filter-all').addEventListener('click', () => {
    filteredVehicles = vehicles;
    displayVehicles(filteredVehicles);
  });
    
  document.getElementById('filter-available').addEventListener('click', () => {
    filteredVehicles = vehicles.filter(vehicle => vehicle.availability === 'available');
    displayVehicles(filteredVehicles);
  });
    
  document.getElementById('filter-sold').addEventListener('click', () => {
    filteredVehicles = vehicles.filter(vehicle => vehicle.availability === 'sold');
    displayVehicles(filteredVehicles);
  });
  
  fetchVehicles();
});
  