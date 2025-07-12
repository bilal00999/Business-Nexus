import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../services/api";

const EntrepreneurProfile = () => {
  const { id } = useParams();
  const [entrepreneur, setEntrepreneur] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    api
      .get(`/entrepreneurs/${id}`)
      .then((res) => {
        setEntrepreneur(res.data);
        setError(null);
      })
      .catch((err) => {
        setError("Entrepreneur not found or error loading profile.");
        setEntrepreneur(null);
        console.error("[EntrepreneurProfile] Fetch error:", err);
      });
  }, [id]);

  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;
  if (!entrepreneur) return <p>Loading...</p>;

  return (
    <div
      className="max-w-3xl mx-auto mt-16 p-8 shadow-lg rounded-2xl dark:bg-gray-900 transition-all"
      style={{
        background: "linear-gradient(to right, #ec4899, #8b5cf6)",
      }}
    >
      <h2 className="text-3xl font-bold text-pink-200 mb-4">
        {entrepreneur.name}
      </h2>

      <p className="text-gray-700 dark:text-gray-300 mb-4">
        {entrepreneur.bio}
      </p>

      <div className="space-y-3 text-gray-800 dark:text-gray-200">
        <p>
          <strong className="text-pink-200">Startup:</strong>{" "}
          {entrepreneur.startup}
        </p>
        <p>
          <strong className="text-pink-200">Description:</strong>{" "}
          {entrepreneur.description}
        </p>
        <p>
          <strong className="text-pink-200">Funding Need:</strong>{" "}
          {entrepreneur.fundingNeed}
        </p>
      </div>

      <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-center text-gray-600 dark:text-gray-300 italic">
        📂 Pitch Deck Placeholder
      </div>
    </div>
  );
};

export default EntrepreneurProfile;
