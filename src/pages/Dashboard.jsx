import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Sidebar from "../components/Sidebar";
const Dashboard = () => {
    const [leads, setLeads] = useState([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [activities, setActivities] = useState([]);
    const BASEURl = import.meta.env.VITE_BASEURL;
    const [showModal, setShowModal] = useState(false);
    const [scheduledDate, setScheduledDate] = useState("");
    const [subject, setSubject] = useState("Follow Up Regarding Our Services");
    const [followupText, setFollowupText] = useState("");


    useEffect(() => {
        getLeads();
    }, []);

    const getLeads = async () => {
        const res = await axios.get(`${BASEURl}/getleads`);
        setLeads(res.data);
        // toast.success("Leads Fetched successfully");
    };

    const createLead = async () => {
        try {
            if (!name || !email) return toast.error("Enter all fields");

            const res = await axios.post(`${BASEURl}/createlead`, {
                name,
                email,
            });
            toast.success(res.data.msg || "Created Lead");
            setName("");
            setEmail("");
            getLeads();

        } catch (err) {
            toast.error(err.response?.data?.error || "Failed");
        }
    };

    const sendEmail = async (id) => {
        try {
            const res = await axios.post(
                `${BASEURl}/sendEmail/${id}`
            );
            // res.data.msg ||
            toast.success("Followup taken successfully");

        } catch (err) {
            toast.error(err.response?.data?.error || "Failed to send email");
        }
    };

    const sendFollowupEmail = async (id) => {
        try {
            const res = await axios.post(
                `${BASEURl}/sendfollowup/${id}`
            );
            // res.data.msg ||
            toast.success("Followup taken successfully");

        } catch (err) {
            toast.error(err.response?.data?.error || "Failed to send email");
        }
    };

    const deletelead = async (id) => {
        try {
            await axios.delete(
                `${BASEURl}/deletelead/${id}`
            );

            toast.success("Lead deleted successfully");

            getLeads();

        } catch (err) {
            toast.error(err.response?.data?.error || "Delete failed");
        }
    };


    const updateStatus = async (id, status) => {
        await axios.put(`${BASEURl}/updatelead/${id}`, { status });
        getLeads();
    };

    const [selectedLead, setSelectedLead] = useState(null);

    const viewLead = async (id) => {
        const res = await axios.get(`${BASEURl}/leads/${id}`);
        const actRes = await axios.get(`${BASEURl}/activities/${id}`);
        setSelectedLead(res.data);
        setActivities(actRes.data);
    };

    const scheduleFollowup = async () => {
        try {
            if (!selectedLead) {
                toast.error("No lead selected");
                return;
            }
            if (!subject || !followupText || !scheduledDate) {
                toast.error("Please fill in all fields");
                return;
            }

            await axios.post(
                `${BASEURl}/schedule-followup`,
                {
                    leadId: selectedLead._id,
                    subject,
                    text: followupText,
                    scheduledFor: scheduledDate,
                }
            );

            toast.success("Follow Up Scheduled");
            setShowModal(false);
            setSubject("Follow Up Regarding Our Services");
            setFollowupText("");
            setScheduledDate("");

        } catch (err) {
            console.error("Schedule followup error:", err);
            toast.error(err.response?.data?.error || err.message || "Failed to schedule follow up");
        }
    };

    return (
        <>
            <div className="d-flex">

                <Sidebar />

                <div className="flex-grow-1 p-3">
                    {/* your page content */}
                    <div className="container mt-4">
                        {/* CREATE LEAD CARD */}
                        <div className="card shadow-sm mb-4">
                            <div className="card-body">
                                <h5 className="card-title">Create New Lead</h5>

                                <div className="row">
                                    <div className="col-md-4">
                                        <input
                                            className="form-control"
                                            placeholder="Name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </div>

                                    <div className="col-md-4">
                                        <input
                                            className="form-control"
                                            placeholder="Email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>

                                    <div className="col-md-4">
                                        <button
                                            className="btn btn-primary w-100"
                                            onClick={createLead}
                                        >
                                            Add Lead
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* LEADS TABLE */}
                        <div className="card shadow-sm">
                            <div className="card-body">
                                <h5 className="card-title">All Leads</h5>

                                <table className="table table-bordered table-hover mt-3">
                                    <thead className="table-dark">
                                        <tr>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {leads.map((lead) => (
                                            <tr key={lead._id}>
                                                <td>{lead.name}</td>
                                                <td>{lead.email}</td>
                                                <td>
                                                    <select
                                                        className="form-select"
                                                        value={lead.status}
                                                        onChange={(e) => updateStatus(lead._id, e.target.value)}
                                                    >
                                                        <option value="new">New</option>
                                                        <option value="contacted">Contacted</option>
                                                        <option value="converted">Converted</option>
                                                    </select>
                                                </td>
                                                <td className="actionBtns">
                                                    <button
                                                        className="btn btn-success btn-sm"
                                                        onClick={() => sendFollowupEmail(lead._id)}
                                                    >
                                                        Follow Up
                                                    </button>

                                                    <button
                                                        className="btn btn-danger btn-sm"
                                                        onClick={() => deletelead(lead._id)}
                                                    >
                                                        Delete Lead
                                                    </button>

                                                    <button
                                                        className="btn btn-info btn-sm"
                                                        onClick={() => viewLead(lead._id)}
                                                    >
                                                        View
                                                    </button>

                                                    <button
                                                        className="btn btn-warning"
                                                        onClick={async () => {
                                                            await setSelectedLead(lead);
                                                            setShowModal(true);
                                                            // alert(selectedLead);
                                                        }}
                                                    >
                                                        Schedule Follow Up
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                            </div>
                        </div>

                        {/* Detail Model */}
                        {selectedLead && (
                            <div className="modal show d-block" style={{ background: "#00000088" }}>
                                <div className="modal-dialog">
                                    <div className="modal-content">

                                        <div className="modal-header">
                                            <h5 className="modal-title">Lead Details</h5>
                                            <button className="btn-close" onClick={() => setSelectedLead(null)}></button>
                                        </div>

                                        <div className="modal-body">
                                            <p><b>Name:</b> {selectedLead.name}</p>
                                            <p><b>Email:</b> {selectedLead.email}</p>
                                            <p><b>Status:</b> {selectedLead.status}</p>
                                            <p><b>Created:</b> {new Date(selectedLead.createdAt).toLocaleString()}</p>
                                        </div>

                                        <hr />
                                        <div className="modal-body">
                                            <h5>Activity Timeline</h5>
                                            <ul className="list-group">
                                                {activities.map((act) => (
                                                    <li key={act._id} className="list-group-item">
                                                        <b>{act.type.toUpperCase()}</b> — {act.message}
                                                        <br />
                                                        <small className="text-muted">
                                                            {new Date(act.createdAt).toLocaleString()}
                                                        </small>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>


                                    </div>
                                </div>
                            </div>
                        )}

                        {/* followup popup */}
                        {
                            showModal && (
                                <div
                                    className="modal d-block"
                                    style={{ background: "rgba(0,0,0,.5)" }}
                                >
                                    <div className="modal-dialog">
                                        <div className="modal-content">

                                            <div className="modal-header">
                                                <h5>Schedule Follow Up</h5>

                                                <button
                                                    className="btn-close"
                                                    onClick={() => setShowModal(false)}
                                                />
                                            </div>

                                            <div className="modal-body">

                                                <label>Subject</label>

                                                <input
                                                    className="form-control mb-3"
                                                    value={subject}
                                                    onChange={(e) =>
                                                        setSubject(e.target.value)
                                                    }
                                                />

                                                <label>Date & Time</label>

                                                <input
                                                    type="datetime-local"
                                                    className="form-control"
                                                    value={scheduledDate}
                                                    onChange={(e) =>
                                                        setScheduledDate(e.target.value)
                                                    }
                                                />

                                                <label>Schedule followup text</label>
                                                <textarea
                                                    className="form-control"
                                                    rows={8}
                                                    value={followupText}
                                                    onChange={(e) => setFollowupText(e.target.value)}
                                                />

                                            </div>

                                            <div className="modal-footer">

                                                <button
                                                    className="btn btn-secondary"
                                                    onClick={() => setShowModal(false)}
                                                >
                                                    Cancel
                                                </button>

                                                <button
                                                    className="btn btn-primary"
                                                    onClick={scheduleFollowup}
                                                >
                                                    Schedule
                                                </button>

                                            </div>

                                        </div>
                                    </div>
                                </div>
                            )
                        }

                    </div>
                </div>

            </div>

        </>



    )
}

export default Dashboard