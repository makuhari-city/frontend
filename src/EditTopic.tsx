import { RouteComponentProps, Redirect } from "@reach/router";
import { useState, useEffect } from "react";
import { fetchTopicData, ITopicData, postTopic } from "./database";
import TitleBar from "./TitleBar";
import { v4 } from "uuid";

interface EditTopicProps extends RouteComponentProps {
  topicId?: string;
}

const EditTopic = (props: EditTopicProps) => {
  const [data, setData] = useState<null | ITopicData>(null);

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [newPolicy, setNewPolicy] = useState("");
  const [policies, setPolicies] = useState<{ [to: string]: string }>({});

  useEffect(() => {
    if (props.topicId) {
      const fetchData = async () => {
        const d = await fetchTopicData(props.topicId!);

        setTitle(d.title);
        setDesc(d.description);
        setPolicies(d.policies);

        setData(d);
      };
      fetchData();
    }
  }, []);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleChangeNewPolicy = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPolicy(e.target.value);
  };

  const handleDescChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDesc(e.target.value);
  };

  const reconTopic = (): ITopicData => {
    let new_data = data!;
    new_data.title = title;
    new_data.description = desc;
    new_data.policies = policies;

    return new_data;
  };

  const updateTopic = () => {

	  const update = async () => {
			const new_topic = reconTopic();
			const result = await postTopic(new_topic);
			console.log(result);
			setData(new_topic);
	  }
	
	  update();
  };

  const renderOptions = () => {
    return Object.keys(policies).map((k) => (
      <li className="p-2">{policies[k]}</li>
    ));
  };

  const addOption = () => {
    // new polict needs to be unique and not empty
    if (newPolicy !== "" && !Object.values(policies).includes(newPolicy)) {
      let n: { [to: string]: string } = {};
      n[`${v4()}`] = newPolicy;
      //check uniqueness
      setPolicies({ ...policies, ...n });
    }
    setNewPolicy("");
  };

  if (!props.topicId) {
    return <Redirect to="/frontend/list/" noThrow />;
  } else {
    return (
      <>
        <TitleBar />
        <p className="text-xs">{props.topicId}</p>
        <div className="container max-w-screen-lg mx-auto">
          <input
            className="font-bold"
            value={title}
            onChange={handleTitleChange}
          />
          <textarea
            className="font-bold"
            value={desc}
            onChange={handleDescChange}
          />
        </div>
        <ul>{renderOptions()}</ul>
        <input
          className="font-bold"
          value={newPolicy}
          onChange={handleChangeNewPolicy}
        />
        <button onClick={addOption}>add Option</button>
        <button onClick={updateTopic}>update Topic</button>
      </>
    );
  }
};

export default EditTopic;
