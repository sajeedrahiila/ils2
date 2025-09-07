import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import axios from "axios";

export default function CatalogPage() {
  const { data: session } = useSession();
  const [items, setItems] = useState<any[]>([]);
  const [error, setError] = useState("");

  const fetchItems = async () => {
    try {
      const res = await axios.get("/api/catalog");
      setItems(res.data.items);
    } catch (err) {
      setError("Failed to fetch items");
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  if (!session) {
    return <div className="p-8">Login to view catalog.</div>;
  }

  return (
    <div className="min-h-screen p-8">
      <h2 className="text-2xl font-bold mb-4">Halal Catalog</h2>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item, idx) => (
          <div key={idx} className="bg-white dark:bg-gray-800 rounded shadow p-4">
            <h3 className="font-bold text-lg mb-2">{item.name}</h3>
            <p>Category: {item.category}</p>
            <p>Price: ${item.price}</p>
            <p>{item.halalCertified ? "Halal Certified" : "Not Certified"}</p>
            <p>{item.description}</p>
            <p>Stock: {item.stock}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
