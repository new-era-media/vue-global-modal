<template lang="pug">
  #app
    ModalServece
    button(@click="openModal") Открыть модалку
</template>

<script>
import ModalServece from '@/components/ModalServece'
export default {
  components:{ModalServece},
  methods: {
    testAlert(){
      console.log('Test Alert');
    },
    openModal() {
      this.$modal({
        component: "TestModal",
        props: {
          text: 'Modal'
        },
        on:{
          alert: this.testAlert
        }
      });
    },
  },
};
</script>

<style lang="scss">

* {
	padding: 0;
	margin: 0;
	border: 0;
	}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body {
  &.--overlay {
    overflow: hidden;
  }

  &.--freeze {
    pointer-events: none;
  }
}
</style>
