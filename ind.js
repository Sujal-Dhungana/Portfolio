const items = document.querySelectorAll(".reveal-item");

const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add("active");
    }
  });
});

items.forEach(i => observer.observe(i));

/* PIE */
let pieDone = false;
let barDone = false;

function createPie() {
  if (pieDone) return;
  pieDone = true;

  new Chart(document.getElementById("pieChart"), {
    type: "doughnut",
    data: {
      labels: ["Frontend","Roblox","Unity","Godot"],
      datasets: [{
        data: [60,15,05,20],
        backgroundColor: ["#3b82f6","#a855f7","#22c55e","#f97316"]
      }]
    },
    options: {
      cutout: "65%",
      animation: { duration: 1500 }
    }
  });
}

/* BAR CENTER */
function createBar(){
  if(barDone) return;
  barDone = true;

  new Chart(document.getElementById("barChart"),{
    type:"bar",
    data:{
      labels:["Projects","Clients","Satisfaction"],
      datasets:[{
        data:[50,20,95],
        backgroundColor:["#3b82f6","#a855f7","#22c55e"],
        borderRadius: 10
      }]
    },

    options:{
      animation:{
        duration: 2800,   // slower animation (FIX #2)
        easing: "easeOutQuart"
      },

      plugins:{
        legend:{
          display: false   // ✅ THIS REMOVES ANY TOGGLE BUTTON / LEGEND
        }
      },

      responsive: true,
      maintainAspectRatio: false
    }
  });
}
/* SCROLL TRIGGERS */
const pieEl = document.getElementById("pieChart");
const barEl = document.getElementById("barChart");

const chartObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      if (e.target === pieEl) createPie();
      if (e.target === barEl) createBar();

      /* animate bars */
      document.querySelectorAll(".bar span").forEach(el => {
        el.style.width = el.style.getPropertyValue("--w");
      });
    }
  });
}, { threshold: 0.5 });

chartObserver.observe(pieEl);
chartObserver.observe(barEl);

/* SMOOTH NAV SCROLL (PRO LEVEL) */
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();

    const targetId = this.getAttribute('href');
    const target = document.querySelector(targetId);

    const navbarHeight = document.getElementById("navbar").offsetHeight;

    const targetPosition = target.offsetTop - navbarHeight;

    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  });
});