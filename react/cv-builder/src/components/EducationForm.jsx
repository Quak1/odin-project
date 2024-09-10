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
      <label>
        Course
        <Input state={[course, setCourse]} required />
      </label>
      <label>
        School
        <Input state={[school, setSchool]} required />
      </label>
      <label>
        From
        <Input state={[from, setFrom]} type="date" required />
      </label>
      <label>
        To
        <Input state={[to, setTo]} type="date" required />
      </label>
    </ModalForm>
  );
}
