// export const baseUrl = "http://vote.metacity.jp";

export const baseUrl = "http://127.0.0.1:8081";

const params: VoteParams = {
  quadratic: true,
  voters: {
    minori: {
      ray: 0.1,
      yasushi: 0.9,
    },
    yasushi: {
      minori: 0.4,
      ray: 0.6,
    },
    ray: {
      minori: 0.8,
      yasushi: 0.2,
    },
  },
};

export const testVote: VoteRPC = {
  jsonrpc: "2.0",
  id: "1",
  method: "frac",
  params,
};

export const vote = async (params: VoteParams, method:string, hash:string) => {
  const voteObj = {
    jsonrpc: "2.0",
    id: hash,
    method,
    params,
  };

  const response = await fetch(`${baseUrl}/rpc/`, {
    mode: "cors",
    method: "POST",
    body: JSON.stringify(voteObj),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data: VoteRPCResult = await response.json();

  return data;

  // if (data.error) {
  //   return data.error;
  // }

  // return data.result;
};

interface VoteRPC {
  jsonrpc: string;
  id: string;
  method: string;
  params: VoteParams;
}

export interface VoteParams {
  quadratic?: boolean;
  normalize?: boolean;
  voters: { [from: string]: { [to: string]: number } };
}

export interface VoteRPCResult {
  jsonrpc: string;
  id: string;
  result?: any;
  error?: any;
}
