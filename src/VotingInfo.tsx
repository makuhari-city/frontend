import { IVoteInfo } from "./database";
import { User } from "./user";
import VotingForms from "./VotingForms";
import VotingResults from "./VotingResults";
import TitleBar from "./TitleBar";
import Canvas from "./Canvas";

interface VotingInfoProp {
  info: IVoteInfo;
  user: User;
  hash: string;
}

const VotingInfo = ({ info, user, hash }: VotingInfoProp) => {

  const getOptions = (): { [to: string]: number } => {
    let options: { [to: string]: number } = {};

    if (info.method === "liquid") {
      // when it's liquid democracy, voters can cast votes to participatants
      let delegates = Object.keys(info.params.voters);
      let combined = delegates.concat(
        Object.values(info.params.voters)
          .map((v) => Object.keys(v))
          .flat()
      );

      const unique = Array.from(new Set(combined)).filter(
        (d) => d !== user.name
      );
      unique.forEach((d) => (options[d] = 0.0));
    } else {
      // when if it's not, we just enumerate the policies
      const policiesDup = Object.values(info.params.voters)
        .map((v) => Object.keys(v))
        .flat();
      const policies = Array.from(new Set(policiesDup));
      policies.forEach((p) => (options[p] = 0.0));
    }

    // fill in the current value
    const userVotes = info.params.voters[user.name];
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

        <VotingForms votes={getOptions()} user={user} uid={info.uid} />
		  </details>
        <VotingResults info={info} hash={hash} />
      </div>
      <Canvas />
    </>
  );
};

export default VotingInfo;
