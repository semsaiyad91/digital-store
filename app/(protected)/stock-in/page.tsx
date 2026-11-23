
import { ArrowDownToLine, PackagePlus } from "lucide-react";

export default function StockInPage() {
    return (
        <div className="space-y-6 text-white">

            {/* Page Header */}
            <div>
                <h1 className="text-2xl font-bold">
                    Stock In Management
                </h1>

                <p className="mt-2 text-sm text-gray-400">
                    Add purchased stock to your shop inventory.
                </p>
            </div>

            {/* Main Card */}
            <div className="rounded-2xl border border-white/10 bg-[#151528] p-6">

                <div className="flex flex-col items-center justify-center py-12 text-center">

                    <div className="mb-5 rounded-2xl bg-purple-500/10 p-5">
                        <PackagePlus
                            size={38}
                            className="text-purple-400"
                        />
                    </div>

                    <h2 className="text-xl font-semibold">
                        Stock In
                    </h2>

                    <p className="mt-3 max-w-md text-sm leading-6 text-gray-400">
                        When you purchase new products, you will
                        be able to add their quantity to your
                        existing inventory here.
                    </p>

                    <button
                        type="button"
                        disabled
                        className="mt-6 flex cursor-not-allowed items-center gap-2 rounded-xl bg-purple-600/50 px-5 py-3 text-sm font-medium text-white/70"
                    >
                        <ArrowDownToLine size={18} />
                        Add Stock — Coming Soon
                    </button>

                </div>
            </div>
        </div>
    );
}
