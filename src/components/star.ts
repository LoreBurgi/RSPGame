const ganaste = require("url:../media/ganaste.svg");
const perdiste = require("url:../media/perdiste.svg");
const empataste = require("url:../media/empataste.svg");

class StarComp extends HTMLElement {
  shadow: ShadowRoot;
  tag: string;
  imgURL: string;
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
    this.tag = this.getAttribute("tag");
  }

  connectedCallback() {
    this.selectImage();
    this.render();
  }
  selectImage() {
    this.tag == "Ganaste"
      ? (this.imgURL = ganaste)
      : this.tag == "Perdiste"
      ? (this.imgURL = perdiste)
      : (this.imgURL = empataste);
  }
  render() {
    const rootEl = document.createElement("div");
    rootEl.className = "root";
    rootEl.innerHTML = `
      <img class="star" src="${this.imgURL}" >
      `;
    const style = document.createElement("style");
    style.innerHTML = `
      .root{
        width:80px;
        height:175px;
        position:relative;
      }
      .star{
        width:260px;
        height:260px;
      }
      `;
    this.shadow.appendChild(style);
    this.shadow.appendChild(rootEl);
  }
}

customElements.define("star-el", StarComp);
