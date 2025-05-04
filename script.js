// Projects rendering logic -----------------------------------------------------------------------------------------------------
const projects = [
  {
    name: "Picklers",
    description: "A pickleball social site built with JavaScript and C++ backend.",
    link: "link_to_project1",
    image: "path_to_image.jpg"
  },
  {
    name: "SunFresh Wine Inventory",
    description: "Database solution for a wine distributor built with PHP and MySQL.",
    link: "link_to_project2",
    image: "path_to_image2.jpg"
  }
];

window.onload = () => {
  const list = document.getElementById("project-list");
  projects.forEach((proj) => {
    const div = document.createElement("div");
    div.className = "col-md-4 mb-4";
    div.innerHTML = `
      <div class="project-card shadow-sm rounded">
        <img src="${proj.image}" class="card-img-top" alt="${proj.name}">
        <div class="card-body">
          <h5 class="card-title">${proj.name}</h5>
          <p class="card-text">${proj.description}</p>
          <a href="${proj.link}" class="btn btn-teal" target="_blank">View Project</a>
        </div>
      </div>
    `;
    list.appendChild(div);
  });
};
// Hamburger menu toggle functionality
document.getElementById("hamburger").addEventListener("click", () => {
  document.getElementById("menu").classList.toggle("hidden");
});

// Show selected section
function showSection(id) {
  const sections = document.querySelectorAll(".section");
  sections.forEach((sec) => sec.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
  document.getElementById("menu").classList.add("hidden");
}

document.querySelectorAll('a.nav-link').forEach(link => {
  link.addEventListener('click', function(e) {
    if (this.hash !== "") {
      e.preventDefault();
      const target = document.querySelector(this.hash);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  });
});
