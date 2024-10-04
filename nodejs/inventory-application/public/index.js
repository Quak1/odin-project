function addDeleteFunction(btn, type, cb, msg = "") {
  const id = btn.dataset.id;
  btn.addEventListener("click", async () => {
    if (
      confirm(
        `Are you sure you want to delete this ${type}? 
${msg}
This action cannot be undone.`,
      )
    ) {
      const res = await fetch(`/${type}s/${id}`, { method: "DELETE" });
      if (res.ok) cb();
      else alert(`Failed to delete ${type}.`);
    }
  });
}

console.log("loaded");
