<template>
  <div class="pipe-container">
      <div class="sprite pipe down" :style="[downStyle]"></div>
      <div class="sprite pipe up" :style="[upStyle]"></div>
      <div class="sprite line" :style="[lineStyle]"></div>
  </div>
</template>

<script>
export default {
  props: [
    'top',
    'step'
  ],
  data: function() {
    return {
      width: 26
    }
  },
  computed: {
    upStyle () {
      return {
        top: `calc(50% + 30px - ${this.$props.top}px)`,
        right: `${this.$props.step-this.width}px`
      }
    },
    downStyle () {
      return {
        bottom: `calc(50% + 30px + ${this.$props.top}px)`,
        right: `${this.$props.step-this.width}px`
      }
    },
    lineStyle () {
      return {
        top: `calc(50% - 30px - ${this.$props.top}px)`,
        right: `${this.$props.step-this.width/2}px`
      }
    },
  },
  mounted() {
    this.$store.commit('bird/size', { width: 17, height: 12 });
  },
}
</script>

<style lang="scss" scoped>
  @import '../../assets/scss/main.scss';

  .pipe-container {
  }

  .pipe {
    position: absolute;
    background: url('~assets/images/sprites.png') no-repeat -84px -323px;
    width: 26px;
	  height: 160px;

    &.up {
      top: calc(50% + $pipe_distance);
    }

    &.down {
      transform: rotate(180deg);
      bottom: calc(50% + $pipe_distance);
    }
  }

  .line {
    position: absolute;
    height: 2 * $pipe_distance;
    width: 1px;
  }


</style>