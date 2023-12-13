// Get the form element
const form = document.querySelector('form');

// Get the input element
const input = document.querySelector('#number');

// Get the submit button element
const submitButton = document.querySelector('#submitButton');

// Get the play game element
const playGame = document.querySelector('#playGame');
const rightNumber = document.querySelector('#rightNumber');

// generating a random value from 0 to 50 
function generateRandomNumber() {
  return Math.floor(Math.random() * 51);
}
// Declare variable to count how may time you guess numbers
let count = 6;

let randomNumber = generateRandomNumber()
// Add an event listener to the form submit button
form.addEventListener('submit', (event) => {
  // Prevent the default form submission behavior
  event.preventDefault();
  count--;
  // Get the value of the input element
  const number = input.value;
  
  if(count===0)
  {
    form.innerHTML="You lose try again!"
  }
  if (Number(randomNumber) === Number(number)) {
    // Print a congratulatory message with the correct number
    playGame.innerHTML = `
      <h1 class="mb-5">Congratulations Right number ${number}!</h1>
      
      <img src="media/circuit.PNG" alt="circuit"  class="img-fluid col-sm-12 col-md-5  "/>
      <div class="mt-5">
      <form>
      <button type="submit"  class="btn btn-success"> ON</button>
      <button type="submit" class="btn btn-danger">OFF</button>
      </form>
      </div>
    `;
  }
  else if(Number(randomNumber)>Number(number)&&count>0){
    playGame.textContent = `smaller than right number ... you can guess ${count} times again`;

  }
  else if (Number(randomNumber)<Number(number)&&count>0){
    playGame.textContent = `bigger than right number ... you can guess ${count} times again`;

  }
  // Print the number on the screen
});

rightNumber.textContent = `Random Number is ${randomNumber}`;

