const tabs = document.querySelectorAll('.tab');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const tabId = tab.getAttribute('data-tab');
        
        document.querySelector('.tab.active').classList.remove('active');
        tab.classList.add('active');
        
        document.querySelector('.tab-content.active').classList.remove('active');
        document.getElementById(`${tabId}-content`).classList.add('active');
        
        document.querySelectorAll('.error').forEach(error => {
            error.style.display = 'none';
        });
        document.querySelectorAll('.success-message').forEach(message => {
            message.style.display = 'none';
        });
        
        if (tabId === 'login') {
            document.getElementById('login-email').value = '';
            document.getElementById('login-password').value = '';
        }
    });
});

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function validatePhone(phone) {
    const re = /^(07[0-9]{8}|(\+4|)07[0-9]{8}|\+373[0-9]{8})$/;
    return re.test(String(phone));
}

function validatePassword(password) {
    return password.length > 0 && password.length <= 8;
}

function checkPasswordStrength(password) {
    if (password.length === 0) {
        return { score: 0, text: 'Neutilizat', isStrong: false, isStrongest: false };
    }
    
    let score = 0;
    
    if (password.length >= 4) score += 1;
    if (password.length >= 6) score += 1;
    
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;
    
    if (password.length > 8) score = 0;
    
    const texts = ['Foarte slabă', 'Slabă', 'Medie', 'Bună', 'Puternică', 'Foarte puternică'];
    const colors = ['#f44336', '#ff9800', '#ffeb3b', '#8bc34a', '#4caf50', '#2e7d32'];
    
    const isStrong = score >= 2;
    const isStrongest = score === 5;
    
    return {
        score: score,
        text: texts[score],
        color: colors[score],
        isStrong: isStrong,
        isStrongest: isStrongest
    };
}

document.getElementById('register-password').addEventListener('input', (e) => {
    const password = e.target.value;
    const strengthBar = document.querySelector('.password-strength-bar');
    const strengthText = document.querySelector('.strength-text');
    const strengthValue = document.getElementById('strength-value');
    const passwordError = document.getElementById('register-password-error');
    
    document.querySelector('.password-strength').style.display = 'block';
    strengthText.style.display = 'block';
    
    const strength = checkPasswordStrength(password);
    
    strengthBar.style.width = `${(strength.score / 5) * 100}%`;
    strengthBar.style.backgroundColor = strength.color;
    strengthValue.textContent = strength.text;
    strengthValue.style.color = strength.color;
    
    if (password.length > 8) {
        passwordError.style.display = 'block';
        e.target.setCustomValidity('Parola nu poate depăși 8 caractere.');
    } else {
        passwordError.style.display = 'none';
        e.target.setCustomValidity('');
    }
    
    let passwordStrengthError = document.getElementById('register-password-strength-error');
    
    if (!passwordStrengthError) {
        passwordStrengthError = document.createElement('div');
        passwordStrengthError.id = 'register-password-strength-error';
        passwordStrengthError.className = 'error';
        passwordStrengthError.textContent = 'Parola trebuie să fie cel puțin de nivel Medie. Includeți litere mari, cifre sau caractere speciale.';
        document.querySelector('.strength-text').insertAdjacentElement('afterend', passwordStrengthError);
    }
    
    if (!strength.isStrong) {
        passwordStrengthError.style.display = 'block';
    } else {
        passwordStrengthError.style.display = 'none';
    }
});

document.getElementById('login-password').addEventListener('input', (e) => {
    const password = e.target.value;
    const passwordError = document.getElementById('login-password-error');
    
    if (password.length > 8) {
        passwordError.style.display = 'block';
        e.target.setCustomValidity('Parola nu poate depăși 8 caractere.');
    } else {
        passwordError.style.display = 'none';
        e.target.setCustomValidity('');
    }
    
    const strength = checkPasswordStrength(password);
    
   
    let loginPasswordStrengthError = document.getElementById('login-password-strength-error');
    
    if (!loginPasswordStrengthError) {
        loginPasswordStrengthError = document.createElement('div');
        loginPasswordStrengthError.id = 'login-password-strength-error';
        loginPasswordStrengthError.className = 'error';
        loginPasswordStrengthError.textContent = 'Doar parole de nivel Foarte puternică sunt permise pentru autentificare.';
        e.target.parentNode.appendChild(loginPasswordStrengthError);
    }
    
    
    if (!strength.isStrongest) {
        loginPasswordStrengthError.style.display = 'block';
    } else {
        loginPasswordStrengthError.style.display = 'none';
    }
});

