<template>
  <div class="pipe-container">
      <div class="pipe down" v-bind:style="[downStyle]"></div>
      <div class="pipe up" v-bind:style="[upStyle]"></div>
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
    border: 1px solid red;

    &.up {
      top: calc(50% + $pipe_distance);
    }

    &.down {
      transform: rotate(180deg);
      bottom: calc(50% + $pipe_distance);
    }
  }


</style>