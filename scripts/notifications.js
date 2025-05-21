import { initToaster } from "./toaster.js";

export function initNotifications() {
  const toaster = initToaster(document.body);

  document.addEventListener("event-create", () => {
    toaster.success("Evento creado");
  });

  document.addEventListener("event-delete", () => {
    toaster.success("Evento eliminado");
  });

  document.addEventListener("event-edit", () => {
    toaster.success("Evento editado");
  });
}