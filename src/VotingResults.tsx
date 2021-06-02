import { useEffect, useState } from "react";
import { vote } from "./vote";
import { IVoteInfo, fetchResult, postResult } from "./database";

interface VotingResultsProps {
  info: IVoteInfo;
  hash: string;
}

const VotingResults = ({ info, hash }: VotingResultsProps) => {
  // let [result, setResult] = useState<null|IVoteResult>(null);
  let [result, setResult] = useState("");
  // is the result calculated?
  useEffect(() => {
    const checkResult = async () => {
      let res = await fetchResult(hash);
      if (!res) {
        let calculated = await vote(
          info.params,
          info.method,
          hash
        );
        if (calculated.result) {
          const result = {
            info_uid: info.uid,
            info_hash: hash,
            data: calculated.result,
          };
          setResult(JSON.stringify(result, null, 2));
		  await postResult(result);
        }
	  } else {
		setResult(JSON.stringify(res, null, 2));
	  }
    };

    checkResult();
  }, [hash, info]);

  return <pre>{result}</pre>;
};

export default VotingResults;
