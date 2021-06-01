import { useState } from "react";
import { createUser, saveUser } from "./user";

const MakeNewUser = () => {
  const [newName, setNewName] = useState<string>("");
  const [isUserSaved, setIsUserSaved] = useState(false);

  const handleKey = (event: { key: string }) => {
    if (event.key === "Enter") {
      if (newName !== "") {
        const user = createUser(newName);
        saveUser(user);
        setIsUserSaved(true);
      }
    }
  };

  const handleChange = (value: string) => {
    setNewName(value);
  };

  return (
    <div>
      Hello New User !
      <input
        type="text"
        placeholder="new Name"
        name="name"
        onKeyUp={handleKey}
        onChange={(e) => handleChange(e.target.value)}
      />
      {isUserSaved && <a href="./"> see list</a>}
    </div>
  );
};

export default MakeNewUser;
