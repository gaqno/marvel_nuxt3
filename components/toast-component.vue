<template>
  <div :class="[formatToastType, formatToastPosition, formatPosition]">
    <div v-if="app.toast.type !== 'import'" class="mx-20 absolute w-fit alert alert-info">
      <Icon :name="app.toast.icon" />
      <span>{{ app.toast.title }}</span>
      <span>{{ app.toast.message }}</span>
    </div>
    <div v-else class="alert alert-info">
      <Icon :name="app.toast.icon" />
      <span>{{ app.toast.title }}</span>
      <span>{{ app.toast.message }}</span>
      {{ app.toast.data }}
    </div>
  </div>
</template>

<script setup>
import { useAppStore } from "~/store/app";
const app = useAppStore();

const formatToastPosition = () => {
  if (app.toaster.position === "top-right") {
    return "toast toast-top toast-start";
  } else if (app.toaster.position === "top-left") {
    return "toast toast-top toast-start";
  } else if (app.toaster.position === "bottom-right") {
    return "toast toast-bottom toast-end";
  } else if (app.toaster.position === "bottom-left") {
    return "toast toast-bottom toast-start";
  }
};

const formatToastType = () => {
  console.log("type", app.toaster.type);
  switch (app.toaster.type) {
    case "success":
      return "bg-green-50 border-green-500 text-green-700";
    case "warning":
      return "bg-yellow-50 border-yellow-500 text-yellow-700";
    case "error":
      return "bg-red-50 border-red-500 text-red-700";
    default:
      return "bg-blue-50 border-blue-500 text-blue-700";
  }
};

const formatPosition = () => {
  console.log("position", app.toaster.position);
  const position = app.toaster.position;
  switch (position) {
    case "toast-start":
      return app.$patch({ toaster: { position: "toast-start" } });
    case "toast-center":
      return app.$patch({ toaster: { position: "toast-center" } });
    case "toast-end":
      return app.$patch({ toaster: { position: "toast-end" } });
    case "toast-top":
      return app.$patch({ toaster: { position: "toast-top" } });
    case "toast-middle":
      return app.$patch({ toaster: { position: "toast-middle" } });
    case "toast-bottom":
      return app.$patch({ toaster: { position: "toast-bottom" } });
    default:
      return app.$patch({ toaster: { position: "" } });
  }
};

</script>