document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    let isValid = true;
    
    if (!validateEmail(email)) {
        document.getElementById('login-email-error').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('login-email-error').style.display = 'none';
    }
    
    if (!validatePassword(password)) {
        document.getElementById('login-password-error').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('login-password-error').style.display = 'none';
    }
    
   
    const passwordStrength = checkPasswordStrength(password);
    if (!passwordStrength.isStrongest) {
        let loginPasswordStrengthError = document.getElementById('login-password-strength-error');
        
        if (!loginPasswordStrengthError) {
            loginPasswordStrengthError = document.createElement('div');
            loginPasswordStrengthError.id = 'login-password-strength-error';
            loginPasswordStrengthError.className = 'error';
            loginPasswordStrengthError.textContent = 'Doar parole de nivel Foarte puternică sunt permise pentru autentificare.';
            document.getElementById('login-password').parentNode.appendChild(loginPasswordStrengthError);
        }
        
        loginPasswordStrengthError.style.display = 'block';
        isValid = false;
    } else if (document.getElementById('login-password-strength-error')) {
        document.getElementById('login-password-strength-error').style.display = 'none';
    }
    
    if (isValid) {
        const storedUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
        const allUsers = [...registeredUsers, ...storedUsers];
        
        const user = allUsers.find(u => u.email === email);
        
        if (user && user.password === password) {
            document.getElementById('login-success').style.display = 'block';
            
            setTimeout(() => {
                alert('Autentificare reușită!');
                document.getElementById('login-email').value = '';
                document.getElementById('login-password').value = ''; 
                document.getElementById('login-success').style.display = 'none';
            }, 1000);
        } else {
           
            document.getElementById('login-email').value = '';
            document.getElementById('login-password').value = ''; 
            
            let loginError = document.getElementById('login-auth-error');
            
            if (!loginError) {
                loginError = document.createElement('div');
                loginError.id = 'login-auth-error';
                loginError.className = 'error';
                loginError.textContent = 'Email sau parolă incorecte. Vă rugăm să vă înregistrați dacă nu aveți cont.';
                document.getElementById('login-form').insertBefore(
                    loginError, 
                    document.getElementById('login-form').querySelector('button')
                );
            }
            
            loginError.style.display = 'block';
        }
    }
});

document.getElementById('register-form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const nume = document.getElementById('register-nume').value;
    const email = document.getElementById('register-email').value;
    const telefon = document.getElementById('register-telefon').value;
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('register-confirm-password').value;
    let isValid = true;
    
    if (nume.trim() === '') {
        document.getElementById('register-nume-error').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('register-nume-error').style.display = 'none';
    }
    
    if (!validateEmail(email)) {
        document.getElementById('register-email-error').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('register-email-error').style.display = 'none';
        
        const storedUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
        const allUsers = [...registeredUsers, ...storedUsers];
        
        if (allUsers.some(user => user.email === email)) {
            let emailDuplicateError = document.getElementById('register-email-duplicate-error');
            
            if (!emailDuplicateError) {
                emailDuplicateError = document.createElement('div');
                emailDuplicateError.id = 'register-email-duplicate-error';
                emailDuplicateError.className = 'error';
                emailDuplicateError.textContent = 'Acest email este deja înregistrat.';
                document.getElementById('register-email').parentNode.appendChild(emailDuplicateError);
            }
            
            emailDuplicateError.style.display = 'block';
            isValid = false;
        } else if (document.getElementById('register-email-duplicate-error')) {
            document.getElementById('register-email-duplicate-error').style.display = 'none';
        }
    }
    
    if (!validatePhone(telefon)) {
        document.getElementById('register-telefon-error').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('register-telefon-error').style.display = 'none';
    }
    
    if (!validatePassword(password)) {
        document.getElementById('register-password-error').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('register-password-error').style.display = 'none';
    }
    
    if (password !== confirmPassword) {
        document.getElementById('register-confirm-password-error').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('register-confirm-password-error').style.display = 'none';
    }
    
   
    const passwordStrength = checkPasswordStrength(password);
    if (!passwordStrength.isStrong) {
        let passwordStrengthError = document.getElementById('register-password-strength-error');
        
        if (!passwordStrengthError) {
            passwordStrengthError = document.createElement('div');
            passwordStrengthError.id = 'register-password-strength-error';
            passwordStrengthError.className = 'error';
            passwordStrengthError.textContent = 'Parola trebuie să fie cel puțin de nivel Medie. Includeți litere mari, cifre sau caractere speciale.';
            document.querySelector('.strength-text').insertAdjacentElement('afterend', passwordStrengthError);
        }
        
        passwordStrengthError.style.display = 'block';
        isValid = false;
    } else if (document.getElementById('register-password-strength-error')) {
        document.getElementById('register-password-strength-error').style.display = 'none';
    }
    
    if (isValid) {
        const newUser = {
            nume: nume,
            email: email,
            telefon: telefon,
            password: password
        };
        
        registeredUsers.push(newUser);
        
        const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
        existingUsers.push(newUser);
        localStorage.setItem('registeredUsers', JSON.stringify(existingUsers));
        
        document.getElementById('register-success').style.display = 'block';
        
        setTimeout(() => {
            alert('Înregistrare reușită! Acum vă puteți conecta cu datele înregistrate.');
            document.getElementById('register-form').reset();
            document.getElementById('register-success').style.display = 'none';
            document.querySelector('.password-strength').style.display = 'none';
            document.querySelector('.strength-text').style.display = 'none';
            
          
            tabs[0].click();
        }, 1000);
    }
});

