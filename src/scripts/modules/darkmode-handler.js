document.querySelector('input[name="dark-mode"]')
  .addEventListener('change', function () {
    if (this.checked) {
      darkModeTransition()
      document.documentElement.setAttribute('data-theme', 'dark')
    } else {
      darkModeTransition()
      document.documentElement.setAttribute('data-theme', 'light')
    }
  });

let darkModeTransition = () => {
  document.documentElement.classList.add('transition');
  window.setTimeout(() => {
    document.documentElement.classList.remove('transition');
  }, 1000)
}
