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
      <div>
        <Input id="first-name" state={[first, setFirst]} required />
        <label htmlFor="first-name">First name</label>
      </div>
      <div>
        <Input id="last-name" state={[last, setLast]} required />
        <label htmlFor="last-name">Last name</label>
      </div>
      <div>
        <Input id="phone-number" state={[phone, setPhone]} type="tel" />
        <label htmlFor="phone-number">Phone number</label>
      </div>
      <div>
        <Input id="email" state={[email, setEmail]} type="email" required />
        <label htmlFor="email">Email</label>
      </div>
      <div>
        <textarea
          id="about-me"
          value={aboutMe}
          onChange={(e) => setAboutMe(e.target.value)}
          placeholder=""
          rows={7}
        />
        <label htmlFor="about-me">About me</label>
      </div>
    </ModalForm>
  );
}
