/* ------------- GENERAL -------------- */
const page = document.body.dataset.page;

/* GO BACK TO TOP ON REFRESH */
window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};

/* Menu Scroll */
function initDetectScrollingDirection() {
  let lastScrollTop = 0;
  const threshold = 10; // Minimal scroll distance to switch to up/down 
  const thresholdTop = 50; // Minimal scroll distance from top of window to start

  window.addEventListener('scroll', () => {
    const nowScrollTop = window.scrollY;

    if (Math.abs(lastScrollTop - nowScrollTop) >= threshold) {
      // Update Scroll Direction
      const direction = nowScrollTop > lastScrollTop ? 'down' : 'up';
      document.querySelectorAll('[data-scrolling-direction]').forEach(el => 
        el.setAttribute('data-scrolling-direction', direction)
      );

      // Update Scroll Started
      const started = nowScrollTop > thresholdTop;
      document.querySelectorAll('[data-scrolling-started]').forEach(el => 
        el.setAttribute('data-scrolling-started', started ? 'true' : 'false')
      );

      lastScrollTop = nowScrollTop;
    }
  });
}

// Initialize Detect Scrolling Direction
  initDetectScrollingDirection();

/* Menu Open */
const menuBtn = document.querySelector('.menu-btn');
const navBg = document.querySelector('.nav-bg');
const navFill = document.querySelector('.nav-fill');
const menuMobileBtn = document.querySelector('.menu-mobile-btn');

menuBtn.addEventListener('click', () => {
  navBg.style.display = 'flex';
  gsap.to(navFill, {
    x: '0%',
    duration: 0.6,
    ease: 'power2.out',
  });
});

const closeMenu = () => {
  gsap.to(navFill, {
    x: '110%',
    duration: 0.6,
    ease: 'power2.in',
    onComplete: () => {
      navBg.style.display = 'none';
    },
  });
};

navBg.addEventListener('click', closeMenu);

// Prevent clicks inside the navFill from propagating to navBg
navFill.addEventListener('click', (e) => {
  e.stopPropagation();
});

// Close the menu when clicking the menuMobileBtn
menuMobileBtn.addEventListener('click', closeMenu);


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
      ease: "power3.out",
      stagger: { each: 0.03, from: "start" },
      overwrite: true
    });
  });
  link.addEventListener("mouseleave", function () {
    gsap.to(letters, {
      yPercent: 0,
      duration: 0.5,
      ease: "power3.out",
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
                  start: "top 85%",
                  end: "top 85%",
              },
          }
      );
  });



/* The Fork Widget Open */

const openFork = document.querySelectorAll("[open-fork]");
const forkBg = document.querySelector('.fork-bg');
const forkFill = document.querySelector('.fork-fill');
const closeFork = document.querySelectorAll("[close-fork]");


// Add event listener to all elements with the [open-bio] attribute
openFork.forEach((button) => {
  button.addEventListener('click', () => {
    forkBg.style.display = 'flex';
    gsap.to(forkFill, {
      x: '0%',
      duration: 0.6,
      ease: 'power2.out',
    });
  });
});

// Function to close the bio menu
const closeForkWrap = () => {
  gsap.to(forkFill, {
    x: '-110%',
    duration: 0.6,
    ease: 'power2.in',
    onComplete: () => {
      forkBg.style.display = 'none';
    },
  });
};

// Close the bio menu when clicking outside of bioFill
forkBg.addEventListener('click', closeForkWrap);

// Prevent clicks inside the bioFill from propagating to bioBg
forkFill.addEventListener('click', (e) => {
  e.stopPropagation();
});

// Add event listener to all elements with the [close-bio] attribute
closeFork.forEach((button) => {
  button.addEventListener('click', closeForkWrap);
});

/* Gift Form Open */

const openGift = document.querySelectorAll("[open-gift]");
const giftBg = document.querySelector('.gift-bg');
const giftFill = document.querySelector('.gift-fill');
const closeGift = document.querySelectorAll("[close-gift]");


// Add event listener to all elements with the [open-bio] attribute
openGift.forEach((button) => {
  button.addEventListener('click', () => {
    giftBg.style.display = 'flex';
    gsap.to(giftFill, {
      x: '0%',
      duration: 0.6,
      ease: 'power2.out',
    });
  });
});

// Function to close the bio menu
const closeGiftWrap = () => {
  gsap.to(giftFill, {
    x: '-110%',
    duration: 0.6,
    ease: 'power2.in',
    onComplete: () => {
      giftBg.style.display = 'none';
    },
  });
};

// Close the bio menu when clicking outside of bioFill
giftBg.addEventListener('click', closeGiftWrap);

// Prevent clicks inside the bioFill from propagating to bioBg
giftFill.addEventListener('click', (e) => {
  e.stopPropagation();
});

