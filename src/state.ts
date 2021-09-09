type jugada = "piedra" | "papel" | "tijera";

const state = {
  data: {
    currentGame: {
      computerPlay: "",
      myPlay: "",
    },
    history: [],
  },
  listeners: [],

  setComputerMove(move: jugada) {
    const currentState = this.getState();
    currentState.currentGame.computerPlay = move;
  },

  setUserMove(move: jugada) {
    const currentState = this.getState();
    currentState.currentGame.myPlay = move;
    this.pushToHistory(currentState);
  },
  whoWins(myPlay: jugada, computerPlay: jugada) {
    const ganeTijeras: boolean = myPlay == "tijera" && computerPlay == "papel";
    const perdiTijeras: boolean =
      myPlay == "tijera" && computerPlay == "piedra";
    const ganePiedra: boolean = myPlay == "piedra" && computerPlay == "tijera";
    const perdiPiedra: boolean = myPlay == "piedra" && computerPlay == "papel";
    const ganePapel: boolean = myPlay == "papel" && computerPlay == "piedra";
    const perdiPapel: boolean = myPlay == "papel" && computerPlay == "tijera";
    const gane = [ganePapel, ganePiedra, ganeTijeras].includes(true);
    const perdi = [perdiPapel, perdiPiedra, perdiTijeras].includes(true);

    if (gane == true) {
      return "Ganaste";
    } else if (perdi == true) {
      return "Perdiste";
    } else {
      return "Empate";
    }
  },

  pushToHistory(currentState) {
    const myPlay = currentState.currentGame.myPlay;
    const computerGame = currentState.currentGame.computerPlay;
    currentState.history.push({
      myPlay: myPlay,
      computerPlay: computerGame,
    });
    this.setState(currentState);
  },

  resetMyPlay() {
    const currentState = this.getState();
    currentState.currentGame.myPlay = "";
  },

  getData() {
    const localData = localStorage.getItem("save-move");
    const localDataParse = JSON.parse(localData);
    if (localDataParse == null) {
      const currentState = this.getState();
      this.setState(currentState);
    } else {
      this.setState(localDataParse);
    }
  },

  getScore() {
    const currentState = state.getState().history;
    let counterUser = 0;
    let counterBot = 0;
    currentState.forEach((e) => {
      const result = state.whoWins(e.myPlay, e.computerPlay);
      if (result == "Ganaste") {
        counterUser += 1;
      }
      if (result == "Perdiste") {
        counterBot += 1;
      }
    });
    const score = { counterUser, counterBot };
    return score;
  },

  getState() {
    return this.data;
  },

  setState(newState) {
    this.data = newState;
    for (const cb of this.listeners) {
      cb(newState);
    }
    localStorage.setItem("save-move", JSON.stringify(newState));
  },

  subscribe(callback: (any) => any) {
    this.listeners.push(callback);
  },
};

export { state };
