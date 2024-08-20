const pictures = [
  "https://images.pexels.com/photos/27873672/pexels-photo-27873672/free-photo-of-solar-panels.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/27854521/pexels-photo-27854521/free-photo-of-natur.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/27864061/pexels-photo-27864061/free-photo-of-a-lighthouse-in-the-ocean-at-sunset.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/27854520/pexels-photo-27854520/free-photo-of-natur.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/26631477/pexels-photo-26631477/free-photo-of-a-figurine-of-a-woman-in-a-dress.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/27849266/pexels-photo-27849266/free-photo-of-sushi.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/27874906/pexels-photo-27874906/free-photo-of-camera.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/27890510/pexels-photo-27890510/free-photo-of-a-coffee-maker-with-a-coffee-filter-in-it.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
];

function carouselHandlers(carousel, pictures) {
  let index = 0;
  const imgEle = carousel.querySelector("img");
  const dotContainer = carousel.querySelector(".dots");
  let timeout = setTimeout(nextPicture, 5000);

  const dots = pictures.map((_, i) => {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    dot.addEventListener("click", (_) => {
      setPicture(i);
    });
    return dot;
  });
  dotContainer.append(...dots);

  function setPicture(index) {
    imgEle.src = pictures[index];

    dots.forEach((dot, i) => {
      dot.classList.remove("active");
      if (index === i) dot.classList.add("active");
    });

    clearTimeout(timeout);
    timeout = setTimeout(nextPicture, 5000);
  }

  function nextPicture() {
    index = (index + 1) % pictures.length;
    setPicture(index);
  }

  function prevPicture() {
    index = index === 0 ? pictures.length - 1 : index - 1;
    setPicture(index);
  }

  setPicture(0);
  return { nextPicture, prevPicture };
}

const { nextPicture, prevPicture } = carouselHandlers(
  document.querySelector(".carousel"),
  pictures,
);

document
  .querySelector(".carousel .left")
  .addEventListener("click", prevPicture);
document
  .querySelector(".carousel .right")
  .addEventListener("click", nextPicture);
