<script setup lang="ts">
import { useRoute } from "vue-router";

const props = defineProps<{
  route: {
    to: string;
    name: string[];
  };
  label: string;
}>();

const currentRoute = useRoute();

function routeNamesForActiveClass() {
  return props.route.name.some((allowedRouteName) => allowedRouteName === currentRoute.name);
}
</script>
<template>
  <RouterLink class="nav-home flex flex-col items-center w-full" :to="props.route.to">
    <div class="flex flex-col items-center gap-1 flex-grow justify-center">
      <slot name="active-icon" v-if="routeNamesForActiveClass()"></slot>
      <slot name="inactive-icon" v-else></slot>
      <span
        :class="['text-xs mt-1', routeNamesForActiveClass() ? 'text-primary-400' : 'text-gray-500']"
        >{{ props.label }}</span
      >
    </div>
    <div
      :class="[
        'nav-indicator h-[5px] w-[50px] rounded-t-lg transition',
        routeNamesForActiveClass() ? 'bg-primary-400' : 'bg-transparent',
      ]"
    ></div>
  </RouterLink>
</template>
