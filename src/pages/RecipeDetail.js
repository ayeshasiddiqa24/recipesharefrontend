import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";
import Loader from "../components/Loader";

export default function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/recipes/${id}`)
      .then(({ data }) => setRecipe(data))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Loader />;
  if (!recipe) return <p className="text-center text-red-600">Recipe not found.</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded overflow-hidden">
        <img
          src={recipe.image_url || "/placeholder.jpg"}
          alt={recipe.title}
          className="w-full h-80 object-cover"
        />
        <div className="p-6">
          <h1 className="text-4xl font-bold text-purple-700 mb-4">{recipe.title}</h1>
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">{recipe.description}</p>
        </div>
      </div>
    </div>
  );
}
