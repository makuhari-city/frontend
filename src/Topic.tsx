import { RouteComponentProps, Redirect } from "@reach/router";
import { User, checkSavedUser } from "./user";
import { useState, useEffect } from "react";
import {
  fetchTopicData,
  ITopicData,
  fetchHeader,
  ITopicHeader,
} from "./database";
import VotingInfo from "./VotingInfo";
import TitleBar from "./TitleBar";

interface TopicProps extends RouteComponentProps {
  topicId?: string;
}

const Topic = (props: TopicProps) => {
  const [info, setInfo] = useState<null | ITopicData>(null);
  const [user, setUser] = useState<null | User>(null);
  const [hash, setHash] = useState("");

  useEffect(() => {
    const getInfo = async () => {
      let latestInfo: ITopicData = await fetchTopicData(props.topicId!);
      let header: ITopicHeader = await fetchHeader(props.topicId!);
      setHash(header.hash);
      setInfo(latestInfo);
    };
    getInfo();

    setUser(checkSavedUser());
  }, [props.topicId]);

  if (!props.topicId) {
    return <Redirect to="../../list" />;
  }

  if (info && user) {
    return (
      <div className="lg:container mx-auto px-4 max-w-screen-md">
        <TitleBar user={user} />
        <div>
          <VotingInfo info={info} user={user} hash={hash} />
        </div>
      </div>
    );
  } else {
    return (
      <div className="lg:container mx-auto px-4 max-w-screen-md">
        <TitleBar user={user} />
        <div>
          Loading Topic (#{props.topicId!.substring(0, 5)}) information...
        </div>
      </div>
    );
  }
};

export default Topic;
