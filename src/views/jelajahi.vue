<script setup lang="ts">
import { ref } from "vue";
import NoInputSearchIcon from "../components/icons/NoInputSearchIcon.vue";
import NoSearchResultIcon from "../components/icons/NoSearchResultIcon.vue";
import SearchOutlineIcon from "../components/icons/SearchOutlineIcon.vue";
import useMainStore from "../store";
import { watchDebounced } from "@vueuse/shared";
import d from "../utils/dayjs";

const { tasks } = useMainStore();
const foundedTasks = ref<Task[]>();
const inputSearch = ref("");

function findTasks() {
  if (!inputSearch.value) return;
  foundedTasks.value = undefined;
  foundedTasks.value = tasks.filter((task) =>
    task.name.toLowerCase().includes(inputSearch.value.toLowerCase()),
  );
}

watchDebounced(inputSearch, findTasks, { debounce: 500, maxWait: 1000 });
</script>

<template>
  <div id="jelajahi-page" class="px-4 pt-4 min-h-screen flex flex-col gap-4">
    <div class="task-input-search relative flex-shrink-0">
      <input
        class="bg-white h-12 rounded-xl text-sm w-full pl-4 pr-14 shadow-sm outline-none focus:ring-2 focus:ring-primary-400 transition"
        type="text"
        placeholder="Jelajahi Agenda"
        v-model="inputSearch"
      />
      <button
        class="task-input-search-button h-full absolute right-0 top-0 rounded-r-xl w-12 flex justify-center items-center"
        @click="findTasks"
      >
        <SearchOutlineIcon class="fill-gray-400" />
      </button>
    </div>

    <div class="search-results flex-grow">
      <div
        class="no-input-search flex flex-col items-center gap-2 h-full"
        v-if="!foundedTasks?.length && inputSearch"
      >
        <NoSearchResultIcon class="fill-primary-400" />
        <div class="text-gray-500 text-sm">Tidak ada agenda yang cocok dengan kata kunci.</div>
      </div>

      <div class="no-input-search flex flex-col items-center gap-2 h-full" v-else-if="!inputSearch">
        <NoInputSearchIcon class="fill-primary-400 w-28 h-28" />
        <div class="text-gray-500 text-sm">Jelajahi agenda apapun dan kapan pun.</div>
      </div>

      <div class="search-result-wrapper flex flex-col gap-2 mt-4">
        <div
          class="bg-white rounded-xl shadow-sm shadow-primary-400/10 flex flex-col animate-in slide-in-from-top-3 p-4 gap-2"
          v-if="inputSearch && foundedTasks?.length"
          v-for="task in foundedTasks"
        >
          <div class="self-end text-sm font-rubik text-primary-400">
            {{ d(task.id).format("dddd, DD MMMM YYYY") }}
          </div>
          <div class="text-gray-600 text-sm font-medium">{{ task.name }}</div>
          <div
            class="text-xs w-max p-0.5 rounded-full px-2"
            :class="[task.completed ? 'bg-green-100 text-green-500' : 'bg-rose-100 text-rose-500']"
          >
            {{
              task.completed
                ? "Terselesaikan"
                : d(task.id).startOf("day").format("DD-MM-YYYY") ===
                  d().startOf("day").format("DD-MM-YYYY")
                ? "Belum dikerjakan"
                : "Tidak dikerjakan"
            }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
