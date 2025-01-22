/* ------------- GENERAL -------------- */
const page = document.body.dataset.page;

/* GO BACK TO TOP ON REFRESH */
window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};

/* Menu Open */

const menuBtn = document.querySelector('.menu-btn');
const navBg = document.querySelector('.nav-bg');
const navFill = document.querySelector('.nav-fill');

menuBtn.addEventListener('click', () => {
  navBg.style.display = 'flex';
  gsap.to(navFill, {
    x: '0%',
    duration: 0.6,
    ease: 'power2.out',
  });
});

navBg.addEventListener('click', () => {
  gsap.to(navFill, {
    x: '110%',
    duration: 0.6,
    ease: 'power2.in',
    onComplete: () => {
      navBg.style.display = 'none';
    },
  });
});

// Prevent clicks inside the form from propagating to navBg
navFill.addEventListener('click', (e) => {
  e.stopPropagation();
});


/* Buttons Hover*/
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

/* Links Hover */

let splitText, splitHeading;

function runSplit() {
  // Initialize SplitType for hover links
  splitText = new SplitType("[hover-link]", {
    types: "words, chars"
  });

}

runSplit();

// ———— animation
const hoverLinks = document.querySelectorAll("[hover-link]");
hoverLinks.forEach((link) => {
  const letters = link.querySelectorAll("[hover-link-text] .char");
  link.addEventListener("mouseenter", function () {
    gsap.to(letters, {
      yPercent: -100,
      duration: 0.5,
      ease: "power4.inOut",
      stagger: { each: 0.03, from: "start" },
      overwrite: true
    });
  });
  link.addEventListener("mouseleave", function () {
    gsap.to(letters, {
      yPercent: 0,
      duration: 0.5,
      ease: "power4.inOut",
      stagger: { each: 0.03, from: "start" },
    });
  });
});

/* Headings Reveal On Scroll */

  // Select headings with the attribute
  const headings = document.querySelectorAll('[scroll-reveal]');

  headings.forEach((heading) => {
      // Initialize SplitType.js with lines only
      const splitText = new SplitType(heading, { types: "lines", lineClass: "line" });

      // Wrap each .line in its own .line-wrap div
      const lines = heading.querySelectorAll('.line');
      lines.forEach((line) => {
          const lineWrap = document.createElement('div');
          lineWrap.classList.add('line-wrap');
          line.parentNode.insertBefore(lineWrap, line);
          lineWrap.appendChild(line); 
      });

      gsap.fromTo(
          lines,
          { yPercent: 100 },
          {
              yPercent: 0,
              duration: 1,
              ease: "power3.out",
              stagger: 0.2,
              scrollTrigger: {
                  trigger: heading,
                  start: "top 80%",
                  end: "top 80%",
              },
          }
      );
  });



/* The Fork Widget Open */

const openFork = document.querySelectorAll("[open-fork]");
const forkBg = document.querySelector('.fork-bg');
const forkFill = document.querySelector('.fork-fill');

// Add event listener to all buttons
openFork.forEach((link) => {
  link.addEventListener('click', () => {
    forkBg.style.display = 'block';
    gsap.to(forkFill, {
      x: '0%',
      duration: 0.6,
      ease: 'power2.out',
    });
  });
});

// Close the fork widget when clicking on the background
forkBg.addEventListener('click', () => {
  gsap.to(forkFill, {
    x: '-110%',
    duration: 0.6,
    ease: 'power2.in',
    onComplete: () => {
      forkBg.style.display = 'none';
    },
  });
});

// Prevent clicks inside forkFill from propagating to forkBg
forkFill.addEventListener('click', (e) => {
  e.stopPropagation();
});

/* Gift Form Open */

const openGift = document.querySelectorAll("[open-gift]");
const giftBg = document.querySelector('.gift-bg');
const giftFill = document.querySelector('.gift-fill');

// Add event listener to all buttons
openGift.forEach((link) => {
  link.addEventListener('click', () => {
    giftBg.style.display = 'block';
    gsap.to(giftFill, {
      x: '0%',
      duration: 0.6,
      ease: 'power2.out',
    });
  });
});

// Close the fork widget when clicking on the background
giftBg.addEventListener('click', () => {
  gsap.to(giftFill, {
    x: '-110%',
    duration: 0.6,
    ease: 'power2.in',
    onComplete: () => {
      giftBg.style.display = 'none';
    },
  });
});

