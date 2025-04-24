document.addEventListener('DOMContentLoaded', function() {
    const movieSelect = document.getElementById('movie');
    const dateInput = document.getElementById('date');
    const timeSelect = document.getElementById('time');
    const ticketsInput = document.getElementById('tickets');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    
    const summaryMovie = document.getElementById('summary-movie');
    const summaryDate = document.getElementById('summary-date');
    const summaryTime = document.getElementById('summary-time');
    const summaryTickets = document.getElementById('summary-tickets');
    const summarySeats = document.getElementById('summary-seats');
    const summaryTotal = document.getElementById('summary-total');
    
    const saveReservationBtn = document.getElementById('save-reservation');
    const seatContainer = document.querySelector('.seat-container');
    const noReservations = document.querySelector('.no-reservations');
    const reservationsList = document.querySelector('.reservations-list');
    const showAllReservationsBtn = document.getElementById('show-all-reservations');
    const clearReservationsBtn = document.getElementById('clear-reservations');

    const modal = document.getElementById('reservation-modal');
    const closeModal = document.querySelector('.close-modal');
    const reservationDetails = document.getElementById('reservation-details');
    const notification = document.getElementById('notification');
    const notificationMessage = document.getElementById('notification-message');
    
    const mobileMenuToggle = document.querySelector('.mobile-menu');
    const nav = document.querySelector('nav ul');
    
    const filterButtons = document.querySelectorAll('.filter-btn');
    const movieCards = document.querySelectorAll('.movie-card');
    
    let selectedSeats = [];
    const pricePerTicket = 25; 
    const currentDate = new Date();
    
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    dateInput.min = `${year}-${month}-${day}`;
    dateInput.value = `${year}-${month}-${day}`;
    
    let reservations = JSON.parse(localStorage.getItem('reservations')) || [];
    
    function updateReservationSummary() {
        summaryMovie.textContent = movieSelect.value || '-';
        
        const selectedDate = dateInput.value ? new Date(dateInput.value) : null;
        summaryDate.textContent = selectedDate ? selectedDate.toLocaleDateString('ro-RO') : '-';
        
        summaryTime.textContent = timeSelect.value || '-';
        summaryTickets.textContent = ticketsInput.value || '-';
        
        const seatsText = selectedSeats.length > 0 ? selectedSeats.join(', ') : '-';
        summarySeats.textContent = seatsText;
        
        const totalPrice = selectedSeats.length * pricePerTicket;
        summaryTotal.textContent = `${totalPrice} Lei`;
    }
    
    function createSeats() {
        const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
        const seatsPerRow = 10;
        
        seatContainer.innerHTML = '';
        
        rows.forEach(row => {
            const rowDiv = document.createElement('div');
            rowDiv.classList.add('seat-row');
            rowDiv.style.display = 'flex';
            rowDiv.style.marginBottom = '0.8rem';
            
            const rowLetter = document.createElement('div');
            rowLetter.classList.add('row-letter');
            rowLetter.textContent = row;
            rowDiv.appendChild(rowLetter);
            
            for (let i = 1; i <= seatsPerRow; i++) {
                const seat = document.createElement('div');
                seat.classList.add('seat');
                seat.setAttribute('data-seat', `${row}${i}`);
                
                if (Math.random() < 0.2) {
                    seat.classList.add('occupied');
                }
                
                seat.addEventListener('click', () => toggleSeat(seat));
                rowDiv.appendChild(seat);
            }
            
            seatContainer.appendChild(rowDiv);
        });
    }
    
    function toggleSeat(seat) {
        if (seat.classList.contains('occupied')) {
            return;
        }
        
        const seatId = seat.getAttribute('data-seat');
        
        if (seat.classList.contains('selected')) {
            seat.classList.remove('selected');
            selectedSeats = selectedSeats.filter(s => s !== seatId);
        } else {
            if (selectedSeats.length < parseInt(ticketsInput.value)) {
                seat.classList.add('selected');
                selectedSeats.push(seatId);
            } else {
                showNotification(`Puteți selecta maximum ${ticketsInput.value} locuri.`, 'warning');
            }
        }
        
        updateReservationSummary();
    }
    
    function showNotification(message, type = 'success') {
        notificationMessage.textContent = message;
        notification.classList.add('show');
        
        if (type === 'error') {
            notificationMessage.classList.add('error');
        } else {
            notificationMessage.classList.remove('error');
        }
        
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }
    
    function generateReservationId() {
        return 'R' + Date.now().toString().slice(-8);
    }
    
    function saveReservation() {
        if (!validateReservationForm()) {
            return;
        }
        
        const reservation = {
            id: generateReservationId(),
            movie: movieSelect.value,
            date: dateInput.value,
            formattedDate: new Date(dateInput.value).toLocaleDateString('ro-RO'),
            time: timeSelect.value,
            tickets: parseInt(ticketsInput.value),
            seats: [...selectedSeats],
            customer: {
                name: nameInput.value,
                email: emailInput.value,
                phone: phoneInput.value
            },
            totalPrice: selectedSeats.length * pricePerTicket,
            status: 'active',
            createdAt: new Date().toISOString()
        };
        
        reservations.push(reservation);
        localStorage.setItem('reservations', JSON.stringify(reservations));
        
        resetReservationForm();
        showNotification('Rezervarea a fost salvată cu succes!');
        updateReservationsDisplay();
        
        showReservationDetails(reservation);
    }
    
    function validateReservationForm() {
        if (!movieSelect.value) {
            showNotification('Vă rugăm să selectați un film.', 'error');
            return false;
        }
        
        if (!dateInput.value) {
            showNotification('Vă rugăm să selectați o dată.', 'error');
            return false;
        }
        
        if (!timeSelect.value) {
            showNotification('Vă rugăm să selectați o oră.', 'error');
            return false;
        }
        
        if (!ticketsInput.value || parseInt(ticketsInput.value) < 1) {
            showNotification('Vă rugăm să selectați cel puțin un bilet.', 'error');
            return false;
        }
        
        if (selectedSeats.length !== parseInt(ticketsInput.value)) {
            showNotification(`Vă rugăm să selectați exact ${ticketsInput.value} locuri.`, 'error');
            return false;
        }
        
        if (!nameInput.value) {
            showNotification('Vă rugăm să introduceți numele.', 'error');
            return false;
        }
        
        if (!emailInput.value) {
            showNotification('Vă rugăm să introduceți adresa de email.', 'error');
            return false;
        }
        
        if (!phoneInput.value) {
            showNotification('Vă rugăm să introduceți numărul de telefon.', 'error');
            return false;
        }
        
        return true;
    }
    
    function resetReservationForm() {
        selectedSeats = [];
        document.querySelectorAll('.seat.selected').forEach(seat => {
            seat.classList.remove('selected');
        });
        
        movieSelect.value = '';
        timeSelect.value = '';
        ticketsInput.value = '1';
        nameInput.value = '';
        emailInput.value = '';
        phoneInput.value = '';
        
        updateReservationSummary();
    }
    
    function updateReservationsDisplay() {
        if (reservations.length === 0) {
            noReservations.style.display = 'flex';
            reservationsList.style.display = 'none';
            showAllReservationsBtn.style.display = 'none';
            clearReservationsBtn.style.display = 'none';
        } else {
            noReservations.style.display = 'none';
            reservationsList.style.display = 'grid';
            showAllReservationsBtn.style.display = 'block';
            clearReservationsBtn.style.display = 'block';
            
            const recentReservations = reservations.slice(-4);
            displayReservations(recentReservations);
        }
    }
    
    function displayReservations(reservationsToDisplay) {
        reservationsList.innerHTML = '';
        
        reservationsToDisplay.forEach(reservation => {
            const reservationCard = document.createElement('div');
            reservationCard.classList.add('reservation-card');
            
            const reservationDate = new Date(reservation.date + 'T' + reservation.time);
            const options = { weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' };
            const formattedDateTime = reservationDate.toLocaleDateString('ro-RO', options);
            
            reservationCard.innerHTML = `
                <div class="card-header">
                    <h4>${reservation.movie}</h4>
                    <span class="reservation-date">${formattedDateTime}</span>
                </div>
                <div class="card-body">
                    <p><strong>Bilete:</strong> ${reservation.tickets}</p>
                    <p><strong>Locuri:</strong> ${reservation.seats.join(', ')}</p>
                    <p><strong>Total:</strong> ${reservation.totalPrice} Lei</p>
                    <p class="reservation-id">ID: ${reservation.id}</p>
                </div>
                <div class="card-footer">
                    <button class="btn btn-view" data-id="${reservation.id}">Detalii</button>
                    <button class="btn btn-cancel" data-id="${reservation.id}">Anulează</button>
                </div>
                <div class="status ${reservation.status}">${reservation.status === 'active' ? 'Activă' : 'Anulată'}</div>
            `;
            
            reservationCard.querySelector('.btn-view').addEventListener('click', () => {
                const res = reservations.find(r => r.id === reservation.id);
                if (res) {
                    showReservationDetails(res);
                }
            });
            
            reservationCard.querySelector('.btn-cancel').addEventListener('click', () => {
                cancelReservation(reservation.id);
            });
            
            reservationsList.appendChild(reservationCard);
        });
    }
    
    function showAllReservations() {
        displayReservations(reservations);
    }
    
    function clearAllReservations() {
        if (confirm('Sunteți sigur că doriți să ștergeți toate rezervările?')) {
            reservations = [];
            localStorage.setItem('reservations', JSON.stringify(reservations));
            updateReservationsDisplay();
            showNotification('Toate rezervările au fost șterse.');
        }
    }
    
    function cancelReservation(id) {
        if (confirm('Sunteți sigur că doriți să anulați această rezervare?')) {
            const index = reservations.findIndex(r => r.id === id);
            if (index !== -1) {
                reservations[index].status = 'cancelled';
                localStorage.setItem('reservations', JSON.stringify(reservations));
                updateReservationsDisplay();
                showNotification('Rezervarea a fost anulată.');
            }
        }
    }
    
    function showReservationDetails(reservation) {
        reservationDetails.innerHTML = `
            <p><strong>Film:</strong> <span>${reservation.movie}</span></p>
            <p><strong>Data:</strong> <span>${reservation.formattedDate}</span></p>
            <p><strong>Ora:</strong> <span>${reservation.time}</span></p>
            <p><strong>Număr bilete:</strong> <span>${reservation.tickets}</span></p>
            <p><strong>Locuri:</strong> 
                <div class="seats-list">
                    ${reservation.seats.map(seat => `<span class="seat-item">${seat}</span>`).join('')}
                </div>
            </p>
            <p><strong>Client:</strong> <span>${reservation.customer.name}</span></p>
            <p><strong>Email:</strong> <span>${reservation.customer.email}</span></p>
            <p><strong>Telefon:</strong> <span>${reservation.customer.phone}</span></p>
            <p><strong>Total:</strong> <span>${reservation.totalPrice} Lei</span></p>
            <p><strong>Status:</strong> <span class="${reservation.status}">${reservation.status === 'active' ? 'Activă' : 'Anulată'}</span></p>
            <p><strong>ID Rezervare:</strong> <span>${reservation.id}</span></p>
            <div class="qr-code">
                <img src="/api/placeholder/150/150" alt="QR Code">
                <p>Scanați acest cod pentru a valida biletul</p>
            </div>
        `;
        
        modal.style.display = 'block';
    }
    
    function filterMovies(category) {
        movieCards.forEach(card => {
            if (category === 'all') {
                card.style.display = 'block';
            } else {
                card.style.display = card.dataset.category === category ? 'block' : 'none';
            }
        });
    }
    
    createSeats();
    updateReservationsDisplay();
    
    
    movieSelect.addEventListener('change', updateReservationSummary);
    dateInput.addEventListener('change', updateReservationSummary);
    timeSelect.addEventListener('change', updateReservationSummary);
    ticketsInput.addEventListener('change', function() {
        selectedSeats = [];
        document.querySelectorAll('.seat.selected').forEach(seat => {
            seat.classList.remove('selected');
        });
        updateReservationSummary();
    });
    
    saveReservationBtn.addEventListener('click', saveReservation);
    
    showAllReservationsBtn.addEventListener('click', showAllReservations);
    
    clearReservationsBtn.addEventListener('click', clearAllReservations);
    
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    mobileMenuToggle.addEventListener('click', () => {
        nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
    });
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            filterMovies(button.dataset.filter);
        });
    });
    
    document.querySelectorAll('.movie-card .btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const movieTitle = btn.getAttribute('data-movie');
            movieSelect.value = movieTitle;
            updateReservationSummary();
            
            document.querySelector('#reservation').scrollIntoView({ behavior: 'smooth' });
        });
    });
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});

