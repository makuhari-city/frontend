import { User } from "./user";
import MakeNewUser from "./MakeNewUser";
import "./App.css";
import ListView from "./ListView";
import VotingSession from "./VotingSession";
import { useEffect, useState } from "react";

const App = () => {
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
    return <ListView user={user} />;
  }

  return <VotingSession uid={topicId} user={user} />;
};

const checkParams = (p: string): string | null => {
  let cUrl = window.location.search;
  const params = new URLSearchParams(cUrl);
  return params.get(p);
};

const checkSavedUser = (): null | User => {
  const userData = localStorage.getItem("user");
  if (userData) {
    const user: User = JSON.parse(userData);
    return user;
  } else {
    return null;
  }
};

export default App;
