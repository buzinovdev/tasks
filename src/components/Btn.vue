<script setup>
defineProps({
  type: String
})
</script>

<template>
  <button class="btn" :class="type">
    <slot></slot>
  </button>
</template>

<style lang="scss" scoped>
.btn {
  background-color: hsla(160, 100%, 37%, 1);
  color: #f2f2f2;
  border: none;
  font-weight: 700;
  padding: 12px;
  border-radius: 12px;
  transition: background-color .3s ease-in-out;
  cursor: pointer;

  &:hover {
    background-color: hsla(160, 100%, 37%, 0.2);
  }
  &.danger {
    background-color: #DC3646;
  }
}
</style>
