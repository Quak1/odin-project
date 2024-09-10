import { useState } from "react";
import ModalForm from "./ModalForm";
import Input from "./Input";

export default function EducationForm({ entry, handleCancel, saveEntry }) {
  const [course, setCourse] = useState(entry.course);
  const [school, setSchool] = useState(entry.school);
  const [from, setFrom] = useState(entry.from);
  const [to, setTo] = useState(entry.to);

  function handleSubmit(e) {
    e.preventDefault();
    saveEntry({ id: entry.id, course, school, from, to });
    setCourse("");
    setSchool("");
    setFrom("");
    setTo("");
    handleCancel();
  }

  return (
    <ModalForm
      title="Education"
      handleSubmit={handleSubmit}
      handleCancel={handleCancel}
    >
      <div>
        <Input id="course" state={[course, setCourse]} required />
        <label htmlFor="course">Course</label>
      </div>
      <div>
        <Input id="school" state={[school, setSchool]} required />
        <label htmlFor="school">School</label>
      </div>
      <div>
        <Input id="from" state={[from, setFrom]} type="date" required />
        <label htmlFor="from">From</label>
      </div>
      <div>
        <Input id="to" state={[to, setTo]} type="date" required />
        <label htmlFor="to">To</label>
      </div>
    </ModalForm>
  );
}
