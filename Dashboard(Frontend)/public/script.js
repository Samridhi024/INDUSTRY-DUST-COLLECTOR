const container = document.querySelector('.container');
const registerBtn = document.querySelector('.register-btn');
const loginBtn = document.querySelector('.login-btn');

registerBtn.addEventListener('click', () => {
  container.classList.add('active');
});

loginBtn.addEventListener('click', () => {
  container.classList.remove('active');
});

// ✅ Handle login form submission
document.getElementById('login-form')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const res = await fetch('https://industry-dust-monitor-production-a405.up.railway.app/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
    credentials: 'include' // include cookies if needed
  });

    const data = await res.json();
    if (res.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('email', data.user.email);
        localStorage.setItem('username', data.user.username);
      
        // ✅ Give it time to fully save
        setTimeout(() => {
          window.location.href = "http://localhost:3000";
        }, 200); // 200ms delay
      }      
  } catch (err) {
    alert('Error logging in');
  }
});

// ✅ Handle register form submission
document.getElementById('register-form')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.getElementById('reg-username').value;
  const email = document.getElementById('reg-email').value;
  const password = document.getElementById('reg-password').value;

  try {
    const res = await fetch('https://industry-dust-monitor-production-a405.up.railway.app/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
    credentials: 'include' // include cookies if needed
  });

    if (res.ok) {
      alert('Registration successful! You can now log in.');
      container.classList.remove('active'); // switch to login
    } else {
      alert('Registration failed');
    }
  } catch (err) {
    alert('Error during registration');
  }
});
