/* ------------- GENERAL -------------- */
const page = document.body.dataset.page;

/* GO BACK TO TOP ON REFRESH */
window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};

/* Buttons Hover */
// let windowWidth = $(window).innerWidth();
// window.addEventListener("resize", function () {
//   if (windowWidth !== $(window).innerWidth()) {
//     windowWidth = $(window).innerWidth();
//   }
// });

// Animation
const staggerLinks = document.querySelectorAll("[hover-btn]");
staggerLinks.forEach((link) => {
  const letters = link.querySelectorAll("[hover-btn-text]");
  link.addEventListener("mouseenter", function () {
    gsap.to(letters, {
      yPercent: -200,
      duration: 0.3,
      ease: "power3.out",
    });
  });
  link.addEventListener("mouseleave", function () {
    gsap.to(letters, {
      yPercent: 0,
      duration: 0.3,
      ease: "power3.out",
    });
  });
});

/* General Parallax */
document.querySelectorAll("[parallax-container]").forEach((container) => {
    const image = container.querySelector("[parallax-img]");
    
    if (image) {
      const containerHeight = container.offsetHeight;
      const imageHeight = image.offsetHeight;
      const heightDifference = imageHeight - containerHeight;
  
      // Apply the parallax effect
      gsap.to(image, {
        y: -heightDifference,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }
  });

/* Custom Cursor */
// For a mouse follower which dynamically changes text:

  
  // Set the cursor position to follow the mouse
  gsap.set(".cursor", { xPercent: -50, yPercent: -50 });

  let xTo = gsap.quickTo(".cursor", "x", { duration: 0.5, ease: "power2" });
  let yTo = gsap.quickTo(".cursor", "y", { duration: 0.5, ease: "power2" });

  window.addEventListener("mousemove", e => {
    xTo(e.clientX);
    yTo(e.clientY);
  });

  // Select all elements with the [data-cursor] attribute
  let links = document.querySelectorAll("[data-cursor]");
  let cursorText = document.querySelector(".cursor p"); // Select the <p> inside .cursor

  links.forEach((link) => {
    let text = link.getAttribute("data-cursor"); // Get the attribute value
    
    link.addEventListener("mouseenter", () => {
      cursorText.textContent = text; // Update the <p> text inside .cursor
    });

    link.addEventListener("mouseleave", () => {
      cursorText.textContent = ""; // Reset the text when the mouse leaves
    });
  });


/* ------------ END OF GENERAL ------------ */
/* ------------- HOME -------------- */
if (page === "home") {
    
/* Reservations Parallax */
// Function to get y translation based on image height
const getY = (element) => {
    const height = element.clientHeight;
    const maxScrollSpeed = -300; // Negative maximum scroll speed for smallest images
    const minScrollSpeed = -10; // Negative minimum scroll speed for largest images
    const referenceHeight = 600; // Reference height for scaling
  
    // Adjust speed factor based on the height relative to the reference height
    const speedFactor =
      maxScrollSpeed +
      (height / referenceHeight) * (minScrollSpeed - maxScrollSpeed);
    console.log({ height, speedFactor });
    return speedFactor;
  };
  
  document
    .querySelectorAll(".reservations-parallax-wrap")
    .forEach((reservationsImage) => {
      gsap.to(reservationsImage, {
        y: getY(reservationsImage),
        ease: "none",
        scrollTrigger: {
          trigger: reservationsImage,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
        onComplete: () => ScrollTrigger.refresh(),
      });
    });

};

/* Flip */

    gsap.registerPlugin(Flip);
    ScrollTrigger.normalizeScroll(true);
  
    // Utility to get attribute or default value
    function getAttr(el, attrName, defaultVal) {
      const attrVal = el.getAttribute(attrName);
      if (attrVal === null) return defaultVal;
      if (attrVal === "true") return true;
      if (attrVal === "false") return false;
      if (!isNaN(attrVal)) return Number(attrVal);
      return attrVal;
    }
  
    // Select all scrollflip components
    document.querySelectorAll("[tr-scrollflip-element='component']").forEach((component, componentIndex) => {
      const originEls = component.querySelectorAll("[tr-scrollflip-element='origin']");
      const targetEls = component.querySelectorAll("[tr-scrollflip-element='target']");
      const scrubStartEl = component.querySelector("[tr-scrollflip-scrubstart]");
      const scrubEndEl = component.querySelector("[tr-scrollflip-scrubend]");
  
      // Read settings from attributes
      const startSetting = getAttr(scrubStartEl, "tr-scrollflip-scrubstart", "top top");
      const endSetting = getAttr(scrubEndEl, "tr-scrollflip-scrubend", "bottom bottom");
      const staggerSpeed = getAttr(component, "tr-scrollflip-staggerspeed", 0);
      const staggerDirection = getAttr(component, "tr-scrollflip-staggerdirection", "start");
      const scale = getAttr(component, "tr-scrollflip-scale", false);
      const breakpoint = getAttr(component, "tr-scrollflip-breakpoint", 0);
  
      // Assign flip IDs
      originEls.forEach((el, index) => {
        const flipId = `${componentIndex}-${index}`;
        el.dataset.flipId = flipId;
        if (targetEls[index]) targetEls[index].dataset.flipId = flipId;
      });
  
      // Timeline creation function
      let timeline;
      const createTimeline = () => {
        if (timeline) {
          timeline.kill();
          targetEls.forEach(el => gsap.set(el, { clearProps: "all" }));
        }
  
        document.body.classList.add("scrollflip-relative");
        gsap.matchMedia().add(`(min-width: ${breakpoint}px)`, () => {
          const state = Flip.getState(originEls);
          timeline = gsap.timeline({
            scrollTrigger: {
              trigger: scrubStartEl,
              endTrigger: scrubEndEl,
              start: startSetting,
              end: endSetting,
              scrub: true,
              //pin: true,
            }
          });
  
          timeline.add(
            Flip.from(state, {
              targets: targetEls,
              scale: scale,
              stagger: { amount: staggerSpeed, from: staggerDirection }
            })
          );
        });
        document.body.classList.remove("scrollflip-relative");
      };
  
      createTimeline();
  
      // Rebuild timeline on resize
      window.addEventListener("resize", () => {
        clearTimeout(window._scrollFlipResizeTimer);
        window._scrollFlipResizeTimer = setTimeout(createTimeline, 250);
      });

// Animate egg mask on scroll   


// gsap.set(".egg-wrap-inside", {
//     webkitMaskSize: "200%",
//     maskSize: "200%"
// })

// gsap.to(".egg-wrap-inside", {
//     scrollTrigger: {
//       trigger: scrubStartEl,
//       start: "top top",
//       end: "5% top",
//       scrub: 1,
//     },
//     webkitMaskSize: "90%",
//     maskSize: "90%",
//     onComplete: () => ScrollTrigger.refresh(),
//   });

gsap.set(".egg-wrap-inside", {
  clipPath: "circle(75% at 50% 50%)",
})

gsap.to(".egg-wrap-inside", {
  scrollTrigger: {
    trigger: scrubStartEl,
    start: "top top",
    end: "5% top",
    scrub: 1,
  },
  clipPath: "circle(30% at 50% 50%)",
  
  onComplete: () => ScrollTrigger.refresh(),
});

    });

/* ------------- Events -------------- */
if (page === "events") {

    const containers = document.querySelectorAll(".swiper-slide.events-slider");

    containers.forEach((container, index) => {
      const numberBlock = container.querySelector(".number-eyebrow");
      numberBlock.textContent = index + 1;
    });

/* GSAP Menu color change  */




// ==== Logo color switch ================================

document.addEventListener('DOMContentLoaded', () => {
  const clipRect = document.querySelector('#reveal-clip rect');

  let width = 0;
  const maxWidth = 100; // Width of the SVG viewBox

  function animateLogo() {
      if (width < maxWidth) {
          width += 1; // Adjust speed by changing increment
          clipRect.setAttribute('width', width);
          requestAnimationFrame(animateLogo);
      }
  }

  // Start animation
  animateLogo();
});

document.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const maxScroll = 300; // Adjust based on when you want the effect to complete
  const progress = Math.min(scrollTop / maxScroll, 1); // Normalize between 0 and 1

  const clipRect = document.querySelector('#reveal-clip rect');
  const maxWidth = 100; // Width of the SVG viewBox
  clipRect.setAttribute('width', progress * maxWidth);
});



}