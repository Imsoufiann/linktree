// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const navbar = document.querySelector('.navbar');
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const backToTop = document.querySelector('.back-to-top');
    const scrollProgressBar = document.querySelector('.scroll-progress-bar');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    const sections = document.querySelectorAll('section');
    const faqItems = document.querySelectorAll('.faq-item');
    const testimonialDots = document.querySelector('.testimonial-dots');
    const testimonialTrack = document.querySelector('.testimonial-track');
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    const pricingToggle = document.getElementById('pricing-toggle');
    const scrollDownBtn = document.querySelector('.scroll-down');
    
    // Initialize variables
    let isMenuOpen = false;
    let currentTestimonial = 0;
    let testimonialAutoplay;
    
    // Add scroll event listener
    window.addEventListener('scroll', () => {
        updateOnScroll();
    });
    
    // Handle scroll updates
    function updateOnScroll() {
        // Navbar background on scroll
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Scroll progress bar
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollPercent = (scrollTop / scrollHeight) * 100;
        scrollProgressBar.style.width = scrollPercent + '%';
        
        // Show/hide back to top button
        if (window.scrollY > 600) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
        
        // Active nav link on scroll
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;
            
            if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + currentSection) {
                link.classList.add('active');
            }
        });
    }
    
    // Mobile Menu Toggle
    menuToggle.addEventListener('click', () => {
        isMenuOpen = !isMenuOpen;
        mobileMenu.classList.toggle('open', isMenuOpen);
        
        // Animate menu icon
        const bars = menuToggle.querySelectorAll('.bar');
        
        if (isMenuOpen) {
            bars[0].style.transform = 'translateY(9px) rotate(45deg)';
            bars[1].style.opacity = '0';
            bars[2].style.transform = 'translateY(-9px) rotate(-45deg)';
        } else {
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        }
    });
    
    // Close mobile menu when clicking a link
	mobileLinks.forEach(link => {
		link.addEventListener('click', () => {
			mobileMenu.classList.remove('open');
			isMenuOpen = false;
			
			// Reset menu icon
			const bars = menuToggle.querySelectorAll('.bar');
			bars[0].style.transform = 'none';
			bars[1].style.opacity = '1';
			bars[2].style.transform = 'none';
		});
	});
    
    
    // FAQ Accordion
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Check if current item is active
            const isActive = item.classList.contains('active');
            
            // Close all items
            faqItems.forEach(faqItem => {
                faqItem.classList.remove('active');
                const answer = faqItem.querySelector('.faq-answer');
                answer.style.maxHeight = 0;
            });
            
            // If clicked item wasn't active, open it
            if (!isActive) {
                item.classList.add('active');
                const answer = item.querySelector('.faq-answer');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });
    
    // Testimonial Slider
    function setupTestimonials() {
        // Create dots
        for (let i = 0; i < testimonialItems.length; i++) {
            const dot = document.createElement('div');
            dot.classList.add('testimonial-dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                goToTestimonial(i);
            });
            testimonialDots.appendChild(dot);
        }
        
        // Set up autoplay
        startTestimonialAutoplay();
        
        // Add controls event listeners
        const prevBtn = document.querySelector('.testimonial-arrow.prev');
        const nextBtn = document.querySelector('.testimonial-arrow.next');
        
        prevBtn.addEventListener('click', prevTestimonial);
        nextBtn.addEventListener('click', nextTestimonial);
    }
    
    function goToTestimonial(index) {
        // Update current index
        currentTestimonial = index;
        
        // Move slider
        testimonialTrack.style.transform = `translateX(-${currentTestimonial * 100}%)`;
        
        // Update dots
        const dots = testimonialDots.querySelectorAll('.testimonial-dot');
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentTestimonial);
        });
        
        // Reset autoplay
        resetTestimonialAutoplay();
    }
    
    function nextTestimonial() {
        const newIndex = (currentTestimonial + 1) % testimonialItems.length;
        goToTestimonial(newIndex);
    }
    
    function prevTestimonial() {
        const newIndex = (currentTestimonial - 1 + testimonialItems.length) % testimonialItems.length;
        goToTestimonial(newIndex);
    }
    
    function startTestimonialAutoplay() {
        testimonialAutoplay = setInterval(nextTestimonial, 5000);
    }
    
    function resetTestimonialAutoplay() {
        clearInterval(testimonialAutoplay);
        startTestimonialAutoplay();
    }
    
    // Pricing toggle
    if (pricingToggle) {
        pricingToggle.addEventListener('change', () => {
            document.body.classList.toggle('annually', pricingToggle.checked);
        });
    }
    
    // Scroll down button
    if (scrollDownBtn) {
        scrollDownBtn.addEventListener('click', () => {
            const aboutSection = document.getElementById('about');
            if (aboutSection) {
                aboutSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (targetId === '#') return;
            
            e.preventDefault();
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
	// Form submission handling
	const contactForm = document.getElementById('contactForm');
	if (contactForm) {
		contactForm.addEventListener('submit', function(e) {
			e.preventDefault();
			
			// Simple form validation
			const formElements = contactForm.elements;
			let isValid = true;
			
			for (let i = 0; i < formElements.length; i++) {
				const element = formElements[i];
				
				if (element.hasAttribute('required') && !element.value.trim()) {
					element.style.borderColor = 'var(--error)';
					isValid = false;
				} else if (element.type === 'email' && element.value.trim() && !isValidEmail(element.value)) {
					element.style.borderColor = 'var(--error)';
					isValid = false;
				} else {
					element.style.borderColor = '';
				}
			}
			
			if (isValid) {
				const btn = contactForm.querySelector('button[type="submit"]');
				const originalText = btn.innerHTML;
				
				btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
				btn.disabled = true;
				
				// Create FormData object from the form
				const formData = new FormData(contactForm);
				
				// Submit to Formspree
				fetch('https://formspree.io/f/xovezvzv', {
					method: 'POST',
					body: formData,
					headers: {
						'Accept': 'application/json'
					}
				})
				.then(response => {
					if (response.ok) {
						return response.json();
					}
					throw new Error('Network response was not ok.');
				})
				.then(data => {
					contactForm.reset();
					btn.innerHTML = '<i class="fas fa-check"></i> Sent Successfully!';
					
					setTimeout(() => {
						btn.innerHTML = originalText;
						btn.disabled = false;
					}, 3000);
				})
				.catch(error => {
					console.error('Error:', error);
					btn.innerHTML = '<i class="fas fa-times"></i> Failed to Send';
					
					setTimeout(() => {
						btn.innerHTML = originalText;
						btn.disabled = false;
					}, 3000);
				});
			}
		});
	}
    
    // Email validation helper
    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    
    // Animate elements on scroll
    function animateOnScroll() {
        const elementsToAnimate = document.querySelectorAll('.service-card, .portfolio-item, .process-step, .pricing-card, .contact-card');
        
        elementsToAnimate.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = element.classList.contains('pricing-card') && element.classList.contains('featured') 
                    ? 'translateY(0) scale(1.05)' 
                    : 'translateY(0)';
            }
        });
    }
    
    // Initialize animations
    function initAnimations() {
        // Set initial state for animated elements
        const elementsToAnimate = document.querySelectorAll('.service-card, .portfolio-item, .process-step, .pricing-card, .contact-card');
        
        elementsToAnimate.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });
        
        // Start animations
        animateOnScroll();
        window.addEventListener('scroll', animateOnScroll);
    }
    
    // Create interactive device mockup movement
    function initDeviceMockup() {
        const mockup = document.querySelector('.device-mockup');
        if (!mockup) return;
        
        document.addEventListener('mousemove', e => {
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;
            
            // Calculate rotation based on mouse position
            const rotateY = ((e.clientX / windowWidth) - 0.5) * 10; // -5 to 5 degrees
            const rotateX = ((e.clientY / windowHeight) - 0.5) * -10; // -5 to 5 degrees
            
            // Apply subtle rotation
            mockup.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
        });
    }
    
    // Create animated background dots
    function createBackgroundDots() {
        const movingDots = document.querySelector('.moving-dots');
        if (!movingDots) return;
        
        const dotCount = 50;
        
        for (let i = 0; i < dotCount; i++) {
            const dot = document.createElement('div');
            dot.classList.add('bg-dot');
            
            // Random properties
            const size = Math.random() * 4 + 1; // 1-5px
            const posX = Math.random() * 100; // 0-100%
            const posY = Math.random() * 100; // 0-100%
            const delay = Math.random() * 5; // 0-5s
            const duration = Math.random() * 20 + 10; // 10-30s
            
            // Set styles
            dot.style.width = `${size}px`;
            dot.style.height = `${size}px`;
            dot.style.left = `${posX}%`;
            dot.style.top = `${posY}%`;
            dot.style.position = 'absolute';
            dot.style.borderRadius = '50%';
            dot.style.backgroundColor = 'rgba(255,255,255,0.2)';
            dot.style.animation = `floatAnimation ${duration}s infinite ${delay}s linear`;
            
            movingDots.appendChild(dot);
        }
        
        // Add animation keyframes dynamically
        const style = document.createElement('style');
        style.innerHTML = `
            @keyframes floatAnimation {
                0% {
                    transform: translate(0, 0);
                    opacity: 0;
                }
                25% {
                    opacity: 0.3;
                }
                50% {
                    transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px);
                    opacity: 0.6;
                }
                75% {
                    opacity: 0.3;
                }
                100% {
                    transform: translate(0, 0);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Initialize sliders, animations, and interactive elements
    function init() {
        // Initial check for scroll position (in case page is refreshed mid-scroll)
        updateOnScroll();
        
        // Set up testimonials
        if (testimonialDots && testimonialTrack) {
            setupTestimonials();
        }
        
        // Initialize animations
        initAnimations();
        
        // Set up interactive device mockup
        initDeviceMockup();
        
        // Create animated background
        createBackgroundDots();
		
		optimizePortfolioForMobile();
		
		window.addEventListener('resize', function() {
		  optimizePortfolioForMobile();
		});

    }
    
    // Start everything
    init();
});

// JavaScript to enhance the interactive portfolio showcases

document.addEventListener('DOMContentLoaded', () => {
  // Handle iframe loading
  setupInteractivePortfolio();
		optimizePortfolioForMobile();
		
		window.addEventListener('resize', function() {
		  optimizePortfolioForMobile();
		});
});

function setupInteractivePortfolio() {
  // Get all iframe elements
  const iframes = document.querySelectorAll('.portfolio-interactive-content');
  
  // Set up load event listeners for each iframe
  iframes.forEach(iframe => {
    // Show loading state
    iframe.addEventListener('load', () => {
      // Add loaded class after iframe is fully loaded
      iframe.classList.add('loaded');
      
      // Attempt to handle cross-origin limitations gracefully
      try {
        // Add pointer events to make content fully interactive
        iframe.style.pointerEvents = 'auto';
        
        // Adjust iframe content if we have access (same origin only)
        if (iframe.contentWindow) {
          // This will only work if same origin policy allows it
          const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
          
          // Add custom CSS to the iframe content to make it more suitable for showcase
          const customStyle = iframeDoc.createElement('style');
          customStyle.textContent = `
            /* Custom styles injected to improve display */
            body {
              overflow: auto !important;
              height: auto !important;
              width: auto !important;
            }
            
            /* Disable any transitions for smoother experience */
            * {
              transition-duration: 0s !important;
            }
          `;
          
          iframeDoc.head.appendChild(customStyle);
        }
      } catch (error) {
        // Gracefully handle cross-origin limitations
        console.log('Cross-origin restrictions prevent content modifications');
      }
    });
    
    // Handle errors with iframes
    iframe.addEventListener('error', () => {
      // If iframe fails to load, show a fallback message
      const container = iframe.closest('.iframe-container');
      if (container) {
        container.innerHTML = `
          <div class="iframe-error">
            <p>Preview not available</p>
            <a href="${iframe.src}" target="_blank" class="btn btn-outline btn-sm">Visit Site</a>
          </div>
        `;
      }
    });
  });
  
  // Add interactive mouse movement effect to device mockups
  addMockupInteractivity();
}

// Handle viewport adjustments and responsiveness
window.addEventListener('resize', () => {
  // Recalculate iframe dimensions if needed for responsive behavior
  const iframes = document.querySelectorAll('.portfolio-interactive-content');
  
  iframes.forEach(iframe => {
    // Adjust scale factors based on container size
    const container = iframe.closest('.iframe-container');
    if (container) {
      const containerWidth = container.offsetWidth;
      
      // Dynamically adjust scale factor for different screen sizes
      if (iframe.closest('.portfolio-phone-screen')) {
        // Phone mockup scaling adjustments
        const scaleFactor = Math.min(0.6, containerWidth / 400);
        iframe.style.transform = `scale(${scaleFactor})`;
        iframe.style.width = `${(1/scaleFactor) * 100}%`;
        iframe.style.height = `${(1/scaleFactor) * 100}%`;
      } else if (iframe.closest('.portfolio-desktop-screen')) {
        // Desktop mockup scaling adjustments
        const scaleFactor = Math.min(0.7, containerWidth / 800);
        iframe.style.transform = `scale(${scaleFactor})`;
        iframe.style.width = `${(1/scaleFactor) * 100}%`;
        iframe.style.height = `${(1/scaleFactor) * 100}%`;
      }
    }
  });
});


document.addEventListener('DOMContentLoaded', () => {
  // Select all iframe elements in the portfolio section
  const portfolioIframes = document.querySelectorAll('.portfolio-interactive-content');
  
  // Add a timeout to remove loading indicators after 3 seconds regardless of load status
  portfolioIframes.forEach(iframe => {
    setTimeout(() => {
      const container = iframe.closest('.iframe-container');
      if (container) {
        container.classList.add('loaded');
      }
    }, 3000);
    
    // Still try to capture the natural load event
    iframe.addEventListener('load', () => {
      const container = iframe.closest('.iframe-container');
      if (container) {
        container.classList.add('loaded');
      }
    });
  });
});

function addMockupInteractivity() {
  const mockups = document.querySelectorAll('.portfolio-phone-mockup, .portfolio-desktop-mockup');
  
  mockups.forEach(mockup => {
    mockup.addEventListener('mousemove', (e) => {
      // Get relative position of mouse in the mockup
      const rect = mockup.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      
      // Calculate rotation values based on mouse position
      // Limited rotation range for subtle effect
      const rotateY = (x - 0.5) * 6; // -3 to 3 degrees
      const rotateX = (y - 0.5) * -6; // -3 to 3 degrees
      
      // Apply 3D rotation effect
      mockup.style.transform = `perspective(1000px) rotateY(${rotateY}deg) rotateX(${rotateX}deg) translateY(-5px)`;
    });
    
    // Reset transform when mouse leaves
    mockup.addEventListener('mouseleave', () => {
      mockup.style.transform = '';
    });
  });
}

function optimizeAnimations() {
  // Reduce or disable 3D effects on mobile
  const isMobile = window.innerWidth < 768;
  
  // Select all elements with 3D transforms
  const mockups = document.querySelectorAll('.portfolio-phone-mockup, .portfolio-desktop-mockup');
  
  if (isMobile) {
    // Simplify transform effects on mobile
    mockups.forEach(mockup => {
      mockup.style.transform = 'none';
      
      // Remove hover effects on mobile and replace with simpler ones
      mockup.addEventListener('touchstart', () => {
        mockup.style.transform = 'translateY(-5px)';
      });
      
      mockup.addEventListener('touchend', () => {
        mockup.style.transform = 'none';
      });
    });
    
    // Disable or reduce background animations on mobile
    const backgroundElements = document.querySelectorAll('.portfolio-mockup-grid, .portfolio-mockup-dots');
    backgroundElements.forEach(el => {
      el.style.display = 'none';
    });
  }
}

//this is to block preview	


function optimizePortfolioForMobile() {
  // Check if device is mobile
  const isMobile = window.innerWidth < 768;
  
  if (isMobile) {
    const iframeContainers = document.querySelectorAll('.iframe-container');
    
    iframeContainers.forEach(container => {
      // Get the iframe inside the container
      const iframe = container.querySelector('.portfolio-interactive-content');
      
      // Get the URL of the website
      const websiteUrl = iframe ? (iframe.src || iframe.dataset.src) : '#';
      
      // Create a placeholder element with a friendly message
      const placeholder = document.createElement('div');
      placeholder.className = 'mobile-site-placeholder';
      placeholder.innerHTML = `
        <div class="placeholder-content">
          <div class="placeholder-icon">
            <i class="fas fa-mobile-alt"></i>
          </div>
          <h4 class="placeholder-title">Mobile Friendly Notice</h4>
          <p class="placeholder-message">
            The live preview might lag your phone 😅<br>
            It works much better on desktop!
          </p>
          <div class="placeholder-buttons">
            <a href="${websiteUrl}" target="_blank" class="btn btn-primary btn-sm">Visit Website</a>
          </div>
        </div>
      `;
      
      // Remove the iframe and add the placeholder
      container.innerHTML = '';
      container.appendChild(placeholder);
    });
  }
}

// Add this to your CSS
const mobileStyles = document.createElement('style');
mobileStyles.textContent = `
  .mobile-site-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--bg-medium);
    border-radius: inherit;
  }
  
  .placeholder-content {
    text-align: center;
    padding: 20px;
  }
  
  .placeholder-icon {
    font-size: 2rem;
    color: var(--primary-light);
    margin-bottom: 15px;
  }
  
  .placeholder-text {
    color: var(--text-medium);
    margin-bottom: 15px;
    font-size: 0.9rem;
  }
  
  .btn-sm {
    padding: 8px 16px;
    font-size: 0.9rem;
  }
