import DeleteIcon from "./DeleteIcon";
import EditIcon from "./EditIcon";
import "../styles/entry.css";

export default function Entry({
  id,
  title,
  deleteEntry,
  openForm,
  showEdit,
  children,
}) {
  return (
    <div className="entry">
      <div className="title">
        <h3>{title}</h3>
        {showEdit && (
          <div className="buttons">
            <button type="button" onClick={() => openForm(id)}>
              <EditIcon />
            </button>
            <button type="button" onClick={() => deleteEntry(id)}>
              <DeleteIcon />
            </button>
          </div>
        )}
      </div>
      {children}
    </div>
  );
}
