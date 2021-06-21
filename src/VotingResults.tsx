import { useEffect, useState } from "react";
import { vote } from "./vote";
import { IVoteInfo, fetchResult, postResult } from "./database";

interface VotingResultsProps {
  info: IVoteInfo;
  hash: string;
}

const VotingResults = ({ info, hash }: VotingResultsProps) => {
  let [result, setResult] = useState("");
  useEffect(() => {
    const checkResult = async () => {
      let res = await fetchResult(hash);
      if (!res) {
        let calculated = await vote(info.params, info.method, hash);
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

  return (
    <>
      <details className="text-sm p-2 mt-4">
        <summary className="p-3 bg-nord-0 bg-opacity-10 border border-nord-3 rounded w-3/5">
          Results
        </summary>
        <pre className="bg-nord-0 bg-opacity-90 text-xs p-3 mt-3 rounded w-3/5">
          {result}
        </pre>
      </details>
    </>
  );
};

export default VotingResults;
