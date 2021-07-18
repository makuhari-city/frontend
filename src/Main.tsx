import { User, checkSavedUser } from "./user";
import MakeNewUser from "./MakeNewUser";
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

  return <Redirect to="/app/list/" noThrow />;
};

export default Main;
