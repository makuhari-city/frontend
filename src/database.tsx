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

export const fetchRepList = async (): Promise<string[]> => {
  const res = await fetch(`${baseUrl}/${prefix}/reps/`);
  const list: string[] = await res.json();

  if (!list) {
    return [];
  } else {
    return list;
  }
};

export interface IRepresentative {
  name: string;
  info?: string;
  link?: string;
}

export const fetchRep = async (id: string): Promise<IRepresentative | null> => {
  const res = await fetch(`${baseUrl}/${prefix}/rep/${id}/`);
  const rep: IRepresentative = await res.json();

  if (!rep) {
    return null;
  } else {
    return rep;
  }
};

export const fetchRepAll = async (): Promise<{[id:string]:IRepresentative}> => {
  const list = await fetchRepList();

  let result: {[id:string]:IRepresentative} = {};

  let reps: [string, (IRepresentative|null)][]= (await Promise.all(list.map(id=> fetchRep(id)))).map((r,i)=> [list[i],r]);

  // filter the null ones;
  reps.forEach(r => {
	  if(r[1]!==null) {
		  result[r[0]] = r[1] as IRepresentative;
	  }
  })

  return result;
};

interface IPartialTopic {
  title: string;
  description: string;
}

interface INewTopicResponse {
  status: string;
  id: string;
  hash: string;
}

export const postNewTopic = async (
  title: string,
  description: string
): Promise<INewTopicResponse> => {
  const partial: IPartialTopic = { title, description };
  const res = await fetch(`${baseUrl}/${prefix}/topic/new/`, {
    method: "POST",
    body: JSON.stringify(partial),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const result: INewTopicResponse = await res.json();
  console.log(result);

  return result;
};

export const postTopic = async (topic: ITopicData) => {
  const res = await fetch(`${baseUrl}/${prefix}/topic/raw/`, {
    method: "POST",
    body: JSON.stringify(topic),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const result: { [f: string]: string } = await res.json();
  return result;
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
