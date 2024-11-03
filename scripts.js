// Animation
function revealOnScroll() {
    const fadeIns = document.querySelectorAll('.fade-in');
    fadeIns.forEach((el) => {
      const scrollPosition = window.innerHeight + window.scrollY;
      const elementPosition = el.getBoundingClientRect().top + window.scrollY;
  
      if (scrollPosition > elementPosition) {
        el.classList.add('show');
      } else {
        el.classList.remove('show'); 
      }
    });
  }

  window.addEventListener('scroll', revealOnScroll);

  document.addEventListener('DOMContentLoaded', revealOnScroll);
  

//typing effect
const words = ["Passionate Programmer", "Creative Developer", "Problem Solver"];
let wordIndex = 0;
let letterIndex = 0;
let currentWord = "";
let isDeleting = false;
const typingSpeed = 150; 
const pauseAfterTyping = 1000; 

function typeEffect() {
    const dynamicText = document.getElementById("dynamic-text");

    if (!isDeleting && letterIndex < words[wordIndex].length) {
        currentWord += words[wordIndex][letterIndex];
        letterIndex++;
        dynamicText.textContent = currentWord;
        setTimeout(typeEffect, typingSpeed);
    } else if (isDeleting && letterIndex > 0) {
        currentWord = currentWord.slice(0, -1);
        letterIndex--;
        dynamicText.textContent = currentWord;
        setTimeout(typeEffect, typingSpeed / 2); 
    } else if (!isDeleting && letterIndex === words[wordIndex].length) {
        isDeleting = true;
        setTimeout(typeEffect, pauseAfterTyping);
    } else if (isDeleting && letterIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(typeEffect, typingSpeed);
    }
}

document.addEventListener("DOMContentLoaded", typeEffect);

//modal
let slideIndex = 0;
document.querySelectorAll(".project-card").forEach(card => {
  card.addEventListener("click", () => {
      const projectName = card.getAttribute("data-name");
      const githubLink = card.getAttribute("data-github");
      const images = card.getAttribute("data-images").split(",");
      const descriptions = card.getAttribute("data-description").split(",");

      openModal(projectName, descriptions, githubLink, images);
  });
});

function showSlides() {
  const slides = document.getElementsByClassName("slide");

  // Remove active class from all slides
  Array.from(slides).forEach(slide => {
      slide.classList.remove("active");
  });
  
  // Increment slide index and loop back to the beginning if necessary
  slideIndex++;
  if (slideIndex > slides.length) {
      slideIndex = 1;
  }

  // Add active class to the current slide
  slides[slideIndex - 1].classList.add("active");

  // Set a timer for the next slide
  setTimeout(showSlides, 3000); 
}

function openModal(projectName, projectDescriptions, githubLink, images) {
  document.getElementById("projectDetailModal").style.display = "flex";
  document.getElementById("projectName").innerText = projectName;

  // Set up the GitHub link
  const githubLinkElement = document.querySelector(".github-link");
  githubLinkElement.href = githubLink;

  // Clear previous images and add new ones
  const slidesContainer = document.querySelector(".slideshow-container");
  slidesContainer.innerHTML = "";

  images.forEach((imageSrc, index) => {
      const imgElement = document.createElement("img");
      imgElement.src = imageSrc.trim(); 
      imgElement.classList.add("slide");
      if (index === 0) imgElement.classList.add("active"); 
      slidesContainer.appendChild(imgElement);
  });

  // Process descriptions
  const descriptionSlidesContainer = document.querySelector(".description-slideshow");
  const dotsContainer = descriptionSlidesContainer.querySelector(".dots");
  descriptionSlidesContainer.querySelectorAll(".description-slide").forEach(slide => slide.remove());
  dotsContainer.innerHTML = "";

  projectDescriptions.forEach((description, index) => {
      const descriptionSlide = document.createElement("p");
      descriptionSlide.classList.add("description-slide");
      if (index === 0) descriptionSlide.classList.add("active"); 
      descriptionSlide.textContent = description.trim();
      descriptionSlidesContainer.insertBefore(descriptionSlide, dotsContainer);

      // Add a corresponding dot for each slide
      const dot = document.createElement("span");
      dot.classList.add("dot");
      if (index === 0) dot.classList.add("active"); 
      dot.setAttribute("onclick", `showDescriptionSlide(${index})`);
      dotsContainer.appendChild(dot);
  });

  showSlides();
}

function closeModal() {
    document.getElementById("projectDetailModal").style.display = "none";
}

let currentDescriptionSlide = 0;

function showDescriptionSlide(n) {
  const slides = document.getElementsByClassName("description-slide");
  const dots = document.getElementsByClassName("dot");

  if (n >= slides.length) currentDescriptionSlide = 0;
  else if (n < 0) currentDescriptionSlide = slides.length - 1;
  else currentDescriptionSlide = n;

  // Hide all slides and remove active class from dots
  Array.from(slides).forEach((slide) => slide.classList.remove("active"));
  Array.from(dots).forEach((dot) => dot.classList.remove("active"));

  // Show the current slide and activate the corresponding dot
  slides[currentDescriptionSlide].classList.add("active");
  dots[currentDescriptionSlide].classList.add("active");
}

function changeDescriptionSlide(n) {
  showDescriptionSlide(currentDescriptionSlide + n);
}

// Initialize the first slide
showDescriptionSlide(currentDescriptionSlide);