function displayReservations(reservationsToDisplay) {
    reservationsList.innerHTML = '';
    
    reservationsToDisplay.forEach(reservation => {
        const reservationCard = document.createElement('div');
        reservationCard.classList.add('reservation-card');
        
        const reservationDate = new Date(reservation.date + 'T' + reservation.time);
        const options = { weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' };
        const formattedDateTime = reservationDate.toLocaleDateString('ro-RO', options);
        
        const statusText = reservation.status === 'active' ? 'Activă' : 'Anulată';
        
        reservationCard.innerHTML = `
            <div class="status ${reservation.status}">${statusText}</div>
            <div class="card-header">
                <h4>${reservation.movie}</h4>
                <span class="reservation-date">${formattedDateTime}</span>
            </div>
            <div class="card-body">
                <p><strong>Bilete:</strong> ${reservation.tickets}</p>
                <p><strong>Locuri:</strong> ${reservation.seats.join(', ')}</p>
                <p><strong>Total:</strong> ${reservation.totalPrice} Lei</p>
                <p class="reservation-id">ID: ${reservation.id}</p>
            </div>
            <div class="card-footer">
                <button class="btn btn-view" data-id="${reservation.id}">Detalii</button>
                <button class="btn btn-cancel" data-id="${reservation.id}">Anulează</button>
            </div>
        `;
        
        reservationCard.querySelector('.btn-view').addEventListener('click', () => {
            const res = reservations.find(r => r.id === reservation.id);
            if (res) {
                showReservationDetails(res);
            }
        });
        
        reservationCard.querySelector('.btn-cancel').addEventListener('click', () => {
            cancelReservation(reservation.id);
        });
        
        reservationsList.appendChild(reservationCard);
    });
}
