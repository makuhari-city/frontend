import { RouteComponentProps, Redirect, Link } from "@reach/router";
import { useState, useEffect } from "react";
import { fetchTopicData, ITopicData, postTopic, IPolicy } from "./database";
import TitleBar from "./TitleBar";
import { v4 } from "uuid";
import { checkSavedUser, User } from "./user";

interface EditTopicProps extends RouteComponentProps {
  topicId?: string;
}

const EditTopic = (props: EditTopicProps) => {
  const [data, setData] = useState<null | ITopicData>(null);

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [newPolicy, setNewPolicy] = useState({ title: "", desc: "" });
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

  const handleChangeNewPolicyTitle = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newP: IPolicy = { ...newPolicy, title: e.target.value };

    setNewPolicy(newP);
  };

  const handleChangeNewPolicyDesc = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const newP: IPolicy = { ...newPolicy, desc: e.target.value };

    setNewPolicy(newP);
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
    };

    update();
  };

  const handleOptionChangeTitle = (uuid: string) => {
    const handleOptionChangeUuid = (e: React.ChangeEvent<HTMLInputElement>) => {
      let policy: IPolicy = JSON.parse(policies[uuid]);
      policy.title = e.target.value;

      let newOptions = { ...policies, [uuid]: JSON.stringify(policy) };
      setPolicies(newOptions);
    };
    return handleOptionChangeUuid;
  };

  const handleOptionChangeDesc = (uuid: string) => {
    const handleOptionChangeUuid = (
      e: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
      let policy: IPolicy = JSON.parse(policies[uuid]);
      policy.desc = e.target.value;

      let newOptions = { ...policies, [uuid]: JSON.stringify(policy) };
      setPolicies(newOptions);
    };
    return handleOptionChangeUuid;
  };

  const renderOptions = () => {
    return Object.keys(policies).map((k) => {
		let p: IPolicy = JSON.parse(policies[k]);
      return (
        <>
          <input
            className="p-2 m-2 rounded w-3/4 text-nord-1"
            value={p.title}
            onChange={handleOptionChangeTitle(k)}
          />
          <textarea
            className="p-2 m-2 rounded w-3/4 text-nord-1"
            value={p.desc}
            onChange={handleOptionChangeDesc(k)}
          />
        </>
      );
    });
  };

  const addOption = () => {
    // new polict needs to be unique and not empty
    if (
      newPolicy.title !== ""
    ) {
      let n: { [to: string]: string } = {};
      n[`${v4()}`] = JSON.stringify(newPolicy);
      //check uniqueness
      setPolicies({ ...policies, ...n });
    }
    setNewPolicy({ title: "", desc: "" });
  };

  const userBar = () => {
    const user = checkSavedUser();
    if (user) {
      return <TitleBar user={user} />;
    } else {
      return <TitleBar />;
    }
  };

  if (!props.topicId) {
    return <Redirect to="/app/list/" noThrow />;
  } else {
    return (
      <>
        {userBar()}
        <div className="container max-w-screen-lg mx-auto">
          <div className="w-3/5">
            <div>id:</div>
            <p className="mb-5">{props.topicId}</p>
            <div>
              <div>title:</div>
              <input
                className="font-bold text-nord-1 p-2 mb-5 rounded w-1/2"
                value={title}
                onChange={handleTitleChange}
              />
            </div>
            <div>
              <div>description:</div>
              <textarea
                className="text-sm text-nord-0 w-full h-96 p-2 rounded"
                value={desc}
                onChange={handleDescChange}
              />
            </div>
            <div>
              <div>options:</div>
              <div className="flex flex-col">{renderOptions()}</div>
            </div>
            <div>
              <div>new option:</div>
              <input
                className="p-2 m-2 rounded w-3/4 text-nord-1"
                value={newPolicy.title}
                onChange={handleChangeNewPolicyTitle}
              />
              <textarea
                className="p-2 m-2 rounded w-3/4 text-nord-1"
                value={newPolicy.desc}
                onChange={handleChangeNewPolicyDesc}
              />
            </div>
            <div className="flex items-center justify-end">
              <button
                onClick={addOption}
                className="font-bold px-3 py-2 mr-3 bg-nord-1 hover:bg-nord-3 rounded disabled:bd-opacity-10 disabled:text-nord-5"
              >
                add Option
              </button>
              <button
                onClick={updateTopic}
                className="font-bold px-3 py-2 bg-nord-1 hover:bg-nord-3 rounded disabled:bd-opacity-10 disabled:text-nord-5"
              >
                update Topic
              </button>
            </div>
            <div className="mb-24">
              <Link to="/app/list/" className="hover:underline">
                back to List
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default EditTopic;
