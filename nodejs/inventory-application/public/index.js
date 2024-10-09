function addDeleteFunction(btn, type, cb, msg = "") {
  const id = btn.dataset.id;
  btn.addEventListener("click", async () => {
    const adminPwd = prompt(
      msg +
        "\nThis action cannot be undone." +
        "\nEnter admin password to delete this " +
        type +
        ":",
    );

    const res = await fetch(`/${type}s/${id}`, {
      method: "DELETE",
      body: JSON.stringify({ adminPwd }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) cb();
    else {
      const info = await res.json();
      const errors = info.errors.map((error) => error.msg).join("\n");
      alert(`Failed to delete ${type}.\n` + errors);
    }
  });
}
