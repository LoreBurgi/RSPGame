import { state } from "../state";
export function initGamePage(params) {
  const gamePage = document.createElement("section");
  gamePage.className = "game";
  gamePage.innerHTML = `
  <div class="game__container">
    <div class="game__computer-container"></div>
    <div class="game__countdown-container">
      <custom-countdown count="3"></custom-countdown>
    </div>
    <div class="game__hands-container">
      <hands-el class="opacidad-manos" tag="tijera" width="130px" height="220px"></hands-el>
      <hands-el class="opacidad-manos" tag="piedra" width="130px" height="220px"></hands-el>
      <hands-el class="opacidad-manos" tag="papel" width="130px" height="220px"></hands-el>
    </div>
  </div>
  `;
  const style = document.createElement("style");
  style.innerHTML = `
  .game{
    max-width:414px;
    height:100vh;
    display:flex;
    justify-content:center;
  }
  @media(min-width:450px){
    .game{
      max-width:100%;
      
    }
  }
  .game__container{
    width:414px;
    height:100%;
    display:flex;
    flex-direction:column;
    align-items:center;
    position:relative;
  }
  .game__container--noselection{
    justify-content:space-around;
  }
  .game__countdown-container{
    margin-top:50px;
  }
  .game__hands-container{
    width:200px;
    height:200px;
    display:flex;
    align-items:center;
    justify-content:space-around;
    position:absolute;
    bottom:0px;
  }

  @media(min-width:450px){
    .game__hands-container{
     width:600px;
    }
  }

  .opacidad-manos{
    opacity:0.6;
  }
  .move{
    transform:translateY(0px) scaleY(1.3);
    opacity:1;
  }
  .animacion{
    transform: translateY(-20px) translateX(-30px) scaleY(1.3);
    position:absolute;
    bottom:0px;
    left:150px; 
  }  
  .game__computer-container{
    width:414px;
    position:absolute;
    top:0;
  }
  .computer-hand{
    transform:rotateX(180deg) scaleY(1.3) translateY(-20px) translateX(-30px);
    position:absolute;
    left:30px; 
  }
  @media(min-width:450px){
    .computer-hand{
        transform:rotateX(180deg) scaleY(1.3) translateY(-20px) translateX(-100px);
    }
    .animacion{
        transform: translateY(-20px) translateX(100px) scaleY(1.3);
    }
  }
  .game__container-returntitle{
    max-width:300px;
  }
  `;
  gamePage.appendChild(style);

  (function moveSelection() {
    const handsContainer = gamePage.querySelector(".game__hands-container");
    const handsElements = gamePage.querySelectorAll("hands-el");
    for (const hand of handsElements) {
      hand.addEventListener("change", (e: any) => {
        computerMove();
        state.setUserMove(e.detail.myPlay);
        hand.classList.add("move");
        setTimeout(() => {
          handsContainer.innerHTML = `
          <hands-el class="animacion" tag="${e.detail.myPlay}" width="200px" height="200px"></hands-el>
          `;
          goToResults();
        }, 3500);
      });
      state.resetMyPlay();
    }
  })();

  function computerMove() {
    const computerMove = Math.floor(Math.random() * (3 - 0) + 0);
    const computerContainer = gamePage.querySelector(
      ".game__computer-container"
    );
    if (computerMove == 0) {
      state.setComputerMove("papel");
      setTimeout(() => {
        computerContainer.innerHTML = `
        <hands-el class="computer-hand" tag="papel" width="200px" height="200px"></hands-el>
        `;
      }, 3500);
    }
    if (computerMove == 1) {
      state.setComputerMove("tijera");
      setTimeout(() => {
        computerContainer.innerHTML = `
          <hands-el class="computer-hand" tag="tijera" width="200px" height="200px"></hands-el>
          `;
      }, 3500);
    }
    if (computerMove == 2) {
      state.setComputerMove("piedra");
      setTimeout(() => {
        computerContainer.innerHTML = `
          <hands-el class="computer-hand" tag="piedra" width="200px" height="200px"></hands-el>
          `;
      }, 3500);
    }
  }

  function goToResults() {
    setTimeout(() => {
      params.goTo("/results");
    }, 1500);
  }

  (function returnRules() {
    setTimeout(() => {
      const currentState = state.getState();
      const myPlay = currentState.currentGame.myPlay;
      const gameContainer = gamePage.querySelector(".game__container");
      if (myPlay == "") {
        gameContainer.classList.add("game__container--noselection");
        gameContainer.innerHTML = `
        <div class="game__container-returntitle">
            <custom-text class="text" tag="h1" size="70px">Vuelva al inicio y seleccione una opción</custom-text>
        </div>
            <custom-button class="button">Volver a intentar</custom-button>
        `;
        const boton = gameContainer.querySelector(".button");
        const text = gameContainer.querySelector(".text").shadowRoot;
        const el: any = text.querySelector(".title");
        el.style.textAlign = "center";
        boton.addEventListener("click", () => {
          params.goTo("/rules");
        });
      }
    }, 4000);
  })();

  return gamePage;
}
