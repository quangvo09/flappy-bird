import { GameSettings } from '../config/constant';

export const state = () => ({
  state: 'normal',
  width: 0,
  height: 0,
  top: 0,
  left: 0,
  bound: null,
  flyDelta: GameSettings.BIRD_FlY_DELTA,
  flyDelta2: GameSettings.BIRD_FlY_DELTA2,
  dropDelta: GameSettings.BIRD_DROP_DELTA,
  dropDelta2: GameSettings.BIRD_DROP_DELTA2
})

export const mutations = {
  size(state, { width, height }) {
    state.width = width;
    state.height = height;
  },

  fly(state) {
    if (state.state === 'dropping') {
      state.top+= 1.2 * GameSettings.BIRD_FlY_DELTA;
    } else {
      state.top+= GameSettings.BIRD_FlY_DELTA;
    }
    state.state = 'flying';
    state.flyDelta += state.flyDelta2;
    state.dropDelta = GameSettings.BIRD_DROP_DELTA;
    state.dropDelta2 = GameSettings.BIRD_DROP_DELTA2;
  },

  drop(state) {
    state.state = 'dropping';
    state.top-= state.dropDelta;
    state.dropDelta += state.dropDelta2;
    state.dropDelta2 -= GameSettings.BIRD_DROP_DELTA3;
    state.flyDelta = GameSettings.BIRD_FlY_DELTA;
    state.flyDelta2 = GameSettings.BIRD_FlY_DELTA2;
  },

  setBound(state, bound) {
    state.bound = bound;
  },

  reset(state) {
    state.state = 'normal';
    state.top = 0;
    state.left = 0;
    state.flyDelta = GameSettings.BIRD_FlY_DELTA;
    state.flyDelta2 = GameSettings.BIRD_FlY_DELTA2;
    state.dropDelta = GameSettings.BIRD_DROP_DELTA;
    state.dropDelta2 =  GameSettings.BIRD_DROP_DELTA2;
  }
}
