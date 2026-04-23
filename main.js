const items = document.querySelectorAll(".reveal-item");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
    }
  });
});

items.forEach(item => observer.observe(item));

Chart.defaults.color = "#d8cfbf";
Chart.defaults.borderColor = "rgba(212, 175, 55, 0.12)";
Chart.defaults.font.family = "\"Trebuchet MS\", \"Gill Sans\", \"Segoe UI\", sans-serif";

let pieDone = false;
let barDone = false;

function createPie() {
  if (pieDone) return;
  pieDone = true;

  new Chart(document.getElementById("pieChart"), {
    type: "doughnut",
    data: {
      labels: ["Frontend", "Roblox", "Unity", "Godot"],
      datasets: [{
        data: [40, 30, 20, 10],
        backgroundColor: ["#f4e7c2", "#d4af37", "#8b6a24", "#ffffff"],
        borderColor: "#050505",
        borderWidth: 6,
        hoverOffset: 8
      }]
    },
    options: {
      cutout: "65%",
      animation: { duration: 1500 },
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            color: "#f5f2ea",
            usePointStyle: true,
            pointStyle: "circle",
            padding: 18
          }
        },
        tooltip: {
          backgroundColor: "#111111",
          titleColor: "#fff8e5",
          bodyColor: "#f5f2ea",
          borderColor: "rgba(212, 175, 55, 0.3)",
          borderWidth: 1,
          padding: 12
        }
      }
    }
  });
}

function createBar() {
  if (barDone) return;
  barDone = true;

  new Chart(document.getElementById("barChart"), {
    type: "bar",
    data: {
      labels: ["Projects", "Clients", "Satisfaction"],
      datasets: [{
        data: [50, 20, 95],
        backgroundColor: ["#ffffff", "#d4af37", "#8b6a24"],
        borderRadius: 14,
        borderSkipped: false
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: { duration: 2000 },
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          backgroundColor: "#111111",
          titleColor: "#fff8e5",
          bodyColor: "#f5f2ea",
          borderColor: "rgba(212, 175, 55, 0.3)",
          borderWidth: 1,
          padding: 12
        }
      },
      scales: {
        x: {
          grid: {
            display: false
          },
          ticks: {
            color: "#d8cfbf"
          }
        },
        y: {
          beginAtZero: true,
          ticks: {
            color: "#d8cfbf"
          },
          grid: {
            color: "rgba(255, 255, 255, 0.08)"
          }
        }
      }
    }
  });
}

const pieEl = document.getElementById("pieChart");
const barEl = document.getElementById("barChart");

const chartObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    if (entry.target === pieEl) createPie();
    if (entry.target === barEl) createBar();

    document.querySelectorAll(".bar span").forEach(el => {
      el.style.width = el.style.getPropertyValue("--w");
    });
  });
}, { threshold: 0.45 });

if (pieEl) chartObserver.observe(pieEl);
if (barEl) chartObserver.observe(barEl);
