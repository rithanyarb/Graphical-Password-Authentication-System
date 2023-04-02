// Define the set of images for the graphical password
var images = [
    'C:/Users/Rithanya/Desktop/Smartcity/uranus.jpg',
    'C:/Users/Rithanya/Desktop/Smartcity/pluto.jpg',
    'C:/Users/Rithanya/Desktop/Smartcity/saturn.jpg',
    'C:/Users/Rithanya/Desktop/Smartcity/neptune.jpg',
    'C:/Users/Rithanya/Desktop/Smartcity/mars.jpg',
    'C:/Users/Rithanya/Desktop/Smartcity/jupiter.jpg',
];

// Define the maximum number of selections for the graphical password
var maxSelections = 6;

// Generate the image HTML for the password selection
function generatePasswordHTML(containerId) {
  var passwordContainer = document.getElementById(containerId);
  var passwordHTML = '';
  for (var i = 0; i < images.length; i++) {
    passwordHTML += '<div class="password-image" style="background-image: url(' + images[i] + ');" data-index="' + (i+1) + '"></div>';
  }
  passwordContainer.innerHTML = passwordHTML;

  // Add click event listeners to the password images
  var passwordImages = document.querySelectorAll('#' + containerId + ' .password-image');
  for (var j = 0; j < passwordImages.length; j++) {
    passwordImages[j].addEventListener('click', function() {
      if (this.classList.contains('selected')) {
        this.classList.remove('selected');
      } else if (document.querySelectorAll('#' + containerId + ' .password-image.selected').length < maxSelections) {
        this.classList.add('selected');
      }
    });
  }
}

// Generate the password HTML for sign up and sign in
generatePasswordHTML('signup-password-container');
generatePasswordHTML('signin-password-container');

// Handle the sign up form submission
document.getElementById('signup-form').addEventListener('submit', function(e) {
  e.preventDefault();
  signupPassword = [];
  var selectedImages = document.querySelectorAll('#signup-password-container .password-image');
  var passwordLength = Math.floor(Math.random() * 1) + 1; // choose a random password length of 1 image 
  var selectedIndices = [];
  while (selectedIndices.length < passwordLength) {
    var index = Math.floor(Math.random() * images.length) + 1; // choose a random image index
    if (!selectedIndices.includes(index)) {
      selectedIndices.push(index);
      signupPassword.push(index);
      selectedImages[index-1].classList.add('selected'); // mark the image as selected in the User
    }
  }
  alert('Sign up successful. Your password is: ' + signupPassword.join(', '));
  document.getElementById('signup-form').reset();
});

// Handle the sign in form submission
document.getElementById('signin-form').addEventListener('submit', function(e) {
  e.preventDefault();
  signinPassword = [];
  var selectedImages = document.querySelectorAll('#signin-password-container .password-image.selected');
  for (var i = 0; i < selectedImages.length; i++) {
    signinPassword.push(parseInt(selectedImages[i].getAttribute('data-index')));
  }
  if (JSON.stringify(signupPassword) === JSON.stringify(signinPassword)) {
    alert('Sign in successful.');
  } else {
    alert('Sign in failed. Please try again.');
  }
  document.getElementById('signin-form').reset();
});