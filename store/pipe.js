export const state = () => ({
  top: 0,
  left: 0,
  pipeUpBound: null,
  pipeDownBound: null,
  lineBound: null,
  lineDisable: false
})

export const mutations = {
  toggleLine(state, disabled) {
    state.lineDisable = disabled;
  },

  setBound(state, { uBound, dBound, lBound }) {
    state.pipeUpBound = uBound;
    state.pipeDownBound = dBound;
    state.lineBound = lBound;

    console.log(state)
  },

  setPosition(state, top, left) {
    state.top = top;
    state.left = left;
  },

  reset(state) {
    state.top = 0
    state.left = 0
    state.pipeUpBound =  null
    state.pipeDownBound = null
    state.lineBound = null
    state.lineDisable = false 
  }
}