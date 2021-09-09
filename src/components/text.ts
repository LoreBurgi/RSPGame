class CustomText extends HTMLElement {
  shadow: ShadowRoot;
  //Defino una propiedad que va a contener las posibles etiquetas que me puden pasar.
  tags: string[] = ["h1", "h3", "p"];
  tag: string = "p";
  type: string = "body";
  fontSize: string = "18px";
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
  }
  connectedCallback() {
    this.defineStyle();
    this.render();
  }
  defineStyle() {
    /*De acuerdo al parametro que me pasen dentro del atributo "tag",
    voy a seleccionar desde una lista predefinida un tipo de etiqueta
    y se lo voy a asignar al elemento a crear*/

    /*Si lo que me pasan en el atributo "tag" como parámetro esta dentro de mi collection de etiquetas,
    le asigno a la propiedad "tag" esa etiqueta si no recibo nada por defecto la etiqueta siempre va a
    ser "p" (valor por defecto cuando cree la propiedad)*/

    if (this.tags.includes(this.getAttribute("tag"))) {
      this.tag = this.getAttribute("tag");
    }
    this.tag.includes("h1")
      ? (this.type = "title")
      : this.tag.includes("h3")
      ? (this.type = "text-bold")
      : this.type;
  }

  render() {
    //Se crea en el shadow la etiqueta HTML en base a lo que recibo en la propiedad tag
    const typeTag = document.createElement(this.tag);
    this.fontSize = this.getAttribute("size");
    const style = document.createElement("style");
    style.innerHTML = `
        .title{
          font-size:${this.fontSize};
          font-weight:700;
          line-height: 85px;
          color:#009048;
          text-align:center;
      }
        .text-bold{
          font-size:${this.fontSize};
          font-weight:500;
          line-height: 50px;
      }
        .body{
          font-size:${this.fontSize};
      }
        .title, .text-bold, .body{
          margin:0;
      }
        `;
    typeTag.textContent = this.textContent;
    /* Le defino como clase el tipo de type que defino de acuerdo al tipo de etiqueta recibida
        mediante el atributo "tag"*/
    typeTag.className = this.type;
    this.shadow.appendChild(style);
    this.shadow.appendChild(typeTag);
  }
}
customElements.define("custom-text", CustomText);
