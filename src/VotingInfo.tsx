import { ITopicData } from "./database";
import { User } from "./user";
import VotingForms from "./VotingForms";
import VotingResults from "./VotingResults";
import { Link } from "@reach/router";
import ReactMarkdown from "react-markdown";

interface VotingInfoProp {
  info: ITopicData;
  user: User;
  hash: string;
}

const rule_details = (
  <div className="max-w-prose text-sm">
    <div className="pb-3 leading-6">
      民主主義の基本的な要素である投票において、さまざまな「票の数え方」があることが知られています。票の数え方を「集約ルール」といい、これが変わることで同じ投票でも結果が変わることがあります。
      多世界投票システム 「New Rousseau
      Machine」では複数の集約ルールによって結果が変わること示し、それによって実現する複数の世界の可能態を表す作品です。
    </div>

    <div className="pb-2">作品にあたり以下のルールが使われています:</div>
    <ol className="list-decimal list-inside pb-3">
      <li className="py-1 underline">
        <a href="https://ja.wikipedia.org/wiki/%E5%8D%98%E7%B4%94%E5%B0%8F%E9%81%B8%E6%8C%99%E5%8C%BA%E5%88%B6">
          多数決
        </a>
      </li>
      <li className="py-1 underline">
        <a href="https://ja.wikipedia.org/wiki/%E3%83%9C%E3%83%AB%E3%83%80%E5%BE%97%E7%82%B9">
          ボルダカウント
        </a>
      </li>
      <li className="py-1 underline">
        <a href="https://newvote.org/delegative-democracy">Liquid Democracy</a>
      </li>
      <li className="py-1 underline">
        <a href="https://ja.wikipedia.org/wiki/%E9%96%93%E6%8E%A5%E6%B0%91%E4%B8%BB%E4%B8%BB%E7%BE%A9">
          多数決(間接民主)
        </a>
      </li>
    </ol>

    <ul className="list-disc list-inside">
      <li className="py-1">
        重複を許さない単票多数決・ボルダルールでは同値の項目はシステムが得票を任意に振り分けます。
      </li>
      <li className="py-1">液体民主主義においては、票は正規化されます。</li>
    </ul>
  </div>
);

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
    <div className="flex max-w-screen-md flex-col">
      <div className="flex">
        <h1 className="flex-none text-xl font-bold mb-16 underline">
          {info.title}
        </h1>
        <div className="flex-grow"></div>
        <div className="flex-none">
          <Link to="edit" className="hover:underline text-xs">
            edit
          </Link>
        </div>
      </div>

      <div className="px-3">
        <ReactMarkdown className="my-4 text-sm md:text-base max-w-prose description">
          {info.description}
        </ReactMarkdown>

        <details open>
          <summary className="p-3 bg-nord-0 bg-opacity-10 border border-nord-3 rounded text-sm">
            投票
          </summary>

          <div className="p-2">
            <ul className="list-disc list-inside text-xs mt-2 pt-3 px-16 bg-nord-1 bg-opacity-50 text-nord-11 rounded">
              <li className="pb-2">
                支持を表明したい選択肢と委任者にそれぞれ100点を満点とした数を振ってください。
              </li>
              <li className="pb-2">
                なるべく同じ数字を避けてください。
                <div className="pl-4 pt-1">
                  (例:「A案、B案ともに3点」を避ける)
                </div>
              </li>
            </ul>
            <VotingForms
              info={info}
              initialVotes={getOptions()}
              numPolicies={Object.keys(info.policies).length}
              user={user}
              id={info.id}
            />
          </div>
        </details>

        <details>
          <summary className="mt-3 p-3 bg-nord-0 bg-opacity-10 border border-nord-3 rounded text-sm">
            投票ルールの補足
          </summary>
          <div className="p-2">{rule_details}</div>
        </details>

        <details>
          <summary className="mt-3 p-3 bg-nord-0 bg-opacity-10 border border-nord-3 rounded text-sm">
            投票結果データ
          </summary>
          <VotingResults info={info} hash={hash} />
        </details>
        {/*<Canvas />*/}
      </div>
    </div>
  );
};

export default VotingInfo;
