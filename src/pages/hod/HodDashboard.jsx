import { useState } from "react";

useEffect(() => {
  api.get("/leave/hod-requests").then((res) => {
    setRequests(res.data);
  });
}, []);

const approveRequest = async (id) => {
  await api.put(`/leave/hod-approve/${id}`);
};

const rejectRequest = async () => {
  await api.put(`/leave/hod-reject/${selectedId}`, {
    reason: rejectReason,
  });
};

export default function HodDashboard() {
  const [requests, setRequests] = useState([
    {
      id: 1,
      staff: "Amit Patil",
      type: "CL",
      from: "01-02-2026",
      to: "02-02-2026",
      status: "Pending",
    },
    {
      id: 2,
      staff: "Sneha More",
      type: "OD",
      from: "05-02-2026",
      to: "05-02-2026",
      status: "Pending",
    },
  ]);

  const [rejectReason, setRejectReason] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  const approveRequest = (id) => {
    setRequests(
      requests.map((req) =>
        req.id === id ? { ...req, status: "Approved" } : req
      )
    );
  };

  const rejectRequest = () => {
    if (!rejectReason) {
      alert("Please enter rejection reason");
      return;
    }

    setRequests(
      requests.map((req) =>
        req.id === selectedId
          ? { ...req, status: "Rejected", reason: rejectReason }
          : req
      )
    );

    setRejectReason("");
    setSelectedId(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">
        HOD Approval Dashboard
      </h1>

      <div className="bg-white rounded shadow p-6">
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2">Staff</th>
              <th className="p-2">Type</th>
              <th className="p-2">From</th>
              <th className="p-2">To</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>

          <tbody>
            {requests.map((req) => (
              <tr key={req.id} className="border-t text-center">
                <td className="p-2">{req.staff}</td>
                <td className="p-2">{req.type}</td>
                <td className="p-2">{req.from}</td>
                <td className="p-2">{req.to}</td>
                <td className="p-2 space-x-2">
                  <button
                    onClick={() => approveRequest(req.id)}
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
              placeholder="Enter reason"
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
            ></textarea>

            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setSelectedId(null)}
                className="px-4 py-2 bg-gray-400 rounded"
              >
                Cancel
              </button>

              <button
                onClick={rejectRequest}
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
