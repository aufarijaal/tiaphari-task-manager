<script setup lang="ts">
import { computed, ref } from "vue";
import TickSquareIcon from "../components/icons/TickSquareIcon.vue";
import ModalAddTask from "../components/modals/ModalAddTask.vue";
import useMainStore from "../store";
import isToday from "../utils/is-today";
import ModalModifyTask from "../components/modals/ModalModifyTask.vue";

const { tasks } = useMainStore();
const showModalAddTask = ref(false);
const showModalModifyTask = ref(false);
const taskToModify = ref<Task>();

const todayTasks = computed(() => {
  return tasks.filter((task) => isToday(task.id));
});
const todayTasksRemaining = computed(() => {
  return todayTasks.value?.filter((task) => !task.completed).length;
});
const todayTasksPercentage = computed(() => {
  return Math.round(
    ((todayTasks.value.length - todayTasksRemaining.value) / todayTasks.value.length) * 100,
  );
});
</script>

<template>
  <div id="homepage" class="px-4 pt-4">
    <div
      class="today-progress-card w-full h-[140px] rounded-2xl bg-gradient-to-br from-primary-400 to-primary-500 p-5 flex flex-col justify-between mt-4"
    >
      <div class="today-progress-card__header text-white flex justify-between">
        <p class="font-rubik font-medium">Progres List Harian</p>
        <span>{{ todayTasksPercentage || 0 }}%</span>
      </div>

      <div class="today-progress-card__bar h-3 rounded-full bg-white/30 w-full">
        <div
          class="today-progress-card__bar__filling h-full rounded-full bg-white transition"
          :style="{ width: `${todayTasksPercentage || 0}%` }"
        ></div>
      </div>

      <div class="today-progress-card__motivate text-white text-sm">
        <p v-if="todayTasksRemaining">Semangat! {{ todayTasksRemaining }} agenda harian tersisa</p>
        <p v-else>Yay! Tidak ada agenda hari ini 🎉</p>
      </div>
    </div>

    <div class="today-task-list flex flex-col gap-2 mt-6 min-h-[calc(100vh-5rem-140px)]">
      <button
        class="h-12 rounded-xl text-sm w-full flex items-center px-2 gap-2 bg-primary-300 hover:bg-primary-400 hover:text-white transition active:scale-[0.98] text-primary-500 justify-center font-bold"
        @click="showModalAddTask = true"
      >
        <span class="text-2xl">+</span> Tambah Agenda Harian
      </button>
      <div
        v-for="task in todayTasks"
        :key="task.id"
        class="today-task-item bg-primary-200 hover:bg-primary-300 transition cursor-pointer active:scale-[0.98] h-12 rounded-xl text-sm w-full flex items-center px-2 gap-2 overflow-hidden"
        @click="
          () => {
            taskToModify = task;
            showModalModifyTask = true;
          }
        "
      >
        <TickSquareIcon
          :class="['w-8 h-8 flex-shrink-0', task.completed ? 'fill-green-500' : 'fill-white']"
        />
        <p class="whitespace-nowrap flex-grow text-primary-500 font-medium">
          {{ task.name }}
        </p>
      </div>
    </div>

    <ModalAddTask @close="showModalAddTask = false" v-if="showModalAddTask" />
    <ModalModifyTask
      :task="(taskToModify as Task)"
      @close="showModalModifyTask = false"
      v-if="showModalModifyTask"
    />
  </div>
</template>
