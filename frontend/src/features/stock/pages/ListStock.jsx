import { useState, useEffect } from "react";
import { allListStocks } from "../hooks/stockList";

const StockListPage = () => {
  // Rename to avoid collision
  const { logs, loading: listLoading, error: listError } = allListStocks();
  
  if (listLoading) return <p className="text-gray-500">Loading...</p>;
  if (listError) return <p className="text-red-500">{listError}</p>;

  return (
  <div className="min-h-screen bg-gray-50 py-10 px-4">
    
    {/* Centered container */}
    <div className="max-w-6xl mx-auto">
      
      <h2 className="text-3xl font-semibold text-emerald-800 mb-6 text-center">
        Stock List
      </h2>

      {/* Scroll wrapper */}
      <div className="overflow-x-auto bg-white rounded-xl shadow-md">
        
        <table className="min-w-[700px] w-full border-collapse">
          
          <thead className="bg-emerald-700">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-white">
                Item ID
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-white">
                Item Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-white">
                Quantity
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-white">
                Updated
              </th>
            </tr>
          </thead>

          <tbody>
            {logs.map((log, index) => (
              <tr
                key={index}
                className="border-b last:border-none hover:bg-gray-50 transition"
              >
                <td className="px-6 py-3 text-sm text-gray-800">
                  {log.item_id}
                </td>
                <td className="px-6 py-3 text-sm text-gray-800">
                  {log.item_name}
                </td>
                <td className="px-6 py-3 text-sm text-gray-800">
                  {log.quantity}
                </td>
                <td className="px-6 py-3 text-sm text-gray-800">
                  {log.created_date}
                </td>
              </tr>
            ))}
          </tbody>

        </table>

      </div>

    </div>

  </div>
);
};

export default StockListPage;