// import { useState } from "react";
// import { allListStocks } from "../hooks/stockList";

// const StockListPage = () => {
//   const { logs, loading, error } = allListStocks();
   

//   if (loading) return <p className="text-gray-500">Loading...</p>;
//   if (error) return <p className="text-red-500">{error}</p>;

//   return (
//     <div className="p-6" >
//       <h2 className="text-2xl text-emerald-900 font-semibold mb-4">Stock List</h2>

//       <div className="overflow-x-auto">
//         <table className="min-w-full border border-gray-200 rounded-lg shadow-sm">
//           <thead className="bg-emerald-700">
//             <tr>
//               <th className="px-4 py-2 text-left text-sm font-medium text-white">Item ID</th>
//               <th className="px-4 py-2 text-left text-sm font-medium text-white">Item Name</th>
//               <th className="px-4 py-2 text-left text-sm font-medium text-white">Quantity</th>
              
              
//             </tr>
//           </thead>
//           <tbody>
//             {logs.map((log, index) => (
//               <tr
//                 key={index}
//                 className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
//               >
//                 <td className="px-4 py-2 text-sm text-gray-800">{log.item_id}</td>
//                 <td className="px-4 py-2 text-sm text-gray-800">{log.item_name}</td>
//                 <td className="px-4 py-2 text-sm text-gray-800">{log.quantity}</td>
                
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
      
//     </div>
//   );
// };

// export default StockListPage;

import { useState, useEffect } from "react";
import { allListStocks } from "../hooks/stockList";

const StockListPage = () => {
  const { logs, loading, error } = allListStocks();

  const [formData, setFormData] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    if (logs?.length) {
      const formatted = logs.map((item) => ({
        item_id: item.item_id,
        quantity: item.quantity,
      }));
      setFormData(formatted);
    }
  }, [logs]);

  if (loading) return <p className="text-gray-500">Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  const updateQuantity = (item_id, newQuantity) => {
    if (newQuantity < 0) return; // prevent negative

    setFormData((prev) =>
      prev.map((item) =>
        item.item_id === item_id
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowConfirm(true);
  };

  const confirmSubmit = () => {
    console.log("Payload to backend:", formData);
    setShowConfirm(false);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl text-emerald-900 font-semibold mb-4">
        Stock List
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-lg shadow-sm">
            <thead className="bg-emerald-700">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium text-white">
                  Item ID
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-white">
                  Item Name
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-white">
                  Quantity
                </th>
              </tr>
            </thead>

            <tbody>
              {logs.map((log, index) => {
                const currentItem = formData.find(
                  (item) => item.item_id === log.item_id
                );

                return (
                  <tr
                    key={log.item_id}
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="px-4 py-2 text-sm text-gray-800">
                      {log.item_id}
                    </td>

                    <td className="px-4 py-2 text-sm text-gray-800">
                      {log.item_name}
                    </td>

                    <td className="px-4 py-2 text-sm text-gray-800">
                      <div className="items-center space-x-2">
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(
                              log.item_id,
                              (currentItem?.quantity || 0) - 1
                            )
                          }
                          className="px-2 py-1 bg-red-500 rounded hover:bg-red-600"
                        >
                          -
                        </button>

                        <input
                          type="number"
                          min="0"
                          value={currentItem?.quantity || 0}
                          onChange={(e) =>
                            updateQuantity(
                              log.item_id,
                              Number(e.target.value)
                            )
                          }
                          className="border rounded px-2 py-1 w-25 text-center"
                        />

                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(
                              log.item_id,
                              (currentItem?.quantity || 0) + 1
                            )
                          }
                          className="px-2 py-1 bg-green-500 rounded hover:bg-green-600"
                        >
                          +
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700"
          >
            Submit Updates
          </button>
        </div>
      </form>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h3 className="text-lg font-semibold mb-4">
              Confirm Submission
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to submit these stock updates?
            </p>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>

              <button
                onClick={confirmSubmit}
                className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StockListPage;