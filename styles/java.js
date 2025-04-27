const restaurants = [
    {
      name: "Propaganda Cafe",
      rating: "⭐⭐⭐⭐ (4.2 / 5 voturi)",
      image: "/home/user/Downloads/Propaganda.jpeg",
      address: "Str. Alexei Mateevici 66, Chișinău",
      coords: "47.0263,28.8354",
      phone: "+373 22 123 456",
      schedule: "Luni-Vineri: 8:00-22:00, Weekend: 10:00-23:00"
    },
    {
      name: "Castania Restaurant",
      rating: "⭐⭐⭐⭐⭐ (4.7 / 5 voturi)",
      image: "/home/user/Downloads/castain.jpg",
      address: "Str. Mitropolit Varlaam 48, Chișinău",
      coords: "47.0252,28.8308",
      phone: "+373 22 234 567",
      schedule: "Luni-Duminică: 12:00-23:00"
    },
    {
      name: "Andy's Pizza",
      rating: "⭐⭐⭐⭐ (4.0 / 5 voturi)",
      image: "/home/user/Downloads/andys.JPG",
      address: "Bd. Ștefan cel Mare 6, Chișinău",
      coords: "47.0246,28.8290",
      phone: "+373 22 345 678",
      schedule: "Luni-Duminică: 10:00-22:00"
    },
    {
      name: "Tucano Coffee",
      rating: "⭐⭐⭐⭐ (4.5 / 5 voturi)",
      image: "/home/user/Downloads/TUCANO.jpg",
      address: "Str. Pușkin 15, Chișinău",
      coords: "47.0236,28.8273",
      phone: "+373 22 456 789",
      schedule: "Luni-Vineri: 7:30-22:00, Weekend: 9:00-22:00"
    },
    {
      name: "La Placinte",
      rating: "⭐⭐⭐⭐ (4.2 / 5 voturi)",
      image: "/home/user/Downloads/placinte.jpeg",
      address: "Bd. Dacia 27, Chișinău",
      coords: "47.0227,28.8397",
      phone: "+373 22 567 890",
      schedule: "Luni-Duminică: 8:00-22:00"
    },
    {
      name: "Beef Meat & Wine",
      rating: "⭐⭐⭐⭐⭐ (4.9 / 5 voturi)",
      image: "/home/user/Downloads/beef.webp",
      address: "Str. București 67, Chișinău",
      coords: "47.0217,28.8322",
      phone: "+373 22 678 901",
      schedule: "Luni-Duminică: 12:00-23:00"
    },
    {
      name: "Smokehouse",
      rating: "⭐⭐⭐⭐ (4.4 / 5 voturi)",
      image: "/home/user/Downloads/noname.jpg",
      address: "Str. Alexandru cel Bun 98, Chișinău",
      coords: "47.0234,28.8367",
      phone: "+373 22 789 012",
      schedule: "Marți-Duminică: 12:00-22:00, Luni: Închis"
    },
    {
      name: "Gok-Oguz",
      rating: "⭐⭐⭐⭐ (4.3 / 5 voturi)",
      image: "/home/user/Downloads/gok.jpeg",
      address: "Str. Ismail 59, Chișinău",
      coords: "47.0200,28.8303",
      phone: "+373 22 890 123",
      schedule: "Luni-Duminică: 11:00-23:00"
    },
    {
      name: "Caravan",
      rating: "⭐⭐⭐⭐ (4.1 / 5 voturi)",
      image: "/home/user/Downloads/caravan.jpeg",
      address: "Str. Armenească 24, Chișinău",
      coords: "47.0232,28.8408",
      phone: "+373 22 901 234",
      schedule: "Luni-Duminică: 10:00-22:00"
    },
    {
      name: "Pegas",
      rating: "⭐⭐⭐⭐ (4.0 / 5 voturi)",
      image: "/home/user/Downloads/pegas.jpg",
      address: "Str. 31 August 1989 nr. 78, Chișinău",
      coords: "47.0201,28.8355",
      phone: "+373 22 012 345",
      schedule: "Luni-Duminică: 12:00-00:00"
    },
    {
      name: "Lumencraft",
      rating: "⭐⭐⭐⭐⭐ (4.6 / 5 voturi)",
      image: "/home/user/Downloads/craft.jpg",
      address: "Str. Vlaicu Pârcălab 45, Chișinău",
      coords: "47.0221,28.8344",
      phone: "+373 22 123 456",
      schedule: "Luni-Vineri: 9:00-22:00, Weekend: 10:00-23:00"
    },
    {
      name: "Invino Wine Bar",
      rating: "⭐⭐⭐⭐⭐ (4.7 / 5 voturi)",
      image: "/home/user/Downloads/vins.jpg",
      address: "Str. Petru Rareș 36, Chișinău",
      coords: "47.0262,28.8365",
      phone: "+373 22 234 567",
      schedule: "Marți-Duminică: 16:00-00:00, Luni: Închis"
    },
    {
      name: "Mileștii Mici",
      rating: "⭐⭐⭐⭐⭐ (4.9 / 5 voturi)",
      image: "/home/user/Downloads/mici.jpg",
      address: "Comuna Mileștii Mici, Raionul Ialoveni",
      coords: "46.9235,28.8400",
      phone: "+373 22 345 678",
      schedule: "Luni-Duminică: 10:00-18:00"
    },
    {
      name: "Pivnița Veche",
      rating: "⭐⭐⭐⭐ (4.2 / 5 voturi)",
      image: "/home/user/Downloads/veche.jpg",
      address: "Str. Mitropolit Dosoftei 97, Chișinău",
      coords: "47.0254,28.8376",
      phone: "+373 22 456 789",
      schedule: "Luni-Duminică: 12:00-22:00"
    },
    {
      name: "LUME Neobistro",
      rating: "⭐⭐⭐⭐ (4.4 / 5 voturi)",
      image: "/home/user/Downloads/sf.jpg",
      address: "Str. Sfatul Țării 18, Chișinău",
      coords: "47.0209,28.8328",
      phone: "+373 22 567 890",
      schedule: "Marți-Duminică: 12:00-23:00, Luni: Închis"
    },
    {
      name: "Uptown Cafe",
      rating: "⭐⭐⭐⭐ (4.1 / 5 voturi)",
      image: "/home/user/Downloads/up.jpg",
      address: "Bd. Ștefan cel Mare 202, Chișinău",
      coords: "47.0231,28.8453",
      phone: "+373 22 678 901",
      schedule: "Luni-Vineri: 8:00-20:00, Weekend: 9:00-19:00"
    },
    {
      name: "Draft Craft Beer",
      rating: "⭐⭐⭐⭐ (4.3 / 5 voturi)",
      image: "/home/user/Downloads/draft.jpg",
      address: "Str. Alexei Șciusev 82, Chișinău",
      coords: "47.0240,28.8398",
      phone: "+373 22 789 012",
      schedule: "Luni-Duminică: 17:00-00:00"
    },
    {
      name: "Courtyard by Marriott Restaurant",
      rating: "⭐⭐⭐⭐⭐ (4.8 / 5 voturi)",
      image: "/home/user/Downloads/rest.jpg",
      address: "Str. Arborilor 21, Chișinău",
      coords: "47.0219,28.8389",
      phone: "+373 22 890 123",
      schedule: "Luni-Duminică: 7:00-23:00"
    },
    {
      name: "San Sushi",
      rating: "⭐⭐⭐⭐ (4.5 / 5 voturi)",
      image: "/home/user/Downloads/sushi.jpg",
      address: "Bd. Decebal 91, Chișinău",
      coords: "47.0187,28.8432",
      phone: "+373 22 901 234",
      schedule: "Luni-Duminică: 11:00-22:00"
    }
  ];
  
  function setCookie(name, value, days) {
    let expires = "";
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + encodeURIComponent(value) + expires + "; path=/";
  }
  
  function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
    }
    return null;
  }
  
  function eraseCookie(name) {   
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }
  
  function displayRestaurants(restaurantsToShow) {
    const restaurantList = document.getElementById('restaurant-list');
    const noResults = document.getElementById('no-results');
    
    restaurantList.innerHTML = '';
    
    if (restaurantsToShow.length === 0) {
      restaurantList.classList.add('hidden');
      noResults.classList.remove('hidden');
      return;
    }
    
    restaurantList.classList.remove('hidden');
    noResults.classList.add('hidden');
    
    restaurantsToShow.forEach(restaurant => {
      const restaurantLink = document.createElement('a');
      restaurantLink.href = "/home/user/Desktop/Practica/rezervare/style/index.html";
      restaurantLink.style.textDecoration = 'none'; 
      restaurantLink.style.color = 'inherit'; 
      const restaurantBox = document.createElement('div');
      restaurantBox.className = 'restaurant-box';
      
      restaurantBox.innerHTML = `
        <img src="${restaurant.image}" alt="${restaurant.name}">
        <div class="restaurant-info">
          <h3>${restaurant.name}</h3>
          <p>${restaurant.rating}</p>
        </div>
      `;
      
      restaurantLink.addEventListener('click', (e) => {
        const restaurantData = {
          name: restaurant.name,
          address: restaurant.address,
          coords: restaurant.coords,
          phone: restaurant.phone,
          schedule: restaurant.schedule,
          rating: restaurant.rating
        };
        
        const encodedData = encodeURIComponent(JSON.stringify(restaurantData));
        
        restaurantLink.href = `/home/user/Desktop/Practica/rezervare/style/index.html?data=${encodedData}`;
      });
      
      restaurantLink.appendChild(restaurantBox);
      
      restaurantList.appendChild(restaurantLink);
    });
  }
  
  function searchRestaurants() {
    const searchTerm = document.getElementById('search-bar').value.toLowerCase();
    
    if (!searchTerm) {
      displayRestaurants(restaurants);
      return;
    }
    
    const filteredRestaurants = restaurants.filter(restaurant => 
      restaurant.name.toLowerCase().includes(searchTerm)
    );
    
    displayRestaurants(filteredRestaurants);
    
    const exactMatch = restaurants.find(restaurant => 
      restaurant.name.toLowerCase() === searchTerm ||
      restaurant.name.toLowerCase().startsWith(searchTerm + ' ')
    );
    
    if (exactMatch && filteredRestaurants.length > 0) {
      const restaurantElements = document.querySelectorAll('.restaurant-box');
      
      restaurantElements.forEach(element => {
        if (element.querySelector('h3').textContent === exactMatch.name) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          element.style.boxShadow = '0 0 0 3px #ff4500';
          setTimeout(() => {
            element.style.boxShadow = '0 10px 20px rgba(0,0,0,0.2)';
          }, 2000);
        }
      });
    }
  }
  
  function displaySavedReservations() {
    const reservationsList = document.getElementById('saved-reservations-list');
    const savedReservations = getCookie('savedReservations');
    
    if (!reservationsList) return;
    
    if (!savedReservations) {
      reservationsList.innerHTML = '<p class="no-reservations">Nu aveți rezervări salvate.</p>';
      return;
    }
    
    try {
      const reservations = JSON.parse(savedReservations);
      
      if (reservations.length === 0) {
        reservationsList.innerHTML = '<p class="no-reservations">Nu aveți rezervări salvate.</p>';
        return;
      }
      
      let reservationsHTML = '';
      
      reservations.forEach(reservation => {
        const reservationDate = new Date(reservation.date + 'T' + reservation.time);
        const formattedDate = reservationDate.toLocaleDateString('ro-RO', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
        
        const formattedTime = reservation.time;
        
        reservationsHTML += `
          <div class="reservation-item" data-id="${reservation.id}">
            <h3>${reservation.restaurant}</h3>
            <div class="reservation-details">
              <p><strong>Data:</strong> ${formattedDate}, ora ${formattedTime}</p>
              <p><strong>Persoane:</strong> ${reservation.guests}</p>
              <p><strong>Nume:</strong> ${reservation.name}</p>
              <p><strong>Contact:</strong> ${reservation.phone}</p>
              ${reservation.comments ? `<p><strong>Comentarii:</strong> ${reservation.comments}</p>` : ''}
            </div>
            <button class="delete-reservation" onclick="deleteReservation(${reservation.id})">Șterge rezervarea</button>
          </div>
        `;
      });
      
      reservationsList.innerHTML = reservationsHTML;
    } catch (error) {
      console.error('Eroare la parsarea rezervărilor:', error);
      reservationsList.innerHTML = '<p class="no-reservations">Eroare la încărcarea rezervărilor.</p>';
    }
  }
  
  function deleteReservation(reservationId) {
    const savedReservations = getCookie('savedReservations');
    
    if (savedReservations) {
      try {
        let reservations = JSON.parse(savedReservations);
        
        reservations = reservations.filter(reservation => reservation.id !== reservationId);
        
        setCookie('savedReservations', JSON.stringify(reservations), 30);
        
        displaySavedReservations();
      } catch (error) {
        console.error('Eroare la ștergerea rezervării:', error);
        alert('A apărut o eroare la ștergerea rezervării. Vă rugăm să încercați din nou.');
      }
    }
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    displayRestaurants(restaurants);
    
    const searchBar = document.getElementById('search-bar');
    searchBar.addEventListener('input', searchRestaurants);
    
    const searchIcon = document.querySelector('.search-icon');
    searchIcon.addEventListener('click', (e) => {
      e.preventDefault();
      searchRestaurants();
    });
    
    const savedReservationsBtn = document.getElementById('saved-reservations-btn');
    const reservationsModal = document.getElementById('reservations-modal');
    const closeBtn = document.querySelector('.close');
    
    if (savedReservationsBtn && reservationsModal) {
      savedReservationsBtn.addEventListener('click', function() {
        displaySavedReservations();
        reservationsModal.style.display = "block";
      });
      
      if (closeBtn) {
        closeBtn.addEventListener('click', function() {
          reservationsModal.style.display = "none";
        });
      }
      
      window.addEventListener('click', function(event) {
        if (event.target === reservationsModal) {
          reservationsModal.style.display = "none";
        }
      });
    }
  });