alert("***this is a sinking ship***（´-`）.｡oO");

const colorBlock = document.getElementById('colorBlock');
document.addEventListener('mousemove', (e) => {
  const mouseX = e.clientX + window.scrollX; // Add scroll position to X
  const mouseY = e.clientY + window.scrollY; // Add scroll position to Y

  colorBlock.style.left = (mouseX - colorBlock.offsetWidth / 2.4) + 'px';
  colorBlock.style.top = (mouseY - colorBlock.offsetHeight / 2) + 'px';
});


// function getRandomPosition() {
//     const width = window.innerWidth - 100;  // Subtract image width to stay within the viewport
//     const height = window.innerHeight - 100; // Subtract image height to stay within the viewport
//     const x = Math.random() * width;
//     const y = Math.random() * height;
//     return { x, y };
// }

// // Function to move the image to a random position
// function moveImage() {
//     const image = document.getElementById('floating-image');
//     const randomPos = getRandomPosition();
//     image.style.left = randomPos.x + 'px';
//     image.style.top = randomPos.y + 'px';
// }

// // Move the image every 2 seconds
// setInterval(moveImage, 100);

// // Initial position
// moveImage();


// 同义词wound：
document.addEventListener("DOMContentLoaded", function () {
    const synonymText = document.querySelector(".synonym-text");
    let originalText = synonymText.textContent;
    let synonyms = [];
    let synonymIndex = 0;
    let synonymInterval;
    
    // Function to fetch synonyms using an API
    async function getSynonyms(word) {
      try {
        const response = await fetch(`https://api.datamuse.com/words?rel_syn=${word}`);
        const data = await response.json();
        return data.map(item => item.word);
      } catch (error) {
        console.error("Error fetching synonyms:", error);
        return [];
      }
    }
  
    // Function to cycle through synonyms
    function cycleSynonyms() {
      if (synonyms.length === 0) return; // No synonyms to cycle through
      
      // Change the text content to the next synonym in the array
      synonymText.textContent = synonyms[synonymIndex];
      synonymIndex = (synonymIndex + 1) % synonyms.length; // Loop back to the start if we reach the end
    }
  
    // Event listener for when the cursor enters the word
    synonymText.addEventListener("mouseenter", async function () {
      originalText = synonymText.textContent; // Store the original text
      const word = synonymText.getAttribute("data-word");
  
      // Fetch synonyms only once when the cursor enters
      synonyms = await getSynonyms(word);
      
      // If synonyms are found, start cycling through them
      if (synonyms.length > 0) {
        synonymInterval = setInterval(cycleSynonyms, 100); // Change synonym every 300ms
        synonymText.classList.add('active'); // Optional: Add class for style changes
      }
    });
  
    // Event listener for when the cursor leaves the word
    synonymText.addEventListener("mouseleave", function () {
      clearInterval(synonymInterval); // Stop the cycling of synonyms
      synonymText.textContent = originalText; // Reset to the original word
      synonymText.classList.remove('active'); // Optional: Remove the active style class
    });
  });