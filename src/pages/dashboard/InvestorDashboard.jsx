import { useEffect, useState } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";

const InvestorDashboard = () => {
  const [entrepreneurs, setEntrepreneurs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/entrepreneurs")
      .then((res) => setEntrepreneurs(res.data))
      .catch(() => {});
  }, []);

  return (
    <div
      className="max-w-6xl mx-auto mt-16 p-6 shadow-lg rounded-2xl dark:bg-gray-900 transition-all"
      style={{
        background: "linear-gradient(to right, #ec4899, #8b5cf6)",
      }}
    >
      <h2 className="text-3xl font-bold text-pink-200 mb-6 text-center">
        Discover Entrepreneurs 🚀
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {entrepreneurs.map((user) => (
          <div
            key={user.id}
            className="p-5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md hover:shadow-lg transition-all"
          >
            <div className="flex items-center gap-4">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-pink-500"
                />
              ) : (
                <div className="w-14 h-14 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 border-2 border-pink-500 text-xl font-bold">
                  {user.name[0]}
                </div>
              )}
              <div>
                <p className="text-lg font-semibold text-gray-800 dark:text-white">
                  {user.name}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {user.startup}
                </p>
              </div>
            </div>

            <p className="mt-4 text-sm text-gray-700 dark:text-gray-200">
              {user.pitch}
            </p>

            <div className="mt-5 flex gap-3">
              <Button
                onClick={() => {
                  console.log(
                    "Navigating to",
                    `/profile/entrepreneur/${user.id}`
                  );
                  navigate(`/profile/entrepreneur/${user.id}`);
                }}
                className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-md font-medium transition"
              >
                View Profile
              </Button>

              <Button
                onClick={() => navigate(`/chat/${user.id}`)}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium transition"
              >
                Message
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InvestorDashboard;
