import { Router } from "@reach/router";
import Main from "./Main";
import ListView from "./ListView";
import Topic from "./Topic";
import CreateTopic from "./CreateTopic";
import EditTopic from "./EditTopic";

const App = () => {
  return (
    <Router>
      <Main path="frontend" />
      <ListView path="frontend/list" />
      <Topic path="frontend/topic/:topicId" />
      <CreateTopic path="frontend/topic/create" />
	  <EditTopic path="frontend/topic/:topicId/edit" />
    </Router>
  );
};
export default App;
