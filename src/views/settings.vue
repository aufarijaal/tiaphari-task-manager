<script setup lang="ts">
import NotificationIcon from "../components/icons/NotificationIcon.vue";
import InputSwitch from "../components/InputSwitch.vue";
import tiapHariIcon from "../assets/tiaphari.svg";
</script>

<template>
  <div id="settings-page">
    <header
      class="bg-gradient-to-br from-primary-400 to-primary-500 h-[440px] flex flex-col items-center justify-center gap-10"
    >
      <div class="header-brand flex flex-col items-center">
        <img class="w-48 h-48" :src="tiapHariIcon" />
        <div class="text-sm text-white">Version 1.0.0</div>
      </div>

      <div class="max-w-sm text-center">
        <p class="text-sm text-white leading-6">
          Aplikasi untuk membantu merapikan agenda harian agar lebih mudah menata waktumu.
        </p>
      </div>
    </header>

    <div class="settings-list min-h-[calc(100vh-450px)] p-4">
      <div
        class="settings-item text-sm text-gray-500 bg-white shadow-md shadow-primary-400/10 rounded-lg flex items-center justify-between p-4"
      >
        <div class="flex items-center gap-2">
          <NotificationIcon class="fill-primary-400" />
          <p>Nyalakan pemberitahuan</p>
        </div>

        <div>
          <InputSwitch />
        </div>
      </div>
    </div>
  </div>
</template>
