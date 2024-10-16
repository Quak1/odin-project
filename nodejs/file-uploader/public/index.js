const editFolderForm = document.getElementById("editFolderForm");
document.querySelectorAll(".editFolderBtn").forEach((button) => {
  button.addEventListener("click", () => {
    editFolderForm.querySelector("#newName").value = button.dataset.name;
    editFolderForm.querySelector("form").action =
      `/folder/${button.dataset.id}`;
    editFolderForm.showModal();
  });
});

document.getElementById("createFolderBtn")?.addEventListener("click", () => {
  document.getElementById("newFolderForm").showModal();
});

document.getElementById("uploadBtn")?.addEventListener("click", () => {
  document.getElementById("uploadFileForm").showModal();
});

document.querySelectorAll(".deleteBtn").forEach((button) =>
  button.addEventListener("click", async () => {
    const type = button.dataset.type;
    const id = button.dataset.id;
    if (confirm(`Are you sure you want to delete this ${type}?`)) {
      const res = await fetch(`/${type}/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) alert(`There was an error deleting this ${type}.`);
      else if (type === "file") window.location = document.referrer;
      else window.location.reload();
    }
  }),
);
