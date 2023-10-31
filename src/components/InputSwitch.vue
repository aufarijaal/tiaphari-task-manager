<script setup lang="ts">
import { ref } from "vue";

const checked = ref(false);
</script>
<template>
  <div>
    <input class="hidden" type="checkbox" name="" id="" v-model="checked" />
    <div
      class="custom-switch h-max w-12 rounded-full border-4 group cursor-pointer flex"
      :class="[
        checked
          ? 'bg-green-400 border-green-400 justify-end'
          : 'bg-gray-200 border-gray-200 justify-start',
      ]"
      @click="checked = !checked"
    >
      <div class="custom-switch-handle bg-white h-5 w-5 rounded-full"></div>
    </div>
  </div>
</template>
