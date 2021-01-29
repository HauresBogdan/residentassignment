export default function Validation(jsonData) {
  let isValid = true;

  if (
    jsonData &&
    jsonData.name.trim() !== "" &&
    jsonData.projects.length !== 0 &&
    jsonData.actualProjects.length !== 0
  ) {
    jsonData.actualProjects.forEach((proj) => {
      if (
        proj.selectedproject === "" ||
        proj.details.trim() === "" ||
        proj.duration.trim() === "" ||
        proj.units === "" ||
        isNaN(proj.duration) ||
        proj.duration === "0"
      ) {
        isValid = false;
      }
    });
  } else {
    isValid = false;
  }

  return isValid;
}
