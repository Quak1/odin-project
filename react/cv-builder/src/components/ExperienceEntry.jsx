export default function ExperienceEntry({
  id,
  title,
  company,
  from,
  to,
  description,
  deleteEntry,
  openForm,
}) {
  return (
    <div>
      <h3>{title}</h3>
      <button type="button" onClick={() => openForm(id)}>
        Edit
      </button>
      <button type="button" onClick={() => deleteEntry(id)}>
        Delete
      </button>
      <p>{company}</p>
      <p>
        {from} - {to}
      </p>
      {description && (
        <ul>
          {description.split("\n").map((entry) => (
            <li key={entry}>{entry}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
