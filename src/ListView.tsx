import { User } from "./user";
import { ITopicListItem, fetchList } from "./database";
import { useEffect, useState } from "react";

interface ListViewProps {
	user:User
}

const ListView = ({user}:ListViewProps) => {
  const [list, setList] = useState<ITopicListItem[]>([]);

  useEffect(() => {
    const getList = async () => {
      const newList = await fetchList();
      setList(newList);
    };
    getList();
  }, []);

  return (
    <div>
		<p>logged in as: {user.name}({user.uid})</p>
      <ul>
        {list.map((item) => {
          return (
            <li>
              <a href={`?t=${item.uid}`}>{item.title}</a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ListView;
