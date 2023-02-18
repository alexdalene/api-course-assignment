const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    console.log(entry);
    if (entry.isIntersecting) {
      entry.target.classList.add("obs-show");
    }
  });
});

const hiddenElements = document.querySelectorAll(".obs-hidden");
hiddenElements.forEach((el) => observer.observe(el));
