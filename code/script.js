// GET/POST: https://api.shrtco.de/v2/shorten?url=example.org/very/long/link.html
// https://api.shrtco.de/v2/shorten?url=facebook.com

const add_link = document.getElementById("add-the-link");
const shorten_button = document.getElementById("shorten-button");

const get_shorter_link = async function () {
  if (add_link.value) {
    const res = await fetch(
      `https://api.shrtco.de/v2/shorten?url=${add_link.value}`
    );
    const data = await res.json();

    if (data.ok === false) {
      document.querySelector(".error-label").classList.remove("hidden");
      add_link.classList.add("error-input");
    }
    if (!res.ok) {
      throw new Error(`Connections : ${data.ok} [Unsuccessful]`);
    } else if (add_link.value === "") {
      return;
    } else {
      document.querySelector(".error-label").classList.add("hidden");
      add_link.classList.remove("error-input");

      const search_content = document.querySelector(".search-results");
      const search_results_content = document.createElement("div");
      search_results_content.classList.add("search-results-content");
      search_results_content.innerHTML = `
    <div class="search-url-input">
      <p>http://${add_link.value}</p>
    </div>
    <div class="search-shorten-code">
      <small>${data.result.short_link}</small>
      <button id="copy-button">Copy</button>
    </div>
  `;

      search_content.append(search_results_content);
      const copy_btn = document.getElementById("copy-button");
      copy_btn.addEventListener("click", () => {
        const copy_text = add_link;
        copy_text.select();
        copy_text.setSelectionRange(0, 99999);
        navigator.clipboard.writeText(copy_text.value);
        copy_btn.textContent = "Copied!";
        copy_btn.style.backgroundColor = "var(--purple)";
      });
    }
  }
};

add_link.addEventListener("change", () => {
  shorten_button.addEventListener("click", () => {
    if (add_link.value === "") {
      return;
    } else {
      get_shorter_link();
    }
  });
});

// Mobile navigation
const mob_nav = document.querySelector(".mobile-navigation");
const menu_icon = document.getElementById("menu-icon");
const close_icon = document.getElementById("close-icon");
const overlay = document.querySelector(".overlay");
menu_icon.addEventListener("click", () => {
  mob_nav.style.transform = "translateY(60%)";
  menu_icon.style.display = "none";
  overlay.classList.remove("hidden");
  close_icon.style.display = "block";
});

close_icon.addEventListener("click", () => {
  mob_nav.style.transform = "translateY(-100%)";
  menu_icon.style.display = "block";
  close_icon.style.display = "none";
  overlay.classList.add("hidden");
  console.log("object");
});
