import { checkSavedUser, User } from "./user";
import { ITopicHeader, fetchList } from "./database";
import { useEffect, useState } from "react";
import TitleBar from "./TitleBar";
import { RouteComponentProps, Redirect, Link } from "@reach/router";
// import Canvas from "./Canvas";

const ListView = (props: RouteComponentProps) => {
  const [list, setList] = useState<ITopicHeader[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEmpty, setIsEmpty] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getList = async () => {
      const newList = await fetchList();
      setIsLoading(false);
      if (newList.length > 0) {
        setIsEmpty(false);

        const sorted = newList.sort((a, b) => a.title.localeCompare(b.title));

        setList(sorted);
      }
    };

    const u = checkSavedUser();
    setUser(u);

    getList();
  }, []);

  const renderList = (items: ITopicHeader[]) => (
    <div>
      <h1 className="text-bold">トピックス:</h1>
      <ul className="p-3 w-3/5">
        {items.map((item) => (
          <li className="mb-1">
            <Link
              className="duration-500 ease-out p-4 flex space-x-4 bg-nord-1 hover:bg-nord-2"
              to={`../topic/${item.id}/`}
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );

  const userBar = () => {
    const user = checkSavedUser();
    if (user) {
      return <TitleBar user={user} />;
    } else {
      return <TitleBar />;
    }
  };

  return (
    <>
      {userBar()}
      <div className="container max-w-screen-lg py-8 mx-auto bg-nord-0 bg-opacity-90 min-h-1/4 rounded">
        <div className="p-3">
          <p className="w-3/5 text-sm mb-5">
            多層都市「幕張市」プロジェクトは、分散型統治を検証していくために税金やクラウドファンディング、寄付などで集まった全予算を本プロジェクトに参加する人（=「幕張市」市民）たちの投票で最終決定していきます。
            仮にあなたも市民だった場合、どの政策に投票しますか？この投票結果は、多層都市「幕張市」の方針に強く影響をあたえる可能性（そのまま採用される可能性）があります。
          </p>
        </div>
        {isLoading ? (
          <div className="p-3">Loading topics...</div>
        ) : isEmpty ? (
          <div className="p-3">0 topics. Nothing to vote.</div>
        ) : (
          renderList(list)
        )}
      </div>
      {/*<Canvas />*/}
    </>
  );
};

export default ListView;
