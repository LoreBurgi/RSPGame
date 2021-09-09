import { initWelcomePage } from "./pages/welcome";
import { initRulesPage } from "./pages/rules";
import { initGamePage } from "./pages/game";
import { initResultsPage } from "./pages/results";

const routes = [
  {
    path: /\/RSPGame/,
    route: initWelcomePage,
  },
  {
    path: /\/welcome/,
    route: initWelcomePage,
  },
  {
    path: /\/rules/,
    route: initRulesPage,
  },
  {
    path: /\/game/,
    route: initGamePage,
  },
  {
    path: /\/results/,
    route: initResultsPage,
  },
];

export function initRouter(container: Element) {
  function goTo(path) {
    history.pushState({}, "", path);
    handleRoute(path);
  }

  function handleRoute(route) {
    console.log("El handleRoute recibio una ruta que es: ", route);

    for (const r of routes) {
      if (r.path.test(route)) {
        const el = r.route({ goTo: goTo });
        if (container.firstChild) {
          container.firstChild.remove();
        }
        container.appendChild(el);
      }
    }
  }

  if (location.pathname == "/RSPGame") {
    goTo("/welcome");
  } else {
    handleRoute(location.pathname);
  }
  window.onpopstate = function () {
    handleRoute(location.pathname);
  };
}
