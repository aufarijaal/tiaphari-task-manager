<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
import { onClickOutside } from "@vueuse/core";
import useMainStore from "../../store";

const emits = defineEmits(["close"]);
const { add } = useMainStore();
const input = ref("");
const modalRef = ref<HTMLDivElement>();
const inputNameRef = ref<HTMLInputElement>();

function addTask() {
  if (input.value) {
    add({
      id: new Date().getTime(),
      name: input.value,
      completed: false,
    });
    emits("close");
  }
}

onClickOutside(modalRef, () => emits("close"));
onMounted(() => {
  inputNameRef.value?.focus();

  document.addEventListener("keyup", (e) => {
    if (e.key === "Escape") {
      emits("close");
    }
  });
});
onBeforeUnmount(() => {
  document.removeEventListener("keyup", (e) => {
    if (e.key === "Escape") {
      emits("close");
    }
  });
});
</script>
<template>
  <Teleport to="#teleport">
    <div
      className="modal-add-task-backdrop w-full h-screen overflow-hidden px-4 fixed top-0 left-0 z-10 bg-black/20 flex justify-center items-center animate-in fade-in"
    >
      <div
        className="modal-add-task bg-white w-[350px] rounded-xl p-4 flex flex-col gap-6 animate-in slide-in-from-top-10"
        ref="modalRef"
      >
        <div className="modal-header flex justify-between">
          <div>
            <div className="modal-header__title font-rubik text-lg font-bold">
              Tambah Agenda Hari Ini
            </div>
            <div className="modal-header__subtitle text-xs text-gray-500">
              Tambahkan item list untuk agenda hari ini.
            </div>
          </div>
          <button
            className="bg-gray-100 hover:bg-gray-50 active:bg-gray-100 transition w-8 h-8 flex justify-center items-center rounded-full"
            @click="$emit('close')"
          >
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6L6.4 19Z"
              />
            </svg>
          </button>
        </div>

        <div className="modal-content">
          <input
            className="h-12 rounded-xl border-2 w-full text-sm px-2 focus:border-primary-400 transition
          outline-none"
            type="text"
            placeholder="Ketik disini..."
            v-model="input"
            @keyup.enter="addTask"
            ref="inputNameRef"
          />
        </div>

        <div className="modal-footer">
          <button
            className="font-bold text-white bg-primary-500 hover:bg-primary-400 active:bg-primary-500 transition text-sm w-full h-12 rounded-xl"
            @click="addTask"
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>