// Add event listener to all elements with the [close-bio] attribute
closeGift.forEach((button) => {
  button.addEventListener('click', closeGiftWrap);
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
  
// Check if the viewport is desktop (below 991px width)
if (window.innerWidth > 991) {
  /* Custom Cursor */

  // Set the cursor position to follow the mouse
  gsap.set(".cursor", { xPercent: -50, yPercent: -50 });

  let cursorX = gsap.quickTo(".cursor", "x", { duration: 0.5, ease: "power2" });
  let cursorY = gsap.quickTo(".cursor", "y", { duration: 0.5, ease: "power2" });

  window.addEventListener("mousemove", (e) => {
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
}


// POP-UPS Close Button
if (window.innerWidth > 991) {
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
  }

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

if (window.innerWidth > 991) {   
gsap.set(".egg-wrap-inside", {
webkitMaskSize: "190%",
maskSize: "190%"
})
}

if (window.innerWidth < 991) {
  gsap.set(".egg-wrap-inside", {
    webkitMaskSize: "250%",
    maskSize: "250%"
    })
}

if (window.innerWidth < 768) {
  gsap.set(".egg-wrap-inside", {
    webkitMaskSize: "350%",
    maskSize: "350%"
    })
}

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

gsap.set(".potat-logo, .egg-svg, .menu-btn-text, .lg-en, .lg-pt", {color: "#F2E5C8"});

gsap.to(".potat-logo, .egg-svg, .menu-btn-text, .lg-en, .lg-pt", {
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
  gsap.to(".potat-logo, .egg-svg, .menu-btn-text, .lg-en, .lg-pt", {
    scrollTrigger: {
      trigger: triggerElement,
      start: "top top",
      end: "bottom top",
      onEnter: () => gsap.to(".potat-logo, .egg-svg, .menu-btn-text, .lg-en, .lg-pt", { color: enterColor, duration: 0.5 }),
      onLeave: () => gsap.to(".potat-logo, .egg-svg, .menu-btn-text, .lg-en, .lg-pt", { color: leaveColor, duration: 0.5 }),
      onEnterBack: () => gsap.to(".potat-logo, .egg-svg, .menu-btn-text, .lg-en, .lg-pt", { color: enterColor, duration: 0.5 }),
      onLeaveBack: () => gsap.to(".potat-logo, .egg-svg, .menu-btn-text, .lg-en, .lg-pt", { color: leaveColor, duration: 0.5 }),
    },
  });
}

// Add triggers for multiple sections
setupScrollTrigger(".section_reservation", "#F2E5C8", "#043427");
setupScrollTrigger(".gift-container", "#F2E5C8", "#043427");


};

/* ------------- About -------------- */
if (page === "about") {

/* Team Bio Open */

const openBio = document.querySelectorAll("[open-bio]");
const bioBg = document.querySelector('.bio-bg');
const bioFill = document.querySelector('.bio-fill');
const closeBio = document.querySelectorAll("[close-bio]");

// Add event listener to all elements with the [open-bio] attribute
openBio.forEach((button) => {
  button.addEventListener('click', () => {
    bioBg.style.display = 'flex';
    gsap.to(bioFill, {
      x: '0%',
      duration: 0.6,
      ease: 'power2.out',
    });
  });
});

// Function to close the bio menu
const closeMenu = () => {
  gsap.to(bioFill, {
    x: '110%',
    duration: 0.6,
    ease: 'power2.in',
    onComplete: () => {
      bioBg.style.display = 'none';
    },
  });
};

// Close the bio menu when clicking outside of bioFill
bioBg.addEventListener('click', closeMenu);

// Prevent clicks inside the bioFill from propagating to bioBg
bioFill.addEventListener('click', (e) => {
  e.stopPropagation();
});

// Add event listener to all elements with the [close-bio] attribute
closeBio.forEach((button) => {
  button.addEventListener('click', closeMenu);
});


}


/* ------------- Events -------------- */
if (page === "events") {
  const containers = document.querySelectorAll(".swiper-slide.events-slider");

  containers.forEach((container, index) => {
    const numberBlock = container.querySelector(".number-eyebrow");
    numberBlock.textContent = index + 1;
  });

/* Form Open */

const openForm = document.querySelectorAll("[open-form]");
const formBg = document.querySelector('.form-bg');
const formFill = document.querySelector('.form-fill');
const closeForm = document.querySelectorAll("[close-form]");


// Add event listener to all elements with the [open-bio] attribute
openForm.forEach((button) => {
  button.addEventListener('click', () => {
    formBg.style.display = 'flex';
    gsap.to(formFill, {
      x: '0%',
      duration: 0.6,
      ease: 'power2.out',
    });
  });
});

// Function to close the bio menu
const closeMenu = () => {
  gsap.to(formFill, {
    x: '-110%',
    duration: 0.6,
    ease: 'power2.in',
    onComplete: () => {
      formBg.style.display = 'none';
    },
  });
};

// Close the bio menu when clicking outside of bioFill
formBg.addEventListener('click', closeMenu);

// Prevent clicks inside the bioFill from propagating to bioBg
formFill.addEventListener('click', (e) => {
  e.stopPropagation();
});

// Add event listener to all elements with the [close-bio] attribute
closeForm.forEach((button) => {
  button.addEventListener('click', closeMenu);
});

}