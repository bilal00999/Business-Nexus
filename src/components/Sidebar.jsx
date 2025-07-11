import { useAuth } from "../context/useAuth";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const { user } = useAuth();

  if (!user) return null;

  const isInvestor = user.role === "investor";
  return (
    <aside className="w-64 p-4 bg-gray-100 dark:bg-gray-900">
      <h2 className="text-xl font-bold mb-4">Menu</h2>
      <ul className="space-y-2">
        <li>
          <Link to={`/dashboard/${user.role}`}>Dashboard</Link>
        </li>
        <li>
          <Link to={`/profile/${user.role}/${user.id}`}>My Profile</Link>
        </li>
        <li>
          <Link to="/chat/1">Messages</Link>
        </li>
        {isInvestor ? (
          <li>
            <Link to="/investor-tools">Investor Tools</Link>
          </li>
        ) : null}
      </ul>
    </aside>
  );
};

export default Sidebar;
