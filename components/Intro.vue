<template>
  <div>
    <div class="ready"></div>
    <div class="intro" v-on:click="play"></div>
  </div>
</template>

<script>
export default {
  methods: {
    play: function () {
      this.$store.commit('play')
    }
  },
}
</script>

<style lang="scss">
  .ready {
    position: absolute;
    background: url('~assets/images/sprites.png') no-repeat -295px -59px;
    width: 92px;
    height: 25px;
    top: calc(25% - 25px/2);
    left: calc(50% - 92px/2);
  }
  .intro {
    position: absolute;
    background: url('~assets/images/sprites.png') no-repeat -292px -91px;
    width: 57px;
    height: 49px;
    top: calc(50% - 49px/2);
    left: calc(50% - 57px/2);
  }
</style>