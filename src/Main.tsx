import { User, checkSavedUser } from "./user";
import MakeNewUser from "./MakeNewUser";
import VotingSession from "./VotingSession";
import { useEffect, useState } from "react";
import { RouteComponentProps, Redirect } from "@reach/router";

const Main = (props: RouteComponentProps) => {

  const [user, setUser] = useState<null | User>(null);

  useEffect(() => {
    let savedUser = checkSavedUser();
    setUser(savedUser);
  }, []);

  // first make sure we have a user
  if (!user) {
    return <MakeNewUser />;
  }

  const topicId = checkParams("t");

  if (!topicId) {
    return <Redirect to="/frontend/list/" noThrow/>;
  }

  return <VotingSession id={topicId} user={user} />;
};

const checkParams = (p: string): string | null => {
  let cUrl = window.location.search;
  const params = new URLSearchParams(cUrl);
  return params.get(p);

}

export default Main;
