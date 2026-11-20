const typingText = document.getElementById("typing-text");
const roles = [
  "Systems Developer",
  "Web Developer",
  "Software Developer",
  "AI Enthusiast",
  "Cloud Technology Enthuasiast"
];
let roleIndex = 0;
let characterIndex = 0;
let isDeleting = false;

function typeEffect(){
  const currentRole= roles[roleIndex];
  if(isDeleting){
    characterIndex--;
  }else{
    characterIndex++;
  }
  typingText.textContent = currentRole.substring(0, characterIndex);
  let typingSpeed = isDeleting ? 50 : 100;
  if (!isDeleting && characterIndex === currentRole.length){
    typingSpeed = 1500;
    isDeleting = true;
  }
  else if(isDeleting && characterIndex === 0){
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    typingSpeed = 500;
  }
  setTimeout(typeEffect, typingSpeed);
}
if (typingText){
  typeEffect()
}

/*animated particle background*/
const canvas = document.getElementById("particle-canvas");
const ctx = canvas ? canvas.getContext("2d"): null;

let particles = [];
const particleCount = 55;

//Gold particle colors
const goldColours = [
  "rgba(212, 175, 55, 0.65)",
  "rgba(218, 185, 110, 0.55)",
  "rgba(232, 207, 151, 0.7)",
  "rgba(184, 145, 65, 0.45)"
];

function resizeCanvas() {
const hero = document.querySelector(".hero-section");
const width = hero.clientWidth;
const height = hero.clientHeight;

const pixelRatio = Math.min(
  window.devicePixelRatio || 1,
  2
);

canvas.width = width * pixelRatio;
canvas.height = height * pixelRatio;
ctx.setTransform(pixelRatio, 0 , 0, pixelRatio, 0, 0);
createParticles();
}

//Create a particle
class Particle {
  constructor(){
    this.x = Math.random() * canvas.clientWidth;
    this.y = Math.random() * canvas.clientHeight;
    this.size = Math.random() * 4 + 2;
    this.speedX = (Math.random() - 0.5) * 0.35;
    this.speedY = (Math.random() - 0.5) * 0.35;
    this.colour = goldColours[
      Math.floor(Math.random() * goldColours.length )
    ];
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if(this.x > canvas.clientWidth) this.x = 0;
    if(this.x < 0) this.x = canvas.clientWidth;
    if(this.y > canvas.clientHeight) this.y = 0;
    if(this.y < 0) this.y = canvas.clientHeight;
  }

  draw(){
    ctx.beginPath();
    ctx.arc(
      this.x,
      this.y,
      this.size,
      0,
      Math.PI * 2
    );
    ctx.fillStyle = this.colour;
    ctx.fill();
  }
}

function createParticles(){
  particles = [];
  for (let i=0; i < particleCount; i++) {
    particles.push(new Particle());
  }
}

function animateParticles(){
  ctx.clearRect(
    0,
    0,
    canvas.clientWidth,
    canvas.clientHeight
  );
  particles.forEach(particle => {
    particle.update();
    particle.draw();
  });
  requestAnimationFrame(animateParticles);
}

if (canvas && ctx){
  resizeCanvas();
  animateParticles();
  window.addEventListener("resize", resizeCanvas);
}

const aboutCards =  document.querySelectorAll(".about-card");
const cardObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if(entry.isIntersecting){
      entry.target.classList.add("show");
      cardObserver.unobserve(entry.target);
    }
  });
}, {
  threshold:0.2
});

aboutCards.forEach((card) => {
  cardObserver.observe(card);
});

// Mobile navigation toggle
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {

  menuToggle.addEventListener("click", () => {

    navLinks.classList.toggle("active");
    menuToggle.classList.toggle("active");

    const isOpen = navLinks.classList.contains("active");

    menuToggle.setAttribute("aria-expanded", isOpen);
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation menu" : "Open navigation menu"
    );
   
      // Close menu when clicking outside
  document.addEventListener("click", (event) => {

    if (
      !menuToggle.contains(event.target) &&
      !navLinks.contains(event.target)
    ) {
      navLinks.classList.remove("active");
      menuToggle.classList.remove("active");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation menu");
    }

  });
  });

  // Close menu after clicking a link
  navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      menuToggle.classList.remove("active");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation menu");
    });
  });

}

// Skills cards reveal animation
const skillCards = document.querySelectorAll(".skill-card");

const skillObserver = new IntersectionObserver((entries) => {

  entries.forEach((entry) => {

    if (entry.isIntersecting) {

      const card = entry.target;
      const delay = card.dataset.delay || 0;

      setTimeout(() => {
        card.classList.add("show");
      }, delay);

      skillObserver.unobserve(card);
    }

  });

}, {
  threshold: 0.2
});

skillCards.forEach((card, index) => {
  card.dataset.delay = index * 150;
  skillObserver.observe(card);
});


// Projects Page Reveal Animation
const projectCards = document.querySelectorAll(".project-reveal");

const projectObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
            projectObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

projectCards.forEach(card => {
    projectObserver.observe(card);
});

const contactForm = document.querySelector(".contact-form");

if (contactForm) {
    contactForm.addEventListener("submit", async function(event) {
        event.preventDefault();

        const status = document.querySelector("#form-status");
        const submitButton = contactForm.querySelector("button[type='submit']");

        status.textContent = "Sending your message...";
        submitButton.disabled = true;

        try {
            const response = await fetch(contactForm.action, {
                method: "POST",
                body: new FormData(contactForm),
                headers: {
                    "Accept": "application/json"
                }
            });

            if (response.ok) {
                status.textContent = "Thank you! Your message has been sent successfully.";
                contactForm.reset();
            } else {
                status.textContent = "Sorry, something went wrong. Please try again.";
            }

        } catch (error) {
            status.textContent = "Unable to send your message. Please check your internet connection.";
        }

        submitButton.disabled = false;
    });
}