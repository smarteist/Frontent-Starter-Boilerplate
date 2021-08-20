const toggleSwitch = document.querySelector('input[name="dark-mode-toggle"]');
const currentTheme = window.localStorage.getItem('theme');

if (currentTheme) {
  document.documentElement.setAttribute('data-theme', currentTheme);

  if (currentTheme === 'dark') {
    toggleSwitch.checked = true;
  }
}

toggleSwitch.addEventListener('change', function (e) {
  if (this.checked) {
    darkModeTransition(e)
    document.documentElement.setAttribute('data-theme', 'dark');
    window.localStorage.setItem('theme', 'dark');
  } else {
    darkModeTransition(e)
    document.documentElement.setAttribute('data-theme', 'light');
    window.localStorage.setItem('theme', 'light');
  }
});

let darkModeTransition = () => {
  document.documentElement.classList.add('transition');
  window.setTimeout(() => {
    document.documentElement.classList.remove('transition');
  }, 1000)
}
