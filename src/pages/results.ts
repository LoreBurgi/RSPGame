import { state } from "../state";
export function initResultsPage(params) {
  function resultGame() {
    const currentState = state.getState();
    const myPlay = currentState.currentGame.myPlay;
    const computerPlay = currentState.currentGame.computerPlay;
    console.log(myPlay, computerPlay);
    return state.whoWins(myPlay, computerPlay);
  }

  function selectBackGround() {
    const result = resultGame();
    console.log(result);
    let background = "";
    result == "Ganaste"
      ? (background = "rgba(136, 137, 73, 0.7);")
      : result == "Perdiste"
      ? (background = "rgba(137, 73, 73, 0.7);")
      : (background = "rgba(194, 194, 194, 0.7)");
    return background;
  }

  const background = selectBackGround();

  const result = resultGame();
  const myScore = state.getScore().counterUser;
  const computerScore = state.getScore().counterBot;

  const resultsPage = document.createElement("section");
  resultsPage.className = "results";
  resultsPage.innerHTML = `
  <div class="results__container">
    <div class="results__container-star">
    <star-el tag="${result}"></star-el>
    </div>
    <div class="results__container-score">
        <div class="results__container-title">
            <custom-text size="57px">Puntajes</custom-text>
        </div>
        <div class="results__container-results">
            <custom-text size="42px">Vos: ${myScore}</custom-text>
              <custom-text size="42px">Máquina:${computerScore}</custom-text>
        </div>
    </div>
    <div class="results__container-button">
        <custom-button class="button">Volver a jugar</custom-button>
    </div>
  </div>
  `;
  const style = document.createElement("style");
  style.innerHTML = `
    .results__container{
        width:100%;
        height:100vh;
        padding:35px 20px;
        background-color: ${background};
        display:flex;
        flex-direction:column;
        align-items:center;
    }
    .results__container-star{
        width:255px;
        height:260px;
        margin-bottom:10px;
    }
    .results__container-score{
      margin-top:20px;
      width:322px;
      height:220px;
      display:flex;
      flex-direction:column;
      align-items:center;
      justify-content:space-around;
      margin-bottom:20px;
      border:8px solid #000;
      border-radius:15px;
      background-color: #F1F1F1;
    }
    .results__container-results{
      display: flex;
      flex-direction: column;
      align-items: flex-end;
    }
  
    .results__container-button{
      width:322px;
      height:87px;
      margin-top:30px;
    }
  `;
  resultsPage.appendChild(style);
  const btn = resultsPage.querySelector(".button");
  btn.addEventListener("click", () => {
    params.goTo("/rules");
  });

  return resultsPage;
}
