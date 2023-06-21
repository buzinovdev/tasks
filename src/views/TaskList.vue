<script setup>
import {computed, ref, reactive} from 'vue';
import {useStore} from 'vuex';
import CreateTask from "@/components/CreateTask.vue";
import Btn from "@/components/Btn.vue";
import EditTask from "@/components/EditTask.vue";

const store = useStore();
const tasks = computed(() => store.getters.tasks);
const showForm = ref(false)
const showEditForm = ref(false)

const editableTask = reactive({
  id: '-1',
  title: ''
})

const deleteTask = (taskId) => {
  store.commit('deleteTask', taskId);
};

const editTask = (taskId) => {
  const task = tasks.value.find((task) => task.id === taskId);
  if (task) {
    showEditForm.value = true
    editableTask.id = task.id
    editableTask.title = task.title
  }
};
</script>

<template>
  <div>
    <div class="head">
      <h1>Текущие задачи</h1>
      <Btn @click="showForm = true" v-if="showForm === false">Добавить</Btn>
    </div>
    <CreateTask v-if="showForm" v-model="showForm"/>
    <EditTask v-if="showEditForm" :editable="editableTask" v-model="showEditForm"/>
    <ul v-if="tasks.length > 0">
      <li class="task-item" v-for="(task, idx) in tasks" :key="task.id">
        <span>{{ idx + 1 }} - {{ task.title }}</span>
        <Btn @click="editTask(task.id)">Редактировать</Btn>
        <Btn type="danger" @click="deleteTask(task.id)">Удалить</Btn>
      </li>
    </ul>
    <div class="task-empty" v-else>Список задач пуст</div>
  </div>
</template>

<style lang="scss" scoped>
.head {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 24px;
}

.task {
  &-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 0;

    & + & {
      border-top: 1px solid hsla(160, 100%, 37%, 1);
    }
  }

  &-empty {
    border-radius: 12px;
    background-color: #DC3646;
    font-weight: 700;
    text-align: center;
    padding: 12px;
    margin-top: 24px;
  }
}
</style>
