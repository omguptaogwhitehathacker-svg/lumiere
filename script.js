const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) nav.classList.add('scrolled');
  else nav.classList.remove('scrolled');
});

const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
  });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

const heroContent = document.querySelector('.hero-content');
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  if (y < window.innerHeight && heroContent) {
    heroContent.style.transform = `translateY(${y * 0.3}px)`;
    heroContent.style.opacity = String(Math.max(0, 1 - y / 600));
  }
}, { passive: true });

// Contact form -> mailto (opens user's local email app)
const RECIPIENT = 'theunnamedproject@protonmail.me';
const form = document.getElementById('contact-form');
const status = document.getElementById('cf-status');

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('cf-name').value.trim();
    const email = document.getElementById('cf-email').value.trim();
    const subject = document.getElementById('cf-subject').value.trim();
    const message = document.getElementById('cf-message').value.trim();

    if (!name || !email || !subject || !message) {
      status.textContent = 'Please fill in every field before sending.';
      return;
    }

    const mailSubject = `[Lumière Café] ${subject}`;
    const mailBody =
      `Name: ${name}\n` +
      `Email: ${email}\n\n` +
      `${message}\n`;

    const href =
      `mailto:${RECIPIENT}` +
      `?subject=${encodeURIComponent(mailSubject)}` +
      `&body=${encodeURIComponent(mailBody)}`;

    status.textContent = 'Opening your email app…';
    window.location.href = href;
  });
}
