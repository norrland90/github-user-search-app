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

// GET FORM DATA

const form = document.querySelector('.form');

function onSubmit(e) {
  e.preventDefault();

  // Delete error messages on submit
  if (document.querySelector('.form__error-message')) {
    document.querySelector('.form__error-message').remove();
  }
  if (document.querySelector('.form__warning')) {
    document.querySelector('.form__warning').remove();
  }

  // Get data
  const formData = new FormData(form);
  const query = formData.get('query');

  // Validate
  if (formValidation(query)) {
    // Do stuff with input
    getUser(query)
      .then((user) => {
        addUserDataToDOM(user);
      })
      .catch((err) => {
        addNoResultsWarning(err);
      });
  } else {
    // Do nothing
  }
}

form.addEventListener('submit', onSubmit);

function formValidation(query) {
  if (!query) {
    addErrorMessage('Search string cannot be empty. Try again.');
    return false;
  } else {
    return true;
  }
}

function addErrorMessage(errorMessage) {
  const error = document.createElement('p');
  error.classList = 'form__error-message';
  error.innerText = errorMessage;
  form.insertAdjacentElement('afterend', error);
}

function addNoResultsWarning(err) {
  const formInput = document.querySelector('.form__input');
  const noResults = document.createElement('p');
  noResults.classList = 'form__warning';
  noResults.setAttribute('title', err);
  noResults.innerText = 'No results';
  formInput.insertAdjacentElement('afterend', noResults);
}

function addUserDataToDOM(user) {
  const profilePicEl = document.querySelector('.results__profile-pic');
  profilePicEl.setAttribute('src', user.data.avatar_url);

  const nameEl = document.querySelector('.results__username');
  nameEl.innerText = user.data.name;

  const userLinkEl = document.querySelector('.results__user-link');
  userLinkEl.innerText = `@${user.data.login}`;

  const d = new Date(user.data.created_at);
  const day = d.getDate();
  const month = d.toLocaleString('en-US', { month: 'short' });
  const year = d.getFullYear();

  const dateJoinedEl = document.querySelector('.results__date-joined');
  dateJoinedEl.innerText = `Joined ${month} ${day} ${year}`;

  const bioEl = document.querySelector('.results__bio');
  if (user.data.bio) {
    bioEl.innerText = user.data.bio;
  } else {
    bioEl.innerText = 'No bio';
  }

  const reposEL = document.querySelector('.results__stat-value--repos');
  reposEL.innerText = user.data.public_repos;

  const followersEl = document.querySelector('.results__stat-value--followers');
  followersEl.innerText = user.data.followers;

  const followingEl = document.querySelector('.results__stat-value--following');
  followingEl.innerText = user.data.following;

  const locationEl = document.querySelector('#location-name');
  if (user.data.location) {
    locationEl.setAttribute('class', 'results__contact-info');
    locationEl.innerText = user.data.location;
  } else {
    locationEl.classList = 'results__contact-info results__contact-info--na';
    locationEl.innerText = 'Not available';
  }
  const blogEl = document.querySelector('#blog-link');
  if (user.data.blog) {
    blogEl.classList = 'results__contact-info';
    blogEl.innerText = user.data.blog;
    blogEl.setAttribute('href', `https://${user.data.blog}/`);
  } else {
    blogEl.classList = 'results__contact-info results__contact-info--na';
    blogEl.innerText = 'Not available';
    blogEl.removeAttribute('href');
  }
  const twitterEl = document.querySelector('#twitter-link');
  if (user.data.twitter_username) {
    twitterEl.classList = 'results__contact-info';
    twitterEl.innerText = user.data.twitter_username;
    twitterEl.setAttribute(
      'href',
      `https://twitter.com/${user.data.twitter_username}`
    );
  } else {
    twitterEl.classList = 'results__contact-info results__contact-info--na';
    twitterEl.innerText = 'Not available';
    twitterEl.removeAttribute('href');
  }
  const companyEl = document.querySelector('#company-name');
  if (user.data.company) {
    companyEl.classList = 'results__contact-info';
    companyEl.innerText = user.data.company;
  } else {
    companyEl.classList = 'results__contact-info results__contact-info--na';
    companyEl.innerText = 'Not available';
  }

  const resultsEl = document.querySelector('.results');
  resultsEl.style.visibility = 'visible';
}
