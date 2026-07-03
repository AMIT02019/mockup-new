/* ============================================================
   SHILP ASSOCIATES — Homepage Scripts
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  /* ---------- Navbar scroll effect ---------- */
  const navbar = document.querySelector('.navbar');
  const handleScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  /* ---------- Mobile Navigation Toggle ---------- */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const spans = navToggle.querySelectorAll('span');
      if (navLinks.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
      }
    });

    // Close nav on link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
      });
    });
  }

  /* ---------- Reveal on Scroll (Intersection Observer) ---------- */
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  revealElements.forEach(el => revealObserver.observe(el));

  /* ---------- Animated Counters ---------- */
  const counters = document.querySelectorAll('[data-count]');
  let counterAnimated = false;

  const animateCounters = () => {
    if (counterAnimated) return;
    counterAnimated = true;
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-count'), 10);
      const suffix = counter.getAttribute('data-suffix') || '';
      const duration = 2000;
      const startTime = performance.now();

      const update = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(eased * target);
        counter.textContent = current + suffix;

        if (progress < 1) {
          requestAnimationFrame(update);
        }
      };
      requestAnimationFrame(update);
    });
  };

  const statsSection = document.querySelector('.stats');
  if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounters();
          statsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    statsObserver.observe(statsSection);
  }

  /* ---------- Testimonial Carousel ---------- */
  const testimonials = [
    {
      text: "We have been working with Shilp Associates for over a decade. Their commitment to quality, expertise in approvals and timely delivery is unmatched.",
      author: "— CEO, Leading Developer"
    },
    {
      text: "Shilp Associates transformed our vision into reality. Their architectural expertise and attention to detail exceeded all our expectations.",
      author: "— Director, Prestige Group"
    },
    {
      text: "From liaison to final handover, the team at Shilp Associates ensured a seamless experience. Truly the best in Mumbai's construction industry.",
      author: "— MD, Horizon Realty"
    }
  ];

  let currentSlide = 0;
  const testimonialText = document.querySelector('.testimonial-text');
  const testimonialAuthor = document.querySelector('.testimonial-author');
  const dots = document.querySelectorAll('.testimonial-dot');
  const nextBtn = document.querySelector('.testimonial-nav-arrow');

  const updateTestimonial = (index) => {
    if (!testimonialText || !testimonialAuthor) return;
    // Fade out
    testimonialText.style.opacity = '0';
    testimonialText.style.transform = 'translateY(10px)';
    testimonialAuthor.style.opacity = '0';

    setTimeout(() => {
      testimonialText.textContent = testimonials[index].text;
      testimonialAuthor.textContent = testimonials[index].author;
      // Fade in
      testimonialText.style.opacity = '1';
      testimonialText.style.transform = 'translateY(0)';
      testimonialAuthor.style.opacity = '1';
    }, 300);

    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  };

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentSlide = (currentSlide + 1) % testimonials.length;
      updateTestimonial(currentSlide);
    });
  }

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      currentSlide = i;
      updateTestimonial(currentSlide);
    });
  });

  // Add transition styles to testimonial elements
  if (testimonialText) {
    testimonialText.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
  }
  if (testimonialAuthor) {
    testimonialAuthor.style.transition = 'opacity 0.3s ease';
  }

  // Auto-advance every 5 seconds
  setInterval(() => {
    currentSlide = (currentSlide + 1) % testimonials.length;
    updateTestimonial(currentSlide);
  }, 5000);

  /* ---------- Smooth Scroll for CTA buttons ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
});
