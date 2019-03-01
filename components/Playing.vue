<template>
  <div class="scene-playing" v-on:click="tap">
    <score />
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
import Score from './sprites/Score'

export default {
  data : function(){  
    return {
      intervalId: -1,
      pipeSpeed: GameSettings.PIPE_SPEED,

      pipeTop: 0,
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
    'score': Score
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

      if (this.isPlaying) {
        this.pipeStep+= this.pipeSpeed;
        this.pipeSpeed += GameSettings.PIPE_SPEED_DELTA;
        if (this.pipeStep >= (144+26)) {
          this.pipeStep = 0;
          this.pipeTop = this.makePipeTop();
          this.$store.commit('pipe/toggleLine', false);
        }
      }
      
      // Check bird intersect with ground
      const gBound = this.$store.state.ground.bound;
      const bBound = this.$store.state.bird.bound;
      const birdTop = this.$store.state.bird.top;
      if (Utils.intersects(
        gBound.left, gBound.top, gBound.width, gBound.height,
        bBound.left, bBound.top - birdTop, bBound.width, bBound.height, false
      )) {
        return this.dead(true);
      }
      
      const upElem = document.getElementById('pipe-up');
      const downElem = document.getElementById('pipe-down');
      const lineElem = document.getElementById('pipe-line');
      const uBound = upElem.getBoundingClientRect();
      const dBound = downElem.getBoundingClientRect();
      const lBound = lineElem.getBoundingClientRect();

      const { pipeUpBound } = this.$store.state.pipe;
      if (pipeUpBound && Utils.intersects(
        uBound.left, uBound.top, uBound.width, uBound.height,
        bBound.left, bBound.top - birdTop, bBound.width, bBound.height
      )) {
        return this.dead();
      }

      if (Utils.intersects(
        dBound.left, dBound.top, dBound.width, dBound.height,
        bBound.left, bBound.top - birdTop, bBound.width, bBound.height
      )) {
        return this.dead();
      }
      
      if (Utils.intersects(
        lBound.left, lBound.top, lBound.width, lBound.height,
        bBound.left, bBound.top - birdTop, bBound.width, bBound.height
      )) {
        this.gainPoint();
      }

      // this.pipeStep2++;
      // if (this.pipeStep2 >= 160) {
      //   this.pipeStep2 = -GameSettings.PIPE_DISTANCE;
      //   this.pipeTop2 = this.makePipeTop();
      // }
    },

    dead(force) {
      if (this.isPlaying) {
        this.hitAudio && this.hitAudio.play();
      }

      if (force) {
        clearInterval(this.intervalId)
      }

      this.$store.commit('dead');
    },

    gainPoint() {
      if (!this.$store.state.pipe.lineDisable && this.isPlaying) {
        this.$store.commit('gainPoint');
        this.$store.commit('pipe/toggleLine', true);
        this.pointAudio && this.pointAudio.play();
      }
    }

  },
  mounted: function() {
    this.intervalId = setInterval(this.gameLoop, 1000/60);
    this.flyAudio = document.getElementById('flyAudio');
    this.deadAudio = document.getElementById('deadAudio');
    this.hitAudio = document.getElementById('hitAudio');
    this.wingAudio = document.getElementById('wingAudio');
    this.pointAudio = document.getElementById('pointAudio');
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

  #dummy {
    top:0;
    left: 0;
    width: 10px;
    height: 10px;
    position: fixed;
    z-index: 10;
    border-color: green;
  }
</style>