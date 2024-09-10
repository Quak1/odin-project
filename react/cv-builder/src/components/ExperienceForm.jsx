import { useState } from "react";
import ModalForm from "./ModalForm";
import Input from "./Input";

export default function ExperienceForm({ entry, handleCancel, saveEntry }) {
  const [jobTitle, setJobTitle] = useState(entry.title);
  const [company, setCompany] = useState(entry.company);
  const [from, setFrom] = useState(entry.from);
  const [to, setTo] = useState(entry.to);
  const [description, setDescription] = useState(entry.description);

  function handleSubmit(e) {
    e.preventDefault();
    saveEntry({
      id: entry.id,
      title: jobTitle,
      company,
      from,
      to,
      description,
    });
    setJobTitle("");
    setCompany("");
    setFrom("");
    setTo("");
    setDescription("");
    handleCancel();
  }

  return (
    <ModalForm
      title="Experience"
      handleSubmit={handleSubmit}
      handleCancel={handleCancel}
    >
      <label>
        Job title
        <Input state={[jobTitle, setJobTitle]} required />
      </label>
      <label>
        Company
        <Input state={[company, setCompany]} required />
      </label>
      <label>
        From
        <Input state={[from, setFrom]} type="date" required />
      </label>
      <label>
        To
        <Input state={[to, setTo]} type="date" required />
      </label>
      <label>
        Description
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
    </ModalForm>
  );
}
