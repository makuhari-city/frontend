import { User } from "./user";
import { updateVote } from "./database";
import VotingItem from "./VotingItem";

interface VotingFormsProps {
  votes: { [to: string]: number };
  user: User;
  id: string;
}

const VotingForms = ({ votes, user, id }: VotingFormsProps) => {
  const initialValues = {
    votes: Object.keys(votes).map((v) => ({
      to: v,
      value: votes[v],
    })),
  };

  const renderOptions = () => {
    return Object.keys(votes).map((k) => (
      <div className="ml-3 mb-3 p-2 flex flex-row bg-nord-0 bg-opacity-50 rounded">
        <div className="flex items-center justify-center font-medium">{k}</div>
        <div className="flex-grow"></div>
        <div className="inline-flex">
          <button className="font-bold px-3 bg-nord-1 hover:bg-nord-3 rounded-l">
            -
          </button>
          <input
            className="px-3 py-1 w-12 text-nord-0 bg-nord-4 font-medium"
            value={votes[k]}
          />
          <button className="font-bold px-3 bg-nord-1 hover:bg-nord-3 rounded-r">
            +
          </button>
          <button className="rounded px-3 ml-3 bg-nord-11 bg-opacity-70 hover:bg-opacity-90">
            x
          </button>
        </div>
      </div>
    ));
  };

  const handleSubmit = (values: { votes: any[] }) => {
    const filtered = values.votes
      .filter((v) => v.to !== "")
      .filter((v) => v.value !== 0.0)
      .map((v) => ({ to: v.to, value: parseFloat(v.value) }))
      .filter((v) => !isNaN(v.value));
    let formatted: { [to: string]: number } = {};
    filtered.forEach((v) => (formatted[v.to] = v.value));
    const update = async () => {
      await updateVote(id, user.uid, user.name, formatted);
      window.location.reload(true);
    };
    update();
    // window.location.reload(true);
  };

  return (
    <div className="container mx-auto max-w-screen-lg p-3">
      <div className="w-3/5">{renderOptions()}</div>
		<div className="w-3/5 grid justify-items-end"><button className="p-2 rounded bg-nord-0 hover:bg-nord-2">Add New Option</button></div>
		<div className="mt-3 w-3/5 grid justify-items-end"><button className="p-2 rounded border bg-nord-9 font-bold text-nord-0 hover:bg-nord-10 bg-opacity-80 duration-500 ease-in">Update vote</button></div>
    </div>
  );
};

export default VotingForms;
