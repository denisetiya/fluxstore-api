function generateRandomNumber() {
  return Math.floor(Math.random() * 10);
}

function generateRandomNumbers() {
  let numbers = [];
  
  for (let i = 0; i < 4; i++) {
      numbers.push(generateRandomNumber());
  }
  
  return numbers.join(''); 
}

module.exports = generateRandomNumbers;
