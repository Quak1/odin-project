import EditIcon from "../icons/EditIcon";
import PhoneIcon from "../icons/PhoneIcon";
import EmailIcon from "../icons/EmailIcon";
import "../styles/profile.css";

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
    <header className="profile">
      <div className="info">
        <div className="name space-between">
          <h1>
            {first} {last}
          </h1>
          {showEdit && (
            <button
              className="icon-button"
              type="button"
              onClick={() => openForm("0")}
            >
              <EditIcon />
            </button>
          )}
        </div>
        <p>
          <PhoneIcon />
          {phone} | <EmailIcon />
          {email}
        </p>
      </div>
      <h2>About Me</h2>
      <p className="about">{aboutMe}</p>
    </header>
  );
}
