<template>
  <div class="pipe-container">
      <div id="pipe-down" class="sprite pipe down" :style="[downStyle]"></div>
      <div id="pipe-up" class="sprite pipe up" :style="[upStyle]"></div>
      <div id="pipe-line" class="sprite line" :style="[lineStyle]"></div>
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
        right: `${this.$props.step-this.width}px`,
        width: "26px",
	      height: "160px",
      }
    },
    downStyle () {
      return {
        bottom: `calc(50% + 30px + ${this.$props.top}px)`,
        right: `${this.$props.step-this.width}px`,
        width: "26px",
	      height: "160px",
      }
    },
    lineStyle () {
      return {
        top: `calc(50% - 30px - ${this.$props.top}px)`,
        right: `${this.$props.step-this.width/2}px`,
        height: "60px",
        width: "1px"
      }
    },
  },
  mounted() {
    const upElem = document.getElementById('pipe-up');
    const downElem = document.getElementById('pipe-down');
    const lineElem = document.getElementById('pipe-line');

    setTimeout(() => {
      const uBound = upElem.getBoundingClientRect();
      const dBound = downElem.getBoundingClientRect();
      const lBound = lineElem.getBoundingClientRect();

      this.$store.commit('pipe/setBound', { uBound, dBound, lBound });
    }, 100)
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
      right: $game_width;
    }

    &.down {
      transform: rotate(180deg);
      right: $game_width;
      bottom: calc(50% + $pipe_distance);
    }
  }

  .line {
    position: absolute;
    height: 2 * $pipe_distance;
    width: 1px;
  }


</style>