
"use client";

import { useState } from "react";
import {
  Package,
  Plus,
  Search,
  SlidersHorizontal,
  Pencil,
  Trash2,
  X,
  Boxes,
  AlertTriangle,
  PackageCheck,
  IndianRupee,
} from "lucide-react";

type Product = {
  id: number;
  name: string;
  sku: string;
  category: string;
  purchasePrice: number;
  sellingPrice: number;
  stock: number;
};

const initialProducts: Product[] = [
  {
    id: 1,
    name: "T-Shirt Black",
    sku: "TS-001",
    category: "Clothing",
    purchasePrice: 350,
    sellingPrice: 599,
    stock: 120,
  },
  {
    id: 2,
    name: "T-Shirt White",
    sku: "TS-002",
    category: "Clothing",
    purchasePrice: 330,
    sellingPrice: 549,
    stock: 8,
  },
  {
    id: 3,
    name: "Jeans Blue",
    sku: "JN-001",
    category: "Clothing",
    purchasePrice: 900,
    sellingPrice: 1499,
    stock: 5,
  },
  {
    id: 4,
    name: "Cap Black",
    sku: "CP-001",
    category: "Accessories",
    purchasePrice: 150,
    sellingPrice: 299,
    stock: 3,
  },
  {
    id: 5,
    name: "Hoodie Grey",
    sku: "HD-001",
    category: "Clothing",
    purchasePrice: 1200,
    sellingPrice: 1999,
    stock: 45,
  },
];

const formatPrice = (price: number) =>
  `₹${price.toLocaleString("en-IN")}`;

