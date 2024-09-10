export default function ProfileEntry({
  first,
  last,
  phone,
  email,
  aboutMe,
  openForm,
  showEdit,
}) {
  return (
    <header>
      <h1>
        {first} {last}
      </h1>
      {showEdit && (
        <button type="button" onClick={() => openForm("0")}>
          Edit
        </button>
      )}
      <p>{phone}</p>
      <p>{email}</p>
      <p>{aboutMe}</p>
    </header>
  );
}
