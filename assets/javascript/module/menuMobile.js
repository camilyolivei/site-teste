import outsideClick from "./outside.js";
export default function initMenuMobile() {
  const menuButton = document.querySelector('[data-menu="button_open"]');
  const menuList = document.querySelector('[data-menu="list"]');
  const emphasis = document.querySelector(".emphasis");
  const headerMenu = document.querySelector("header");
  const buttonReplacement = document.querySelector(
    '[data-menu="button_open"] i'
  );

  function openMenu() {
    menuList.classList.add("active");
    menuButton.classList.add("active");
    buttonReplacement.classList.remove("fa-bars");
    buttonReplacement.classList.add("fa-xmark");
    outsideClick(menuList, ["click", "touchstart"], () => {
      menuList.classList.remove("active");
      menuButton.classList.remove("active");
      buttonReplacement.classList.add("fa-bars");
      buttonReplacement.classList.remove("fa-xmark");
    });
  }
  function effectHeader() {
    const valueSrolly = window.scrollY;
    if (valueSrolly > 10) {
      emphasis.classList.add("active");
      headerMenu.classList.add("active");
    } else if (valueSrolly < 10) {
      emphasis.classList.remove("active");
      headerMenu.classList.remove("active");
    }
  }
  menuButton.addEventListener("click", openMenu);
  window.addEventListener("scroll", effectHeader);
}
