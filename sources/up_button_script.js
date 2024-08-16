const navbar = document.querySelector(".navbar");
const header = document.querySelector(".hero");
const navbarBoarder = document.querySelector(".navbarBoarder");
const navcontainer = document.querySelector(".nav-container");
const toTopBtn = document.querySelector("#to-top");
const allSections = document.querySelectorAll(".section");
// Sticky navigation: Intersection Observer API

const navHeight = navbar.getBoundingClientRect().height;
// sticky nav bar functionality
const stickyNav = function (entries) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) {
    navcontainer.classList.add("bg-stone-100");
    toTopBtn.classList.add("show");
    navbar.classList.remove("absolute");
    navbar.classList.add("fixed");
    navcontainer.classList.add("fixed");
    navbarBoarder.classList.add("fixed");
  } else {
    navbar.classList.remove("fixed");
    navbar.classList.add("absolute");
    navbarBoarder.classList.remove("fixed");
    navcontainer.classList.remove("fixed");
    navcontainer.classList.remove("bg-stone-100");
    toTopBtn.classList.remove("show");
  }
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

///////////////////////////////////////
function scrollToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

// Event Delegation

const handleHover = function (e) {
  const navItem = e.target.closest(".nav-item"); //get the closest link

  if (navItem) {
    const siblings = navItem.closest(".navbar").querySelectorAll(".nav-item");
    // erase all existing opacity classes on the elements
    siblings.forEach((element) => {
      // get the list of elements in the div element
      const elements = element.classList;
      elements.forEach((el) => {
        if (el.includes("opacity")) {
          element.classList.remove(el);
        }
      });
    });
    siblings.forEach((element) => {
      if (element != navItem) {
        console.log(element);
        element.classList.add(this); //thuis keyword is the opacity
      }
    });
  }
};
navbar.addEventListener("mouseover", handleHover.bind("opacity-50")); //binding returns the this key word assigned to the argument an array can also be passed
navbar.addEventListener("mouseout", handleHover.bind("opacity-100"));
///////////////////////////////////////
// Reveal sections

//revealling section functionality
const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.1,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});
// Event Listeners

document.querySelector("#to-top").addEventListener("click", scrollToTop);
