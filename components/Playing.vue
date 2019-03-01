<template>
  <div class="scene-playing" v-on:click="tap">
    <ground :isRunning="isPlaying" />
    <bird :isPlaying="isPlaying" />
    <pipe :top="pipeTop" :step="pipeStep" />
    <audio id="flyAudio" src="/sounds/sfx_swooshing.wav"></audio>
    <audio id="wingAudio" src="/sounds/sfx_wing.wav"></audio>
    <audio id="deadAudio" src="/sounds/sfx_die.wav"></audio>
    <audio id="hitAudio" src="/sounds/sfx_hit.wav"></audio>
    <audio id="pointAudio" src="/sounds/sfx_point.wav"></audio>
  </div>
</template>

<script>
import { GameSettings } from '../config/constant.js'
import Utils from '../utils/utils.js';

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
  computed: {
    isPlaying: function () {
      return this.$store.state.gameState === 1;
    }
  },
  components: {
    'bird': Bird,
    'ground': Ground,
    'pipe': Pipe,
  },
  methods: {
    tap: function() {
      if (this.$store.state.gameState !== 1) return;
      
      this.$store.commit('bird/fly');
      setTimeout(() => {
        if (this.$store.state.bird.state === 'flying') {
          this.$store.commit('bird/drop');
        }
      }, 300);

      this.wingAudio && this.wingAudio.play();
    },

    makePipeTop() {
      return Utils.random(-30, 40);
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
      

      // Check bird intersect with ground
      const gBound = this.$store.state.ground.bound;
      const bBound = this.$store.state.bird.bound;
      const birdTop = this.$store.state.bird.top;
      if (Utils.intersects(
        gBound.top, gBound.left, gBound.width, gBound.height,
        bBound.top - birdTop, bBound.left, bBound.width, bBound.height,
      )) {
        this.dead();
      }

      // this.pipeStep2++;
      // if (this.pipeStep2 >= 160) {
      //   this.pipeStep2 = -GameSettings.PIPE_DISTANCE;
      //   this.pipeTop2 = this.makePipeTop();
      // }
    },

    dead() {
      this.hitAudio && this.hitAudio.play();
      this.$store.commit('dead');
      clearInterval(this.intervalId)
    }

  },
  mounted: function() {
    this.intervalId = setInterval(this.gameLoop, 1000/60);
    this.flyAudio = document.getElementById('flyAudio');
    this.deadAudio = document.getElementById('deadAudio');
    this.hitAudio = document.getElementById('hitAudio');
    this.wingAudio = document.getElementById('wingAudio');
  },
  beforeDestroy () {
    clearInterval(this.intervalId)
  },
}
</script>

<style lang="scss">
  .scene-playing {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
  }
</style>