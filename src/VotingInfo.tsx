import { ITopicData } from "./database";
import { User } from "./user";
import VotingForms from "./VotingForms";
import VotingResults from "./VotingResults";
import TitleBar from "./TitleBar";
import { Link } from "@reach/router";
import { useState } from "react";
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
        <p className="bg-nord-0 bg-opacity-90 text-sm p-3 mt-3 rounded w-3/5">
          {info.description}
        </p>
        <details open className="p-2">
          <summary className="p-3 bg-nord-0 bg-opacity-10 border border-nord-3 rounded w-3/5 text-sm">
            Votes
          </summary>

          <VotingForms
            info={info}
            initialVotes={getOptions()}
            numPolicies={Object.keys(info.policies).length}
            user={user}
            id={info.id}
          />

          <div className="mt-3 py-3 px-3 w-3/5">
            <p className="text-xs">
              &lt;投票方法&gt;
              <br />
              支持に応じて数字を振り分けてください。数字が大きいほど支持していることになります。代議員についても同じように投票してください。同じ数字の場合は順番不問とし、システムにより任意に判断されます。
              <Link
                to="/app/about/rules/"
                className="hover:underline text-bold"
              >
                集約ルールについて詳しく。
              </Link>
            </p>
          </div>
        </details>
        <VotingResults info={info} hash={hash} />
      </div>
      {/*<Canvas />*/}
    </>
  );
};

export default VotingInfo;
