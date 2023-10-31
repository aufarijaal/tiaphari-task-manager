<script setup lang="ts">
import HomeIcon from "./icons/HomeIcon.vue";
import HomeOutlineIcon from "./icons/HomeOutlineIcon.vue";
import SearchIcon from "./icons/SearchIcon.vue";
import SearchOutlineIcon from "./icons/SearchOutlineIcon.vue";
import SettingIcon from "./icons/SettingIcon.vue";
import SettingOutlineIcon from "./icons/SettingOutlineIcon.vue";
import HistoryIcon from "./icons/HistoryIcon.vue";
import BottomNavLink from "./BottomNavLink.vue";
</script>

<template>
  <nav>
    <BottomNavLink :route="{ name: ['home'], to: '/' }" label="Home">
      <template #active-icon>
        <HomeIcon class="w-6 h-6 fill-primary-400" />
      </template>
      <template #inactive-icon>
        <HomeOutlineIcon class="w-6 h-6 fill-gray-500" />
      </template>
    </BottomNavLink>

    <BottomNavLink :route="{ name: ['history', 'historyDetail'], to: '/history' }" label="Riwayat">
      <template #active-icon>
        <HistoryIcon class="w-6 h-6 fill-primary-400" />
      </template>
      <template #inactive-icon>
        <HistoryIcon class="w-6 h-6 fill-gray-500" />
      </template>
    </BottomNavLink>

    <BottomNavLink :route="{ name: ['jelajahi'], to: '/jelajahi' }" label="Jelajahi">
      <template #active-icon>
        <SearchIcon class="w-6 h-6 fill-primary-400" />
      </template>
      <template #inactive-icon>
        <SearchOutlineIcon class="w-6 h-6 fill-gray-500" />
      </template>
    </BottomNavLink>

    <BottomNavLink :route="{ name: ['settings'], to: '/settings' }" label="Pengaturan">
      <template #active-icon>
        <SettingIcon class="w-6 h-6 fill-primary-400" />
      </template>
      <template #inactive-icon>
        <SettingOutlineIcon class="w-6 h-6 fill-gray-500" />
      </template>
    </BottomNavLink>
  </nav>
</template>
