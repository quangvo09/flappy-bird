const GAME_STATES = {
  INTRO: 0,
  PLAYING: 1,
  DEAD: 2,
  PREPARE: 4
}

export const state = () => ({
  gameState: GAME_STATES.INTRO,
  score: 0
})

export const mutations = {
  play(state) {
    state.gameState = GAME_STATES.PLAYING
  },

  dead(state) {
    state.gameState = GAME_STATES.DEAD
  },

  gainPoint(state) {
    state.score++;
  },

  restart(state) {
    state.gameState = GAME_STATES.PREPARE;
    state.score = 0;
  }
}
