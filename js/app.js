// dom element
const body = document.getElementById("body");
const otpContainer = document.getElementById("otp-container");
const switchBtn = document.getElementById("switch");
const otpInputBoxList = document.getElementById("otp-input-box-list");
const otpValidation = document.getElementById("otp-validation");

let dynamicCode;
let ourOtp = "";
let optTime = 15;
let timerId;

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

function inputOTP(e) {
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
  ourOtp = ourOtp + currentValue;
}

function generateOTP() {
  return Math.floor(1000 + Math.random() * 9000);
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

function validateOtp() {
  return dynamicCode === Number(ourOtp);
}

function checkOTP(e) {
  inputOTP(e);
  const result = validateOtp();
  if (result) {
    otpSuccess();
  } else {
    otpFail();
  }
}

function displayOTP() {
  const generatedOtp = document.getElementById("generated-otp");
  dynamicCode = generateOTP();

  timerId = setInterval(() => {
    if (optTime < 1) {
      dynamicCode = null;
      return clearInterval(timerId);
    }
    optTime = optTime - 1;
    generatedOtp.innerHTML = `<div>Our otp code is ${dynamicCode}</div>
    <button class="btn" onclick="reset()">reset</button>
    <div>expires in ${optTime}s</div>`;
  }, 1000);
}

function reset() {
  const generatedOtp = document.getElementById("generated-otp");
  clearInterval(timerId);
  dynamicCode = null;
  ourOtp = "";
  optTime = 15;
  generatedOtp.innerHTML = "Loading...";
  setTimeout(displayOTP, 1000);
}

// EventListener
switchBtn.addEventListener("click", changeTheme);
otpInputBoxList.addEventListener("input", checkOTP);

setTimeout(displayOTP, 1000);
