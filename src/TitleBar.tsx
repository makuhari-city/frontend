import { Link } from "@reach/router";
import { User } from "./user";

interface TitleBarProps {
  user?: User | null;
}

const TitleBar = ({ user }: TitleBarProps) => (
  <header>
    <nav className="mt-32 mb-32 max-w-screen-md">
      {user ? (
        <div className="text-xs mb-2">
          logged in as: {user.name} ({user.uid.substring(0, 6)}){" "}
          <Link
            to={`/app/user/${user.uid}/take`}
            className="underline text-nord-7"
          >
            change
          </Link>
        </div>
      ) : (
        ""
      )}
		<div className="flex items-center justify-between">
        <Link to="/app/" className="hover:underline font-bold flex-shrink">
          METACITY 「多層都市」幕張市
        </Link>
		  <div className="flex justify-end text-xs md:text-base flex-shrink-0">
          <Link to="/app/list/" className="px-2 hover:underline">
            リスト
          </Link>
          |
          <Link to="/app/topic/create/" className="pl-2 hover:underline">
            新規作成
          </Link>
        </div>
      </div>
    </nav>
  </header>
);

export default TitleBar;
