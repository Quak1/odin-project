export default function EntriesDisplay({
  title,
  entries,
  EntryComponent,
  deleteEntry,
  openForm,
  showEdit,
}) {
  return (
    <div>
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
      {showEdit && <button onClick={() => openForm()}>+ Add</button>}
    </div>
  );
}
