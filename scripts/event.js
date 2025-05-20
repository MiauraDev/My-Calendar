export function validateEvent(event) {
  if (event.startTime >= event.endTime) {
    return "La Hora fin del evento debe ser posterior a la Hora inicio.";
  }

  return null;
}