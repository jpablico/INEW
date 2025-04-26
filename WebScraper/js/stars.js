function generateStars(selector, count, maxWidth, maxHeight) {
  console.log(`Generating ${count} stars for ${selector}`);
  const stars = [];
  for (let i = 0; i < count; i++) {
    const x = Math.floor(Math.random() * maxWidth);
    const y = Math.floor(Math.random() * maxHeight);
    stars.push(`${x}px ${y}px #c49952`);
  }
  document.querySelector(selector).style.boxShadow = stars.join(', ');
}

const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight * 2;
generateStars('#stars', 500, screenWidth, screenHeight);
generateStars('#stars2', 300, screenWidth, screenHeight);
generateStars('#stars3', 200, screenWidth, screenHeight);

window.addEventListener('resize', () => {
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight * 2;
  generateStars('#stars', 500, screenWidth, screenHeight);
  generateStars('#stars2', 300, screenWidth, screenHeight);
  generateStars('#stars3', 200, screenWidth, screenHeight);
});

