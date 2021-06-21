import { useEffect, useState } from "react";
import VotingInfo from "./VotingInfo";
import { fetchInfo, fetchTag, IVoteInfo } from "./database";
import { User } from "./user";
import TitleBar from "./TitleBar";

interface VotingSessionProps {
  uid: string;
  user: User;
}

const VotingSession = ({ uid, user }: VotingSessionProps) => {
  const [info, setInfo] = useState<null | IVoteInfo>(null);
  const [hash, setHash] = useState("");

  useEffect(() => {
    const getInfo = async () => {
      let latestHash = await fetchTag(uid);
      let latestInfo: IVoteInfo = await fetchInfo(latestHash);
      setHash(latestHash);
      setInfo(latestInfo);
    };
    getInfo();
  }, [uid]);

  if (info) {
    return <VotingInfo info={info} user={user} hash={hash}/>;
  } else {
    return (
      <div>
        <TitleBar/>
        <div className="container mx-auto max-w-screen-lg p-2">
			Loading Topic (#{uid.substring(0,5)}) information...
        </div>
      </div>
    );
  }
};

export default VotingSession;
