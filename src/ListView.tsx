import { User } from "./user";
import { ITopicListItem, fetchList } from "./database";
import { useEffect, useState } from "react";
import TitleBar from "./TitleBar";
import Canvas from "./Canvas";

interface ListViewProps {
  user: User;
}

const ListView = ({ user }: ListViewProps) => {
  const [list, setList] = useState<ITopicListItem[]>([]);
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

  const renderList = (items: ITopicListItem[]) => (
      <div>
        <h1 className="px-4 text-bold">topics:</h1>
        <ul className="p-4 w-3/5">
          {items.map((item) => (
            <li className="mb-1">
              <a
                className="duration-500 ease-out p-4 flex space-x-4 bg-nord-1 hover:bg-nord-2"
                href={`?t=${item.uid}`}
              >
                {item.title}
              </a>
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
      <Canvas />
    </>
  );
};

export default ListView;
