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
      <h1>議題:</h1>
      <ul className="max-w-screen-md my-3">
        {items.map((item) => (
          <li className="mb-2">
            <Link
              className="duration-500 ease-out p-3 flex bg-nord-1 hover:bg-nord-2 rounded"
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
	  <div className="lg:container mx-auto px-4 max-w-screen-md">
      {userBar()}
      <div>
		  <p className="max-w-prose mb-5 text-sm md:text-base">
            多層都市「幕張市」プロジェクトは、分散型統治を検証していくために税金やクラウドファンディング、寄付などで集まった全予算を本プロジェクトに参加する人（=「幕張市」市民）たちの投票で最終決定していきます。
            仮にあなたも市民だった場合、どの政策に投票しますか？この投票結果は、多層都市「幕張市」の方針に強く影響をあたえる可能性（そのまま採用される可能性）があります。
          </p>
        {isLoading ? (
          <div className="py-3">Loading topics...</div>
        ) : isEmpty ? (
          <div className="py-3">0 topics. Nothing to vote.</div>
        ) : (
          renderList(list)
        )}
      </div>
      {/*<Canvas />*/}
    </div>
  );
};

export default ListView;
