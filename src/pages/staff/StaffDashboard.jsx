import { Link } from "react-router-dom";
import api from "../../services/api";


useEffect(() => {
  const fetchDashboard = async () => {
    const res = await api.get("/leave/staff-summary");
    setClTaken(res.data.clTaken);
    setClRemaining(res.data.clRemaining);
    setOdTaken(res.data.odTaken);
  };

  fetchDashboard();
}, []);

export default function StaffDashboard() {
  // Dummy data (later this will come from backend)
  const clTaken = 4;
  const clRemaining = 8;
  const odTaken = 2;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      
      {/* Header */}
      <h1 className="text-2xl font-bold mb-6">
        Welcome, Staff 👋
      </h1>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-gray-500">CL Taken (This Month)</h2>
          <p className="text-3xl font-bold text-blue-600">{clTaken}</p>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-gray-500">CL Remaining</h2>
          <p className="text-3xl font-bold text-green-600">
            {clRemaining}
          </p>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-gray-500">OD Taken (This Month)</h2>
          <p className="text-3xl font-bold text-purple-600">{odTaken}</p>
        </div>

        <div className="bg-white p-6 rounded shadow flex flex-col justify-center">
          <Link
            to="/staff/apply-leave"
            className="bg-blue-600 text-white text-center py-3 rounded font-semibold"
          >
            + Apply CL / OD
          </Link>
        </div>

      </div>

      {/* Recent Leave Table */}
      <div className="bg-white rounded shadow p-6">
        <h2 className="text-xl font-semibold mb-4">
          Recent Leave Requests
        </h2>

        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 text-left">Type</th>
              <th className="p-2">From</th>
              <th className="p-2">To</th>
              <th className="p-2">Status</th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-b">
              <td className="p-2">CL</td>
              <td className="p-2 text-center">01-02-2026</td>
              <td className="p-2 text-center">02-02-2026</td>
              <td className="p-2 text-center text-green-600 font-semibold">
                Approved
              </td>
            </tr>

            <tr className="border-b">
              <td className="p-2">OD</td>
              <td className="p-2 text-center">05-02-2026</td>
              <td className="p-2 text-center">05-02-2026</td>
              <td className="p-2 text-center text-yellow-600 font-semibold">
                Pending
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  );
}
