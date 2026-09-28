/**
 * Denise Cendranata – Professional Accounting CV
 * Clean Vanilla JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Dynamic Footer Year
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 2. Toast Notification Helper
  const toast = document.getElementById('toast');
  const toastText = document.getElementById('toastText');
  let toastTimer = null;

  function showToast(message) {
    if (!toast || !toastText) return;
    toastText.textContent = message;
    toast.classList.add('show');

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  // 3. Copy to Clipboard Utility
  function copyTextToClipboard(text, successMessage) {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(() => {
        showToast(successMessage);
      }).catch(() => {
        fallbackCopyText(text, successMessage);
      });
    } else {
      fallbackCopyText(text, successMessage);
    }
  }

  function fallbackCopyText(text, successMessage) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      showToast(successMessage);
    } catch (err) {
      showToast('Gagal menyalin secara otomatis');
    }
    document.body.removeChild(textArea);
  }

  // 4. Copy Email Handler
  const cardEmailLink = document.getElementById('cardEmailLink');
  if (cardEmailLink) {
    cardEmailLink.addEventListener('click', () => {
      copyTextToClipboard('denisecen09@gmail.com', 'Email denisecen09@gmail.com berhasil disalin!');
    });
  }

  // 5. Print PDF Buttons
  const btnTopPrint = document.getElementById('btnTopPrint');
  const btnFooterPrint = document.getElementById('btnFooterPrint');

  const handlePrint = (e) => {
    e.preventDefault();
    window.print();
  };

  if (btnTopPrint) btnTopPrint.addEventListener('click', handlePrint);
  if (btnFooterPrint) btnFooterPrint.addEventListener('click', handlePrint);

  // 6. Mobile Nav Toggle
  const mobileNavToggle = document.getElementById('mobileNavToggle');
  const navLinksWrap = document.getElementById('navLinksWrap');

  if (mobileNavToggle && navLinksWrap) {
    mobileNavToggle.addEventListener('click', () => {
      navLinksWrap.classList.toggle('open');
    });

    // Close menu when a link is clicked
    navLinksWrap.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navLinksWrap.classList.remove('open');
      });
    });
  }

  // 7. Navbar Scroll Effect & ScrollSpy
  const headerNav = document.getElementById('headerNav');
  const navLinks = document.querySelectorAll('.nav-links-wrap .nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      headerNav.classList.add('scrolled');
    } else {
      headerNav.classList.remove('scrolled');
    }

    // ScrollSpy active link detection
    let currentId = '';
    const scrollPosition = window.scrollY + 140;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPosition >= top && scrollPosition < top + height) {
        currentId = section.getAttribute('id');
      }
    });

    if (currentId) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentId}`) {
          link.classList.add('active');
        }
      });
    }
  });

  // 8. Number Counters Animation on Viewport Enter
  const counters = document.querySelectorAll('.counter');
  let hasAnimated = false;

  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        counters.forEach(counter => {
          const target = +counter.getAttribute('data-target');
          const duration = 1200;
          const stepTime = 25;
          const totalSteps = duration / stepTime;
          const increment = target / totalSteps;
          let current = 0;

          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              counter.textContent = target;
              clearInterval(timer);
            } else {
              counter.textContent = Math.floor(current);
            }
          }, stepTime);
        });
        observer.disconnect();
      }
    });
  }, { threshold: 0.3 });

  const metricsSection = document.querySelector('.metrics-section');
  if (metricsSection) {
    counterObserver.observe(metricsSection);
  }
});
