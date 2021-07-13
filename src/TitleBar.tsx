import { Link } from "@reach/router";

const TitleBar = () => (
  <header>
    <nav className="container mt-32 mb-32 max-w-screen-lg mx-auto">
      <div className="w-3/5 flex items-center justify-between">
        <Link to="/frontend/" className="hover:underline font-bold">
          METACITY 「多層都市」幕張市
        </Link>
        <div className="flex justify-end"> <Link to="/frontend/list/" className="px-2 hover:underline">
            list
          </Link>
          <Link to="/frontend/topic/create/" className="pl-2 hover:underline">
            new topic
          </Link>
        </div>
      </div>
    </nav>
  </header>
);

export default TitleBar;
