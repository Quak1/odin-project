export default function Form({ title, children, handleSubmit, handleCancel }) {
  return (
    <form action="" onSubmit={handleSubmit}>
      <h2>{title}</h2>
      <hr />
      {children}
      <button type="button" onClick={handleCancel}>
        Cancel
      </button>
      <button type="submit">Save</button>
    </form>
  );
}
