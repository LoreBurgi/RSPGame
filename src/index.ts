import "./components/text";
import "./components/button";
import "./components/hands";
import "./components/countdown";
import "./components/star";
import { initRouter } from "./router";
import { state } from "./state";

(function main() {
  state.getData();
  const rootEl = document.querySelector(".root");
  initRouter(rootEl);
})();
