import { validateEvent } from "./event.js";

export function initEventForm(toaster) {
  const formElement = document.querySelector("[data-event-form]");

  formElement.addEventListener("submit", (event) => {
    event.preventDefault();
    const formEvent = formIntoEvent(formElement);
    const validationError = validateEvent(formEvent);
    if (validationError !== null) {
      toaster.error(validationError);
      return;
    }

    formElement.dispatchEvent(new CustomEvent("event-create", {
      detail: {
        event: formEvent
      },
      bubbles: true
    }));
  });

  return {
    formElement,
    fillWithDate(date, startTime, endTime) {
      fillFormWithDate(formElement, date, startTime, endTime);
    },
    reset() {
      formElement.reset();
    }
  };
}

function fillFormWithDate(formElement, date, startTime, endTime) {
  const dateInputElement = formElement.querySelector("#date");
  const startTimeSelectElement = formElement.querySelector("#start-time");
  const endTimeSelectElement = formElement.querySelector("#end-time");

  dateInputElement.value = date.toISOString().substr(0, 10);
  startTimeSelectElement.value = startTime;
  endTimeSelectElement.value = endTime;
}


function formIntoEvent(formElement) {
  const formData = new FormData(formElement);
  const title = formData.get("title");
  const date = formData.get("date");
  const startTime = formData.get("start-time");
  const endTime = formData.get("end-time");
  const color = formData.get("color");

  const dateParts = date.split("-");
  const adjustedDate = new Date(
    Number(dateParts[0]),
    Number(dateParts[1]) - 1,
    Number(dateParts[2])
  );

  const event = {
    title,
    date: adjustedDate,
    startTime: Number.parseInt(startTime, 10),
    endTime: Number.parseInt(endTime, 10),
    color
  };

  return event;
}