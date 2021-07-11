import { Router } from "@reach/router";
import Main from "./Main";
import ListView from "./ListView";
import Topic from "./Topic";

const App = () => {
  return (
    <Router>
      <Main path="frontend" />
      <ListView path="frontend/list" />
      <Topic path="frontend/topic/:topicId" />
    </Router>
  );
};
export default App;
