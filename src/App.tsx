import { Router } from "@reach/router";
import Main from "./Main";
import ListView from "./ListView";
import Topic from "./Topic";
import CreateTopic from "./CreateTopic";
import EditTopic from "./EditTopic";
import TakeUuid from "./TakeUuid";

const App = () => {
  return (
    <Router>
      <Main path="app/" />
      <ListView path="app/list" />
      <Topic path="app/topic/:topicId" />
      <CreateTopic path="app/topic/create" />
	  <EditTopic path="app/topic/:topicId/edit" />
	  <TakeUuid path="app/user/:topicId/take" />
    </Router>
  );
};
export default App;
