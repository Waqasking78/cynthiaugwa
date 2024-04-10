gsap.registerPlugin(ScrollTrigger);
const locoScroll = new LocomotiveScroll({
  el: document.querySelector(".main"),
  smooth: true,
});
locoScroll.on("scroll", ScrollTrigger.update);

ScrollTrigger.scrollerProxy(".main", {
  scrollTop(value) {
    return arguments.length
      ? locoScroll.scrollTo(value, 0, 0)
      : locoScroll.scroll.instance.scroll.y;
  },
  getBoundingClientRect() {
    return {
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: window.innerHeight,
    };
  },
  pinType: document.querySelector(".main").style.transform
    ? "transform"
    : "fixed",
});

var timeout;
function firstnameanim() {
  var tl = gsap.timeline();
  tl.to(".bounding-elem", {
    transform: "translateY(0%)",
    duration: 0.5,
    stagger: 0.1,
    ease: Power3,
  });
  tl.to(".bounding-elem2", {
    transform: "translateY(0)",
    duration: 0.5,
    ease: Power3,
  });
  tl.from(".landing-page-footer a,.landing-page-footer .circle-con .circle", {
    opacity: 0,
    duration: 0.5,
    stagger: 0.15,
    ease: Power3,
  });
}
function ciclechapta() {
  var xScale = 1;
  var yScale = 1;

  var xPrev = 0;
  var yPrev = 0;

  window.addEventListener("mousemove", function (dets) {
    clearTimeout(timeout);

    xScale = gsap.utils.clamp(0.8, 1.2, dets.clientX - xPrev);
    yScale = gsap.utils.clamp(0.8, 1.2, dets.clientY - yPrev);

    xPrev = dets.clientX;
    yPrev = dets.clientY;
    minicircleanim(xScale, yScale);

    timeout = setTimeout(function () {
      document.querySelector(
        ".minicircle"
      ).style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1, 1)`;
    }, 100);
  });
}
function minicircleanim(xScale, yScale) {
  window.addEventListener("mousemove", function (dets) {
    document.querySelector(
      ".minicircle"
    ).style.transform = `translate(${dets.clientX}px,${dets.clientY}px) scale(${xScale},${yScale})`;
  });
  document.addEventListener("mouseenter", function () {
    gsap.to(".minicircle", {
      scale: 1,
    });
  });
  document.addEventListener("mouseleave", function () {
    gsap.to(".minicircle", {
      scale: 0,
    });
  });
}

document.querySelectorAll(".elem").forEach(function (elem) {
  var rotate = 0;
  var diffrot = 0;

  elem.addEventListener("mouseleave", function (dets) {
    gsap.to(elem.querySelector("img"), {
      opacity: 0,
      ease: Power3,
      duration: 0.5,
    });
    var circle = document.querySelector(".minicircle");
    circle.style.mixBlendMode = "difference";
    circle.style.height = "10px";
    circle.style.width = "10px";
    circle.innerHTML = "";
    // console.log("leave");
  });

  elem.addEventListener("mousemove", function (dets) {
    var diff = dets.clientY - elem.getBoundingClientRect().top;
    diffrot = dets.clientX - rotate;
    rotate = dets.clientX;
    gsap.to(elem.querySelector("img"), {
      opacity: 1,
      ease: Power3,
      top: diff,
      left: dets.clientX,
      rotate: gsap.utils.clamp(-20, 20, diffrot * 0.5),
    });
    var circle = document.querySelector(".minicircle");
    circle.style.mixBlendMode = "normal";
    circle.style.height = "70px";
    circle.style.width = "70px";
    circle.innerHTML = "VIEW";
  });
});

firstnameanim();
ciclechapta();
minicircleanim();

ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
ScrollTrigger.refresh();
