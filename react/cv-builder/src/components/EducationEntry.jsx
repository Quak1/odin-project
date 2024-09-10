import Entry from "./Entry";
import { formatDate } from "../date";

export default function EducationEntry({
  id,
  course,
  school,
  from,
  to,
  deleteEntry,
  openForm,
  showEdit,
}) {
  return (
    <Entry
      id={id}
      title={course}
      deleteEntry={deleteEntry}
      openForm={openForm}
      showEdit={showEdit}
    >
      <p>{school}</p>
      <p>
        {formatDate(from)} - {formatDate(to)}
      </p>
    </Entry>
  );
}
