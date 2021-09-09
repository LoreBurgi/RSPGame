export function initRulesPage(params) {
  const rulesPage = document.createElement("section");
  rulesPage.className = "rules";
  rulesPage.innerHTML = `
      <div class="rules__container">
          <div class="rules__container-text">
              <custom-text tag="h3" size="46px">
              Presioná jugar y elegí: piedra, papel o tijera antes de que pasen los 3 segundos.
              </custom-text>
          </div>
          <div class="rules__container-boton">
              <custom-button class="button">¡Jugar!</custom-button>
          </div>
          <div class="rules__container-hands">
              <hands-el tag="tijera" ></hands-el>
              <hands-el tag="piedra" ></hands-el>
              <hands-el tag="papel" ></hands-el>
          </div>
      </div>
      `;
  const style = document.createElement("style");
  style.innerHTML = `
    .rules__container{
      width:100%;
      height:100vh;
      display:flex;
      flex-direction:column;
      align-items:center;
      justify-content:space-between;
      padding:120px 26px 0px 26px;
    }
    .rules__container-text{
      width:300px;
      height:250px;
      text-align:center;
    }
    .rules__container-boton{
      width:322px;
      height:87px;
    }
    .rules__container-hands{
      width:280px;
      height:130px;
      display:flex;
      justify-content:space-between;
      align-content:center;
    }
    `;
  rulesPage.appendChild(style);
  const button = rulesPage.querySelector(".button");
  button.addEventListener("click", () => {
    params.goTo("/game");
  });

  return rulesPage;
}
