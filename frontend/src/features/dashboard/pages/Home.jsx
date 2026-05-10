import { useDashboardHook } from "../hooks/useDashboard";
import { Users, Package, UserCheck, Activity } from "lucide-react"; // Standard Icon Library

const DashboardPage = () => {
  const { logs, loading, error } = useDashboardHook();

  if (loading) return (
    <div className="flex h-screen items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-800"></div>
    </div>
  );

  if (error) return (
    <div className="p-10 text-center">
      <p className="text-red-500 bg-red-50 p-4 rounded-lg inline-block border border-red-200">
        ⚠️ {error}
      </p>
    </div>
  );

  const stats = [
    { 
      label: "Total Items", 
      value: logs?.item_count || 0, 
      icon: <Package className="text-emerald-600" />, 
      color: "bg-emerald-50" 
    },
    { 
      label: "Total Customers", 
      value: logs?.customer_count || 0, 
      icon: <UserCheck className="text-blue-600" />, 
      color: "bg-blue-50" 
    },
    { 
      label: "System Users", 
      value: logs?.user_count || 0, 
      icon: <Users className="text-purple-600" />, 
      color: "bg-purple-50" 
    },
  ];

  return (
    <div className="p-6 lg:p-10 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-emerald-900">System Overview</h1>
          <p className="text-gray-500">Welcome back! Here is what's happening today.</p>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4 hover:shadow-md transition-shadow"
            >
              <div className={`p-4 rounded-lg ${stat.color}`}>
                {stat.icon}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                  {stat.label}
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {stat.value}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Placeholder for future Charts or Recent Activity */}
        <div className="mt-10 bg-white p-8 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center space-x-2 mb-4">
            <Activity className="text-emerald-700" size={20} />
            <h2 className="text-xl font-semibold text-emerald-900">Recent Activity</h2>
          </div>
          <div className="h-32 flex items-center justify-center border-2 border-dashed border-gray-100 rounded-lg">
             <p className="text-gray-400">Activity logs will appear here soon...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;