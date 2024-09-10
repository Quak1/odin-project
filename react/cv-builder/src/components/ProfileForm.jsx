import { useState } from "react";
import ModalForm from "./ModalForm";
import Input from "./Input";

export default function ProfileForm({ entry, handleCancel, saveEntry }) {
  const [first, setFirst] = useState(entry.first);
  const [last, setLast] = useState(entry.last);
  const [phone, setPhone] = useState(entry.phone);
  const [email, setEmail] = useState(entry.email);
  const [aboutMe, setAboutMe] = useState(entry.aboutMe);

  function handleSubmit(e) {
    e.preventDefault();
    saveEntry({ id: entry.id, first, last, phone, email, aboutMe });
    setFirst("");
    setLast("");
    setPhone("");
    setEmail("");
    setAboutMe("");
    handleCancel();
  }

  return (
    <ModalForm
      title="Profile"
      handleSubmit={handleSubmit}
      handleCancel={handleCancel}
    >
      <label>
        First name
        <Input state={[first, setFirst]} required />
      </label>
      <label>
        Last name
        <Input state={[last, setLast]} required />
      </label>
      <label>
        Phone number
        <Input state={[phone, setPhone]} type="tel" />
      </label>
      <label>
        Email
        <Input state={[email, setEmail]} type="email" required />
      </label>
      <label>
        About me
        <textarea
          value={aboutMe}
          onChange={(e) => setAboutMe(e.target.value)}
        />
      </label>
    </ModalForm>
  );
}
