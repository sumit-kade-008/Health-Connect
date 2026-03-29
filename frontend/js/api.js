const isDev = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.protocol === 'file:';
window.BASE_URL = isDev ? 'http://localhost:5000' : '';
const API_URL = `${window.BASE_URL}/api`;

// Set auth listener for UI updates
document.addEventListener('DOMContentLoaded', () => {
    updateNavbar();
});

// Generic Fetch function with Authorization
async function fetchAPI(endpoint, options = {}) {
    const token = localStorage.getItem('token');
    
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    
    // Remove Content-Type if uploading FormData
    if (options.body instanceof FormData) {
        delete headers['Content-Type'];
    }

    try {
        const response = await fetch(`${API_URL}${endpoint}`, {
            ...options,
            headers
        });
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || 'Something went wrong');
        }
        return data;
    } catch (error) {
        throw error;
    }
}

// UI Helpers
function showAlert(message, type = 'error', elementId = 'alert-box') {
    const alertBox = document.getElementById(elementId);
    if (!alertBox) return;
    
    alertBox.textContent = message;
    alertBox.className = `alert ${type}`;
    
    setTimeout(() => {
        alertBox.style.display = 'none';
        alertBox.className = 'alert';
    }, 5000);
}

function updateNavbar() {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('role');
    const navLinks = document.getElementById('nav-links');
    
    if (!navLinks) return;

    if (token) {
        navLinks.innerHTML = `
            <a href="dashboard.html">Dashboard</a>
            <a href="donors.html">Blood Donors</a>
            <a href="hospitals.html">Hospitals</a>
            ${userRole === 'patient' ? '<a href="records.html">My Records</a>' : ''}
            <a href="emergency.html" style="color: var(--accent); font-weight: 700;">Emergency!</a>
            <a href="#" onclick="logout()" class="btn btn-outline btn-sm">Logout</a>
        `;
    } else {
        navLinks.innerHTML = `
            <a href="login.html" class="btn btn-outline">Login</a>
            <a href="register.html" class="btn btn-primary">Register</a>
        `;
    }
}

function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    window.location.href = 'index.html';
}

// Ensure protected routes
function checkAuth() {
    const token = localStorage.getItem('token');
    if (!token && !window.location.pathname.includes('login.html') && !window.location.pathname.includes('register.html') && !window.location.pathname.endsWith('index.html') && window.location.pathname !== '/') {
        window.location.href = 'login.html';
    }
}
checkAuth();
