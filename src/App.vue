<template>
  <Top />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Top from './components/Top.vue';

@Options({
  components: {
    Top,
  },
})
export default class App extends Vue {}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.logo {
  height: 100px;
  pointer-events: none;
  margin-bottom: 40px;
}
</style>
