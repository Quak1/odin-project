import DeleteIcon from "../icons/DeleteIcon";
import EditIcon from "../icons/EditIcon";
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
      <div className="title space-between">
        <h3>{title}</h3>
        {showEdit && (
          <div className="buttons">
            <button
              className="icon-button"
              type="button"
              onClick={() => openForm(id)}
            >
              <EditIcon />
            </button>
            <button
              className="icon-button"
              type="button"
              onClick={() => deleteEntry(id)}
            >
              <DeleteIcon />
            </button>
          </div>
        )}
      </div>
      {children}
    </div>
  );
}
