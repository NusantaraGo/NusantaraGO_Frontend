// bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // termasuk Popper.js

// bootstrap icon
import "bootstrap-icons/font/bootstrap-icons.css";

// icon fontawesome
import "@fortawesome/fontawesome-free/css/all.min.css";

// CSS imports
import "../styles/styles.css";

// pagination
import "paginationjs/dist/pagination.css";

//app
import App from "./pages/app";

// check auth dan ubah jadi logout
import { checkUserAuth, updateNavbarUI, logoutUser } from "./utils/auth";

document.addEventListener("DOMContentLoaded", async () => {
  const app = new App({
    content: document.querySelector("#main-content"),
  });
  await app.renderPage();

  console.log("jalan");

  // Update navbar UI on initial load
  const userData = await checkUserAuth();
  updateNavbarUI(userData);

  // Add event listener for logout button
  const logoutButton = document.getElementById("logout-button");
  if (logoutButton) {
    logoutButton.addEventListener("click", async () => {
      await logoutUser();
    });
  }

  // ⏪ Tangani tombol back/forward
  window.addEventListener("popstate", async () => {
    console.log("jalan");
    await app.renderPage();
    // Update navbar UI on hash change
    const newUserData = await checkUserAuth();
    updateNavbarUI(newUserData);
  });

  // ⛓️ Tangani klik semua link internal
  document.addEventListener("click", async (e) => {
    console.log(e);

    const link = e.target.closest("a");
    console.log("link apa ini", link);
    console.log(
      link &&
        link.origin === location.origin &&
        !link.hasAttribute("data-external") &&
        link.getAttribute("href") &&
        !link.getAttribute("href").startsWith("http") &&
        !link.getAttribute("href").startsWith("mailto:")
    );
    if (
      link &&
      link.origin === location.origin &&
      !link.hasAttribute("data-external") &&
      link.getAttribute("href") &&
      !link.getAttribute("href").startsWith("http") &&
      !link.getAttribute("href").startsWith("mailto:")
    ) {
      e.preventDefault();

      await app.renderPage();

      const href = link.getAttribute("href");
      history.pushState({}, "", href);
      await app.renderPage();

      const userData = await checkUserAuth();
      updateNavbarUI(userData);
    }
  });
});
