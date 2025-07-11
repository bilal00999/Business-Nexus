import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const InvestorProfile = () => {
  const { id } = useParams();
  const [investor, setInvestor] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:4001/investors/${id}`)
      .then((res) => {
        setInvestor(res.data);
        setError(null);
      })
      .catch((err) => {
        setError("Investor not found or error loading profile.");
        setInvestor(null);
        console.error("[InvestorProfile] Fetch error:", err);
      });
  }, [id]);

  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;
  if (!investor) return <p>Loading...</p>;

  return (
    <div
      className="max-w-3xl mx-auto mt-16 p-8 shadow-lg rounded-2xl dark:bg-gray-900 transition-all"
      style={{
        background: "linear-gradient(to right, #ec4899, #8b5cf6)",
      }}
    >
      <h2 className="text-3xl font-bold text-pink-200 mb-4">{investor.name}</h2>

      <p className="text-gray-700 dark:text-gray-300 mb-4">{investor.bio}</p>

      <div className="space-y-3 text-gray-800 dark:text-gray-200">
        <p>
          <strong className="text-pink-200">Investment Interests:</strong>{" "}
          {investor.interests.join(", ")}
        </p>
        <p>
          <strong className="text-pink-200">Portfolio Companies:</strong>{" "}
          {investor.portfolio.join(", ")}
        </p>
      </div>
    </div>
  );
};

export default InvestorProfile;
