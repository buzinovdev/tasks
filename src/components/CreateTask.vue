<template>
  <div class="task-wrap">
    <h3>Добавить задачу</h3>
    <form class="task-form" @submit.prevent="createTask">
      <input type="text" v-model="taskTitle" required/>
      <div class="task-control">
        <Btn>Создать</Btn>
        <Btn @click="emit('update:modelValue', false)" type="danger">Отменить</Btn>
      </div>
    </form>
  </div>
</template>

<script setup>
import Btn from "@/components/Btn.vue";
import {ref} from 'vue';
import {useStore} from 'vuex';
const emit = defineEmits(['update:modelValue'])
defineProps({
  modelValue: {
    type: Boolean,
  }
});
const store = useStore();
const taskTitle = ref('');
const createTask = () => {
  if (taskTitle.value.trim() === '') {
    return;
  }
  store.commit('createTask', {
    id: Date.now().toString(),
    title: taskTitle.value.trim(),
  });
  taskTitle.value = '';
  emit('update:modelValue', false)
};
</script>
