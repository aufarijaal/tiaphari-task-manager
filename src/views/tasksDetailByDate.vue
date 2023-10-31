<script setup lang="ts">
import { useRoute } from "vue-router";
import d from "../utils/dayjs";
import { onMounted, ref } from "vue";
import useMainStore from "../store";
import TickCircleIcon from "../components/icons/TickCircleIcon.vue";
import XIcon from "../components/icons/XIcon.vue";

const route = useRoute();
const startOfDay = ref(0);
const endOfDay = ref(0);
const fullDateWithDayName = ref("");
const completionPercentage = ref(0);
const completedTasks = ref(0);
const { tasks } = useMainStore();
const filteredTasks = ref<Task[]>();

onMounted(() => {
  const slug = route.params.slug.toString();

  startOfDay.value = d(slug, "DD-MM-YYYY").startOf("day").valueOf();
  endOfDay.value = d(slug, "DD-MM-YYYY").endOf("day").valueOf();
  fullDateWithDayName.value = d(slug, "DD-MM-YYYY").endOf("day").format("dddd, DD MMMM YYYY");

  filteredTasks.value = tasks.filter((task) => {
    if (task.id >= startOfDay.value && task.id <= endOfDay.value) {
      return task;
    }
  });

  completionPercentage.value = Math.round(
    (filteredTasks.value.filter((task) => task.completed).length / filteredTasks.value.length) *
      100,
  );
  completedTasks.value = filteredTasks.value.filter((task) => task.completed).length;
});
</script>
<template>
  <div id="tasks-detail-by-date-page" class="min-h-screen p-4">
    <header>
      <div class="flex gap-4 items-center">
        <RouterLink
          to="/history"
          class="bg-transparent hover:bg-gray-100 transition rounded-full w-10 h-10 flex justify-center items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m6 8l-4 4l4 4m-4-4h20"
            />
          </svg>
        </RouterLink>
        <div class="font-rubik font-medium text-lg">{{ fullDateWithDayName }}</div>
      </div>
    </header>

    <div>
      <div
        class="today-progress-card w-full h-[140px] rounded-2xl bg-gradient-to-br from-primary-400 to-primary-500 p-5 flex flex-col justify-between mt-6"
      >
        <div class="today-progress-card__header text-white flex justify-between">
          <p class="font-rubik font-medium">Progres List Harian</p>
          <span>{{ completionPercentage || 0 }}%</span>
        </div>

        <div class="today-progress-card__bar h-3 rounded-full bg-white/30 w-full">
          <div
            class="today-progress-card__bar__filling h-full rounded-full bg-white transition"
            :style="{ width: `${completionPercentage || 0}%` }"
          ></div>
        </div>

        <div class="today-progress-card__motivate text-white text-sm">
          <p>
            {{
              completedTasks === filteredTasks?.length
                ? "Semua agenda terselesaikan"
                : `${completedTasks} dari ${filteredTasks?.length} agenda terselesaikan`
            }}
          </p>
        </div>
      </div>

      <div class="completed-and-uncompleted-tasks-wrapper mt-10 flex flex-col gap-10">
        <div class="completed-tasks-wrapper flex flex-col gap-4">
          <div class="font-rubik font-medium text-lg flex gap-2 items-center">
            <p>Agenda Terlaksana</p>
            <TickCircleIcon class="fill-green-500 w-8 h-8" />
          </div>
          <div class="completed-tasks-list flex flex-col gap-2">
            <div
              class="completed-task-item h-12 bg-green-100 rounded-xl w-full flex items-center px-4 text-gray-600 text-sm"
              v-for="task in filteredTasks?.filter((task) => task.completed)"
            >
              {{ task.name }}
            </div>
          </div>
        </div>

        <div class="uncompleted-tasks-wrapper flex flex-col gap-4">
          <div class="font-rubik font-medium text-lg flex gap-2 items-center">
            <p>Agenda Tak Terlaksana</p>
            <XIcon class="fill-rose-500 w-8 h-8" />
          </div>
          <div class="uncompleted-tasks-list flex flex-col gap-2">
            <div
              class="uncompleted-task-item h-12 bg-rose-100 rounded-xl w-full flex items-center px-4 text-gray-600 text-sm"
              v-for="task in filteredTasks?.filter((task) => !task.completed)"
            >
              {{ task.name }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
