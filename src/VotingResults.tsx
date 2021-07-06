import { useEffect, useState } from "react";
import { vote } from "./vote";
import { ITopicData, fetchResult, postResult } from "./database";

interface VotingResultsProps {
  info: ITopicData;
  hash: string;
}

const VotingResults = ({ info, hash }: VotingResultsProps) => {
  let [result, setResult] = useState("");
  useEffect(() => {
    const checkResult = async () => {
      let res = await fetchResult(hash);
      if (!res) {
        let result = await vote(info);
        if (result) {
          setResult(JSON.stringify(result, null, 2));
          await postResult(hash, result);
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
