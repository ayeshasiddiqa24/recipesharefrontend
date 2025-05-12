import { Link } from "react-router-dom";
export default function RecipeCard({ recipe }) {
  return (
    <Link
      to={`/recipes/${recipe.id}`}
      className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
    >
      <img
        src={recipe.image_url || "/placeholder.jpg"}
        alt={recipe.title}
        className="h-48 w-full object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{recipe.title}</h3>
        <p className="text-sm text-gray-600 line-clamp-2">{recipe.description}</p>
      </div>
    </Link>
  );
}
