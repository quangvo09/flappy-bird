<template>
  <div id="bird" class="sprite bird" v-bind:class="{ 'flying': isFlying, 'dropping': isDropping, 'playing': isPlaying }" v-bind:style="[style]"></div>
</template>

<script>
export default {
  props: [
    'isPlaying'
  ],
  computed: {
    top () {
      return this.$store.state.bird.top;
    },
    style () {
      return {
        top: `calc(50% - 17px/2 - ${this.top}px)`
      }
    },
    isFlying () {
      return this.$store.state.bird.state === 'flying';
    },
    isDropping () {
      return this.$store.state.bird.state === 'dropping';
    }
  },
  mounted() {
    this.$store.commit('bird/size', { width: 17, height: 12 });

    const birdElem = document.getElementById('bird');
    const bound = birdElem.getBoundingClientRect();
    this.$store.commit('bird/setBound', bound);
  },
}
</script>

<style lang="scss" scoped>
  .bird {
    position: absolute;
    background: url('~assets/images/sprites.png') no-repeat -3px -491px;
    width: 17px;
    height: 12px;
    left: calc(30% - 17px/2);
    top: calc(50% - 12px/2);

    &.playing {
      animation: bird-play 0.8s steps(3) infinite;
    }

    // transform: rotate(-20deg);
    // border: 1px solid red;

    &.flying {
      animation: bird-flying 0.3s linear, bird-play 0.8s steps(3) infinite;
      transform: rotate(-20deg);
    }

    &.dropping {
      animation: bird-dropping 0.3s linear, bird-play 0.8s steps(3) infinite;;
      transform: rotate(60deg);
    }

    &:not(.playing) {
      animation: none;
    }
  }

  @keyframes bird-play {
    from { background-position: -3px -491px }
    to { background-position: -87px -491px; }
  }

  @keyframes bird-flying { 100% { transform: rotate(-20deg); } }
  @keyframes bird-dropping { 
    0% { transform: rotate(-30deg); } 
    100% { transform: rotate(60deg); } 
  }

</style>