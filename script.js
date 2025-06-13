// Global variables
let array = []; // Array to be sorted
const arrayContainer = document.querySelector('.array-container'); // Div where the array is displayed
const speedInput = document.getElementById('speed'); // Speed slider input

// Function to generate a random array
function generateArray(size = 20) {
  array = []; // Clear the array
  arrayContainer.innerHTML = ''; // Clear the visual bars
  for (let i = 0; i < size; i++) {
    const value = Math.floor(Math.random() * 100) + 1; // Random number between 1-100
    array.push(value); // Add value to the array
    const bar = document.createElement('div'); // Create a bar for this value
    bar.style.height = `${value * 3}px`; // Set height based on value
    bar.style.width = '20px'; // Fixed width
    arrayContainer.appendChild(bar); // Add bar to the container
  }
}

// Swap function for animations
function swap(bar1, bar2) {
  return new Promise(resolve => {
    setTimeout(() => {
      // Swap heights of the bars
      const tempHeight = bar1.style.height;
      bar1.style.height = bar2.style.height;
      bar2.style.height = tempHeight;
      resolve(); // Continue after the delay
    }, 300 - speedInput.value); // Adjust delay based on speed
  });
}

// Bubble Sort Algorithm
async function bubbleSort() {
  const bars = arrayContainer.querySelectorAll('div'); // Select all bars
  for (let i = 0; i < bars.length - 1; i++) {
    for (let j = 0; j < bars.length - i - 1; j++) {
      bars[j].style.background = 'red'; // Highlight the bars being compared
      bars[j + 1].style.background = 'red';
      if (array[j] > array[j + 1]) { // Compare values
        await swap(bars[j], bars[j + 1]); // Swap if needed
        [array[j], array[j + 1]] = [array[j + 1], array[j]]; // Update array values
      }
      bars[j].style.background = 'teal'; // Reset color
      bars[j + 1].style.background = 'teal';
    }
  }
}

// Selection Sort Algorithm
async function selectionSort() {
  const bars = arrayContainer.querySelectorAll('div'); // Select all bars
  for (let i = 0; i < bars.length - 1; i++) {
    let minIndex = i;
    bars[minIndex].style.background = 'yellow'; // Highlight the current minimum bar
    for (let j = i + 1; j < bars.length; j++) {
      bars[j].style.background = 'red'; // Highlight the bar being compared
      if (array[j] < array[minIndex]) {
        bars[minIndex].style.background = 'teal'; // Reset previous minimum
        minIndex = j; // Update minimum index
        bars[minIndex].style.background = 'yellow'; // Highlight the new minimum
      }
      await new Promise(resolve => setTimeout(resolve, 300 - speedInput.value)); // Pause for visualization
      bars[j].style.background = 'teal'; // Reset compared bar
    }
    // Swap the minimum with the current element
    if (minIndex !== i) {
      await swap(bars[i], bars[minIndex]);
      [array[i], array[minIndex]] = [array[minIndex], array[i]]; // Update array
    }
    bars[i].style.background = 'green'; // Mark the sorted position
  }
  bars[bars.length - 1].style.background = 'green'; // Mark the last bar as sorted
}

// Insertion Sort Algorithm
async function insertionSort() {
  const bars = arrayContainer.querySelectorAll('div'); // Select all bars
  for (let i = 1; i < bars.length; i++) {
    let key = array[i];
    let j = i - 1;

    bars[i].style.background = 'yellow'; // Highlight the current element

    // Shift elements larger than key to the right
    while (j >= 0 && array[j] > key) {
      bars[j + 1].style.background = 'red'; // Highlight the element being shifted
      bars[j + 1].style.height = bars[j].style.height; // Visually move the bar
      array[j + 1] = array[j];
      await new Promise(resolve => setTimeout(resolve, 300 - speedInput.value));
      bars[j + 1].style.background = 'teal'; // Reset color
      j--;
    }

    // Place the key in its correct position
    bars[j + 1].style.height = `${key * 3}px`; // Set the bar to the key's height
    array[j + 1] = key;

    bars[i].style.background = 'teal'; // Reset the color of the current element
  }
}

// Event listeners for buttons
document.getElementById('generate').addEventListener('click', () => generateArray());
document.getElementById('sort').addEventListener('click', async () => {
  const algorithm = document.getElementById('algorithm').value; // Get selected algorithm
  if (algorithm === 'bubble') await bubbleSort(); // Call Bubble Sort
  if (algorithm === 'selection') await selectionSort(); // Call Selection Sort
  if (algorithm === 'insertion') await insertionSort(); // Call Insertion Sort
});

// Generate the initial array when the page loads
generateArray();
