import { useState } from "react";
import api from "../../services/api";

export default function ApplyLeave() {
  const [leaveType, setLeaveType] = useState("CL");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [purpose, setPurpose] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    await api.post("/leave/apply", {
      leaveType,
      fromDate,
      toDate,
      location,
      purpose,
    });

    alert("Leave request submitted");
  } catch (error) {
    alert("Error applying leave");
  }
};

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-lg"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Apply CL / OD
        </h2>

        {/* Leave Type */}
        <label className="block mb-2 font-semibold">Leave Type</label>
        <select
          className="w-full mb-4 p-2 border rounded"
          value={leaveType}
          onChange={(e) => setLeaveType(e.target.value)}
        >
          <option value="CL">Casual Leave (CL)</option>
          <option value="OD">On Duty (OD)</option>
        </select>

        {/* From Date */}
        <label className="block mb-2 font-semibold">From Date</label>
        <input
          type="date"
          className="w-full mb-4 p-2 border rounded"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          required
        />

        {/* To Date */}
        <label className="block mb-2 font-semibold">To Date</label>
        <input
          type="date"
          className="w-full mb-4 p-2 border rounded"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          required
        />

        {/* OD Extra Fields */}
        {leaveType === "OD" && (
          <>
            <label className="block mb-2 font-semibold">
              OD Location (School / Village / City)
            </label>
            <input
              type="text"
              className="w-full mb-4 p-2 border rounded"
              placeholder="Enter location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />

            <label className="block mb-2 font-semibold">
              Purpose of Visit
            </label>
            <select
              className="w-full mb-4 p-2 border rounded"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              required
            >
              <option value="">Select Purpose</option>
              <option value="Exam Duty">Exam Duty</option>
              <option value="Official Meeting">Official Meeting</option>
              <option value="Workshop">Workshop</option>
              <option value="Training">Training</option>
              <option value="University Work">University Work</option>
            </select>
          </>
        )}

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded font-semibold"
        >
          Submit Request
        </button>
      </form>
    </div>
  );
}
