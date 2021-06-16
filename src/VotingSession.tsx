import { useEffect, useState } from "react";
import VotingInfo from "./VotingInfo";
import { fetchInfo, fetchTag, IVoteInfo } from "./database";
import { User } from "./user";
import NavBar from "./NavBar";

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
    return <VotingInfo info={info} user={user} hash={hash} />;
  } else {
    return (
      <div>
        <NavBar user={user} />
        <div className="container  mx-auto bg-white text-3xl">
          loading voting information...
        </div>
      </div>
    );
  }
};

export default VotingSession;
