export default function Profile({ name, phone, email, aboutMe }) {
  return (
    <header>
      <h1>{name}</h1>
      <p>{phone}</p>
      <p>{email}</p>
      <p>{aboutMe}</p>
    </header>
  );
}
