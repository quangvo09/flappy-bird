<template>
  <div class="menu">
    <div class="restart" @click="restart"></div>
  </div>
</template>

<script>
export default {
  methods: {
    restart() {
      this.$store.commit('restart');
      this.$store.commit('bird/reset');
      this.$store.commit('pipe/reset');

      setTimeout(() => this.$store.commit('play'), 0)
    }
  },
}
</script>

<style lang="scss" scoped>
  .menu {
  }

  .score {
    background: url('~assets/images/sprites.png') no-repeat -3px -259px;
    width: 113px;
    height: 57px;
  }

  .restart {
    background: url('~assets/images/sprites.png') no-repeat -354px -118px;
    width: 52px;
    height: 29px;
    position: absolute;
    left: calc(50% - 52px/2);
    top: calc(50% - 29px/2);
    z-index: 99;
  }
</style>