// Prevent clicks inside forkFill from propagating to forkBg
giftFill.addEventListener('click', (e) => {
  e.stopPropagation();
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
  
  // Set the cursor position to follow the mouse
  gsap.set(".cursor", { xPercent: -50, yPercent: -50 });

  let cursorX = gsap.quickTo(".cursor", "x", { duration: 0.5, ease: "power2" });
  let cursorY = gsap.quickTo(".cursor", "y", { duration: 0.5, ease: "power2" });

  window.addEventListener("mousemove", e => {
    cursorX(e.clientX);
    cursorY(e.clientY);
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

// POP-UPS Close Button

    gsap.set(".cursor-egg", { xPercent: -50, yPercent: -50 });

    let cursorEggX = gsap.quickTo(".cursor-egg", "x", { duration: 0.5, ease: "power2" });
    let cursorEggY = gsap.quickTo(".cursor-egg", "y", { duration: 0.5, ease: "power2" });
  
    window.addEventListener("mousemove", e => {
      cursorEggX(e.clientX);
      cursorEggY(e.clientY);
    });
  
    // Select all elements with the [data-cursor] attribute
    let cursorEgg = document.querySelectorAll("[data-egg-cursor]");
    let cursorEggText = document.querySelector(".cursor-egg p"); // Select the <p> inside .cursor
  
    cursorEgg.forEach((link) => {
      let text = link.getAttribute("data-egg-cursor"); // Get the attribute value
    
      link.addEventListener("mouseenter", (e) => {
        // Ensure the hover is directly on .nav-bg and not on a child element
        if (e.target === link) {
          cursorEggText.textContent = text; // Update the <p> text inside .cursor
        }
      });
    
      link.addEventListener("mouseleave", (e) => {
        // Ensure the leave event is from the same element
        if (e.target === link) {
          cursorEggText.textContent = ""; // Reset the text when the mouse leaves
        }
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

    const containers = document.querySelectorAll(".swiper-slide.events-slider");

    containers.forEach((container, index) => {
      const numberBlock = container.querySelector(".number-eyebrow");
      numberBlock.textContent = index + 1;
    });



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
webkitMaskSize: "190%",
maskSize: "190%"
})

gsap.to(".egg-wrap-inside", {
scrollTrigger: {
  trigger: scrubStartEl,
  start: "top top",
  end: "5% top",
  scrub: 1,
},
webkitMaskSize: "75%",
maskSize: "75%",
onComplete: () => ScrollTrigger.refresh(),
});

const homeHeading = gsap.timeline({
scrollTrigger: {
  trigger: scrubStartEl,
  start: "top top",
  end: "20% top",
  scrub: true,
},
onComplete: () => ScrollTrigger.refresh(),
});

homeHeading.to(".home-hero-heading", { opacity: 0, duration: 0.5 })
.to(".home-hero-heading", { scale: 0, duration: 1 }, "<");

gsap.set(".potat-logo, .egg-svg, .menu-btn-text", {color: "#F2E5C8"});

gsap.to(".potat-logo, .egg-svg, .menu-btn-text", {
  scrollTrigger: {
    trigger: scrubStartEl,
    start: "top top",
    end: "5% top",
    scrub: true,
  },
  color: "#043427",
  });


});


function setupScrollTrigger(triggerElement, enterColor, leaveColor) {
  gsap.to(".potat-logo, .egg-svg, .menu-btn-text", {
    scrollTrigger: {
      trigger: triggerElement,
      start: "top top",
      end: "bottom top",
      onEnter: () => gsap.to(".potat-logo, .egg-svg, .menu-btn-text", { color: enterColor, duration: 0.5 }),
      onLeave: () => gsap.to(".potat-logo, .egg-svg, .menu-btn-text", { color: leaveColor, duration: 0.5 }),
      onEnterBack: () => gsap.to(".potat-logo, .egg-svg, .menu-btn-text", { color: enterColor, duration: 0.5 }),
      onLeaveBack: () => gsap.to(".potat-logo, .egg-svg, .menu-btn-text", { color: leaveColor, duration: 0.5 }),
    },
  });
}

// Add triggers for multiple sections
setupScrollTrigger(".section_reservation", "#F2E5C8", "#043427");
setupScrollTrigger(".gift-container", "#F2E5C8", "#043427");


};


/* ------------- Events -------------- */
if (page === "events") {
  const containers = document.querySelectorAll(".swiper-slide.events-slider");

  containers.forEach((container, index) => {
    const numberBlock = container.querySelector(".number-eyebrow");
    numberBlock.textContent = index + 1;
  });

/* Form Open */

const openForm = document.querySelector("[open-form]");
const formBg = document.querySelector('.form-bg');
const formFill = document.querySelector('.form-fill');

openForm.addEventListener('click', () => {
  formBg.style.display = 'block';
  gsap.to(formFill, {
    x: '0%',
    duration: 0.6,
    ease: 'power2.out',
  });
});

formBg.addEventListener('click', () => {
  gsap.to(formFill, {
    x: '-110%',
    duration: 0.6,
    ease: 'power2.in',
    onComplete: () => {
      formBg.style.display = 'none';
    },
  });
});

// Prevent clicks inside the form from propagating to navBg
formFill.addEventListener('click', (e) => {
  e.stopPropagation();
});

}