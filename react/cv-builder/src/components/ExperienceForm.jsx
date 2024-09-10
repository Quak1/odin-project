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
      <div>
        <Input id="job-title" state={[jobTitle, setJobTitle]} required />
        <label htmlFor="job-title">Job title</label>
      </div>
      <div>
        <Input id="company" state={[company, setCompany]} required />
        <label htmlFor="company">Company</label>
      </div>
      <div>
        <Input id="from" state={[from, setFrom]} type="date" required />
        <label htmlFor="from">From</label>
      </div>
      <div>
        <Input id="to" state={[to, setTo]} type="date" required />
        <label htmlFor="to">To</label>
      </div>
      <div>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={7}
        />
        <label htmlFor="description">Description</label>
      </div>
    </ModalForm>
  );
}
