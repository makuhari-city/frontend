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

  useEffect(() => {
    const getList = async () => {
      const newList = await fetchList();
	  setIsLoading(false);
      if (newList.length > 0) {
        setIsEmpty(false);
        setList(newList);
      }
    };
    getList();
  }, []);

  const renderList = (items: ITopicHeader[]) => (
      <div>
        <h1 className="px-4 text-bold">topics:</h1>
        <ul className="p-4 w-3/5">
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

  return (
    <>
      <TitleBar />
      <div className="container max-w-screen-lg py-8 mx-auto bg-nord-0 bg-opacity-90 min-h-1/4 rounded">
		  {isLoading ? (
			  <div className="p-4">Loading topics...</div>
		  ) : (isEmpty ? (
          <div className="p-4">0 topics. Nothing to vote.</div>
        ) : (
          renderList(list)
        ))}
        
      </div>
		{/*<Canvas />*/}
    </>
  );
};

export default ListView;
