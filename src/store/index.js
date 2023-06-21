import {createStore} from 'vuex';

const store = createStore({
  state() {
    return {
      tasks: JSON.parse(localStorage.getItem('tasks')) || [],
    };
  },
  getters: {
    tasks: state => state.tasks
  },
  mutations: {
    createTask(state, task) {
      const taskList = JSON.parse(localStorage.getItem('tasks'))
      if (taskList) {
        taskList.push(task)
        localStorage.setItem('tasks', JSON.stringify(taskList))
      } else {
        localStorage.setItem('tasks', JSON.stringify([task]))
      }
      state.tasks.push(task);
    },
    editTask(state, data) {
      const index = state.tasks.findIndex((task) => task.id === data.id);
      if (index !== -1) {
        const taskList = JSON.parse(localStorage.getItem('tasks'))
        taskList[index].title = data.title
        localStorage.setItem('tasks', JSON.stringify(taskList))
        state.tasks[index].title = data.title
      }
    },
    deleteTask(state, taskId) {
      const index = state.tasks.findIndex((task) => task.id === taskId);
      if (index !== -1) {
        const taskList = JSON.parse(localStorage.getItem('tasks'))
        taskList.splice(index, 1)
        localStorage.setItem('tasks', JSON.stringify(taskList))
        state.tasks.splice(index, 1);
      }
    },
  },
});

export default store;
