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
  delegates: {[id: string]: string};
  policies: {[id: string]: string};
  votes: {[src: string]: {[dest: string]: number}};
}

export interface IVoteResult {
	topic_hash: string,
	data: any
}

export const fetchList = async (): Promise<ITopicHeader[]> => {
  const res = await fetch(`${baseUrl}/${prefix}/list/`);
  const list: ITopicHeader[] = await res.json();
  return list;
};

export const fetchHeader = async (id: string):Promise<ITopicHeader> => {
	const res = await fetch(`${baseUrl}/${prefix}/header/${id}`);
	const header: ITopicHeader = await res.json();
	return header
};

export const fetchTopicData = async (id: string): Promise<ITopicData> => {
  const res = await fetch(`${baseUrl}/${prefix}/topic/${id}/`);
  const info: any = await res.json();
  return info as ITopicData;
};

export const fetchResult = async (
  hash: string
): Promise<IVoteResult | null> => {
  const res = await fetch(`${baseUrl}/${prefix}/result/${hash}/`);
  const info: IVoteResult | string = await res.json();
  if (!info) {
    return null;
  } else {
    console.log(info);
    if (info === "result not found") {
      return null;
    } else {
      return info as IVoteResult;
    }
  }
};

export const postResult = async (
	hash: string,
	result :any
) => {

	const res = await fetch(`${baseUrl}/${prefix}/result/${hash}/`,{
		method:"POST",
		body: JSON.stringify(result),
		headers:{
			"Content-Type":"application/json"
		}
	});

	let info = await res.json();
	console.log(info);
}

export const updateVote = async (
  topic_id: string,
  id: string,
  name: string,
  votes: { [to: string]: number }
) => {

	const vote = {
		id, name, votes
	};

  const res = await fetch(`${baseUrl}/${prefix}/topic/update/${topic_id}/delegate/`, {
    method: "POST",
    body: JSON.stringify(vote),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const info: any = await res.json();
  console.log(info);
};
