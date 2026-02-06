import { useEffect, useState } from "react";
// import api from "../services/api"; // uncomment when backend is ready

export default function AdminDashboard() {
  const [requests, setRequests] = useState([
    {
      id: 1,
      staff: "Amit Patil",
      dept: "Computer",
      type: "CL",
      from: "01-02-2026",
      to: "02-02-2026",
      status: "Approved by HOD",
    },
    {
      id: 2,
      staff: "Sneha More",
      dept: "Mechanical",
      type: "OD",
      from: "05-02-2026",
      to: "05-02-2026",
      status: "Pending",
    },
  ]);

  const [selectedId, setSelectedId] = useState(null);
  const [rejectReason, setRejectReason] = useState("");

  // 🔹 Fetch requests (API-ready)
  useEffect(() => {
    // api.get("/leave/admin-requests").then((res) => {
    //   setRequests(res.data);
    // });
  }, []);

  // 🔹 Approve Request
  const handleApprove = async (id) => {
    // await api.put(`/leave/admin-approve/${id}`);

    setRequests((prev) =>
      prev.map((req) =>
        req.id === id ? { ...req, status: "Approved" } : req
      )
    );
  };

  // 🔹 Reject Request
  const handleReject = async () => {
    if (!rejectReason) {
      alert("Rejection reason required");
      return;
    }

    // await api.put(`/leave/admin-reject/${selectedId}`, {
    //   reason: rejectReason,
    // });

    setRequests((prev) =>
      prev.map((req) =>
        req.id === selectedId
          ? { ...req, status: "Rejected", reason: rejectReason }
          : req
      )
    );

    setSelectedId(null);
    setRejectReason("");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">
        Principal Dashboard
      </h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-gray-500">Total CL Requests</h2>
          <p className="text-3xl font-bold text-blue-600">42</p>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-gray-500">Total OD Requests</h2>
          <p className="text-3xl font-bold text-purple-600">18</p>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-gray-500">Pending Approvals</h2>
          <p className="text-3xl font-bold text-red-600">5</p>
        </div>
      </div>

      {/* Requests Table */}
      <div className="bg-white rounded shadow p-6">
        <h2 className="text-xl font-semibold mb-4">
          Leave Requests
        </h2>

        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2">Staff</th>
              <th className="p-2">Dept</th>
              <th className="p-2">Type</th>
              <th className="p-2">From</th>
              <th className="p-2">To</th>
              <th className="p-2">Status</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>

          <tbody>
            {requests.map((req) => (
              <tr key={req.id} className="border-t text-center">
                <td className="p-2">{req.staff}</td>
                <td className="p-2">{req.dept}</td>
                <td className="p-2">{req.type}</td>
                <td className="p-2">{req.from}</td>
                <td className="p-2">{req.to}</td>
                <td className="p-2 font-semibold">{req.status}</td>
                <td className="p-2 space-x-2">
                  <button
                    onClick={() => handleApprove(req.id)}
                    className="bg-green-600 text-white px-3 py-1 rounded"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() => setSelectedId(req.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Reject Modal */}
      {selectedId && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white p-6 rounded w-96">
            <h2 className="text-lg font-bold mb-4">
              Rejection Reason
            </h2>

            <textarea
              className="w-full border p-2 mb-4"
              rows="3"
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
            />

            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setSelectedId(null)}
                className="px-4 py-2 bg-gray-400 rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleReject}
                className="px-4 py-2 bg-red-600 text-white rounded"
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
