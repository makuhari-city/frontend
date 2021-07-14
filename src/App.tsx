import { Router } from "@reach/router";
import Main from "./Main";
import ListView from "./ListView";
import Topic from "./Topic";
import CreateTopic from "./CreateTopic";
import EditTopic from "./EditTopic";

const App = () => {
  return (
    <Router basepath="app">
      <Main path="/" />
      <ListView path="list" />
      <Topic path="topic/:topicId" />
      <CreateTopic path="topic/create" />
	  <EditTopic path="topic/:topicId/edit" />
    </Router>
  );
};
export default App;
