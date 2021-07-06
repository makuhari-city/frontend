const baseUrl = "https://vote.metacity.jp";
const prefix = "db";

export interface ITopicHeader {
  id: string;
  hash: string;
  title: string;
}

export interface ITopicData {
  id: string;
  title: string;
  description: string;
  delegates: { [id: string]: string };
  policies: { [id: string]: string };
  votes: { [src: string]: { [dest: string]: number } };
}

export const fetchList = async (): Promise<ITopicHeader[]> => {
  const res = await fetch(`${baseUrl}/${prefix}/list/`);
  const list: ITopicHeader[] = await res.json();
  return list;
};

export const fetchHeader = async (id: string): Promise<ITopicHeader> => {
  const res = await fetch(`${baseUrl}/${prefix}/header/${id}`);
  const header: ITopicHeader = await res.json();
  return header;
};

export const fetchTopicData = async (id: string): Promise<ITopicData> => {
  const res = await fetch(`${baseUrl}/${prefix}/topic/${id}/`);
  const info: any = await res.json();
  return info as ITopicData;
};

export const fetchResult = async (hash: string): Promise<any | null> => {
  const res = await fetch(`${baseUrl}/${prefix}/result/${hash}/`);
  const info: any = await res.json();
  if (!info) {
    return null;
  } else {
    return info;
  }
};

export const postResult = async (hash: string, result: any) => {
  const res = await fetch(`${baseUrl}/${prefix}/result/${hash}/`, {
    method: "POST",
    body: JSON.stringify(result),
    headers: {
      "Content-Type": "application/json",
    },
  });

  let info = await res.json();
  console.log(info);
};

export const updateVote = async (
  topic_id: string,
  id: string,
  name: string,
  vote: { [to: string]: number }
) => {
  const newVote = {
    id,
    name,
    vote,
  };

  const res = await fetch(
    `${baseUrl}/${prefix}/topic/update/${topic_id}/delegate/`,
    {
      method: "POST",
      body: JSON.stringify(newVote),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const info: any = await res.json();
  console.log(info);
};
