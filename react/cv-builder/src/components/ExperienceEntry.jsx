import Entry from "./Entry";
import { formatDate } from "../date";

export default function ExperienceEntry({
  id,
  title,
  company,
  from,
  to,
  description,
  deleteEntry,
  openForm,
  showEdit,
}) {
  return (
    <Entry
      id={id}
      title={title}
      deleteEntry={deleteEntry}
      openForm={openForm}
      showEdit={showEdit}
    >
      <p>
        {company} | {formatDate(from)} - {formatDate(to)}
      </p>
      {description && (
        <ul>
          {description
            .split("\n")
            .filter((entry) => entry !== "")
            .map((entry) => (
              <li key={entry}>{entry}</li>
            ))}
        </ul>
      )}
    </Entry>
  );
}
