import { useEffect, useState } from "react";
import { vote } from "./vote";
import { ITopicData, fetchResult, postResult, fetchHeader, fetchTopicData } from "./database";

interface VotingResultsProps {
  info: ITopicData;
  hash: string;
}

const VotingResults = ({ info, hash }: VotingResultsProps) => {
  let [result, setResult] = useState("");
  useEffect(() => {

    const checkResult = async () => {

		// get the latest header;
		let header = await fetchHeader(info.id);

		const fetched = await fetchResult(header.hash);

		if(fetched.status === 'error') {
			setResult("result not found in database. sending calculation result to `vote`.");

			let latest = await fetchTopicData(header.id);
						
			let calculated = await vote(latest);

			setResult(JSON.stringify(calculated, null, 2));

		} else {
			setResult(JSON.stringify(fetched, null, 2))
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
        <button className="mt-3 mb-8 p-2 rounded border bg-nord-9 font-bold text-nord-0 hover:bg-nord-10 bg-opacity-80 duration-500 ease-in">
          Update
        </button>
      </details>
    </>
  );
};

export default VotingResults;
