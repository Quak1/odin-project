import "../styles/form.css";

export default function Form({ title, children, handleSubmit, handleCancel }) {
  return (
    <form action="" onSubmit={handleSubmit}>
      <h2>{title}</h2>
      <hr />
      {children}
      <div className="buttons">
        <button className="basic-button" type="button" onClick={handleCancel}>
          Cancel
        </button>
        <button className="basic-button" type="submit">
          Save
        </button>
      </div>
    </form>
  );
}
