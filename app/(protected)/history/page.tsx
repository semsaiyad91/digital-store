
"use client";

import { useState } from "react";
import {
  History,
  ArrowDownToLine,
  ArrowUpFromLine,
  Search,
  Package,
  TrendingUp,
  TrendingDown,
  CalendarDays,
} from "lucide-react";

type Transaction = {
  id: number;
  product: string;
  sku: string;
  type: "in" | "out";
  quantity: number;
  price: number;
  date: string;
};

const transactions: Transaction[] = [
  {
    id: 1,
    product: "T-Shirt Black",
    sku: "TS-001",
    type: "in",
    quantity: 50,
    price: 350,
    date: "2026-11-24",
  },
  {
    id: 2,
    product: "Jeans Blue",
    sku: "JN-001",
    type: "out",
    quantity: 5,
    price: 1499,
    date: "2026-11-23",
  },
  {
    id: 3,
    product: "Hoodie Grey",
    sku: "HD-001",
    type: "in",
    quantity: 20,
    price: 1200,
    date: "2026-11-22",
  },
  {
    id: 4,
    product: "T-Shirt White",
    sku: "TS-002",
    type: "out",
    quantity: 8,
    price: 549,
    date: "2026-11-21",
  },
  {
    id: 5,
    product: "Cap Black",
    sku: "CP-001",
    type: "out",
    quantity: 3,
    price: 299,
    date: "2026-11-20",
  },
];

const formatPrice = (price: number) =>
  `₹${price.toLocaleString("en-IN")}`;

export default function HistoryPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const filteredTransactions = transactions.filter((item) => {
    const matchesSearch =
      item.product.toLowerCase().includes(search.toLowerCase()) ||
      item.sku.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      filter === "all" || item.type === filter;

    return matchesSearch && matchesFilter;
  });

  const stockIn = transactions
    .filter((item) => item.type === "in")
    .reduce((sum, item) => sum + item.quantity, 0);

  const stockOut = transactions
    .filter((item) => item.type === "out")
    .reduce((sum, item) => sum + item.quantity, 0);

  const totalTransactions = transactions.length;

  return (
    <div className="space-y-6 pb-10 text-white">

      {/* Header */}
      <div>
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-purple-500/10 p-3 text-purple-400">
            <History size={23} />
          </div>

          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Stock History
            </h1>
            <p className="mt-1 text-sm text-gray-400">
              Track all your stock purchases and sales.
            </p>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {[
          {
            title: "Total Transactions",
            value: totalTransactions,
            icon: Package,
            color: "text-purple-400",
            bg: "bg-purple-500/10",
          },
          {
            title: "Total Stock In",
            value: `${stockIn} pcs`,
            icon: TrendingUp,
            color: "text-green-400",
            bg: "bg-green-500/10",
          },
          {
            title: "Total Stock Out",
            value: `${stockOut} pcs`,
            icon: TrendingDown,
            color: "text-red-400",
            bg: "bg-red-500/10",
          },
        ].map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="rounded-2xl border border-white/10 bg-[#151528] p-5 transition hover:border-purple-500/30"
            >
              <div className={`mb-4 w-fit rounded-xl p-3 ${stat.bg}`}>
                <Icon size={23} className={stat.color} />
              </div>

              <p className="text-sm text-gray-400">
                {stat.title}
              </p>

              <h2 className="mt-2 text-2xl font-bold">
                {stat.value}
              </h2>
            </div>
          );
        })}
      </div>

      {/* Transaction Table */}
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#151528]">

        {/* Table Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 p-5">
          <div>
            <h2 className="text-lg font-semibold">
              Transaction History
            </h2>
            <p className="mt-1 text-xs text-gray-400">
              {filteredTransactions.length} transactions found
            </p>
          </div>

          <div className="flex w-full flex-wrap gap-3 sm:w-auto">

            {/* Search */}
            <div className="flex min-w-0 flex-1 items-center gap-2 rounded-xl border border-white/10 bg-[#101020] px-3 py-2.5 focus-within:border-purple-500 sm:w-60 sm:flex-none">
              <Search size={17} className="shrink-0 text-gray-400" />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search transactions..."
                className="w-full min-w-0 bg-transparent text-sm text-white outline-none placeholder:text-gray-500"
              />
            </div>

            {/* Filter */}
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="rounded-xl border border-white/10 bg-[#101020] px-4 py-2.5 text-sm text-gray-300 outline-none focus:border-purple-500"
            >
              <option value="all">All Transactions</option>
              <option value="in">Stock In</option>
              <option value="out">Stock Out</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[750px] text-left text-sm">
            <thead className="bg-white/[0.03] text-xs uppercase tracking-wider text-gray-400">
              <tr>
                <th className="px-5 py-4 font-medium">
                  Product
                </th>
                <th className="px-4 py-4 font-medium">
                  Type
                </th>
                <th className="px-4 py-4 font-medium">
                  Quantity
                </th>
                <th className="px-4 py-4 font-medium">
                  Price
                </th>
                <th className="px-4 py-4 font-medium">
                  Total Value
                </th>
                <th className="px-4 py-4 font-medium">
                  Date
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredTransactions.map((item) => {
                const isStockIn = item.type === "in";

                return (
                  <tr
                    key={item.id}
                    className="border-t border-white/5 transition hover:bg-white/[0.03]"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`rounded-xl p-3 ${
                            isStockIn
                              ? "bg-green-500/10 text-green-400"
                              : "bg-red-500/10 text-red-400"
                          }`}
                        >
                          {isStockIn ? (
                            <ArrowDownToLine size={19} />
                          ) : (
                            <ArrowUpFromLine size={19} />
                          )}
                        </div>

                        <div>
                          <p className="font-medium text-white">
                            {item.product}
                          </p>
                          <p className="mt-1 text-xs text-gray-500">
                            {item.sku}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-4">
                      <span
                        className={`rounded-lg px-3 py-1.5 text-xs font-medium ${
                          isStockIn
                            ? "bg-green-500/10 text-green-400"
                            : "bg-red-500/10 text-red-400"
                        }`}
                      >
                        {isStockIn ? "Stock In" : "Sale"}
                      </span>
                    </td>

                    <td
                      className={`px-4 py-4 font-semibold ${
                        isStockIn
                          ? "text-green-400"
                          : "text-red-400"
                      }`}
                    >
                      {isStockIn ? "+" : "-"}
                      {item.quantity} pcs
                    </td>

                    <td className="px-4 py-4 text-gray-300">
                      {formatPrice(item.price)}
                    </td>

                    <td className="px-4 py-4 font-medium text-white">
                      {formatPrice(item.price * item.quantity)}
                    </td>

                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2 text-gray-400">
                        <CalendarDays size={15} />
                        {item.date}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {filteredTransactions.length === 0 && (
            <div className="py-16 text-center text-gray-400">
              <History size={36} className="mx-auto mb-3 opacity-50" />
              No transactions found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
