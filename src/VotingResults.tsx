import { useEffect, useState } from "react";
import { vote } from "./vote";
import {
  ITopicData,
  fetchResult,
  postResult,
  fetchHeader,
  fetchTopicData,
} from "./database";

interface VotingResultsProps {
  info: ITopicData;
  hash: string;
}

interface IResult {
  borda: [string, number][];
  liquid: [{ [what: string]: number }, { [who: string]: number }];
  fptp: [string, number][];
}

const VotingResults = ({ info, hash }: VotingResultsProps) => {
  let [result, setResult] = useState<IResult | null | string>(null);
  useEffect(() => {
    const checkResult = async () => {
      // get the latest header;
      let header = await fetchHeader(info.id);

      const fetched = await fetchResult(header.hash);

      if (fetched.status === "error") {
        setResult(
          "result not found in database. sending calculation result to `vote`."
        );

        let latest = await fetchTopicData(header.id);

        let calculated = await vote(latest);

        setResult(JSON.stringify(calculated, null, 2));
      } else {
        setResult(JSON.stringify(fetched, null, 2));
      }
    };

    checkResult();
  }, [hash, info]);

  const updateResult = () => {
    const update = async () => {
      const header = await fetchHeader(info.id);
      if (header.id !== hash) {
        const fetched = await fetchResult(header.hash);

        if (fetched.status === "error") {
          setResult(
            "result not found in database. sending calculation result to `vote`."
          );
          let latest = await fetchTopicData(header.id);
          let calculated = await vote(latest);

          setResult(JSON.stringify(calculated, null, 2));
        } else {
          setResult(JSON.stringify(fetched, null, 2));
        }
      }
    };
    update();
  };

  const renderResult = (result: IResult, info: ITopicData) => {
    if (!result || result.borda === undefined) return;

    const borda_order = result.borda
      .map((item) => info.policies[item[0]])
      .map((e) => <li>e</li>);
    const liquid_policies = Object.keys(result.liquid[0]).map((e) => [
      info.policies[e],
      result.liquid[0][e],
    ]);
    const liquid_influence = Object.keys(result.liquid[1]).map((e) => [
      info.delegates[e],
      result.liquid[1][e],
    ]);
    const fptp = result.fptp
      .map((item) => info.policies[item[0]])
      .map((e) => <li>e</li>);

    return (
      <>
        <p>borda</p>
        <ol>{borda_order}</ol>
      </>
    );
  };

  return (
    <>
      <details className="text-sm p-2 mt-4">
        <summary className="p-3 bg-nord-0 bg-opacity-10 border border-nord-3 rounded w-3/5">
          Results
        </summary>
        {renderResult(result as IResult, info)}
        <pre className="bg-nord-0 bg-opacity-90 text-xs p-3 mt-3 rounded w-3/5">
          {result}
        </pre>
        <button
          className="mt-3 mb-8 p-2 rounded border bg-nord-9 font-bold text-nord-0 hover:bg-nord-10 bg-opacity-80 duration-500 ease-in"
          onClick={updateResult}
        >
          Update
        </button>
      </details>
    </>
  );
};

export default VotingResults;
