import anime from "animejs/lib/anime.es.js";

function initAnimation() {
  anime({
    targets: [
      ".welcome__overtitle",
      ".welcome__headline",
      ".welcome__button",
      ".welcome__sponsored",
    ],
    translateY: [50, 0],
    opacity: [0, 1],
    duration: 800,
    delay: anime.stagger(200),
    easing: "easeInOutQuad",
  });

  anime({
    targets: [".welcome__logo"],
    scale: [0, 1],
    opacity: [0, 1],

    duration: 1200,
    delay: 500,
  });
}

export { initAnimation };
