<script setup>
import Btn from "@/components/Btn.vue";
import {computed, ref} from 'vue';
import {useStore} from 'vuex';

const emit = defineEmits(['update:modelValue'])
const props = defineProps({
  editable: {
    id: Number,
    title: String
  },
  modelValue: {
    type: Boolean,
  }
});

const store = useStore();
const editTask = () => {
  if (props.editable.title.trim() === '') {
    return;
  }
  store.commit('editTask', {id: props.editable.id, title: props.editable.title});
  emit('update:modelValue', false)
};
</script>

<template>
  <div class="task-wrap">
    <h3>Редактировать задачу</h3>
    <form class="task-form" @submit.prevent="editTask">
      <input type="text" v-model="props.editable.title" required/>
      <div class="task-control">
        <Btn>Сохранить</Btn>
        <Btn type="danger" @click="emit('update:modelValue', false)">Отменить</Btn>
      </div>
    </form>
  </div>
</template>
