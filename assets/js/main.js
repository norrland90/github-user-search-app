import { Octokit } from 'https://esm.sh/octokit';

const octokit = new Octokit({});

async function getUser(username) {
  const userData = await octokit.request(`GET /users/${username}`);
  return userData;
}

// This would work too, and gives the same information, w/o Octokit
async function getUser2(username) {
  const response = await fetch(`https://api.github.com/users/${username}`);
  const userData = await response.json();
  return userData;
}

// Make this request in a "onSubmit-function"
getUser('norrland90').then((userData) => {
  console.log(userData);
  console.log(userData.data.name);
  console.log(userData.data.login);
  console.log(userData.data.created_at);
  console.log(userData.data.bio);
  console.log(userData.data.public_repos);
  console.log(userData.data.followers);
  console.log(userData.data.following);
  console.log(userData.data.location);
  console.log(userData.data.blog);
  console.log(userData.data.twitter_username);
  console.log(userData.data.company);
});

// TOGGLE DARK/LIGHT MODE

const darkBtn = document.querySelector('.header__toggle-btn--dark');
const lightBtn = document.querySelector('.header__toggle-btn--light');

function toggleMode() {
  const bodyEl = document.querySelector('body');

  if (bodyEl.classList.contains('dark')) {
    bodyEl.classList = '';
    lightBtn.style.display = 'none';
    darkBtn.style.display = 'flex';
  } else {
    bodyEl.classList.add('dark');
    lightBtn.style.display = 'flex';
    darkBtn.style.display = 'none';
  }
}

darkBtn.addEventListener('click', toggleMode);
lightBtn.addEventListener('click', toggleMode);
