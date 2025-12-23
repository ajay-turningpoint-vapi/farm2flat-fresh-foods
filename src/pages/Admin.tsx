import { useState, useEffect } from "react";
import Header from "@/components/Header";
import { Product } from "@/types/product";
import productsService from "@/lib/products";

const ADMIN_PASS = "admin123";

export default function Admin() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    setProducts(productsService.loadProducts());
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASS) setLoggedIn(true);
    else alert("Incorrect password");
  };

  const handleChange = (id: string, field: keyof Product, value: any) => {
    const next = products.map((p) =>
      p.id === id ? { ...p, [field]: value } : p
    );
    setProducts(next);
    productsService.saveProducts(next);
  };

  const handleAdd = () => {
    const id = `p_${Date.now()}`;
    const newProd: Product = {
      id,
      name: "New Product",
      nameHindi: "नई चीज़",
      price: 0,
      unit: "kg",
      image: "",
    };
    const next = [...products, newProd];
    setProducts(next);
    productsService.saveProducts(next);
  };

  const handleDelete = (id: string) => {
    const next = products.filter((p) => p.id !== id);
    setProducts(next);
    productsService.saveProducts(next);
  };

  const handleReset = () => {
    productsService.resetProducts();
    setProducts(productsService.loadProducts());
  };

  if (!loggedIn) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
          <form onSubmit={handleLogin} className="max-w-sm">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full p-2 border rounded mb-2"
            />
            <button className="px-4 py-2 bg-primary text-white rounded">
              Login
            </button>
          </form>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Product Manager</h2>
          <div className="space-x-2">
            <button
              onClick={handleAdd}
              className="px-3 py-1 bg-green-600 text-white rounded"
            >
              Add
            </button>
            <button
              onClick={handleReset}
              className="px-3 py-1 bg-red-600 text-white rounded"
            >
              Reset
            </button>
            <button
              onClick={() => setLoggedIn(false)}
              className="px-3 py-1 bg-gray-300 rounded"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {products.map((p) => (
            <div key={p.id} className="border rounded p-4 bg-card">
              <div className="flex gap-4">
                <div className="w-24 h-24 bg-gray-100 flex items-center justify-center rounded overflow-hidden">
                  {p.image ? (
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-xs">No image</span>
                  )}
                </div>
                <div className="flex-1">
                  <label className="block text-xs text-muted-foreground">
                    ID
                  </label>
                  <input
                    value={p.id}
                    disabled
                    className="w-full p-1 mb-2 border rounded bg-gray-50"
                  />

                  <label className="block text-xs text-muted-foreground">
                    Name
                  </label>
                  <input
                    value={p.name}
                    onChange={(e) => handleChange(p.id, "name", e.target.value)}
                    className="w-full p-1 mb-2 border rounded"
                  />

                  <label className="block text-xs text-muted-foreground">
                    Name (Hindi)
                  </label>
                  <input
                    value={p.nameHindi}
                    onChange={(e) =>
                      handleChange(p.id, "nameHindi", e.target.value)
                    }
                    className="w-full p-1 mb-2 border rounded"
                  />

                  <div className="flex gap-2">
                    <div className="flex-1">
                      <label className="block text-xs text-muted-foreground">
                        Price
                      </label>
                      <input
                        type="number"
                        value={p.price}
                        onChange={(e) =>
                          handleChange(p.id, "price", Number(e.target.value))
                        }
                        className="w-full p-1 mb-2 border rounded"
                      />
                    </div>
                    <div className="w-24">
                      <label className="block text-xs text-muted-foreground">
                        Unit
                      </label>
                      <input
                        value={p.unit}
                        onChange={(e) =>
                          handleChange(p.id, "unit", e.target.value)
                        }
                        className="w-full p-1 mb-2 border rounded"
                      />
                    </div>
                  </div>

                  <label className="block text-xs text-muted-foreground">
                    Image URL
                  </label>
                  <input
                    value={p.image}
                    onChange={(e) =>
                      handleChange(p.id, "image", e.target.value)
                    }
                    className="w-full p-1 mb-2 border rounded"
                  />

                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => productsService.saveProducts(products)}
                      className="px-3 py-1 bg-primary text-white rounded"
                    >
                      Save All
                    </button>
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
