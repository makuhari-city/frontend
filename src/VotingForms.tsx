import { User } from "./user";
import { updateVote, ITopicData } from "./database";
import { useState } from "react";
import { Link } from "@reach/router";

interface VotingFormsProps {
  info: ITopicData;
  initialVotes: { [to: string]: number };
  numPolicies: number;
  user: User;
  id: string;
}

const VotingForms = ({
  info,
  initialVotes,
  numPolicies,
  user,
  id,
}: VotingFormsProps) => {
  const [votes, setVotes] = useState(initialVotes);
  const [didVote, setDidVote] = useState(false);
  const [label, setLabel] = useState("投票する");

  const getString = (uuid: string): string => {
    return Object.keys(info.delegates).includes(uuid)
      ? info.delegates[uuid]
      : info.policies[uuid];
  };

  const handleChange = (uuid: string) => {
    const handeChangeUuid = (e: React.ChangeEvent<HTMLInputElement>) => {
      let value = parseFloat(e.target.value);

      if (!value) {
        value = 0.0;
      }

      if (value < 1) {
        value = 0.0;
      }

      let newVotes = { ...votes, [uuid]: value };
      setVotes(newVotes);
    };

    return handeChangeUuid;
  };

  const handleIncrementValueButton = (uuid: string, inc: boolean) => {
    const handleIncrement = () => {
      const value = inc ? 1 : -1;

      let newvalue = votes[uuid] + value;

      if (newvalue < 0) {
        newvalue = 0;
      }

      let newvotes = { ...votes, [uuid]: newvalue };
      setVotes(newvotes);
    };

    return handleIncrement;
  };

  const renderOptions = () => {
    return Object.keys(votes).map((k, i) => (
      <>
        {i === 0 ? <p className="text-sm mt-4">オプション:</p> : ""}
        {i === numPolicies ? <p className="text-sm mt-8">委任:</p> : ""}
        <div className="ml-3 mb-3 p-2 flex flex-row bg-nord-0 bg-opacity-50 rounded">
          <div className="flex items-center justify-center font-medium">
            {getString(k)}
          </div>
          <div className="flex-grow"></div>
          <div className="inline-flex">
            <button
              className="font-bold px-3 bg-nord-1 hover:bg-nord-3 rounded-l"
              onClick={handleIncrementValueButton(k, false)}
            >
              -
            </button>
            <input
              className="px-3 py-1 w-12 text-nord-0 bg-nord-4 font-medium"
              onChange={handleChange(k)}
              value={votes[k]}
            />
            <button
              className="font-bold px-3 bg-nord-1 hover:bg-nord-3 rounded-r"
              onClick={handleIncrementValueButton(k, true)}
            >
              +
            </button>
          </div>
        </div>
      </>
    ));
  };

  const handleSubmit = () => {
    const update = async () => updateVote(id, user.uid, user.name, votes);
    update();
    setDidVote(true);
    setLabel("更新する");
  };

  const backToList = () => {
    if (didVote) {
      return (
        <Link to="/app/list/" className="hover:underline pr-8">
          リストに戻る
        </Link>
      );
    }
  };

  return (
    <div className="container mx-auto max-w-screen-lg p-3">
      <div className="w-3/5">{renderOptions()}</div>
      <div className="mt-3 w-3/5 flex items-center justify-end">
        {backToList()}
        <button
          className="p-2 rounded border bg-nord-9 font-bold text-nord-0 hover:bg-nord-10 bg-opacity-80 duration-500 ease-in"
          onClick={handleSubmit}
        >
          {label}
        </button>
      </div>
    </div>
  );
};

export default VotingForms;
