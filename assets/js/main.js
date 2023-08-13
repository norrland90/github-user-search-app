import { Octokit } from 'https://esm.sh/octokit';

const octokit = new Octokit({});

async function getUser(username) {
  const user = await octokit.request(`GET /users/${username}`);
  return user;
}

// This would work too, and gives the same information, w/o Octokit
async function getUser2(username) {
  const response = await fetch(`https://api.github.com/users/${username}`);
  const user = await response.json();
  return user;
}

// Make this request in a "onSubmit-function"
getUser('norrland90').then((user) => {
  console.log(user);
  console.log(user.data.name);
  console.log(user.data.login);
  console.log(user.data.created_at);
  console.log(user.data.bio);
  console.log(user.data.public_repos);
  console.log(user.data.followers);
  console.log(user.data.following);
  console.log(user.data.location);
  console.log(user.data.blog);
  console.log(user.data.twitter_username);
  console.log(user.data.company);
});

// DARK/LIGHT MODE FUNCTIONS

const bodyEl = document.querySelector('body');
const darkBtn = document.querySelector('.header__toggle-btn--dark');
const lightBtn = document.querySelector('.header__toggle-btn--light');

const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Set preferred mode on load and change if user changes mode settings in OS
function setPreferredMode() {
  if (prefersDarkScheme.matches) {
    activateDarkMode();
  } else {
    activateLightMode();
  }
}

// Toggle mode on btn-click
function toggleMode() {
  if (bodyEl.classList.contains('dark')) {
    activateLightMode();
  } else {
    activateDarkMode();
  }
}

function activateDarkMode() {
  bodyEl.classList.add('dark');
  lightBtn.style.display = 'flex';
  darkBtn.style.display = 'none';
}

function activateLightMode() {
  bodyEl.classList = '';
  lightBtn.style.display = 'none';
  darkBtn.style.display = 'flex';
}

darkBtn.addEventListener('click', toggleMode);
lightBtn.addEventListener('click', toggleMode);

// Listen for change in mode setting in OS
prefersDarkScheme.addEventListener('change', setPreferredMode);
// Set preferred mode on page load
setPreferredMode();
