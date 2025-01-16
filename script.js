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

/* Open Menu */

// gsap.registerPlugin(CustomEase);

// CustomEase.create( "main", "0.65, 0.01, 0.05, 0.99" );

// gsap.defaults({
//   ease:"main",
//   duration:0.7
// })
  
// function initMenu(){
//   let navWrap = document.querySelector(".nav")
//   let state = navWrap.getAttribute("data-nav")
//   let overlay = navWrap.querySelector(".overlay")
//   let menu = navWrap.querySelector(".menu")
//   let bgPanels = navWrap.querySelectorAll(".bg-panel")
//   let menuToggles = document.querySelectorAll("[data-menu-toggle]")
//   let menuLinks = navWrap.querySelectorAll(".menu-link")
//   let fadeTargets = navWrap.querySelectorAll("[data-menu-fade]")
//   let menuButton = document.querySelector(".menu-button")
//   let menuButtonTexts = menuButton.querySelectorAll("p")
//   let menuButtonIcon = menuButton.querySelector(".menu-button-icon")

//   let tl = gsap.timeline()
  
//   const openNav = () =>{
//     navWrap.setAttribute("data-nav", "open")
    
//     tl.clear()
//     .set(navWrap,{display:"block"})
//     .set(menu,{xPercent:0},"<")
//     .fromTo(menuButtonTexts,{yPercent:0},{yPercent:-100,stagger:0.2})
//     .fromTo(menuButtonIcon,{rotate:0},{rotate:315},"<")
//     .fromTo(overlay,{autoAlpha:0},{autoAlpha:1},"<")
//     .fromTo(bgPanels,{xPercent:101},{xPercent:0,stagger:0.12,duration: 0.575},"<")
//     .fromTo(menuLinks,{yPercent:140,rotate:10},{yPercent:0, rotate:0,stagger:0.05},"<+=0.35")
//     .fromTo(fadeTargets,{autoAlpha:0,yPercent:50},{autoAlpha:1, yPercent:0,stagger:0.04},"<+=0.2")
//   }
  
//   const closeNav = () =>{
//     navWrap.setAttribute("data-nav", "closed")
    
//     tl.clear()
//     .to(overlay,{autoAlpha:0})
//     .to(menu,{xPercent:120},"<")
//     .to(menuButtonTexts,{yPercent:0},"<")
//     .to(menuButtonIcon,{rotate:0},"<")
//     .set(navWrap,{display:"none"})
//   }  
  
//   // Toggle menu open / close depending on its current state
//   menuToggles.forEach((toggle) => {
//     toggle.addEventListener("click", () => {
//       state = navWrap.getAttribute("data-nav");
//       if (state === "open") {
//         closeNav();
//       } else {
//         openNav();
//       }
//     });    
//   });
  
//   // If menu is open, you can close it using the "escape" key
//   document.addEventListener("keydown", (e) => {
//     if (e.key === "Escape" && navWrap.getAttribute("data-nav") === "open") {
//       closeNav();
//     }
//   });
// }

// document.addEventListener("DOMContentLoaded",()=>{
//   initMenu()
// })


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

    const containers = document.querySelectorAll(".swiper-slide.events-slider");

    containers.forEach((container, index) => {
      const numberBlock = container.querySelector(".number-eyebrow");
      numberBlock.textContent = index + 1;
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
    webkitMaskSize: "180%",
    maskSize: "180%"
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

// gsap.set(".egg-wrap-inside", {
//   clipPath: "circle(75% at 50% 50%)",
// })

// gsap.to(".egg-wrap-inside", {
//   scrollTrigger: {
//     trigger: scrubStartEl,
//     start: "top top",
//     end: "5% top",
//     scrub: 1,
//   },
//   clipPath: "circle(30% at 50% 50%)",
  
//   onComplete: () => ScrollTrigger.refresh(),
// });

    });

/* ------------- Events -------------- */
if (page === "events") {
  const containers = document.querySelectorAll(".swiper-slide.events-slider");

  containers.forEach((container, index) => {
    const numberBlock = container.querySelector(".number-eyebrow");
    numberBlock.textContent = index + 1;
  });



}