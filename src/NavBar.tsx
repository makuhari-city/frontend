import { User } from "./user";

interface NavBarProps {
  user: User;
}

const NavBar = ({ user }: NavBarProps) => (
  <header>
	  <nav className="flex items-center justify-between p-6 container mx-auto" style={{backgroundColor:"rgba(213, 88, 78, 0.7)"}}>
      <a href="/">🏠</a>
        <span className="block mt-4 lg:inline-block text-teal-600 lg:mt-0 mr-10">
          {user.name} ({user.uid.substring(0,5)})
        </span>
    </nav>
  </header>
);

export default NavBar;
