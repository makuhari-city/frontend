//const baseUrl = "https://vote.metacity.jp";
const baseUrl = "http://127.0.0.1:8082";
const prefix = "db";

export interface ITopicListItem {
  uid: string;
  hash: string;
  title: string;
}

export interface IVoteInfo {
  uid: string;
  hash: string;
  title: string;
  description: string;
  parent?: string;
  method: string;
  params: IVoteParams;
}

export interface IResultFrac {
  result: { [to: string]: number };
}

export interface IResultLiquid {
  result: [{ [to: string]: number }, { [to: string]: number }];
}

export interface IVoteResult {
  info_uid: string;
  info_hash: string;
  data: IResultFrac | IResultLiquid;
}

export interface IVoteParams {
  is_quadratic?: boolean;
  is_normalize?: boolean;
  voters: { [from: string]: { [to: string]: number } };
}

export const fetchList = async (): Promise<ITopicListItem[]> => {
  const res = await fetch(`${baseUrl}/${prefix}/list/`);
  const list: ITopicListItem[] = await res.json();
  return list;
};

export const fetchTag = async (uid: string): Promise<string> => {
  const res = await fetch(`${baseUrl}/${prefix}/tag/${uid}/`);
  const hash: string = await res.json();
  return hash;
};

export const fetchInfo = async (hash: string): Promise<IVoteInfo> => {
  const res = await fetch(`${baseUrl}/${prefix}/info/${hash}/`);
  const info: any = await res.json();
  return info as IVoteInfo;
};

export const fetchResult = async (
  hash: string
): Promise<IVoteResult | null> => {
  const res = await fetch(`${baseUrl}/${prefix}/result/${hash}/`);
  const info: IVoteResult | string = await res.json();
  if (!info) {
    console.log("hi");
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
	voteResult :IVoteResult
) => {

	const res = await fetch(`${baseUrl}/${prefix}/result/`,{
		method:"POST",
		body: JSON.stringify(voteResult),
		headers:{
			"Content-Type":"application/json"
		}
	});

	let info = await res.json();
	console.log(info);
}

export const updateVote = async (
  uid: string,
  name: string,
  votes: { [to: string]: number }
) => {
  const res = await fetch(`${baseUrl}/${prefix}/info/${uid}/${name}/`, {
    method: "POST",
    body: JSON.stringify(votes),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const info: any = await res.json();
  console.log(info);
};
