const revealNodes = document.querySelectorAll("[data-reveal]");
const counters = document.querySelectorAll(".counter");
let counterStarted = false;

const easeOutCubic = (n) => 1 - Math.pow(1 - n, 3);

const animateCounter = (node) => {
  const target = Number(node.dataset.target || 0);
  const duration = 1250;
  let startTime;

  const tick = (time) => {
    if (!startTime) startTime = time;
    const progress = Math.min((time - startTime) / duration, 1);
    const value = Math.floor(target * easeOutCubic(progress));
    node.textContent = value >= 10000 ? value.toLocaleString("zh-CN") : String(value);
    if (progress < 1) requestAnimationFrame(tick);
  };

  requestAnimationFrame(tick);
};

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("show");

      if (!counterStarted && entry.target.classList.contains("kpi-grid")) {
        counterStarted = true;
        counters.forEach((counter) => animateCounter(counter));
      }
    });
  },
  { threshold: 0.16 }
);

revealNodes.forEach((node) => observer.observe(node));

const kpiGrid = document.querySelector(".kpi-grid");
if (kpiGrid) observer.observe(kpiGrid);
