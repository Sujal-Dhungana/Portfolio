const tierButtons = document.querySelectorAll(".select-tier");
const paymentForm = document.querySelector(".payment-form");
const summaryOutput = document.getElementById("summaryOutput");
const copyButton = document.getElementById("copyForDiscord");
const emailFallback = document.getElementById("emailFallback");

let currentSummary = "";

function setSelectedTier(button) {
  if (!paymentForm) return;

  const serviceInput = paymentForm.querySelector('[name="service"]');
  const tierInput = paymentForm.querySelector('[name="tier"]');
  const priceInput = paymentForm.querySelector('[name="price"]');

  serviceInput.value = button.dataset.service;
  tierInput.value = button.dataset.tier;
  priceInput.value = button.dataset.price;

  tierButtons.forEach(item => {
    item.closest(".tier-card")?.classList.toggle("selected", item === button);
  });

  document.getElementById("payment")?.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}

tierButtons.forEach(button => {
  button.addEventListener("click", () => setSelectedTier(button));
});

if (paymentForm) {
  paymentForm.addEventListener("submit", event => {
    event.preventDefault();

    const formData = new FormData(paymentForm);
    const service = String(formData.get("service") || "").trim();
    const tier = String(formData.get("tier") || "").trim();
    const price = String(formData.get("price") || "").trim();

    if (!tier || !price) {
      summaryOutput.textContent = "Choose a Basic, Intermediate, or Advanced tier above before generating the request.";
      return;
    }

    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const discord = String(formData.get("discord") || "").trim();
    const paymentMethod = String(formData.get("paymentMethod") || "").trim();
    const notes = String(formData.get("notes") || "").trim() || "No extra notes.";

    currentSummary = [
      "PROJECT PAYMENT REQUEST",
      "",
      `Service: ${service}`,
      `Tier: ${tier}`,
      `Price: ${price}`,
      `Client Name: ${name}`,
      `Client Email: ${email}`,
      `Discord Username: ${discord}`,
      `Preferred Payment Method: ${paymentMethod}`,
      `Project Notes: ${notes}`,
      "",
      "Recommended contact: Discord (godly.god)"
    ].join("\n");

    summaryOutput.textContent = currentSummary;
    copyButton.disabled = false;

    const subject = encodeURIComponent(`${service} - ${tier} payment request`);
    const body = encodeURIComponent(currentSummary);
    emailFallback.href = `mailto:sujaldhungana31@gmail.com?subject=${subject}&body=${body}`;
  });
}

if (copyButton) {
  copyButton.addEventListener("click", async () => {
    if (!currentSummary) return;

    try {
      await navigator.clipboard.writeText(currentSummary);
      copyButton.textContent = "Copied for Discord";
      window.setTimeout(() => {
        copyButton.textContent = "Copy for Discord";
      }, 1800);
    } catch {
      copyButton.textContent = "Copy failed";
      window.setTimeout(() => {
        copyButton.textContent = "Copy for Discord";
      }, 1800);
    }
  });
}
