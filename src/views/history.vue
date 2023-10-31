<script setup lang="ts">
import { computed } from "vue";
import NoHistoryIcon from "../components/icons/NoHistoryIcon.vue";
import useMainStore from "../store";
import d from "../utils/dayjs";

const { tasks } = useMainStore();
const groupedTasksByDate = computed(() => {
  const groupedTasksArray: {
    slug: string;
    date: string;
    tasks: Task[];
    completedPercentage: number;
    uncompletedTasksCount: number;
    completedTasksCount: number;
  }[] = [];
  const groupedTasks: { [key: string]: Task[] } = {};

  tasks.forEach((task) => {
    const taskDate = d(task.id).format("dddd, DD MMMM YYYY");

    if (!groupedTasks[taskDate]) {
      groupedTasks[taskDate] = [];
    }
    groupedTasks[taskDate].push(task);
  });

  for (const [date, tasks] of Object.entries(groupedTasks)) {
    groupedTasksArray.push({
      slug: d(date.split(",")[1].trim(), "DD MMMM YYYY").format("DD-MM-YYYY"),
      date,
      tasks,
      completedPercentage: Math.round(
        (tasks.filter((task) => task.completed).length / tasks.length) * 100,
      ),
      uncompletedTasksCount: tasks.filter((task) => !task.completed).length,
      completedTasksCount: tasks.filter((task) => task.completed).length,
    });
  }

  return groupedTasksArray.sort((task, nextTask) => {
    // if current index task slug that converted into epoch (task) greater than
    // the next index task slug that converted into epoch (nextTask), means that current index is
    // older than the next one, then return -1 to place current index after the next index
    if (d(task.slug, "DD-MM-YYYY").valueOf() > d(nextTask.slug, "DD-MM-YYYY").valueOf()) {
      return -1;
    }
    return 1;
  });
});
</script>

<template>
  <div
    id="history-page"
    class="px-4 pt-4 min-h-[calc(100vh-5rem-140px)] flex flex-col items-center gap-4"
    :class="{
      'justify-center': !groupedTasksByDate.length,
    }"
  >
    <div
      class="no-history flex justify-center items-center flex-col gap-2 w-max h-max"
      v-if="!groupedTasksByDate.length"
    >
      <NoHistoryIcon class="fill-primary-500" />
      <div class="font-rubik font-medium text-2xl">Tidak ada riwayat</div>
      <div class="text-gray-500 text-sm">Belum ada riwayat list harian</div>
    </div>

    <RouterLink
      class="history-card w-full h-[140px] rounded-2xl bg-white p-5 flex flex-col justify-between shadow-md shadow-primary-400/5 group cursor-pointer active:scale-[0.98] transition"
      v-for="task in groupedTasksByDate"
      :to="`/history/${task.slug}`"
    >
      <div class="flex justify-between w-full items-center">
        <div class="font-rubik font-medium text-lg">{{ task.date }}</div>
        <div class="text-sm text-primary-400 group-hover:underline">Lihat</div>
      </div>

      <div>
        <p class="text-sm text-gray-500">
          {{
            task.completedTasksCount === task.tasks.length
              ? `Semua ${task.tasks.length} agenda terselesaikan`
              : `${task.completedTasksCount} dari ${task.tasks.length} agenda terselesaikan`
          }}
        </p>
      </div>

      <div class="w-full flex items-center gap-6">
        <div class="history-progress-card__bar h-3 rounded-full bg-primary-200 w-full">
          <div
            class="history-progress-card__bar__filling h-full rounded-full bg-primary-400 transition"
            :style="{ width: `${task.completedPercentage}%` }"
          ></div>
        </div>
        <div class="text-primary-400 font-medium">{{ task.completedPercentage }}%</div>
      </div>
    </RouterLink>
  </div>
</template>
