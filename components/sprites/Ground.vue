<template>
  <div id="ground" class="sprite ground" :class="{ 'running': isRunning }"></div>
</template>

<script>
export default {
  props: [
    'isRunning'
  ],
  mounted() {
    const groundElem = document.getElementById('ground');
    const bound = groundElem.getBoundingClientRect();

    this.$store.commit('ground/setBound', bound);
  },
}
</script>

<style lang="scss">
  .ground {
    position: absolute;
    bottom: 0;
    background: url('~assets/images/sprites.png') no-repeat -292px 0;
    backround-repeat: repeat-x;
    width: 168px;
    height: 56px;

    &.running {
      animation: ground-play 1s linear infinite;
    }
  }

  @keyframes ground-play {
    to { background-position: -292px 0; }
    to { background-position: -315px 0; }
  }
</style>