import { useState } from "react";

import data from "./assets/default.json";
import Profile from "./components/Profile";
import EntriesDisplay from "./components/EntriesDisplay";
import EducationEntry from "./components/EducationEntry";
import ExperienceEntry from "./components/ExperienceEntry";
import ExperienceForm from "./components/ExperienceForm";
import EducationForm from "./components/EducationForm";
import ProfileForm from "./components/ProfileForm";

function App() {
  const [profileData, setProfileData] = useState(data.profile);
  const [experienceData, setExperienceData] = useState(data.experience);
  const [educationData, setEducationData] = useState(data.education);
  const [activeForm, setActiveForm] = useState("");
  const [activeId, setActiveId] = useState();

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
    return function (id) {
      setActiveForm(type);
      setActiveId(id);
    };
  };

  console.log({ educationData });

  return (
    <>
      <Profile {...profileData} />
      <EntriesDisplay
        title="Experience"
        entries={experienceData}
        EntryComponent={ExperienceEntry}
        deleteEntry={callerByType("experience", deleteEntry)}
        openForm={openForm("experience")}
      />
      <EntriesDisplay
        title="Education"
        entries={educationData}
        EntryComponent={EducationEntry}
        deleteEntry={callerByType("education", deleteEntry)}
        openForm={openForm("education")}
      />

      {activeForm === "profile" && <ProfileForm />}
      {activeForm === "experience" && <ExperienceForm />}
      {activeForm === "education" && <EducationForm />}
    </>
  );
}

export default App;
