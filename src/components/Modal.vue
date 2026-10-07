<script setup>
const isOpen = defineModel({
  type: Boolean,
  default: false
});

const emit = defineEmits(["confirm", "cancel"]);

function confirmModal() {
  emit("confirm");
  isOpen.value = false;
}

function cancelModal() {
  emit("cancel");
  isOpen.value = false;
}
</script>

<template>
  <Teleport to="body">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      @click.self="cancelModal"
    >
      <section
        class="flex max-h-[90vh] w-full max-w-xl flex-col overflow-hidden rounded-lg border border-[#e1e5de] bg-white shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        tabindex="-1"
        @keydown.esc.stop.prevent="cancelModal"
      >
        <header class="flex items-center justify-between border-b border-[#edf0ec] px-5 py-4">
          <div id="modal-title">
            <slot name="header">Details</slot>
          </div>
          <button
            type="button"
            class="grid h-8 w-8 place-items-center rounded text-xl text-[#68736b] hover:bg-[#f3f5f0]"
            aria-label="Close dialog"
            @click="cancelModal"
          >
            ×
          </button>
        </header>

        <div class="min-h-0 overflow-y-auto px-5 py-5">
          <slot></slot>
        </div>

        <footer class="border-t border-[#edf0ec] px-5 py-4">
          <slot name="footer" :confirm="confirmModal" :cancel="cancelModal">
            <div class="flex justify-end gap-2">
              <button
                type="button"
                class="rounded border border-[#dce3dc] px-4 py-2 text-sm text-[#536158]"
                @click="cancelModal"
              >
                Cancel
              </button>
              <button
                type="button"
                class="rounded bg-[#32634f] px-4 py-2 text-sm font-semibold text-white"
                @click="confirmModal"
              >
                Confirm
              </button>
            </div>
          </slot>
        </footer>
      </section>
    </div>
  </Teleport>
</template>