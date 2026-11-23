
import React from "react";
import { ShoppingCart } from "lucide-react";

export default function SalesPage() {
  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-2xl font-bold text-white">
          Sales Management
        </h1>

        <p className="mt-2 text-sm text-gray-400">
          Manage your product sales and stock out.
        </p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-[#151528] p-8">
        <div className="flex flex-col items-center justify-center gap-4 py-10">

          <div className="rounded-2xl bg-purple-500/10 p-5">
            <ShoppingCart
              size={36}
              className="text-purple-400"
            />
          </div>

          <h2 className="text-xl font-semibold text-white">
            Sales Management
          </h2>

          <p className="max-w-sm text-center text-sm text-gray-400">
            Your sales and stock-out records will appear here.
          </p>

        </div>
      </div>

    </div>
  );
}
