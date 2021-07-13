import { RouteComponentProps } from "@reach/router";
import TitleBar from "./TitleBar";
import { useState } from "react";
import { postNewTopic } from "./database";
import { Redirect } from "@reach/router";

const CreateTopic = (props: RouteComponentProps) => {
  const [title, setTitle] = useState("");
  const [description, setDesc] = useState("");
  const [error, setError] = useState("");
  const [id, setId] = useState("");

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleDescChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDesc(e.target.value);
  };

  const checkInput = (value: string): boolean => {
    return value !== "";
  };

  const postTopic = () => {
    let mes = "";

    if (!checkInput(title)) {
      mes += "Title is empty. ";
    }

    if (!checkInput(description)) {
      mes += "Description is empty.";
    }

    setError(mes);

	const postTopic = async (title: string, description: string) => {
      const res = await postNewTopic(title, description);
	  setId(res.id);
    };

    if (mes === "") {
      postTopic(title, description);
	  setTitle("");
	  setDesc("");
	  const url = `/frontend/topic/${id}`;
	  return <Redirect to={url}/>
	}
  };

  return (
    <>
      <TitleBar />
      <div className="container max-w-screen-lg mx-auto">
        <h1 className="p-2"> create topic </h1>
        <div className="w-3/5 p-2">
          <div className="my-3">
            title: <br />
            <input
              className="px-3 py-1 mt-1 mb-2 text-nord-0 bg-nord-4 font-medium rounded w-full"
              onChange={handleTitleChange}
              value={title}
            />
          </div>
          <div className="my-3">
            description* : <br />
            <textarea
              className="px-3 py-1 w-12 mt-1 mb-2 h-40 text-nord-0 bg-nord-4 font-medium rounded w-full"
              onChange={handleDescChange}
              value={description}
            />
          </div>
          <div>
            <button
              className="font-bold px-3 py-2 bg-nord-1 hover:bg-nord-3 rounded disabled:bd-opacity-10 disabled:text-nord-5"
              onClick={postTopic}
            >
              Add Topic
            </button>
          </div>
          <div className="text-nord-11 mt-2">{error}</div>
        </div>
      </div>
    </>
  );
};

export default CreateTopic;
