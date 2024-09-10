export default function EducationEntry({
  id,
  course,
  school,
  from,
  to,
  deleteEntry,
  openForm,
}) {
  return (
    <div>
      <h3>{course}</h3>
      <button type="button" onClick={() => openForm(id)}>
        Edit
      </button>
      <button type="button" onClick={() => deleteEntry(id)}>
        Delete
      </button>
      <p>{school}</p>
      <p>
        {from} - {to}
      </p>
    </div>
  );
}
