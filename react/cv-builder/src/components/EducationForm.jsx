import { useEffect, useState } from "react";
import ModalForm from "./ModalForm";
import Input from "./Input";

export default function EducationForm({
  isOpen,
  entry,
  handleCancel,
  saveEntry,
}) {
  const [course, setCourse] = useState("");
  const [school, setSchool] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  useEffect(() => {
    setCourse(entry.course || "");
    setSchool(entry.school || "");
    setFrom(entry.from || "");
    setTo(entry.to || "");
  }, [entry]);

  function handleSubmit(e) {
    e.preventDefault();
    saveEntry({ id: entry.id, course, school, from, to });
    setCourse("");
    setSchool("");
    setFrom("");
    setTo("");
  }

  return (
    <ModalForm
      isOpen={isOpen}
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
