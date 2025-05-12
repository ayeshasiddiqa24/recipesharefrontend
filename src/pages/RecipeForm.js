import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

export default function RecipeForm() {
  const [form, setForm] = useState({ title: "", description: "" });
  const [file, setFile] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!form.title || !form.description) {
      setError("Title and description are required.");
      return;
    }

    const data = new FormData();
    data.append("title", form.title);
    data.append("description", form.description);
    if (file) data.append("image", file);

    setLoading(true);
    try {
      await api.post("/recipes", data);
      navigate("/my-recipes");
    } catch (err) {
      const msg = err?.response?.data?.message || "Error creating recipe.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-tr from-orange-100 to-yellow-100 px-4">
      <div className="max-w-2xl w-full bg-white p-8 shadow-xl rounded-lg">
        <h2 className="text-3xl font-bold text-orange-600 mb-6 text-center">Add New Recipe</h2>

        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 text-sm">{error}</div>
        )}

        <form onSubmit={submit} className="space-y-4">
          <input
            name="title"
            placeholder="Recipe Title"
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            value={form.title}
            onChange={handleChange}
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            className="w-full border border-gray-300 rounded px-4 py-2 h-36 resize-y focus:outline-none focus:ring-2 focus:ring-orange-400"
            value={form.description}
            onChange={handleChange}
            required
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full border px-3 py-2 rounded bg-white text-sm"
          />
          <button
            type="submit"
            className={`w-full py-2 text-white font-semibold rounded transition ${
              loading ? "bg-orange-300 cursor-not-allowed" : "bg-orange-500 hover:bg-orange-600"
            }`}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Save Recipe"}
          </button>
        </form>
      </div>
    </div>
  );
}
