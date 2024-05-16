// dom element
const body = document.getElementById("body");
const otpContainer = document.getElementById("otp-container");
const switchBtn = document.getElementById("switch");
const otpInputBoxList = document.getElementById("otp-input-box-list");
const otpValidation = document.getElementById("otp-validation");

let dynamicCode;
let ourOtp = "";
// function
function changeTheme() {
  const isLight = body.classList.contains("light-bg");

  if (isLight) {
    body.classList.remove("light-bg");
    body.classList.add("dark-bg");
    otpContainer.classList.remove("light-bg", "light-box-shadow");
    otpContainer.classList.add("dark-bg", "dark-box-shadow");
  } else {
    body.classList.remove("dark-bg");
    body.classList.add("light-bg");
    otpContainer.classList.remove("dark-bg", "dark-box-shadow");
    otpContainer.classList.add("light-bg", "light-box-shadow");
  }
}

function checkOTP(e) {
  const currentElement = e.target;
  const currentValue = e.target.value;
  const nextChild = currentElement.nextElementSibling;

  // checking value is number or not
  if (isNaN(currentValue)) {
    currentElement.value = "";
    return;
  }

  //froward to next child
  if (nextChild) {
    nextChild.focus();
  }

  // checking otp is valid or not
  ourOtp = ourOtp + currentValue;
  const result = Number(ourOtp) === dynamicCode;
  if (result) {
    otpSuccess();
  } else {
    otpFail();
  }
}

function generateOTP() {
  const generatedOTP = document.getElementById("generated-otp");
  dynamicCode = Math.floor(1000 + Math.random() * 9000);
  generatedOTP.innerHTML = ` 
  <span>OTP code is : ${dynamicCode}</span>
  <button class="btn" onclick="generateOTP()">reset</button>
  `;
  otpValidation.innerHTML = "";
}

function otpSuccess() {
  otpValidation.classList.remove("fail");
  otpValidation.classList.add("success");
  otpValidation.innerText = "OTP has been validated successfully";
}
function otpFail() {
  otpValidation.classList.remove("success");
  otpValidation.classList.add("fail");
  otpValidation.innerText = "OTP does not match";
}

// EventListener
switchBtn.addEventListener("click", changeTheme);
otpInputBoxList.addEventListener("input", checkOTP);

setTimeout(generateOTP, 1000);
