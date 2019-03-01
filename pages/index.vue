
<script>
import Intro from '../components/Intro';
import Playing from '../components/Playing';
import Dead from '../components/Dead';

import Ground from '../components/sprites/Ground'
import Bird from '../components/sprites/Bird'

export default {
  components: {
    'intro': Intro,
    'playing': Playing,
    'dead': Dead,
    'ground': Ground,
    'bird': Bird,
  },
  computed: {
    gameState () {
      return this.$store.state.gameState
    }
  },
}
</script>

<template src="./index.html"></template>
<style lang="scss" src="./index.scss"></style>

