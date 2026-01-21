const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const nav = document.querySelector("nav");
const overlay = document.getElementById("overlay");

const projectsPage = document.getElementById("projectsPage");
const detailsPage = document.getElementById("detailsPage");
const backBtn = document.getElementById("backToProjects");

const detailsTitle = document.getElementById("detailsTitle");
const detailsOverview = document.getElementById("detailsOverview");
const detailsFeatures = document.getElementById("detailsFeatures");
const detailsSolution = document.getElementById("detailsSolution");
const detailsOutcome = document.getElementById("detailsOutcome");
const detailsTech = document.getElementById("detailsTech");
const detailsLive = document.getElementById("detailsLive");
const detailsCode = document.getElementById("detailsCode");

// Null check for safety
if (!menuToggle || !navLinks || !nav || !overlay) {
  console.error("Required DOM elements not found");
  throw new Error("Navigation elements missing");
}

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("show");
  nav.classList.toggle("show");
  overlay.classList.toggle("show");
});

// Close menu when clicking the overlay
overlay.addEventListener("click", () => {
  navLinks.classList.remove("show");
  nav.classList.remove("show");
  overlay.classList.remove("show");
});


navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('show');
    nav.classList.remove('show');
    overlay.classList.remove('show');
  });
});

/* ✅ your data (add more projects here) */
const PROJECTS = {
  animezone: {
    title: "AnimeZone: Anime Discovery Web App",
    overview: "AnimeZone is a full-stack anime discovery website that lets users explore and save anime titles in a clean and modern UI. The site pulls anime data from the Jikan API (MyAnimeList) and presents it through a hero carousel and categorized sections such as Popular, Trending, and Top Rated. Users can search for any anime title in real-time and instantly view results with cover images and metadata.To make the experience feel complete and personal, AnimeZone includes authentication (register/login/logout) and a “My List” feature where users can save their favorite anime. Saved titles are stored in MongoDB Atlas per user account, meaning favorites stay permanently even after the browser is refreshed or reopened. API results are cached locally to keep the website fast and to protect against rate limits from the external API.",
     features: [
      "Modern anime browsing experience: Hero carousel plus Popular/Trending/Top Rated sections with clickable anime cards that open MyAnimeList pages",
      "Search system with live results: Debounced search to reduce API spam and keep performance smooth",
      "Genre filtering dropdown: Selecting a genre loads anime matching that genre in a dedicated section",
      "My List favorites: Heart icons on cards/search/genre + hero button to save titles",
      "Persistent user sessions: Users stay signed in after refresh using session + /me endpoint",
      "Secure password handling: Passwords hashed using bcrypt before saving in MongoDB Atlas",
      "Caching layer: localStorage caching with timestamps + expiry to reduce API calls and improve speed",
      "Rate limit protection: 429 retry/backoff handling for external API safety",
      "UI sync: Hearts stay consistent across homepage cards, hero, search results, and genre results",
    ],
    solution: "The frontend is built with HTML, CSS, and JavaScript, focusing on smooth UI behavior and responsive layout. Anime data is fetched from Jikan endpoints and injected into the hero slides and grid cards dynamically. To reduce unnecessary requests, the app includes a caching layer that stores JSON results in localStorage with timestamps and automatically invalidates them after an expiry time.\n\nSearch is implemented with a debounced input listener so API calls only happen when the user pauses typing. Results render into a structured dropdown grid, where each result includes a heart button to add it directly into My List. The Genres feature follows the same idea: the genre list is cached long-term, while per-genre anime requests are cached shorter to keep results fresh.\n\nThe backend runs on Node.js + Express and connects to MongoDB Atlas using Mongoose. It handles authentication (register/login/logout) and provides a favorites API (/api/my-list) that stores anime per user account. Login persistence is handled via express-session, and passwords are hashed using bcrypt before being stored.",
    outcome: "AnimeZone delivers a fast and polished anime discovery experience that feels like a real-world application. Users can browse, search instantly, filter by genres, and build a personal My List that stays saved across sessions using MongoDB Atlas. Performance remains stable because API calls are minimized through caching and a retry strategy that handles rate limiting. Overall, the project demonstrates full-stack development skills including UI/UX, authentication, database persistence, caching strategy, and clean API design.",
    tech: [
      "HTML",
      "CSS",
      "JavaScript",
      "Node.js",
      "Express",
      "MongoDB Atlas",
      "Mongoose",
      "bcrypt",
      "express-session",
      "Jikan API",
    ],
    liveUrl: "animezone-1-lfpo.onrender.com/",
    codeUrl: "https://github.com/rahgan01/animezone",
  },

  voxel: {
    title: "Voxel Engine",
    overview: "High-performance voxel engine featuring chunk streaming, procedural terrain, and real-time lighting.",
    features: ["Chunk streaming", "Procedural terrain", "Real-time lighting", "Modern OpenGL pipeline"],
    solution: "Engine architecture with chunk management + rendering pipeline tuned for performance.",
    outcome: "Smooth voxel world rendering with scalable streaming and lighting.",
    tech: ["C++", "OpenGL", "CMake"],
    liveUrl: "#",
    codeUrl: "#",
  },

  chatbot: {
    title: "Chatbot Platform",
    overview: "AI chatbot service with multi-provider support, secure auth flows, and monitoring tools.",
    features: ["Multi-provider support", "Secure auth flows", "Monitoring + tools", "Clean UI"],
    solution: "Backend APIs + integrated model providers + a clean interface for usage and monitoring.",
    outcome: "Production-ready chatbot service design with scalable architecture.",
    tech: ["Python", "FastAPI", "MongoDB"],
    liveUrl: "#",
    codeUrl: "#",
  },
};


