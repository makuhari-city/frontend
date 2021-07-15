import { ITopicData } from "./database";
import { User } from "./user";
import VotingForms from "./VotingForms";
import VotingResults from "./VotingResults";
import TitleBar from "./TitleBar";
import { Link } from "@reach/router";
import ReactMarkdown from "react-markdown";

interface VotingInfoProp {
  info: ITopicData;
  user: User;
  hash: string;
}

const VotingInfo = ({ info, user, hash }: VotingInfoProp) => {
  const getOptions = (): { [to: string]: number } => {
    let options: { [to: string]: number } = {};

    console.log(info);

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
      <TitleBar user={user}/>
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
          <ReactMarkdown className="description">
            {info.description}
          </ReactMarkdown>
        </p>
        <details className="p-2">
          <summary className="p-3 bg-nord-0 bg-opacity-10 border border-nord-3 rounded w-3/5 text-sm">
            投票ルール
          </summary>
          <div className="w-3/5 text-sm p-2">
            <ul className="list-disc list-inside">
              <li className="py-1">
                支持を表明したい政策・委任者に数字を振り分けてください。
              </li>
              <li className="py-1">
                数字が大きいほど支持していることになります。
              </li>
              <li className="py-1">
                同値の項目は順番不問とし、重複を許さない単票多数決・ボルダルールではシステムが得票を任意に振り分けます。
              </li>
              <li className="py-1">
                入力の数字に上限はありません。液体民主主義においては、票は正規化されます。
              </li>
            </ul>
          </div>
          <p className="text-sm p-3">
            <Link to="/app/about/rules/" className="hover:underline text-bold">
              集約ルールについて詳しく。
            </Link>
          </p>
        </details>

        <details open className="p-2">
          <summary className="p-3 bg-nord-0 bg-opacity-10 border border-nord-3 rounded w-3/5 text-sm">
            投票
          </summary>

          <VotingForms
            info={info}
            initialVotes={getOptions()}
            numPolicies={Object.keys(info.policies).length}
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
