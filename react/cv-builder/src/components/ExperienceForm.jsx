import { useState } from "react";
import ModalForm from "./ModalForm";
import Input from "./Input";

export default function ExperienceForm({ isOpen, handleCancel, saveEntry }) {
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [description, setDescription] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    saveEntry({ title: jobTitle, company, from, to, description });
    setJobTitle("");
    setCompany("");
    setFrom("");
    setTo("");
    setDescription("");
  }

  return (
    <ModalForm
      isOpen={isOpen}
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
