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
//document.addEventListener("DOMContentLoaded", ()=>{
   
  let cursorItem = document.querySelector(".cursor")
  let cursorParagraph = cursorItem.querySelector("p")
  let targets = document.querySelectorAll("[data-cursor]")
  let xOffset = 6;
  let yOffset = 140;
  let cursorIsOnRight = false;
  let currentTarget = null;
  let lastText = '';
  
  // Position cursor relative to actual cursor position on page load
  gsap.set(cursorItem, {xPercent: xOffset, yPercent: yOffset});

  // Use GSAP quick.to for a more performative tween on the cursor
  let xTo = gsap.quickTo(cursorItem, "x", { ease: "power3"});
  let yTo = gsap.quickTo(cursorItem, "y", { ease: "power3"});

  // On mousemove, call the quickTo functions to the actual cursor position
  window.addEventListener("mousemove", e => {
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;
    let scrollY = window.scrollY;
    let cursorX = e.clientX;
    let cursorY = e.clientY + scrollY; // Adjust cursorY to account for scroll

    // Default offsets
    let xPercent = xOffset;
    let yPercent = yOffset;

    // Adjust X offset if in the rightmost 19% of the window
    if (cursorX > windowWidth * 0.81) {
      cursorIsOnRight = true;
      xPercent = -100;
    } else{
      cursorIsOnRight = false;
    }

    // Adjust Y offset if in the bottom 10% of the current viewport
    if (cursorY > scrollY + windowHeight * 0.9) {
      yPercent = -120; 
    }
    
    if (currentTarget) {
      let newText = currentTarget.getAttribute("data-cursor");
      if (currentTarget.hasAttribute("data-easteregg") && cursorIsOnRight) {
        newText = currentTarget.getAttribute("data-easteregg");
      }

      if (newText !== lastText) { // Only update if the text is different
        cursorParagraph.innerHTML = newText;
        lastText = newText;
      }
    }

    gsap.to(cursorItem, { xPercent: xPercent, yPercent: yPercent, duration: 0.9, ease: "power3" });
    xTo(cursorX);
    yTo(cursorY - scrollY); // Subtract scroll for viewport positioning
  });

  
  // Add a mouse enter listener for each link that has a data-cursor attribute
  targets.forEach(target => {
    target.addEventListener("mouseenter", () => {
      currentTarget = target; // Set the current target
      
      // If element has data-easteregg attribute, load different text
      let newText = target.hasAttribute("data-easteregg")
        ? target.getAttribute("data-easteregg")
        : target.getAttribute("data-cursor");

			// Update only if the text changes
      if (newText !== lastText) {
        cursorParagraph.innerHTML = newText;
        lastText = newText;
      }
    });
  });
  
 //})

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

gsap.set(".egg-wrap-inside", {
    webkitMaskSize: "200%",
    maskSize: "200%"
})

gsap.to(".egg-wrap-inside", {
    scrollTrigger: {
      trigger: scrubStartEl,
      start: "top top",
      end: "5% top",
      scrub: 1,
    },
    webkitMaskSize: "90%",
    maskSize: "90%",
    onComplete: () => ScrollTrigger.refresh(),
  });

    });
