const GAME_STATES = {
  INTRO: 0,
  PLAYING: 1,
  DEAD: 2
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
  }
}
