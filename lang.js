// Shows the English or Swahili version of the page. The choice comes from
// ?lang=sw / ?lang=en, then a remembered choice, then the browser language.
(function () {
  function stored() {
    try { return localStorage.getItem("lang"); } catch (e) { return null; }
  }
  function remember(lang) {
    try { localStorage.setItem("lang", lang); } catch (e) {}
  }

  var param = new URLSearchParams(location.search).get("lang");
  var lang =
    param === "sw" || param === "en"
      ? param
      : stored() ||
        ((navigator.language || "").toLowerCase().startsWith("sw") ? "sw" : "en");

  function apply(next) {
    lang = next;
    document.documentElement.lang = next;
    document.querySelectorAll("[data-lang]").forEach(function (el) {
      el.hidden = el.getAttribute("data-lang") !== next;
    });
    document.querySelectorAll(".lang button").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.value === next));
    });
    var title = document.querySelector("[data-lang='" + next + "'] h1");
    if (title) document.title = title.textContent;
  }

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".lang button").forEach(function (b) {
      b.addEventListener("click", function () {
        remember(b.value);
        apply(b.value);
      });
    });
    apply(lang);
  });
})();
