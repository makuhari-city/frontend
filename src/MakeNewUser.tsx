import { useState } from "react";
import { createUser, saveUser, User } from "./user";
import TitleBar from "./TitleBar";
import Canvas from "./Canvas";

const MakeNewUser = () => {
  const [newUser, setNewUser] = useState<undefined | User>();
  const [nameInput, setNameInput] = useState("");
  const [isUserSaved, setIsUserSaved] = useState(false);
  const [color, setColor] = useState("#eceff4");

  const handleKey = (event: { key: string }) => {
    if (event.key === "Enter") {
      addUser(nameInput);
    }
  };

  const addUser = (name: string) => {
    if (name !== "") {
      const user = createUser(name);
      saveUser(user); // saves this to local storage
	  setNewUser(user);
      setIsUserSaved(true);
	  setColor(`#${user.uid.substring(0,5)}`);
	  setNameInput("");
    } else {
      console.error("username is empty");
    }
  };

  const handleChange = (value: string) => {
    setNameInput(value);
  };

  return (
    <>
      <TitleBar />
      <div className="container mx-auto px-6 py-16 max-w-screen-lg bg-nord-0 bg-opacity-90 rounded">
        <div className="font-bold mb-3">Citizen Registration 住民登録</div>
		  <div className="font-thin text-xs mb-8">幕張市プロジェクト参加には住民登録が必要です。</div>

        <div className="grid grid-cols-2 w-3/5 justify-items-end">
			<div className="self-center">username:</div>
          <div>
            <input
              type="text"
              placeholder="johndoe"
              name="name"
				value={nameInput}
              className="px-6 py-3 placeholder-gray-400 text-nord-0 relative bg-nord-4 rounded text-sm border border-nord-1 outline-none focus:outline-none focus:ring"
              onKeyUp={handleKey}
              onChange={(e) => handleChange(e.target.value)}
            />
          </div>
        </div>

        <div className="w-3/5 grid justify-items-end mt-16">
          <button
            onClick={() => {
              addUser(nameInput);
            }}
            className="transition duration-150 ease-in bg-nord-1 hover:bg-nord-2 text-nord-4 border border-nord-5 font-bold py-2 px-6 rounded"
          >
            register
          </button>
        </div>

        {isUserSaved && (
          <div className="w-3/5 grid grid-justify-items-end">
			<div className="text-nord-9 my-4">
				'{newUser!.name}' created with id <span style={{color:`${{color}}`}}>{newUser!.uid.substring(0,6)}</span>
			</div>
            <a href="./" className="ease-in duration-150 bg-nord-1 hover:bg-nord-2 text-nord-4 font-bold py-2 px-6 rounded text-center" >go to list</a>
          </div>
        )}
      </div>
      <Canvas />
    </>
  );
};

export default MakeNewUser;
