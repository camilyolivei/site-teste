export default function initLogin(){
 
 const login = document.querySelector("[data-login]");
  const loginCloseBtn = document.querySelector("[data-login-close]");
  const loginCloseOverlay = document.querySelector("[data-login-overlay]");
  const btnLogin = document.querySelector(".login_btn");
  var showPass = document.querySelector("#btn-password");

  // login
  const loginEvent = () => {
    login.classList.toggle("active");
  };
  btnLogin.addEventListener("click", loginEvent);
  loginCloseOverlay.addEventListener("click", loginEvent);
  loginCloseBtn.addEventListener("click", loginEvent);

  //Show Password
  function showPassword() {
    var inputPass = document.querySelector("#password");
    
    if (inputPass.type === "password") {
      inputPass.setAttribute("type", "text");
      showPass.classList.replace("bi-eye-slash", "bi-eye");
    } else {
      inputPass.setAttribute("type", "password");
      showPass.classList.replace("bi-eye", "bi-eye-slash");
    }
  }
  showPass.addEventListener('click',showPassword)

}