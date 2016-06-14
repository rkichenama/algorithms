window.setInterval(() => {
  console.log('flip');
  ['light', 'dark']
    .forEach((theme) => document.documentElement.classList.toggle(theme));
}, 5 * 60 * 1000);
