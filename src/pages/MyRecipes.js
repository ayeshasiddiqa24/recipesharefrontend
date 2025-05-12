import { useEffect, useState } from "react";
import api from "../api";
import Loader from "../components/Loader";
import { TrashIcon } from "@heroicons/react/24/outline";

export default function MyRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState(null);

  const fetchMyRecipes = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/recipes/me");
      setRecipes(data);
    } catch (err) {
      setError("Failed to load your recipes.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyRecipes();
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this recipe?");
    if (!confirm) return;

    setDeletingId(id);
    try {
      await api.delete(`/recipes/${id}`);
      setRecipes((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      alert("Failed to delete the recipe.");
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-100 to-rose-100 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-amber-700 mb-6 text-center">My Recipes</h1>

        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 text-center">{error}</div>
        )}

        {recipes.length === 0 ? (
          <p className="text-center text-gray-600">You haven't added any recipes yet.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.map((recipe) => (
              <div key={recipe.id} className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden relative">
                <img
                  src={recipe.image_url || "/placeholder.jpg"}
                  alt={recipe.title}
                  className="h-48 w-full object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{recipe.title}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2">{recipe.description}</p>
                </div>

                <button
                  onClick={() => handleDelete(recipe.id)}
                  disabled={deletingId === recipe.id}
                  className="absolute top-2 right-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-full p-2 transition"
                  title="Delete"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
