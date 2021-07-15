import { useEffect, useState } from "react";
import VotingInfo from "./VotingInfo";
import { fetchTopicData, ITopicData, fetchHeader, ITopicHeader } from "./database";
import { User } from "./user";
import TitleBar from "./TitleBar";

interface VotingSessionProps {
  id: string;
  user: User;
}

const VotingSession = ({ id, user }: VotingSessionProps) => {
  const [info, setInfo] = useState<null | ITopicData>(null);
  const [hash, setHash] = useState("");
  useEffect(() => {
    const getInfo = async () => {
      let latestInfo: ITopicData = await fetchTopicData(id);
	  let header: ITopicHeader = await fetchHeader(id);
	  setHash(header.hash);
      setInfo(latestInfo);
    };
    getInfo();
  }, [id]);

  if (info) {
    return <VotingInfo info={info} user={user} hash={hash}/>;
  } else {
    return (
      <div>
        <TitleBar user={user}/>
        <div className="container mx-auto max-w-screen-lg p-2">
			Loading Topic (#{id.substring(0,5)}) information...
        </div>
      </div>
    );
  }
};

export default VotingSession;
