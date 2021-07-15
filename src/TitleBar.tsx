import { Link } from "@reach/router";
import { User } from "./user";

interface TitleBarProps {
	user?: User|null;
}

const TitleBar = ({ user }: TitleBarProps) => (
  <header>
    <nav className="container mt-32 mb-32 max-w-screen-lg mx-auto">
{user ? (
      <div className="text-xs mb-2">
		  logged in as: {user.name} ({user.uid.substring(0, 6)})
      </div>
    ) : (
      ""
    )}
      <div className="w-3/5 flex items-center justify-between">
        <Link to="/app/" className="hover:underline font-bold">
          METACITY 「多層都市」幕張市
        </Link>
        <div className="flex justify-end">
          {" "}
          <Link to="/app/list/" className="px-2 hover:underline">
            list
          </Link>
          <Link to="/app/topic/create/" className="pl-2 hover:underline">
            new topic
          </Link>
        </div>
      </div>
    </nav>
    
  </header>
);

export default TitleBar;
