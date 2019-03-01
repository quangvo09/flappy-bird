<template>
  <div class="playing" v-on:click="tap">
    <ground />
    <bird />
    <pipe v-bind:top="pipeTop" v-bind:step="pipeStep" />
    <audio id="flyAudio" src="/sounds/sfx_swooshing.wav"></audio>
  </div>
</template>

<script>
import { GameSettings } from '../config/constant.js'

import Bird from './sprites/Bird'
import Ground from './sprites/Ground'
import Pipe from './sprites/Pipe'

export default {
  data : function(){  
    return {
      intervalId: -1,
      pipeSpeed: GameSettings.PIPE_SPEED,

      pipeTop: this.makePipeTop(),
      pipeStep: 0,
      pipeTop2: this.makePipeTop(),
      pipeStep2: -GameSettings.PIPE_DISTANCE
    }
  },
  components: {
    'bird': Bird,
    'ground': Ground,
    'pipe': Pipe,
  },
  methods: {
    tap: function() {
      this.$store.commit('bird/fly');
      setTimeout(() => {
        if (this.$store.state.bird.state === 'flying') {
          this.$store.commit('bird/drop');
        }
      }, 300);

      // this.flyAudio && this.flyAudio.play();
    },

    random(min,max){
      return Math.floor(Math.random()*(max-min+1)+min );
    },

    makePipeTop() {
      return this.random(-30, 40);
    },

    gameLoop() {
      const store = this.$store;
      if (store.state.bird.state === 'dropping') {
        store.commit('bird/drop');
      }

      this.pipeStep+= this.pipeSpeed;
      this.pipeSpeed += GameSettings.PIPE_SPEED_DELTA;
      if (this.pipeStep >= (144+26)) {
        this.pipeStep = 0;
        this.pipeTop = this.makePipeTop();
      }
      
      // this.pipeStep2++;
      // if (this.pipeStep2 >= 160) {
      //   this.pipeStep2 = -GameSettings.PIPE_DISTANCE;
      //   this.pipeTop2 = this.makePipeTop();
      // }
    }
  },
  mounted: function() {
    this.intervalId = setInterval(this.gameLoop, 1000/60);
    this.flyAudio = document.getElementById('flyAudio');
  },
  beforeDestroy () {
    clearInterval(this.intervalId)
  },
}
</script>

<style lang="scss">
  .playing {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
  }
</style>