/* show details view */
function openDetails(id, push = true) {
  const p = PROJECTS[id];
  if (!p) return;

  detailsTitle.textContent = p.title;
  detailsOverview.textContent = p.overview;
  detailsSolution.textContent = p.solution;
  detailsOutcome.textContent = p.outcome;

  detailsFeatures.innerHTML = p.features.map((f) => `<li>${f}</li>`).join("\n");

  detailsTech.innerHTML = p.tech.map((t) => `<span class="pill">${t}</span>`).join("");

  detailsLive.href = p.liveUrl || "#";
  detailsCode.href = p.codeUrl || "#";

  projectsPage.hidden = true;
  detailsPage.hidden = false;

  if (push) history.pushState({ view: "details", id }, "", `#project-${id}`);
  window.scrollTo({ top: 0, behavior: "instant" });
}

/* back to grid */
function goBack(push = true) {
  detailsPage.hidden = true;
  projectsPage.hidden = false;

  if (push) history.pushState({ view: "grid" }, "", `#projects`);
}

/* click handlers */
document.addEventListener("click", (e) => {
  const btn = e.target.closest(".view-details");
  if (!btn) return;

  const id = btn.getAttribute("data-project-id");
  openDetails(id);
});

backBtn.addEventListener("click", () => {
  history.back(); // feels natural
});

document.addEventListener("click", (e) => {
  const btn = e.target.closest(".project-name");
  if (!btn) return;

  const id = btn.getAttribute("data-project-id");
  openDetails(id);
});

backBtn.addEventListener("click", () => {
  history.back(); // feels natural
});

/* handle back/forward navigation */
window.addEventListener("popstate", () => {
  const hash = location.hash;

  if (hash.startsWith("#project-")) {
    const id = hash.replace("#project-", "");
    openDetails(id, false);
  } else {
    goBack(false);
  }
});

/* load correct view on refresh */
(function initViewFromHash() {
  const hash = location.hash;
  if (hash.startsWith("#project-")) {
    const id = hash.replace("#project-", "");
    openDetails(id, false);
  } else {
    goBack(false);
  }
})();
