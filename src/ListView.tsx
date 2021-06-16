import { User } from "./user";
import { ITopicListItem, fetchList } from "./database";
import { useEffect, useState } from "react";
import NavBar from "./NavBar";

interface ListViewProps {
  user: User;
}

const ListView = ({ user }: ListViewProps) => {
  const [list, setList] = useState<ITopicListItem[]>([]);

  useEffect(() => {
    const getList = async () => {
      const newList = await fetchList();
      setList(newList);
    };
    getList();
  }, []);

  return (
    <>
	<NavBar user={user}/> 
		<div className="container mx-auto bg-white min-h-1/4">
		<h1 className="text-2xl p-4">Topic List:</h1>
      <ul className="list-inside divide-y divide-gray-100">
        {list.map((item) => {
          return (
            <li>
				<a className="p-6 flex space-x-4 bg-gray-50 hover:bg-gray-100" href={`?t=${item.uid}`}>{item.title}</a>
            </li>
          );
        })}
      </ul>
			</div>
    </>
  );
};

export default ListView;
