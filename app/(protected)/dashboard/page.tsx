
"use client";

import Link from "next/link";
import {
  Package,
  Layers3,
  ShoppingCart,
  IndianRupee,
  TrendingUp,
  ArrowDownToLine,
  ArrowUpFromLine,
  Plus,
  ArrowRight,
  AlertTriangle,
  Clock3,
} from "lucide-react";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

// Dummy Data
const stats = [
  {
    title: "Total Products",
    value: "142",
    change: "+8%",
    icon: Package,
  },
  {
    title: "Total Stock",
    value: "3,642",
    change: "+12%",
    icon: Layers3,
  },
  {
    title: "Total Sold",
    value: "1,286",
    change: "+18%",
    icon: ShoppingCart,
  },
  {
    title: "Stock Value",
    value: "₹4,92,300",
    change: "",
    icon: IndianRupee,
  },
];

const chartData = [
  { day: "Mon", stockIn: 80, stockOut: 40 },
  { day: "Tue", stockIn: 130, stockOut: 75 },
  { day: "Wed", stockIn: 95, stockOut: 50 },
  { day: "Thu", stockIn: 175, stockOut: 110 },
  { day: "Fri", stockIn: 130, stockOut: 70 },
  { day: "Sat", stockIn: 220, stockOut: 100 },
  { day: "Sun", stockIn: 185, stockOut: 135 },
];

const products = [
  {
    id: 1,
    name: "T-Shirt (Black)",
    purchase: 350,
    selling: 599,
    stock: 120,
  },
  {
    id: 2,
    name: "T-Shirt (White)",
    purchase: 330,
    selling: 549,
    stock: 8,
  },
  {
    id: 3,
    name: "Jeans (Blue)",
    purchase: 900,
    selling: 1499,
    stock: 5,
  },
  {
    id: 4,
    name: "Cap (Black)",
    purchase: 150,
    selling: 299,
    stock: 3,
  },
  {
    id: 5,
    name: "Hoodie (Grey)",
    purchase: 1200,
    selling: 1999,
    stock: 45,
  },
];

const transactions = [
  {
    id: 1,
    name: "T-Shirt (Black)",
    type: "in",
    qty: 50,
    time: "2 hours ago",
  },
  {
    id: 2,
    name: "T-Shirt (Black)",
    type: "out",
    qty: 12,
    time: "3 hours ago",
  },
  {
    id: 3,
    name: "Jeans (Blue)",
    type: "in",
    qty: 100,
    time: "5 hours ago",
  },
  {
    id: 4,
    name: "Jeans (Blue)",
    type: "out",
    qty: 5,
    time: "6 hours ago",
  },
];

const formatPrice = (value: number) =>
  `₹${value.toLocaleString("en-IN")}`;

