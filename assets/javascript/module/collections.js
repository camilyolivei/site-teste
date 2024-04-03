const collections = document.querySelectorAll('[data-carousel="collection"]');
const collectionData = [];
let currentCollectionIndex = 0;
var value = 5;

//centralizar o carrosel

const translateSlide = (position) => {
  const { state, carouselList } = collectionData[currentCollectionIndex];
  state.lastTranslatePosition = position;
  carouselList.style.transform = `translateX(${position}px)`;
};

const getCenterPosition = (slideIndex) => {
  const { state, carouselItem } = collectionData[currentCollectionIndex];
  const item = carouselItem[state.currentSlideIndex];
  const itemWidth = item.offsetWidth;
  const bodyWidth = document.body.clientWidth;
  const slideWidth = itemWidth * value;
  const margin = (bodyWidth - slideWidth) / 2;
  return margin - slideWidth * slideIndex;
};

const getLastSlideIndex = () => {
  const { carouselItem } = collectionData[currentCollectionIndex];
  const lastItemIndex = carouselItem.length - 1;
  return Math.floor(lastItemIndex / value);
};
const changeValue = () => {
  if (document.body.clientWidth < 1024) {
    value = 3;
    return;
  }else if(document.body.clientWidth < 760){
    value = 2;
    return;
  }else if(document.body.clientWidth > 1700){
    value = 5
  }
  value = 5;
};

const setWindowResizeListener = () => {
  let resizeTimeOut;
  window.addEventListener("resize", function (event) {
    clearTimeout(resizeTimeOut);
    resizeTimeOut = setTimeout(function () {
      changeValue();
      collections.forEach((_, collectionIndex) => {
        currentCollectionIndex = collectionIndex;
        setVisibleSlide(0);
      });
    }, 500);
  });
};

const animateTransition = (active) => {
  const { carouselList } = collectionData[currentCollectionIndex];

  if (active) {
    carouselList.style.transition = "transform .3s";
  } else {
    carouselList.style.removeProperty("transition");
  }
};
const activeCurrentItems = ()=>{
  const { carouselItem ,state} = collectionData[currentCollectionIndex];
  carouselItem.forEach((item,itemIndex)=>{
    item.classList.remove('active')
    const firstItemIndex = state.currentSlideIndex * value
    if(itemIndex >= firstItemIndex && itemIndex < firstItemIndex+value){
      item.classList.add('active')
    }
  })
  
}

function setArrowButtonDisplay() {
  const { btnNext, btnPrevious, state } =
    collectionData[currentCollectionIndex];
  btnPrevious.style.display = state.currentSlideIndex === 0 ? "none" : "flex";
  btnNext.style.display =
    state.currentSlideIndex === getLastSlideIndex() ? "none" : "flex";
}

const setVisibleSlide = (slideIndex) => {
  const { state } = collectionData[currentCollectionIndex];

  const centerPosition = getCenterPosition(slideIndex);
  state.currentSlideIndex = slideIndex;
  activeCurrentItems()
  setArrowButtonDisplay();
  animateTransition(true);
  translateSlide(centerPosition);
};

const preventDefault = (event) => {
  event.preventDefault();
};

const backwardSlide = () => {
  const { state } = collectionData[currentCollectionIndex];
  if (state.currentSlideIndex > 0) {
    setVisibleSlide(state.currentSlideIndex - 1);
  } else {
    setVisibleSlide(state.currentSlideIndex);
  }
};
const forwardSlide = () => {
  const { state } = collectionData[currentCollectionIndex];
  const lastSlideIndex = getLastSlideIndex();

  if (state.currentSlideIndex < lastSlideIndex) {
    setVisibleSlide(state.currentSlideIndex + 1);
  } else {
    setVisibleSlide(state.currentSlideIndex);
  }
};
const onMouseMove = (event) => {
  const { state } = collectionData[currentCollectionIndex];
  state.movement = event.clientX - state.mouseDownPosition;
  const position = event.clientX - state.currentSlidePosition;
  translateSlide(position);
};
const onMouseDown = (event, itemIndex) => {
  const { state } = collectionData[currentCollectionIndex];
  const item = event.currentTarget;
  state.currentItenIndex = itemIndex;
  state.mouseDownPosition = event.clientX;
  state.currentSlidePosition = event.clientX - state.lastTranslatePosition;
  animateTransition(false);
  item.addEventListener("mousemove", onMouseMove);
};

const onMouseUp = (event) => {
  const { state } = collectionData[currentCollectionIndex];
  if (state.movement > 150) {
    backwardSlide();
  } else if (state.movement < -150) {
    forwardSlide();
  } else {
    setVisibleSlide(state.currentSlideIndex);
  }
  const item = event.currentTarget;
  item.removeEventListener("mousemove", onMouseMove);
};
const onMouseLeave = (event) => {
  const item = event.currentTarget;
  item.removeEventListener("mousemove", onMouseMove);
};
//touch config
const onTouchStart = (event, itemIndex) => {
  const item = event.currentTarget;
  item.addEventListener("touchmove", onTouchMove);
  event.clientX = event.touches[0].clientX;
  onMouseDown(event, itemIndex);
};

const onTouchMove = (event) => {
  event.clientX = event.touches[0].clientX;
  onMouseMove(event);
};

const onTouchEnd = (event) => {
  const item = event.currentTarget;
  item.removeEventListener("touchmove", onTouchMove);
  onMouseUp(event);
};

const insertCollectionData = (collection) => {
  collectionData.push({
    carouselList: collection.querySelector('[data-carousel="list"]'),
    carouselItem: collection.querySelectorAll('[data-carousel="item"]'),
    btnPrevious: collection.querySelector('[data-carousel="btn-previous"]'),
    btnNext: collection.querySelector('[data-carousel="btn-next"]'),
    state: {
      mouseDownPosition: 0,
      movement: 0,
      lastTranslatePosition: 0,
      currentSlidePosition: 0,
      currentItenIndex: 0,
      currentSlideIndex: 0,
    },
  });
};

const setListeners = (collectionIndex) => {
  const { btnNext, btnPrevious, carouselItem } =
    collectionData[collectionIndex];
  btnNext.addEventListener("click", () => {
    currentCollectionIndex = collectionIndex;
    forwardSlide();
  });
  btnPrevious.addEventListener("click", () => {
    currentCollectionIndex = collectionIndex;
    backwardSlide();
  });

  carouselItem.forEach((item, index) => {
    item.addEventListener("dragstart", preventDefault);
    item.addEventListener("mousedown", (event) => {
      currentCollectionIndex = collectionIndex;
      onMouseDown(event, index);
    });
    item.addEventListener("mouseup", onMouseUp);
    item.addEventListener("mouseleave", onMouseLeave);
    item.addEventListener("touchstart", function (event) {
      currentCollectionIndex = collectionIndex;
      onTouchStart(event, index);
    });
    item.addEventListener("touchend", onTouchEnd);
  });
};
const init = () => {
  changeValue();
  setWindowResizeListener();
  collections.forEach((collection, collectionIndex) => {
    currentCollectionIndex = collectionIndex;
    console.log(collection);
    insertCollectionData(collection);
    setListeners(collectionIndex);
    setVisibleSlide(0);
  });
};
export default {
  init,
};