`;
document.head.appendChild(mobileStyles);

// Call this function in your initialization
document.addEventListener('DOMContentLoaded', () => {
  // Your existing initialization code
  
  // Add this new function
  optimizePortfolioForMobile();
  
  // Also handle resize events
  window.addEventListener('resize', () => {
    optimizePortfolioForMobile();
  });
});

function addFunMoroccanSection() {
  // First check if the section already exists to prevent duplicates
  if (document.querySelector('.fun-moroccan-section')) {
    return;
  }
  
  // Create the markup for our fun section
  const funSection = document.createElement('div');
  funSection.className = 'fun-moroccan-section';
  funSection.innerHTML = `
    <div class="fun-section-content">
      <div class="fun-section-icon">
        <i class="fas fa-lightbulb"></i>
      </div>
      <h3 class="fun-section-title">Chi mrat page whda hsen mn bzaf</h3>
      <p class="fun-section-tagline">Sometimes one page is better than many</p>
    </div>
    <div class="fun-section-decoration">
      <div class="moroccan-pattern pattern-1"></div>
      <div class="moroccan-pattern pattern-2"></div>
    </div>
  `;
  
  // Find where to insert it - after the portfolio heading
  const insertAfter = document.querySelector('.portfolio .section-header');
  if (insertAfter && insertAfter.parentNode) {
    // Insert after the section header
    if (insertAfter.nextElementSibling) {
      insertAfter.parentNode.insertBefore(funSection, insertAfter.nextElementSibling);
    } else {
      insertAfter.parentNode.appendChild(funSection);
    }
  } else {
    // Fallback - try to append to the portfolio section
    const portfolioSection = document.querySelector('.portfolio .container');
    if (portfolioSection) {
      portfolioSection.appendChild(funSection);
    }
  }
  
  // Add the styles directly to the document head
  const style = document.createElement('style');
  style.textContent = `
    /* Fun Moroccan Section Styles */
    .fun-moroccan-section {
      background: linear-gradient(135deg, #4a32cc 0%, #5d3eff 100%);
      border-radius: 12px;
      padding: 40px 30px;
      margin: 40px auto;
      position: relative;
      overflow: hidden;
      text-align: center;
      box-shadow: 0 20px 25px rgba(0, 0, 0, 0.15);
      transform: rotate(-1deg);
      border: 3px solid rgba(255, 255, 255, 0.1);
      max-width: 800px;
    }

    .fun-section-content {
      position: relative;
      z-index: 2;
    }

    .fun-section-icon {
      font-size: 2.5rem;
      color: rgba(255, 255, 255, 0.9);
      margin-bottom: 20px;
      animation: iconPulse 2s infinite alternate;
    }

    .fun-section-title {
      font-size: 2rem;
      color: white;
      margin-bottom: 10px;
      font-family: 'Space Grotesk', sans-serif;
      text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    }

    .fun-section-tagline {
      color: rgba(255, 255, 255, 0.8);
      font-size: 1.1rem;
      max-width: 600px;
      margin: 0 auto;
      font-style: italic;
    }

    .fun-section-decoration {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0.1;
      z-index: 1;
    }

    .moroccan-pattern {
      position: absolute;
      background-size: 80px 80px;
      width: 100%;
      height: 100%;
      opacity: 0.5;
    }

    .pattern-1 {
      background-image: radial-gradient(circle, #fff 2px, transparent 2px);
      background-size: 30px 30px;
      transform: rotate(15deg);
      animation: patternFloat 10s infinite alternate;
    }

    .pattern-2 {
      background-image: 
        linear-gradient(45deg, #fff 25%, transparent 25%), 
        linear-gradient(-45deg, #fff 25%, transparent 25%), 
        linear-gradient(45deg, transparent 75%, #fff 75%), 
        linear-gradient(-45deg, transparent 75%, #fff 75%);
      background-size: 20px 20px;
      background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
      transform: rotate(-15deg);
      animation: patternFloat 12s infinite alternate-reverse;
    }

    @keyframes iconPulse {
      0% {
        transform: scale(1);
        opacity: 0.9;
      }
      100% {
        transform: scale(1.1);
        opacity: 1;
      }
    }

    @keyframes patternFloat {
      0% {
        transform: translateX(-10px) rotate(15deg);
      }
      100% {
        transform: translateX(10px) rotate(15deg);
      }
    }

    /* Responsive adjustments */
    @media screen and (max-width: 768px) {
      .fun-moroccan-section {
        padding: 30px 20px;
        margin: 30px 15px;
        transform: rotate(0deg);
      }
      
      .fun-section-title {
        font-size: 1.6rem;
      }
      
      .fun-section-tagline {
        font-size: 1rem;
      }
    }
  `;
  
  document.head.appendChild(style);
}

document.addEventListener('DOMContentLoaded', function() {
            // Create multiple pulse rings with different delays
            const brainContainer = document.querySelector('.brain-container');
            
            for (let i = 0; i < 3; i++) {
                const ring = document.createElement('div');
                ring.classList.add('pulse-ring');
                ring.style.animationDelay = `${i * 0.5}s`;
                brainContainer.appendChild(ring);
            }
            
            // Simulate loading with progress bar
            const progressBar = document.getElementById('loading-progress-bar');
            const loadingScreen = document.getElementById('loading-screen');
            let progress = 0;
            
            // Simulate loading progress
            const interval = setInterval(function() {
                progress += Math.random() * 10;
                if (progress >= 100) {
                    progress = 100;
                    clearInterval(interval);
                    
                    // Hide loading screen after a small delay
                    setTimeout(function() {
                        loadingScreen.classList.add('hidden');
                        // Remove the loading screen from DOM after transition completes
                        setTimeout(function() {
                            loadingScreen.remove();
                        }, 500);
                    }, 500);
                }
                progressBar.style.width = progress + '%';
            }, 200);
            
            // Restart animation periodically for brain and elements
            setInterval(() => {
                const links = document.querySelectorAll('.profile-link');
                const profileItems = document.querySelectorAll('.profile-avatar, .profile-name, .profile-bio');
                
                // Reset animations by removing and re-adding classes
                [...links, ...profileItems].forEach(el => {
                    el.style.animation = 'none';
                    el.offsetHeight; // Trigger reflow
                    el.style.animation = '';
                });
            }, 8000);
        });
        
        // Fallback to ensure the site loads even if something goes wrong
        window.addEventListener('load', function() {
            const loadingScreen = document.getElementById('loading-screen');
            
            // If page fully loaded but loading screen still showing, hide it
            setTimeout(function() {
                if (loadingScreen) {
                    loadingScreen.classList.add('hidden');
                    setTimeout(function() {
                        loadingScreen.style.display = 'none';
                    }, 500);
                }
            }, 5000); // 5 second max wait time
        });

// Execute the function when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
  setTimeout(addFunMoroccanSection, 500); // Small delay to ensure everything is loaded
});