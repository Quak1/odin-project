export default function EntriesDisplay({
  title,
  entries,
  EntryComponent,
  deleteEntry,
  openForm,
  showEdit,
}) {
  return (
    <div className="container">
      <h2>{title}</h2>
      {entries.map((entry) => (
        <EntryComponent
          key={entry.id}
          {...entry}
          deleteEntry={deleteEntry}
          openForm={openForm}
          showEdit={showEdit}
        />
      ))}
      {showEdit && (
        <button className="basic-button" onClick={() => openForm()}>
          + Add
        </button>
      )}
    </div>
  );
}
