import {ITopicData} from "./database";

export const baseUrl = "https://vote.metacity.jp";

export const vote = async (topicData: ITopicData) => {

  const response = await fetch(`${baseUrl}/rpc/`, {
    // mode: "cors",
    method: "POST",
    body: JSON.stringify(topicData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data: {[method: string]: any} = await response.json();

  return data;
};
