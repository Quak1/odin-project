import { useState } from "react";
import ModalForm from "./ModalForm";
import Input from "./Input";

export default function ProfileForm({ isOpen, handleCancel, saveEntry }) {
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [aboutMe, setAboutMe] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    saveEntry({ name: `${first} ${last}`, phone, email, aboutMe });
    setFirst("");
    setLast("");
    setPhone("");
    setEmail("");
    setAboutMe("");
  }

  return (
    <ModalForm
      isOpen={isOpen}
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
