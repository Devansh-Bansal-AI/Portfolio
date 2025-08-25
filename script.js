// script.js
document.addEventListener('DOMContentLoaded', function() {
  // Initialize the animated background
  initAnimatedBackground();
  
  // Initialize smooth scrolling for navigation links
  initSmoothScrolling();
  
  // Initialize the responsive navigation menu
  initResponsiveNav();
  
  // Initialize scroll animations for elements
  initScrollAnimations();
  
  // Initialize the contact form handling
  initContactForm();
  
  // Initialize typing animation for name
  initNameAnimation();
});

// Animated background using Canvas API
function initAnimatedBackground() {
  const canvas = document.createElement('canvas');
  canvas.id = 'animated-bg';
  document.getElementById('app').appendChild(canvas);
  
  const ctx = canvas.getContext('2d');
  let particlesArray = [];
  
  // Set canvas dimensions
  function setCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  
  setCanvasSize();
  window.addEventListener('resize', setCanvasSize);
  
  // Create particle class
  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 0.5;
      this.speedX = Math.random() * 1 - 0.5;
      this.speedY = Math.random() * 1 - 0.5;
      this.color = '#6C63FF';
    }
    
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      
      if (this.x > canvas.width || this.x < 0) {
        this.speedX = -this.speedX;
      }
      if (this.y > canvas.height || this.y < 0) {
        this.speedY = -this.speedY;
      }
    }
    
    draw() {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  
  // Create particles
  function initParticles() {
    particlesArray = [];
    const numberOfParticles = (canvas.width * canvas.height) / 9000;
    
    for (let i = 0; i < numberOfParticles; i++) {
      particlesArray.push(new Particle());
    }
  }
  
  // Connect particles with lines
  function connectParticles() {
    const maxDistance = 100;
    for (let a = 0; a < particlesArray.length; a++) {
      for (let b = a; b < particlesArray.length; b++) {
        const dx = particlesArray[a].x - particlesArray[b].x;
        const dy = particlesArray[a].y - particlesArray[b].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < maxDistance) {
          const opacity = 1 - distance / maxDistance;
          ctx.strokeStyle = `rgba(108, 99, 255, ${opacity * 0.2})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
          ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
          ctx.stroke();
        }
      }
    }
  }
  
  // Animation loop
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let i = 0; i < particlesArray.length; i++) {
      particlesArray[i].update();
      particlesArray[i].draw();
    }
    
    connectParticles();
    requestAnimationFrame(animate);
  }
  
  initParticles();
  animate();
  
  // Reinitialize particles on resize
  window.addEventListener('resize', () => {
    setCanvasSize();
    initParticles();
  });
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
  document.querySelectorAll('a.nav-link, a.footer-link').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        const navHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = targetSection.offsetTop - navHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        // Close mobile menu if open
        const navMenu = document.querySelector('.nav-menu');
        if (navMenu.classList.contains('active')) {
          navMenu.classList.remove('active');
        }
      }
    });
  });
}

// Responsive navigation menu
function initResponsiveNav() {
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  
  if (hamburger) {
    hamburger.addEventListener('click', function() {
      navMenu.classList.toggle('active');
      hamburger.innerHTML = navMenu.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
    });
  }
  
  // Close menu when clicking on a link
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      hamburger.innerHTML = '<i class="fas fa-bars"></i>';
    });
  });
}

// Scroll animations for elements
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.skill-item, .project-card, .about-img img');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  animatedElements.forEach(element => {
    element.style.opacity = 0;
    element.style.transform = 'translateY(50px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
  });
}

// Contact form handling
function initContactForm() {
  const contactForm = document.querySelector('.contact-form form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Simple form validation
      const inputs = this.querySelectorAll('input, textarea');
      let isValid = true;
      
      inputs.forEach(input => {
        if (!input.value.trim()) {
          input.style.borderColor = 'red';
          isValid = false;
        } else {
          input.style.borderColor = '#ddd';
        }
      });
      
      if (isValid) {
        // Simulate form submission
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
          alert('Thank you for your message! I will get back to you soon.');
          this.reset();
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
        }, 1500);
      }
    });
  }
}


// Enhanced name animation
function initNameAnimation() {
  const nameElement = document.querySelector('.hero-title');
  const firstName = document.querySelector('.first-name');
  const lastName = document.querySelector('.last-name');

  // Wait until expand animation finishes, then add shimmer via CSS class
  setTimeout(() => {
    firstName.classList.add('shimmer');
  }, 1500); // after expand finishes for "Devansh"

  setTimeout(() => {
    lastName.classList.add('shimmer');
  }, 2200); // after expand finishes for "Bansal"

  // Subtle hover effect on the whole name
  nameElement.addEventListener('mouseenter', () => {
    nameElement.style.transform = 'scale(1.05)';
    nameElement.style.transition = 'transform 0.3s ease';
  });

  nameElement.addEventListener('mouseleave', () => {
    nameElement.style.transform = 'scale(1)';
  });
}


// Add CSS for shimmer animation
const style = document.createElement('style');
style.textContent = `
  @keyframes shimmer {
    0% { background-position: 0% 50%; }
    100% { background-position: 200% 50%; }
  }
`;
document.head.appendChild(style);