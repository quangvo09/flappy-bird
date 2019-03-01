<template>
  <div class="score-container">
    <div class="score-unit" v-for="unit in arr" :data-number="unit"></div>
  </div>
</template>

<script>
export default {
  computed: {
    arr: function() {
      const score = this.$store.state.score || 0;
      return (score + '').split('');
    }
  },
  mounted() {
  },
}
</script>

<style lang="scss">
  .score-container {
    position: absolute;
    display: flex;
    flex-direction: row;
    top: 5px;
    left: 0;
    width: 100%;
    justify-content: center;
    z-index: 3;
  }

  .score-unit {
    background: url('~assets/images/sprites.png') no-repeat -496px -60px;
    width: 12px;
    height: 18px;

    &[data-number='1'] {
      background: url('~assets/images/sprites.png') no-repeat -136px -455px;
      width: 8px;
      height: 18px;
    }
    &[data-number='2'] {
      background: url('~assets/images/sprites.png') no-repeat -292px -160px;
      width: 12px;
      height: 18px;
    }
    &[data-number='3'] {
      background: url('~assets/images/sprites.png') no-repeat -306px -160px;
      width: 12px;
      height: 18px;
    }
    &[data-number='4'] {
      background: url('~assets/images/sprites.png') no-repeat -320px -160px;
      width: 12px;
      height: 18px;
    }
    &[data-number='5'] {
      background: url('~assets/images/sprites.png') no-repeat -334px -160px;
      width: 12px;
      height: 18px;
    }
    &[data-number='6'] {
      background: url('~assets/images/sprites.png') no-repeat -292px -184px;
      width: 12px;
      height: 18px;
    }
    &[data-number='7'] {
      background: url('~assets/images/sprites.png') no-repeat -306px -184px;
      width: 12px;
      height: 18px;
    }
    &[data-number='8'] {
      background: url('~assets/images/sprites.png') no-repeat -320px -184px;
      width: 12px;
      height: 18px;
    }
    &[data-number='9'] {
      background: url('~assets/images/sprites.png') no-repeat -334px -184px;
      width: 12px;
      height: 18px;
    }
  }
</style>