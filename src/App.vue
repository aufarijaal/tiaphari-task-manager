<script setup lang="ts">
import { useRoute } from "vue-router";
import BottomNavigation from "./components/BottomNavigation.vue";
import BrandIcon from "./components/BrandIcon.vue";

const route = useRoute();

function getFormattedDate() {
  const options: any = { weekday: "long", day: "numeric", month: "long", year: "numeric" };
  const today = new Date();
  return today.toLocaleDateString("id", options);
}
</script>

<template>
  <div>
    <div class="header-wrapper bg-gradient-to-tr from-primary-400 to-primary-500 max-w-4xl mx-auto">
      <header
        class="flex h-32 items-center px-6 gap-4"
        v-if="route.name !== 'settings' && route.name !== 'historyDetail'"
      >
        <BrandIcon class="fill-white w-16 h-16" />
        <div class="header-text flex flex-col text-white">
          <div class="header-title font-rubik text-3xl font-bold">TiapHari</div>
          <div class="header-date">{{ getFormattedDate() }}</div>
        </div>
      </header>
    </div>
    <div class="main-wrapper">
      <main class="bg-primary-100 max-w-4xl mx-auto pb-32">
        <RouterView />
      </main>
    </div>
    <div class="nav-wrapper w-full fixed bottom-0 left-0">
      <BottomNavigation class="h-20 bg-white rounded-t-3xl w-full max-w-4xl mx-auto flex shadow" />
    </div>
  </div>
</template>
