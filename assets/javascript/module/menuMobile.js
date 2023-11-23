import outsideClick from "./outside.js";
export default function initMenuMobile() {
  const menuButton = document.querySelector('[data-menu="button_open"]');
  const menuList = document.querySelector('[data-menu="list"]');
  const emphasis = document.querySelector(".emphasis");
  const headerMenu = document.querySelector('header')

  function openMenu() {
    menuList.classList.add("active");
    menuButton.classList.add("active");
    outsideClick(menuList, ["click", "touchstart"], () => {
      menuList.classList.remove("active");
      menuButton.classList.remove("active");
    });
  }
  function effectHeader() {
    const valueSrolly = window.scrollY;
    if (valueSrolly > 10) {
      emphasis.classList.add("active");
      headerMenu.classList.add('active')
    } else if (valueSrolly < 10) {
      emphasis.classList.remove("active");
      headerMenu.classList.remove("active");
    }
  }
  menuButton.addEventListener("click", openMenu);
  window.addEventListener("scroll", effectHeader);
}