window.addEventListener('load', () => {
    const storedUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    if (storedUsers.length > 0) {
        console.log(`${storedUsers.length} utilizatori încărcați din localStorage`);
    }
    
    setTimeout(createFloatingIcons, 500);
});

function createFloatingIcons() {
    const backgroundElement = document.querySelector('.background-animations');
    if (!backgroundElement) return;
    
    backgroundElement.innerHTML = '';
    
    const icons = [
        'fa-utensils',
        'fa-table',
        'fa-dumbbell',
        'fa-film',
        'fa-chair',
        'fa-calendar'
    ];
    
    const container = document.querySelector('.container');
    const containerRect = container.getBoundingClientRect();
    
    for (let i = 0; i < 30; i++) {
        const icon = document.createElement('i');
        
        const randomIcon = icons[Math.floor(Math.random() * icons.length)];
        icon.className = `fas ${randomIcon} animation-icon`;
        
        const size = Math.floor(Math.random() * 15) + 15;
        icon.style.fontSize = `${size}px`;
        
        let left;
        do {
            left = Math.random() * window.innerWidth;
        } while (
            left > containerRect.left - 100 && 
            left < containerRect.right + 100
        );
        
        icon.style.left = `${left}px`;
        
        icon.style.top = `${window.innerHeight + Math.random() * 500}px`;
        
        const duration = Math.random() * 20 + 10;
        icon.style.animationDuration = `${duration}s`;
        
        const delay = Math.random() * 10;
        icon.style.animationDelay = `-${delay}s`;
        
        backgroundElement.appendChild(icon);
    }
}

const styleElement = document.createElement('style');
styleElement.textContent = `
.animation-icon {
    position: absolute;
    opacity: 0.15;
    color: #ffffff;
    animation: float-up linear infinite;
    z-index: -1;
}

@keyframes float-up {
    0% {
        transform: translateY(0) rotate(0deg);
    }
    100% {
        transform: translateY(-2000px) rotate(360deg);
    }
}`;
document.head.appendChild(styleElement);


let registeredUsers = [];
document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    let isValid = true;
    
    if (!validateEmail(email)) {
        document.getElementById('login-email-error').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('login-email-error').style.display = 'none';
    }
    
    if (!validatePassword(password)) {
        document.getElementById('login-password-error').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('login-password-error').style.display = 'none';
    }
    
    const passwordStrength = checkPasswordStrength(password);
    if (!passwordStrength.isStrongest) {
        let loginPasswordStrengthError = document.getElementById('login-password-strength-error');
        
        if (!loginPasswordStrengthError) {
            loginPasswordStrengthError = document.createElement('div');
            loginPasswordStrengthError.id = 'login-password-strength-error';
            loginPasswordStrengthError.className = 'error';
            loginPasswordStrengthError.textContent = 'Doar parole de nivel Foarte puternică sunt permise pentru autentificare.';
            document.getElementById('login-password').parentNode.appendChild(loginPasswordStrengthError);
        }
        
        loginPasswordStrengthError.style.display = 'block';
        isValid = false;
    } else if (document.getElementById('login-password-strength-error')) {
        document.getElementById('login-password-strength-error').style.display = 'none';
    }
    
    if (isValid) {
        const storedUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
        const allUsers = [...registeredUsers, ...storedUsers];
        
        const user = allUsers.find(u => u.email === email);
        
        if (user && user.password === password) {
            document.getElementById('login-success').style.display = 'block';
            
            setTimeout(() => {
                window.location.href = '/home/user/Desktop/Practica_Real/Site.Adevarat/style/index.html';
            }, 1000);
        } else {
            document.getElementById('login-email').value = '';
            document.getElementById('login-password').value = ''; 
            
            let loginError = document.getElementById('login-auth-error');
            
            if (!loginError) {
                loginError = document.createElement('div');
                loginError.id = 'login-auth-error';
                loginError.className = 'error';
                loginError.textContent = 'Email sau parolă incorecte. Vă rugăm să vă înregistrați dacă nu aveți cont.';
                document.getElementById('login-form').insertBefore(
                    loginError, 
                    document.getElementById('login-form').querySelector('button')
                );
            }
            
            loginError.style.display = 'block';
        }
    }
});