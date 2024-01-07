import throttle from 'throttleit';

// Throttling a function that processes data.
function processData(data) {
  console.log('Processing:', data);

  // Add data processing logic here.
}

// Throttle the `processData` function to be called at most once every 2 seconds.
const throttledProcessData = throttle(processData, 2000);

// Simulate calling the function multiple times with different data.
throttledProcessData('Data 1');
throttledProcessData('Data 2');
// throttledProcessData('Data 3');
