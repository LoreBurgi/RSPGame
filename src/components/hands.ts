const stone = require("url:../media/piedra.svg");
const paper = require("url:../media/papel.svg");
const scissors = require("url:../media/tijera.svg");

class HandsComp extends HTMLElement {
  shadow: ShadowRoot;
  tag: string;
  imgURL: string;
  myPlay: string;
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
    this.tag = this.getAttribute("tag");
    this.myPlay = this.tag;
  }

  connectedCallback() {
    this.HandsElection();
    this.render();
  }

  HandsElection() {
    this.tag == "piedra"
      ? (this.imgURL = stone)
      : this.tag == "papel"
      ? (this.imgURL = paper)
      : this.tag == "tijera"
      ? (this.imgURL = scissors)
      : "";
    //Como usar el "? :" condicional (es como un IF)
    //Test ? expr1 : expr2
    //Test − refers to the conditional expression
    //expr1 − value returned if the condition is true
    //expr2 − value returned if the condition is false
  }

  listeners() {
    const hand = this.shadow.querySelector(`.${this.tag}`);
    hand.addEventListener("click", (e: any) => {
      const event = new CustomEvent("change", {
        detail: { myPlay: this.myPlay },
      });
      this.dispatchEvent(event);
    });
  }

  render() {
    const rootEl = document.createElement("div");
    rootEl.className = "root";

    rootEl.innerHTML = `
    <img class="${this.tag}" src="${this.imgURL}">
    `;
    const style = document.createElement("style");
    const width = this.getAttribute("width") || "60px";
    const height = this.getAttribute("height") || "130px";
    style.innerHTML = `
    .root{
      width:${width};
      height:${height};
      display:flex;
     justify-content:center;
    };
    .piedra,.papel,.tijera{
      width:${width};
      height:${height}; 
    }
    `;
    this.shadow.appendChild(style);
    this.shadow.appendChild(rootEl);
    this.listeners();
  }
}

customElements.define("hands-el", HandsComp);