export default function Dashboard() {
  const lowStock = products.filter(
    (product) => product.stock <= 10
  );

  return (
    <div className="space-y-6 pb-8">

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="group rounded-2xl border border-purple-500/15 bg-[#151528] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-purple-500/50 hover:shadow-xl hover:shadow-purple-900/10"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-600/15 text-purple-400">
                  <Icon size={24} />
                </div>

                {stat.change && (
                  <span className="flex items-center gap-1 rounded-full bg-green-500/10 px-2 py-1 text-xs font-medium text-green-400">
                    <TrendingUp size={13} />
                    {stat.change}
                  </span>
                )}
              </div>

              <p className="mt-5 text-sm text-gray-400">
                {stat.title}
              </p>

              <h2 className="mt-1 text-2xl font-bold tracking-tight text-white">
                {stat.value}
              </h2>
            </div>
          );
        })}
      </div>

      {/* Chart + Quick Actions */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">

        {/* Stock Chart */}
        <div className="min-w-0 rounded-2xl border border-white/10 bg-[#151528] p-5 xl:col-span-2">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-white">
                Stock Movement
              </h2>
              <p className="mt-1 text-xs text-gray-400">
                Weekly stock in and out overview
              </p>
            </div>

            <span className="rounded-lg border border-purple-500/30 bg-purple-500/10 px-3 py-2 text-xs text-purple-300">
              This Week
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient
                    id="stockInGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor="#8B5CF6"
                      stopOpacity={0.35}
                    />
                    <stop
                      offset="95%"
                      stopColor="#8B5CF6"
                      stopOpacity={0}
                    />
                  </linearGradient>

                  <linearGradient
                    id="stockOutGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor="#EC4899"
                      stopOpacity={0.25}
                    />
                    <stop
                      offset="95%"
                      stopColor="#EC4899"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>

                <CartesianGrid
                  stroke="#ffffff10"
                  vertical={false}
                />

                <XAxis
                  dataKey="day"
                  stroke="#9CA3AF"
                  tickLine={false}
                  axisLine={false}
                  fontSize={12}
                />

                <YAxis
                  stroke="#9CA3AF"
                  tickLine={false}
                  axisLine={false}
                  fontSize={12}
                />

                <Tooltip
                  contentStyle={{
                    background: "#19182d",
                    border: "1px solid #ffffff20",
                    borderRadius: "12px",
                    color: "#fff",
                  }}
                />

                <Area
                  type="monotone"
                  dataKey="stockIn"
                  name="Stock In"
                  stroke="#8B5CF6"
                  strokeWidth={3}
                  fill="url(#stockInGradient)"
                />

                <Area
                  type="monotone"
                  dataKey="stockOut"
                  name="Stock Out"
                  stroke="#EC4899"
                  strokeWidth={3}
                  fill="url(#stockOutGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 flex justify-center gap-6 text-xs text-gray-400">
            <span className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-purple-500" />
              Stock In
            </span>

            <span className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-pink-500" />
              Stock Out
            </span>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="rounded-2xl border border-white/10 bg-[#151528] p-5">
          <div className="mb-6 flex items-center gap-2">
            <span className="rounded-lg bg-purple-500/10 p-2 text-purple-400">
              <Package size={20} />
            </span>

            <h2 className="text-lg font-semibold">
              Quick Actions
            </h2>
          </div>

          <div className="space-y-3">
            <Link
              href="/products"
              className="flex items-center gap-3 rounded-xl bg-gradient-to-r from-purple-600 to-purple-700 px-4 py-4 text-sm font-medium text-white transition hover:from-purple-500 hover:to-purple-600"
            >
              <Plus size={19} />
              Add New Product
            </Link>

            <Link
              href="/stock-in"
              className="flex items-center gap-3 rounded-xl bg-[#1e1e35] px-4 py-4 text-sm text-gray-300 transition hover:bg-purple-600/15 hover:text-white"
            >
              <ArrowDownToLine
                size={19}
                className="text-purple-400"
              />
              Stock In (Purchase)
            </Link>

            <Link
              href="/sales"
              className="flex items-center gap-3 rounded-xl bg-[#1e1e35] px-4 py-4 text-sm text-gray-300 transition hover:bg-purple-600/15 hover:text-white"
            >
              <ArrowUpFromLine
                size={19}
                className="text-purple-400"
              />
              Sell Product (Stock Out)
            </Link>

            <Link
              href="/products"
              className="flex items-center gap-3 rounded-xl bg-[#1e1e35] px-4 py-4 text-sm text-gray-300 transition hover:bg-purple-600/15 hover:text-white"
            >
              <Package
                size={19}
                className="text-purple-400"
              />
              View All Products
            </Link>
          </div>
        </div>
      </div>

      {/* Products + Right Panels */}
      <div className="grid grid-cols-1 items-start gap-5 xl:grid-cols-3">

        {/* Product Stock Table */}
        <div className="min-w-0 overflow-hidden rounded-2xl border border-white/10 bg-[#151528] xl:col-span-2">
          <div className="flex items-center justify-between gap-3 border-b border-white/10 p-5">
            <div className="flex items-center gap-2">
              <Package
                size={20}
                className="text-purple-400"
              />

              <h2 className="text-lg font-semibold">
                Product Stock
              </h2>
            </div>

            <Link
              href="/products"
              className="flex items-center gap-1 text-sm text-purple-400 hover:text-purple-300"
            >
              View All
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[650px] text-left text-sm">
              <thead className="bg-white/[0.03] text-xs text-gray-400">
                <tr>
                  <th className="px-5 py-4 font-medium">
                    Product
                  </th>
                  <th className="px-4 py-4 font-medium">
                    Purchase
                  </th>
                  <th className="px-4 py-4 font-medium">
                    Selling
                  </th>
                  <th className="px-4 py-4 font-medium">
                    Stock
                  </th>
                  <th className="px-4 py-4 font-medium">
                    Value
                  </th>
                </tr>
              </thead>

              <tbody>
                {products.map((product) => (
                  <tr
                    key={product.id}
                    className="border-t border-white/5 transition hover:bg-white/[0.03]"
                  >
                    <td className="px-5 py-4 font-medium text-white">
                      {product.name}
                    </td>

                    <td className="px-4 py-4 text-gray-300">
                      {formatPrice(product.purchase)}
                    </td>

                    <td className="px-4 py-4 text-gray-300">
                      {formatPrice(product.selling)}
                    </td>

                    <td className="px-4 py-4">
                      <span
                        className={`rounded-lg px-2.5 py-1 text-xs font-semibold ${
                          product.stock <= 10
                            ? "bg-red-500/15 text-red-400"
                            : "bg-green-500/15 text-green-400"
                        }`}
                      >
                        {product.stock} pcs
                      </span>
                    </td>

                    <td className="px-4 py-4 text-gray-300">
                      {formatPrice(
                        product.purchase * product.stock
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-5">

          {/* Recent Transactions */}
          <div className="rounded-2xl border border-white/10 bg-[#151528] p-5">
            <div className="mb-5 flex items-center gap-2">
              <Clock3
                size={20}
                className="text-purple-400"
              />

              <h2 className="text-lg font-semibold">
                Recent Transactions
              </h2>
            </div>

            <div className="space-y-4">
              {transactions.map((item) => {
                const isStockIn = item.type === "in";

                return (
                  <div
                    key={item.id}
                    className="flex items-center justify-between gap-3 border-b border-white/5 pb-3 last:border-0 last:pb-0"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <div
                        className={`rounded-lg p-2 ${
                          isStockIn
                            ? "bg-green-500/10 text-green-400"
                            : "bg-red-500/10 text-red-400"
                        }`}
                      >
                        {isStockIn ? (
                          <ArrowDownToLine size={18} />
                        ) : (
                          <ArrowUpFromLine size={18} />
                        )}
                      </div>

                      <div className="min-w-0">
                        <p className="text-sm font-medium text-white">
                          {isStockIn ? "Stock In" : "Sale"}
                        </p>

                        <p className="truncate text-xs text-gray-400">
                          {item.name}
                        </p>
                      </div>
                    </div>

                    <div className="shrink-0 text-right">
                      <p
                        className={`text-sm font-semibold ${
                          isStockIn
                            ? "text-green-400"
                            : "text-red-400"
                        }`}
                      >
                        {isStockIn ? "+" : "-"}
                        {item.qty} pcs
                      </p>

                      <p className="mt-1 text-xs text-gray-500">
                        {item.time}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <Link
              href="/history"
              className="mt-5 flex items-center justify-center gap-2 text-sm text-purple-400 hover:text-purple-300"
            >
              View All Transactions
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* Low Stock Alerts */}
          <div className="rounded-2xl border border-white/10 bg-[#151528] p-5">
            <div className="mb-5 flex items-center gap-2">
              <AlertTriangle
                size={20}
                className="text-red-400"
              />

              <h2 className="text-lg font-semibold">
                Low Stock Alerts
              </h2>
            </div>

            <div className="space-y-4">
              {lowStock.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between gap-3"
                >
                  <p className="truncate text-sm text-gray-300">
                    {product.name}
                  </p>

                  <span className="shrink-0 rounded-lg bg-red-500/15 px-3 py-1.5 text-xs font-semibold text-red-400">
                    {product.stock} pcs
                  </span>
                </div>
              ))}
            </div>

            <Link
              href="/products"
              className="mt-6 flex items-center justify-center gap-2 text-sm text-purple-400 hover:text-purple-300"
            >
              View All Products
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
