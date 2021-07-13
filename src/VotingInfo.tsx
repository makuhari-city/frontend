import { ITopicData } from "./database";
import { User } from "./user";
import VotingForms from "./VotingForms";
import VotingResults from "./VotingResults";
import TitleBar from "./TitleBar";
import { Link } from "@reach/router";
// import Canvas from "./Canvas";

interface VotingInfoProp {
  info: ITopicData;
  user: User;
  hash: string;
}

const VotingInfo = ({ info, user, hash }: VotingInfoProp) => {
  const getOptions = (): { [to: string]: number } => {
    let options: { [to: string]: number } = {};

    Object.keys(info.policies).forEach((to) => (options[to] = 0.0));
    Object.keys(info.delegates).forEach((to) => (options[to] = 0.0));

    // fill in the current value
    const userVotes = info.votes[user.uid];
    if (userVotes) {
      Object.keys(userVotes).forEach((to) => (options[to] = userVotes[to]));
    }

    delete options[user.uid];

    return options;
  };

  return (
    <>
      <TitleBar />
      <div className="container max-w-screen-lg mx-auto">
        <div className="flex w-3/5 p-2">
          <h1 className="flex-none font-bold">{info.title}</h1>
			<div className="flex-grow"></div>
          <div className="flex-none">
            <Link to="edit" className="hover:underline text-xs">
              edit
            </Link>
          </div>
        </div>
          <p className="bg-nord-0 bg-opacity-90 text-xs p-3 mt-3 rounded w-3/5">
            {info.description}
          </p>
        <details open className="p-2">
          <summary className="p-3 bg-nord-0 bg-opacity-10 border border-nord-3 rounded w-3/5 text-sm">
            Votes
          </summary>

          <VotingForms
            info={info}
            initialVotes={getOptions()}
            user={user}
            id={info.id}
          />
        </details>
        <VotingResults info={info} hash={hash} />
      </div>
      {/*<Canvas />*/}
    </>
  );
};

export default VotingInfo;