export default function ProductsPage() {
  const [products, setProducts] =
    useState<Product[]>(initialProducts);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const emptyForm = {
    name: "",
    sku: "",
    category: "Clothing",
    purchasePrice: "",
    sellingPrice: "",
    stock: "",
  };

  const [form, setForm] = useState(emptyForm);

  // Dashboard summary
  const totalProducts = products.length;

  const totalStock = products.reduce(
    (total, product) => total + product.stock,
    0
  );

  const lowStock = products.filter(
    (product) => product.stock <= 10
  ).length;

  const stockValue = products.reduce(
    (total, product) =>
      total + product.purchasePrice * product.stock,
    0
  );

  // Search and category filtering
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.sku.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || product.category === category;

    return matchesSearch && matchesCategory;
  });

  const openAddModal = () => {
    setEditingId(null);
    setForm(emptyForm);
    setShowModal(true);
  };

  const openEditModal = (product: Product) => {
    setEditingId(product.id);
    setForm({
      name: product.name,
      sku: product.sku,
      category: product.category,
      purchasePrice: String(product.purchasePrice),
      sellingPrice: String(product.sellingPrice),
      stock: String(product.stock),
    });
    setShowModal(true);
  };

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const productData = {
      name: form.name.trim(),
      sku: form.sku.trim(),
      category: form.category,
      purchasePrice: Number(form.purchasePrice),
      sellingPrice: Number(form.sellingPrice),
      stock: Number(form.stock),
    };

    if (!productData.name || !productData.sku) return;

    if (
      !Number.isFinite(productData.purchasePrice) ||
      !Number.isFinite(productData.sellingPrice) ||
      !Number.isInteger(productData.stock) ||
      productData.purchasePrice < 0 ||
      productData.sellingPrice < 0 ||
      productData.stock < 0
    ) {
      return;
    }

    const duplicateSku = products.some(
      (product) =>
        product.sku.toLowerCase() === productData.sku.toLowerCase() &&
        product.id !== editingId
    );

    if (duplicateSku) {
      alert("This SKU already exists.");
      return;
    }

    if (editingId !== null) {
      setProducts((prev) =>
        prev.map((product) =>
          product.id === editingId
            ? { ...product, ...productData }
            : product
        )
      );
    } else {
      setProducts((prev) => [
        {
          id: Date.now(),
          ...productData,
        },
        ...prev,
      ]);
    }

    setShowModal(false);
    setForm(emptyForm);
    setEditingId(null);
  };

  const handleDelete = (id: number) => {
    if (!window.confirm("Delete this product?")) return;

    setProducts((prev) =>
      prev.filter((product) => product.id !== id)
    );
  };

  return (
    <div className="space-y-6 pb-10 text-white">

      {/* Page Heading */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Product Inventory
          </h2>
          <p className="mt-1 text-sm text-gray-400">
            Manage all your shop products in one place.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-violet-600 px-5 py-3 text-sm font-semibold shadow-lg shadow-purple-900/20 transition hover:from-purple-500 hover:to-violet-500"
        >
          <Plus size={18} />
          Add Product
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            title: "Total Products",
            value: totalProducts,
            icon: Package,
            color: "text-purple-400",
            bg: "bg-purple-500/10",
          },
          {
            title: "Total Stock",
            value: totalStock,
            icon: Boxes,
            color: "text-blue-400",
            bg: "bg-blue-500/10",
          },
          {
            title: "Low Stock",
            value: lowStock,
            icon: AlertTriangle,
            color: "text-red-400",
            bg: "bg-red-500/10",
          },
          {
            title: "Stock Value",
            value: formatPrice(stockValue),
            icon: IndianRupee,
            color: "text-green-400",
            bg: "bg-green-500/10",
          },
        ].map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="rounded-2xl border border-white/10 bg-[#151528] p-5 transition hover:border-purple-500/30"
            >
              <div className="flex items-center justify-between">
                <div className={`rounded-xl p-3 ${stat.bg}`}>
                  <Icon size={22} className={stat.color} />
                </div>
                <PackageCheck
                  size={17}
                  className="text-gray-600"
                />
              </div>

              <p className="mt-5 text-sm text-gray-400">
                {stat.title}
              </p>

              <h3 className="mt-1 text-2xl font-bold">
                {stat.value}
              </h3>
            </div>
          );
        })}
      </div>

      {/* Product Table */}
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#151528]">

        {/* Table Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 p-5">
          <div>
            <h3 className="text-lg font-semibold">
              All Products
            </h3>
            <p className="mt-1 text-xs text-gray-400">
              {filteredProducts.length} products found
            </p>
          </div>

          <div className="flex w-full flex-wrap gap-3 sm:w-auto">

            {/* Search */}
            <div className="flex min-w-0 flex-1 items-center gap-2 rounded-xl border border-white/10 bg-[#101020] px-3 py-2.5 focus-within:border-purple-500 sm:w-64 sm:flex-none">
              <Search size={17} className="shrink-0 text-gray-400" />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products..."
                className="w-full min-w-0 bg-transparent text-sm outline-none placeholder:text-gray-500"
              />
            </div>

            {/* Category */}
            <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#101020] px-3">
              <SlidersHorizontal
                size={17}
                className="text-gray-400"
              />

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="bg-transparent py-2.5 text-sm text-gray-300 outline-none"
              >
                <option value="All">All Categories</option>
                <option value="Clothing">Clothing</option>
                <option value="Accessories">Accessories</option>
                <option value="Electronics">Electronics</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] text-left text-sm">
            <thead className="bg-white/[0.03] text-xs uppercase tracking-wider text-gray-400">
              <tr>
                <th className="px-5 py-4 font-medium">Product</th>
                <th className="px-4 py-4 font-medium">Category</th>
                <th className="px-4 py-4 font-medium">Purchase</th>
                <th className="px-4 py-4 font-medium">Selling</th>
                <th className="px-4 py-4 font-medium">Stock</th>
                <th className="px-4 py-4 font-medium">Status</th>
                <th className="px-4 py-4 text-right font-medium">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredProducts.map((product) => {
                const status =
                  product.stock === 0
                    ? "Out of Stock"
                    : product.stock <= 10
                    ? "Low Stock"
                    : "In Stock";

                return (
                  <tr
                    key={product.id}
                    className="border-t border-white/5 transition hover:bg-white/[0.03]"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="rounded-xl bg-purple-500/10 p-3 text-purple-400">
                          <Package size={20} />
                        </div>

                        <div>
                          <p className="font-medium text-white">
                            {product.name}
                          </p>
                          <p className="mt-1 text-xs text-gray-500">
                            {product.sku}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-4 text-gray-300">
                      {product.category}
                    </td>

                    <td className="px-4 py-4 text-gray-300">
                      {formatPrice(product.purchasePrice)}
                    </td>

                    <td className="px-4 py-4 font-medium text-white">
                      {formatPrice(product.sellingPrice)}
                    </td>

                    <td className="px-4 py-4 font-semibold">
                      {product.stock} pcs
                    </td>

                    <td className="px-4 py-4">
                      <span
                        className={`rounded-lg px-3 py-1.5 text-xs font-semibold ${
                          status === "In Stock"
                            ? "bg-green-500/10 text-green-400"
                            : status === "Low Stock"
                            ? "bg-yellow-500/10 text-yellow-400"
                            : "bg-red-500/10 text-red-400"
                        }`}
                      >
                        {status}
                      </span>
                    </td>

                    <td className="px-4 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => openEditModal(product)}
                          aria-label={`Edit ${product.name}`}
                          className="rounded-lg bg-purple-500/10 p-2 text-purple-400 transition hover:bg-purple-500/20"
                        >
                          <Pencil size={17} />
                        </button>

                        <button
                          onClick={() => handleDelete(product.id)}
                          aria-label={`Delete ${product.name}`}
                          className="rounded-lg bg-red-500/10 p-2 text-red-400 transition hover:bg-red-500/20"
                        >
                          <Trash2 size={17} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {filteredProducts.length === 0 && (
            <div className="py-16 text-center text-gray-400">
              <Package size={36} className="mx-auto mb-3 opacity-50" />
              No products found.
            </div>
          )}
        </div>
      </div>

      {/* Add / Edit Product Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="product-modal-title"
            className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl border border-purple-500/20 bg-[#151528] shadow-2xl shadow-purple-900/20"
          >
            <div className="flex items-center justify-between border-b border-white/10 p-6">
              <div>
                <h2
                  id="product-modal-title"
                  className="text-xl font-bold"
                >
                  {editingId !== null
                    ? "Edit Product"
                    : "Add New Product"}
                </h2>
                <p className="mt-1 text-xs text-gray-400">
                  Enter your product details below.
                </p>
              </div>

              <button
                onClick={() => setShowModal(false)}
                aria-label="Close modal"
                className="rounded-lg p-2 text-gray-400 hover:bg-white/10"
              >
                <X size={21} />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-5 p-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                <div className="sm:col-span-2">
                  <label className="mb-2 block text-sm text-gray-300">
                    Product Name
                  </label>
                  <input
                    required
                    value={form.name}
                    onChange={(e) =>
                      setForm({ ...form, name: e.target.value })
                    }
                    placeholder="e.g. T-Shirt Black"
                    className="w-full rounded-xl border border-white/10 bg-[#101020] px-4 py-3 text-sm outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-gray-300">
                    SKU / Product Code
                  </label>
                  <input
                    required
                    value={form.sku}
                    onChange={(e) =>
                      setForm({ ...form, sku: e.target.value })
                    }
                    placeholder="e.g. TS-001"
                    className="w-full rounded-xl border border-white/10 bg-[#101020] px-4 py-3 text-sm outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-gray-300">
                    Category
                  </label>
                  <select
                    value={form.category}
                    onChange={(e) =>
                      setForm({ ...form, category: e.target.value })
                    }
                    className="w-full rounded-xl border border-white/10 bg-[#101020] px-4 py-3 text-sm outline-none focus:border-purple-500"
                  >
                    <option value="Clothing">Clothing</option>
                    <option value="Accessories">Accessories</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm text-gray-300">
                    Purchase Price (₹)
                  </label>
                  <input
                    required
                    type="number"
                    min="0"
                    step="0.01"
                    value={form.purchasePrice}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        purchasePrice: e.target.value,
                      })
                    }
                    placeholder="350"
                    className="w-full rounded-xl border border-white/10 bg-[#101020] px-4 py-3 text-sm outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-gray-300">
                    Selling Price (₹)
                  </label>
                  <input
                    required
                    type="number"
                    min="0"
                    step="0.01"
                    value={form.sellingPrice}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        sellingPrice: e.target.value,
                      })
                    }
                    placeholder="599"
                    className="w-full rounded-xl border border-white/10 bg-[#101020] px-4 py-3 text-sm outline-none focus:border-purple-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="mb-2 block text-sm text-gray-300">
                    Opening Stock (Quantity)
                  </label>
                  <input
                    required
                    type="number"
                    min="0"
                    step="1"
                    value={form.stock}
                    onChange={(e) =>
                      setForm({ ...form, stock: e.target.value })
                    }
                    placeholder="50"
                    className="w-full rounded-xl border border-white/10 bg-[#101020] px-4 py-3 text-sm outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 border-t border-white/10 pt-5">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="rounded-xl border border-white/10 px-5 py-3 text-sm text-gray-300 hover:bg-white/5"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex items-center gap-2 rounded-xl bg-purple-600 px-5 py-3 text-sm font-semibold transition hover:bg-purple-500"
                >
                  <Plus size={17} />
                  {editingId !== null
                    ? "Save Changes"
                    : "Add Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
  
}
