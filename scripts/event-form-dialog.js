import { initDialog } from "./dialog.js";
import { initEventForm } from "./event-form.js";
import { initToaster } from "./toaster.js";

export function initEventFormDialog() {
  const dialog = initDialog("event-form");
  const toaster = initToaster(dialog.dialogElement);
  const eventForm = initEventForm(toaster);

  const dialogTitleElement = dialog.dialogElement.querySelector("[data-dialog-title]");

  document.addEventListener("event-create-request", (event) => {
    dialogTitleElement.textContent = "Crear Evento";
    eventForm.switchToCreateMode(
      event.detail.date,
      event.detail.startTime,
      event.detail.endTime
    );
    dialog.open();
  });

  document.addEventListener("event-edit-request", (event) => {
    dialogTitleElement.textContent = "Editar Evento";
    eventForm.switchToEditMode(event.detail.event);
    dialog.open();
  });

  dialog.dialogElement.addEventListener("close", () => {
    eventForm.reset();
  });

  eventForm.formElement.addEventListener("event-create", () => {
    dialog.close();
  });

  eventForm.formElement.addEventListener("event-edit", () => {
    dialog.close();
  });
}