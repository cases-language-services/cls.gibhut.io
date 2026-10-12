/**
 * Modern 2026 UI FX Controller
 * Implements GPU-accelerated 3D dynamic tilt and cursor interactions.
 */
document.addEventListener('DOMContentLoaded', () => {
  init3DHoverEffect();
});

/**
 * Initializes 3D tilt transformations for elements tagged with .hover-fx
 */
function init3DHoverEffect() {
  const interactiveElements = document.querySelectorAll('.hover-fx');

  interactiveElements.forEach((element) => {
    element.addEventListener('mousemove', (e) => handleTilt(e, element));
    element.addEventListener('mouseleave', (e) => resetTilt(element));
  });
}

/**
 * Calculates mouse position relative to target bounding box
 * and applies a subtle 3D rotational vector.
 */
function handleTilt(event, element) {
  const rect = element.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  const centerX = rect.width / 2;
  const centerY = rect.height / 2;

  // Maximum angular deflection (degrees)
  const maxTilt = 8;

  const tiltX = ((y - centerY) / centerY) * -maxTilt;
  const tiltY = ((x - centerX) / centerX) * maxTilt;

  requestAnimationFrame(() => {
    element.style.transform = `perspective(1000px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg) translateZ(8px)`;
  });
}

/**
 * Restores original transform properties smoothly.
 */
function resetTilt(element) {
  requestAnimationFrame(() => {
    element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
  });
}