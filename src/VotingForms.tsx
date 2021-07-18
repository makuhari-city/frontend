import { User } from "./user";
import {
  updateVote,
  ITopicData,
  IRepresentative,
  fetchRepAll,
  IPolicy,
} from "./database";
import { useState, useEffect } from "react";
import { Link } from "@reach/router";
import ReactMarkdown from "react-markdown";
import "./VotingForms.css";

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
  const [reps, setReps] = useState<{ [id: string]: IRepresentative }>({});
  const [votes, setVotes] = useState(initialVotes);
  const [didVote, setDidVote] = useState(false);
  const [label, setLabel] = useState("投票");

  useEffect(() => {
    const fetchReps = async () => {
      const representatives = await fetchRepAll();
      console.log(representatives);
      if (representatives) {
        setReps(representatives);
      }
    };
    fetchReps();
  }, []);

  const checkNumber = (n: string) => {
    let value: number = parseFloat(n);

    value = Number.isNaN(value) ? 0.0 : value;
    value = value < 0.0 ? 0.0 : value;
    value = value > 100.0 ? 100.0 : value;

    return value;
  };

  const handleChange = (uuid: string) => {
    const handleChangeUuid = (e: React.ChangeEvent<HTMLInputElement>) => {
      let value = checkNumber(e.target.value);
      let newVotes = { ...votes, [uuid]: value };
      setVotes(newVotes);
    };

    return handleChangeUuid;
  };

  const handleIncrementValueButton = (uuid: string, inc: boolean) => {
    const handleIncrement = () => {
      const value = inc ? 1 : -1;

      let newvalue = votes[uuid] + value;

      if (newvalue < 0) {
        newvalue = 0;
      }

      newvalue = newvalue < 0.0 ? 0.0 : newvalue;
      newvalue = newvalue > 100.0 ? 100.0 : newvalue;

      let newvotes = { ...votes, [uuid]: newvalue };
      setVotes(newvotes);
    };

    return handleIncrement;
  };

  const getString = (uuid: string) => {
    return Object.keys(info.delegates).includes(uuid)
      ? info.delegates[uuid]
      : renderPolicy(info.policies[uuid]);
  };

  const renderPolicy = (policy: string) => {
	  const p:IPolicy = JSON.parse(policy);
    console.log(p);
	return (<div className="flex flex-col"><div className="pb-1 font-bold">{p.title}</div><ReactMarkdown className="option text-sm px-2 max-w-prose leading-5 tracking-wider">{p.desc}</ReactMarkdown></div>);
  };

  const renderOptions = () => {
    return Object.keys(votes)
      .filter((k, i) => i < numPolicies)
      .map((k, i) => (
        <>
          {i === 0 ? <p className="my-4">選択肢:</p> : ""}
          <div className="p-3 flex items-center justify-between mb-5 bg-nord-1 bg-opacity-50">
            <div>{getString(k)}</div>
            <div className="flext-shrink-0 inline-flex items-center">
              <button
                className="font-bold px-3 bg-nord-3 border-nord-3 hover:border-nord-4 border rounded-l h-9"
                onClick={handleIncrementValueButton(k, false)}
              >
                -
              </button>
              <input
                className="px-3 py-1 w-12 text-nord-0 bg-nord-4 font-medium h-9"
                onChange={handleChange(k)}
                value={votes[k]}
              />
              <button
                className="font-bold px-3 bg-nord-3 rounded-r h-9 border border-nord-3 hover:border-nord-4"
                onClick={handleIncrementValueButton(k, true)}
              >
                +
              </button>
              <div className="flex-shrink-0 pl-2">/ 100</div>
            </div>
          </div>
        </>
      ));
  };

  const renderRepName = (rep: IRepresentative) => {
    if (rep.link) {
      return (
        <div className="flex flex-col">
          <div className="pb-1 font-bold">
            <a className="underline" href={rep.link!} target="_blank" rel="noopener noreferrer">
              {rep.name}
            </a>
          </div>
          <div className="text-sm px-2 max-w-prose tracking-wider leading-5">{rep.info!}</div>
        </div>
      );
    } else {
      return (
        <div className="flex flex-col flex-shrink">
          <div className="pb-1 font-bold">{rep.name}</div>
          <div className="text-sm px-2 max-w-prose tracking-wider leading-5">{rep.info!}</div>
        </div>
      );
    }
  };

  const renderReps = () =>
    Object.keys(reps)
      .filter((k) => k !== user.uid)
      .map((k) => {
        return (
          <div className="p-3 bg-nord-1 bg-opacity-50 flex items-center justify-between mb-5">
            {renderRepName(reps[k])}
            <div className="inline-flex items-center">
              <button
                className="font-bold px-3 bg-nord-3 rounded-l h-9 border border-nord-3 hover:border-nord-4"
                onClick={handleIncrementValueButton(k, false)}
              >
                -
              </button>
              <input
                className="px-3 py-1 w-12 text-nord-0 bg-nord-4 font-medium h-9"
                onChange={handleChange(k)}
                value={votes[k]}
              />
              <button
                className="font-bold px-3 bg-nord-3 rounded-r h-9 border border-nord-3 hover:border-nord-4"
                onClick={handleIncrementValueButton(k, true)}
              >
                +
              </button>
              <div className="flex-shrink-0 pl-2">/ 100</div>
            </div>
          </div>
        );
      });

  const handleSubmit = () => {
    const update = async () => updateVote(id, user.uid, user.name, votes);
    update();
    setDidVote(true);
    setLabel("更新");
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
    <div className="max-w-screen-md">
      <div className="mb-16">{renderOptions()}</div>
      <div className="mb-16">
        <div>委任者:</div>
        <div className="text-sm mb-3 px-3">
          以下の人にこの議題の結論を100点中どれくらい任せられますか。
        </div>
        <div>{renderReps()}</div>
      </div>
      <div className="flex items-center justify-end">
        {backToList()}
        <button
          className="py-3 px-8 rounded border bg-nord-1 font-bold hover:bg-nord-3 bg-opacity-80 duration-300 ease-in"
          onClick={handleSubmit}
        >
          {label}
        </button>
      </div>
    </div>
  );
};

export default VotingForms;
