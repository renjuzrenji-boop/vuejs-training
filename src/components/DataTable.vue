<template>
  <div class="salary-table-wrap">
    <table class="salary-table">
      <thead>
        <tr>
          <th
            v-for="column in columns"
            :key="column.key"
            scope="col"
          >
            {{ column.label }}
          </th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(row, rowIndex) in data"
          :key="row.id ?? rowIndex"
          class="cursor-pointer transition-colors hover:bg-[#f7f8f6]"
          @click="emit('row-click', row)"
        >
          <td v-for="column in columns" :key="column.key">
            {{ column.format ? column.format(row[column.key], row) : row[column.key] ?? "—" }}
          </td>
          <td>
            <button
              type="button"
              class="mr-3 font-medium text-[#32634f] hover:underline"
              @click.stop="emit('edit', row)"
            >
              Edit
            </button>
            <button
              type="button"
              class="font-medium text-[#a54734] hover:underline"
              @click.stop="emit('delete', row)"
            >
              Delete
            </button>
          </td>
        </tr>
        <tr v-if="data.length === 0">
          <td :colspan="columns.length + 1" class="text-center text-[#78827a]">
            {{ emptyMessage }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
defineProps({
  columns: {
    type: Array,
    required: true,
    validator: (columns) => columns.every((column) =>
      typeof column.key === "string" && typeof column.label === "string"
    )
  },
  data: {
    type: Array,
    required: true
  },
  emptyMessage: {
    type: String,
    default: "No rows to display."
  }
});

const emit = defineEmits({
  edit: (row) => row !== null && typeof row === "object",
  delete: (row) => row !== null && typeof row === "object",
  "row-click": (row) => row !== null && typeof row === "object"
});
</script>