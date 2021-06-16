import { IVoteInfo } from "./database";
import { User } from "./user";
import VotingForms from "./VotingForms";
import VotingResults from "./VotingResults";
import NavBar from "./NavBar";

interface VotingInfoProp {
  info: IVoteInfo;
  user: User;
  hash: string;
}

const VotingInfo = ({ info, user, hash }: VotingInfoProp) => {
  const icon = info.method === "liquid" ? "🌊" : "💠";

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
      <NavBar user={user} />
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold p-2">{info.title}</h1>
        <h2 className="text-1xl font-semi-bold p-2">{info.description}</h2>
        <p>{info.parent || ""}</p>
        <p>{icon}</p>
        <VotingForms votes={getOptions()} user={user} uid={info.uid} />
        <VotingResults info={info} hash={hash} />
      </div>
    </>
  );
};

export default VotingInfo;
