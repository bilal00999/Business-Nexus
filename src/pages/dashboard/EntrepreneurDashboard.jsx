import { useEffect, useState } from "react";
import api from "../../services/api";
import { useAuth } from "../../context/useAuth";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";

const EntrepreneurDashboard = () => {
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);
  const [investors, setInvestors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/requests").then((res) => {
      const myRequests = res.data
        .filter((r) => String(r.entrepreneurId) === String(user.id))
        .slice(0, 10); // Only take the first 10 requests
      setRequests(myRequests);
    });
    api.get("/investors").then((res) => setInvestors(res.data));
  }, [user.id]);

  const getInvestor = (id) => investors.find((i) => i.id === String(id));

  return (
    <div
      className="max-w-3xl mx-auto mt-16 p-6 shadow-lg rounded-2xl dark:bg-gray-900 transition-all"
      style={{
        background: "linear-gradient(to right, #ec4899, #8b5cf6)",
      }}
    >
      <h2 className="text-3xl font-bold text-pink-200 mb-6 text-center">
        Collaboration Requests
      </h2>

      {requests.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">
          No collaboration requests yet.
        </p>
      ) : (
        requests.map((req) => {
          const investor = getInvestor(req.investorId);
          return (
            <div
              key={req.id}
              className="mb-4 border border-gray-200 dark:border-gray-700 p-5 rounded-xl bg-gray-50 dark:bg-gray-800 shadow-sm"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {investor?.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                    {investor?.bio}
                  </p>
                  <p className="text-sm mt-2 font-medium text-gray-700 dark:text-gray-400">
                    Status: <span className="capitalize">{req.status}</span>
                  </p>
                </div>
                <Button
                  onClick={() => {
                    console.log(
                      "Navigating to",
                      `/profile/investor/${investor?.id}`
                    );
                    navigate(`/profile/investor/${investor?.id}`);
                  }}
                  className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-md font-medium transition"
                >
                  View Profile
                </Button>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default EntrepreneurDashboard;
