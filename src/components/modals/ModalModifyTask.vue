<script setup lang="ts">
import { onClickOutside } from "@vueuse/core";
import { onBeforeUnmount, onMounted, ref } from "vue";
import useMainStore from "../../store";
import TrashIcon from "../icons/TrashIcon.vue";

const { update, remove } = useMainStore();
const emits = defineEmits(["close"]);
const props = defineProps<{ task: Task }>();
const modalRef = ref<HTMLDivElement>();
const inputNameRef = ref<HTMLInputElement>();
const form = ref<Task>({
  id: 0,
  name: "",
  completed: false,
});

function updateTask() {
  if (form.value.name) {
    update(form.value);
    emits("close");
  }
}

function removeTask() {
  if (props.task.id) {
    remove(props.task.id);
    emits("close");
  }
}

onClickOutside(modalRef, () => emits("close"));
onMounted(() => {
  form.value.id = props.task.id;
  form.value.name = props.task.name;
  form.value.completed = props.task.completed;

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
      class="modal-add-task-backdrop w-full h-screen overflow-hidden px-4 fixed top-0 left-0 z-10 bg-black/20 flex justify-center items-center animate-in fade-in"
    >
      <div
        class="modal-add-task bg-white w-[350px] rounded-xl p-4 flex flex-col gap-6 animate-in slide-in-from-top-10"
        ref="modalRef"
      >
        <div class="modal-header flex justify-between">
          <div>
            <div class="modal-header__title font-rubik text-lg font-bold">Ubah List Agenda</div>
            <div class="modal-header__subtitle text-xs text-gray-500">
              Perbarui item list untuk agenda hari ini.
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

        <div class="modal-content">
          <input
            class="h-12 rounded-xl border-2 w-full text-sm px-2 focus:border-primary-400 transition outline-none"
            type="text"
            placeholder="Ketik disini..."
            v-model="form.name"
            @keyup.enter="updateTask"
            ref="inputNameRef"
          />

          <label
            class="text-xs flex items-center gap-2 mt-4 text-gray-500 cursor-pointer"
            htmlFor="add-task-set-as-completed"
          >
            <input
              class="w-4 h-4 accent-green-500"
              type="checkbox"
              id="add-task-set-as-completed"
              v-model="form.completed"
            />
            Telah dikerjakan
          </label>
        </div>

        <div class="modal-footer">
          <div class="flex gap-2">
            <button
              class="font-bold text-white bg-primary-500 hover:bg-primary-400 active:bg-primary-500 transition text-sm w-full h-12 rounded-xl flex-grow"
              @click="updateTask"
            >
              Simpan
            </button>
            <button
              class="font-bold text-rose-500 bg-rose-50 hover:bg-rose-100 active:bg-rose-50 transition text-sm w-12 h-12 rounded-xl flex-shrink-0 flex justify-center items-center"
              @click="removeTask"
            >
              <TrashIcon class="fill-rose-500" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>
