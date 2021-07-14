import { RouteComponentProps, Redirect, Link } from "@reach/router";
import { useState } from "react";
import { User, saveUser } from "./user";
import TitleBar from "./TitleBar";

interface TakeUuidProps extends RouteComponentProps {
  Uuid?: string;
}

const TakeUuid = (props: TakeUuidProps) => {
  const [name, setName] = useState("");
  const [isSet, setIsSet] = useState(false);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value.trim());
  };

  const changeUser = () => {
    if (name !== "" && props.Uuid) {
      const user: User = { uid: props.Uuid!, name };
      saveUser(user);
      console.log(`set user ${user.uid.substring(0, 5)}, name:${user.name}`);
      setName("");
	  setIsSet(true);
    }
  };

  const backButton = () => {
	  if(isSet) {
		  return(<Link to="/app/list/" className="hover:underline">リストに戻る</Link>)
	  }
  };

  if (!props.Uuid) {
    return <Redirect to="/app/" noThrow />;
  }

  return (
    <>
      <TitleBar />
      <div className="container max-w-screen-lg mx-auto">
        <div className="w-3/5">
          <h1 className="p-2">ユーザー名設定</h1>
          <div className="p-2 text-xs py-2">
            setting user name for id:{props.Uuid!.substring(0, 6)}
          </div>
          <input
            onChange={handleNameChange}
            value={name}
            placeholder="お名前"
            className="m-2 p-3 rounded font-bold text-nord-0"
          />
          <div className="p-2 text-xs pb-5">
            本名である必要はありませんが、他の人があなたに委任する時に特定しやすい名前にしてください。投票集約計算時は名前は紐付けされていません。
          </div>

			<button onClick={changeUser} className="font-bold px-2 py-2 m-2 bg-nord-1 rounded hover:bg-nord-3">set user</button>
			{backButton()}
        </div>
      </div>
    </>
  );
};

export default TakeUuid;
