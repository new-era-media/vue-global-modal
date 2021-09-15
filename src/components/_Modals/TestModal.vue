<template lang="pug">
    .modal
        span(@click="close") X
        spa(@click="alert") alert
        span {{ text }}
</template>

<script>
export default {
  props: {
    text: {
      type: String,
    },
  },
  methods: {
    close() {
      this.$emit("close");
    },
    alert() {
      this.$emit("alert");
      this.close();
    },
  },
};
</script>


<style scoped>
.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px black solid;
}
</style>