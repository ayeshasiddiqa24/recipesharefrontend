import { useEffect, useState } from "react";
import api from "../api";
import RecipeCard from "../components/RecipeCard";
import Loader from "../components/Loader";

export default function RecipeList() {
  const [recipes, setRecipes] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/recipes")
      .then(({ data }) => setRecipes(data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 py-10 px-4">
      <h1 className="text-3xl font-bold text-indigo-700 mb-6 text-center">Explore Recipes</h1>
      <div className="max-w-7xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {recipes.map((r) => (
          <RecipeCard key={r.id} recipe={r} />
        ))}
      </div>
    </div>
  );
}
