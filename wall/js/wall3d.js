(function() {
  const stageElem = document.querySelector(".stage");
  const houseElem = document.querySelector(".house");
  const barElem = document.querySelector(".progress-bar");
  const selectCharacterElem = document.querySelector(".select-character");
  const mousePos = { x: 0, y: 0 };
  let maxScrollValue;

  function resizeHandler() {
    maxScrollValue = document.body.offsetHeight - window.innerHeight;
  }

  window.addEventListener("scroll", function() {
    const scrollPer = pageYOffset / maxScrollValue;
    const zMove = scrollPer * 2080 - 900;
    houseElem.style.transform = "translateZ(" + zMove + "vw)";

    // progress bar
    barElem.style.width = scrollPer * 100 + "%";
  });

  window.addEventListener("mousemove", function(e) {
    mousePos.x = -1 + (e.clientX / window.innerWidth) * 2;
    mousePos.y = 1 - (e.clientY / window.innerHeight) * 2;
    stageElem.style.transform =
      "rotateX(" + mousePos.y * 5 + "deg) rotateY(" + mousePos.x * 45 + "deg)";
  });

  window.addEventListener("resize", resizeHandler);

  stageElem.addEventListener("click", function(e) {
    new Character({
      xPos: (e.clientX / window.innerWidth) * 100,
      speed: Math.random() * 0.5 + 0.2
    });
  });

  selectCharacterElem.addEventListener("click", function(e) {
    const value = e.target.getAttribute("data-char");
    document.body.setAttribute("data-char", value);
  });

  let images = [...document.querySelectorAll(".lazy")];

  const interactSettings = {
    root: document.querySelector(".house"),
    rootMargin: "0px 0px 200px 0px"
  };

  function onIntersection(imageEntites) {
    imageEntites.forEach(image => {
      if (image.isIntersecting) {
        observer.unobserve(image.target);
        image.target.src = image.target.dataset.src;
        image.target.onload = () => image.target.classList.add("loaded");
      }
    });
  }

  let observer = new IntersectionObserver(onIntersection, interactSettings);

  images.forEach(image => observer.observe(image));

  resizeHandler();
})();
