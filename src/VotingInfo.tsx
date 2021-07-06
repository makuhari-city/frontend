import { ITopicData } from "./database";
import { User } from "./user";
import VotingForms from "./VotingForms";
import VotingResults from "./VotingResults";
import TitleBar from "./TitleBar";
import Canvas from "./Canvas";

interface VotingInfoProp {
  info: ITopicData;
  user: User;
  hash: string;
}

const VotingInfo = ({ info, user, hash }: VotingInfoProp) => {

  const getOptions = (): { [to: string]: number } => {
    let options: { [to: string]: number } = {};
	
	Object.keys(info.delegates).forEach((to) => (options[to] = 0.0));

	Object.keys(info.policies).forEach((to) => (options[to]=0.0));

    // fill in the current value
    const userVotes = info.votes[user.uid];
    if (userVotes) {
      Object.keys(userVotes).forEach((to) => (options[to] = userVotes[to]));
    }

    return options;
  };

  return (
    <>
      <TitleBar />
      <div className="container max-w-screen-lg mx-auto">
        <h1 className="font-bold p-2">{info.title}</h1>
		  <details className="text-sm p-2 mb-4" ><summary className="p-3 bg-nord-0 bg-opacity-10 border border-nord-3 rounded w-3/5">Details</summary>
			  <p className="bg-nord-0 bg-opacity-90 text-xs p-3 mt-3 rounded w-3/5">
		  {info.description}
				  </p>
		  </details>
		  <details open className="p-2">
<summary className="p-3 bg-nord-0 bg-opacity-10 border border-nord-3 rounded w-3/5 text-sm">Votes</summary>

        <VotingForms votes={getOptions()} user={user} id={info.id} />
		  </details>
        <VotingResults info={info} hash={hash} />
      </div>
      <Canvas />
    </>
  );
};

export default VotingInfo;
