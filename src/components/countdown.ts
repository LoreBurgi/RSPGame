class Countdown extends HTMLElement {
  shadow: ShadowRoot;
  iniciarCuentaAtras: number;
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
    this.iniciarCuentaAtras = parseInt(this.getAttribute("count"), 10);
  }
  connectedCallback() {
    this.render();
  }
  render() {
    const container = document.createElement("div");
    container.className = "container";
    container.innerHTML = `
      <p class="number">${this.iniciarCuentaAtras}</p>
      `;

    let p = container.querySelector(".number");
    let counter = this.iniciarCuentaAtras;
    const intervalo = setInterval(() => {
      counter--;
      p.textContent = counter.toString();
      if (counter < 0) {
        clearInterval(intervalo);
        container.style.display = "none";
      }
    }, 1000);

    const style = document.createElement("style");
    style.innerHTML = `
      .container{
          width:245px;
          height:245px;
          border:23px solid black;
          border-radius:50%;
          display:flex;
          flex-direction:column;
          align-items:center;
          justify-content:center;
      }
      .number{
          font-size:100px;
          margin:0px;
      }
          `;
    this.shadow.appendChild(style);
    this.shadow.appendChild(container);
  }
}
customElements.define("custom-countdown", Countdown);
