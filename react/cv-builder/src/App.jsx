import { useState } from "react";

import data from "./assets/default.json";
import EntriesDisplay from "./components/EntriesDisplay";
import ProfileEntry from "./components/ProfileEntry";
import ProfileForm from "./components/ProfileForm";
import EducationEntry from "./components/EducationEntry";
import EducationForm from "./components/EducationForm";
import ExperienceEntry from "./components/ExperienceEntry";
import ExperienceForm from "./components/ExperienceForm";

function App() {
  const [profileData, setProfileData] = useState(data.profile);
  const [experienceData, setExperienceData] = useState(data.experience);
  const [educationData, setEducationData] = useState(data.education);
  const [activeForm, setActiveForm] = useState({ type: "", id: null });
  const [showEdit, setShowEdit] = useState(true);

  const callerByType = (type, fn) => {
    if (type === "profile") return fn(profileData, setProfileData);
    else if (type === "education") return fn(educationData, setEducationData);
    else if (type === "experience")
      return fn(experienceData, setExperienceData);
  };

  function saveEntry(data, setter) {
    return function (entry) {
      if (entry.id) {
        setter(
          data.map((current) => (current.id === entry.id ? entry : current)),
        );
      } else {
        entry.id = crypto.randomUUID();
        setter([...data, entry]);
      }
    };
  }

  function deleteEntry(data, setter) {
    return function (id) {
      setter(data.filter((entry) => entry.id !== id));
    };
  }

  const openForm = (type) => {
    return function (id = null) {
      setActiveForm({ type, id });
    };
  };

  const cancelForm = () => setActiveForm({ type: "", id: null });

  const getEntry = (data) =>
    activeForm.id ? data.find((entry) => entry.id === activeForm.id) : {};

  console.log(activeForm, showEdit);

  return (
    <>
      <button type="button" onClick={() => setShowEdit(!showEdit)}>
        Toggle edit
      </button>
      <ProfileEntry
        {...profileData[0]}
        openForm={openForm("profile")}
        showEdit={showEdit}
      />
      <EntriesDisplay
        title="Experience"
        entries={experienceData}
        EntryComponent={ExperienceEntry}
        deleteEntry={callerByType("experience", deleteEntry)}
        openForm={openForm("experience")}
        showEdit={showEdit}
      />
      <EntriesDisplay
        title="Education"
        entries={educationData}
        EntryComponent={EducationEntry}
        deleteEntry={callerByType("education", deleteEntry)}
        openForm={openForm("education")}
        showEdit={showEdit}
      />

      {activeForm.type === "profile" && (
        <ProfileForm
          handleCancel={cancelForm}
          saveEntry={callerByType("profile", saveEntry)}
          entry={callerByType("profile", getEntry)}
        />
      )}
      {activeForm.type === "experience" && (
        <ExperienceForm
          handleCancel={cancelForm}
          saveEntry={callerByType("experience", saveEntry)}
          entry={callerByType("experience", getEntry)}
        />
      )}
      {activeForm.type === "education" && (
        <EducationForm
          handleCancel={cancelForm}
          saveEntry={callerByType("education", saveEntry)}
          entry={callerByType("education", getEntry)}
        />
      )}
    </>
  );
}

export default App;
