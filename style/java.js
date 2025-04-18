// Meniu mobil
document.querySelector('.mobile-menu-toggle').addEventListener('click', function() {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.toggle('active');
    // Animația barelor pentru meniul hamburger
    const bars = document.querySelectorAll('.bar');
    bars.forEach((bar, index) => {
        if (navMenu.classList.contains('active')) {
            if (index === 0) {
                bar.style.transform = 'rotate(-45deg) translate(-5px, 6px)';
            } else if (index === 1) {
                bar.style.opacity = '0';
            } else {
                bar.style.transform = 'rotate(45deg) translate(-5px, -6px)';
            }
        } else {
            bar.style.transform = 'none';
            bar.style.opacity = '1';
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scroll pentru ancorele interne
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            // Închide meniul mobil dacă este deschis
            document.querySelector('.nav-menu').classList.remove('active');
            // Resetează barele de meniu
            const bars = document.querySelectorAll('.bar');
            bars.forEach(bar => {
                bar.style.transform = 'none';
                bar.style.opacity = '1';
            });
        }
    });
});

// Animații la scroll pentru elemente
function fadeInOnScroll() {
    const elements = document.querySelectorAll('.card, .testimonial, .section-title, .cta-content');
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        if (elementPosition < screenPosition) {
            element.classList.add('fade-in');
        }
    });
}

// Adaugă clasă pentru animație la încărcare
document.addEventListener('DOMContentLoaded', function() {
    // Activează elementele vizibile la încărcare
    fadeInOnScroll();
    
    // Activează animațiile Hero
    document.querySelector('.welcome-text').classList.add('fade-in');
    setTimeout(() => {
        document.querySelector('.hero-description').classList.add('fade-in');
    }, 300);
    
    setTimeout(() => {
        const ctaButton = document.querySelector('.hero .cta-button');
        if (ctaButton) {
            ctaButton.classList.add('fade-in');
        }
    }, 600);
    
    // Trigger animații la scroll
    window.addEventListener('scroll', fadeInOnScroll);
    
    // Funcționalitate pentru cardurile de servicii
    setupServiceCards();
});

// Configurare carduri servicii pentru navigare
function setupServiceCards() {
    // Selectează toate butoanele "Rezervă acum" din carduri
    const reserveButtons = document.querySelectorAll('.card .btn-primary');
    
    // Adaugă event listeners pentru fiecare buton
    reserveButtons.forEach((button, index) => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Obține titlul serviciului
            const serviceTitle = this.closest('.card').querySelector('.card-title').textContent;
            
            // Redirecționare în funcție de serviciu
            switch(index) {
                case 0: // Cinema
                    window.location.href = 'cinema.html'; // Pagina pentru rezervări cinema
                    break;
                case 1: // Restaurant
                    window.location.href = 'restaurant.html'; // Pagina pentru rezervări restaurant
                    break;
                case 2: // Sală evenimente
                    window.location.href = 'sala.html'; // Pagina pentru rezervări sală
                    break;
                default:
                    console.log('Serviciu necunoscut');
            }
            
            // Alternativ, poți folosi localStorage pentru a păstra informații despre serviciul selectat
            localStorage.setItem('selectedService', serviceTitle);
        });
    });
    
    // Adaugă event listeners pentru click pe întregul card
    const serviceCards = document.querySelectorAll('.card');
    serviceCards.forEach((card, index) => {
        card.addEventListener('click', function(e) {
            // Verifică dacă click-ul nu este pe buton (pentru a evita dubla navigare)
            if (!e.target.classList.contains('btn-primary') && e.target.closest('.btn-primary') === null) {
                e.preventDefault();
                
                // Efect de click vizual
                this.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
                
                // Redirecționare întârziată pentru efect vizual
                setTimeout(() => {
                    const serviceTitle = this.querySelector('.card-title').textContent;
                    localStorage.setItem('selectedService', serviceTitle);
                    
                    // Redirecționare în funcție de index
                    switch(index) {
                        case 0:
                            window.location.href = 'cinema.html';
                            break;
                        case 1:
                            window.location.href = 'restaurant.html';
                            break;
                        case 2:
                            window.location.href = 'sala.html';
                            break;
                    }
                }, 200);
            }
        });
        
        // Adaugă pointer la hover peste card pentru UX mai bun
        card.style.cursor = 'pointer';
    });
}

// Funcția pentru preluarea serviciului selectat pe pagina de destinație
function checkSelectedService() {
    const selectedService = localStorage.getItem('selectedService');
    if (selectedService) {
        console.log('Serviciu selectat:', selectedService);
        // Aici poți adăuga logică pentru a manipula pagina în funcție de serviciul selectat
        // De exemplu, completarea automată a unui formular, afișarea unor informații specifice etc.
        
        // După utilizare, opțional curăță localStorage
        // localStorage.removeItem('selectedService');
    }
}

// Verifică dacă suntem pe o pagină de servicii și aplică funcționalitatea corespunzătoare
if (window.location.pathname.includes('cinema.html') || 
    window.location.pathname.includes('restaurant.html') || 
    window.location.pathname.includes('sala.html')) {
    document.addEventListener('DOMContentLoaded', checkSelectedService);
}