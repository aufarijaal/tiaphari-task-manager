import { useLocalStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { ref } from "vue";

const useMainStore = defineStore("main", () => {
  const tasks = ref(useLocalStorage<Task[]>("tasks", []));

  function add(newTask: Task) {
    tasks.value.push(newTask);
  }

  function update(updatedTask: Task) {
    const foundedIndex = tasks.value.findIndex((task) => task.id === updatedTask.id);
    tasks.value[foundedIndex].name = updatedTask.name;
    tasks.value[foundedIndex].completed = updatedTask.completed;
  }

  function remove(id: number) {
    const foundedIndex = tasks.value.findIndex((task) => task.id === id);
    tasks.value.splice(foundedIndex, 1);
  }

  return {
    tasks,
    add,
    update,
    remove,
  };
});

export default useMainStore;
