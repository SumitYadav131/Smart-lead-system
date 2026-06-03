import { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";


// const baseurl = "http://localhost:3000";
const baseurl = import.meta.env.VITE_BASEURL || "http://localhost:3000";

export default function EmailDashboard() {
    const [leads, setLeads] = useState([]);
    const [selectedLead, setSelectedLead] = useState(null);
    const [emailText, setEmailText] = useState("");

    //  Load leads
    useEffect(() => {
        const fetchLeads = async () => {
            const res = await axios.get(`${baseurl}/getleads`);
            setLeads(res.data);
        };

        fetchLeads();
    }, []);

    //  Generate AI Email
    const generateEmail = async (lead) => {
        setSelectedLead(lead);

        const res = await axios.post(`${baseurl}/ai-email`, {
            name: lead.name,
        });

        setEmailText(res.data.text);
    };

    //  Send Email
    const sendEmail = async () => {
        if (!selectedLead) {
            alert("Select a lead first");
            return;
        }

        await axios.post(`${baseurl}/sendCustomEmail`, {
            email: selectedLead.email,
            text: emailText,
        });

        toast.success("Email sent successfully !");
    };

    // return (
    //     <div style={{ display: "flex", height: "100vh" }}>

    //         {/* LEFT SIDE */}
    //         <div style={{ width: "30%", borderRight: "1px solid #ccc", padding: "10px" }}>
    //             <h3>Leads</h3>

    //             {leads.map((lead) => (
    //                 <div
    //                     key={lead._id}
    //                     onClick={() => generateEmail(lead)}
    //                     style={{
    //                         padding: "10px",
    //                         borderBottom: "1px solid #eee",
    //                         cursor: "pointer",
    //                     }}
    //                 >
    //                     {lead.name}
    //                 </div>
    //             ))}
    //         </div>

    //         {/* RIGHT SIDE */}
    //         <div style={{ width: "70%", padding: "10px" }}>
    //             <h3>Email</h3>

    //             <textarea
    //                 value={emailText}
    //                 onChange={(e) => setEmailText(e.target.value)}
    //                 style={{ width: "100%", height: "250px" }}
    //             />

    //             <br />

    //             <button onClick={sendEmail} style={{ marginTop: "10px" }}>
    //                 Send Email
    //             </button>
    //         </div>
    //     </div>

    // );

    return (
        <div className="dashboard">

            {/* LEFT SIDE - SIDEBAR */}
            <div className="sidebar bg-dark">

                <h4 className=" mb-4">🚀 SmartLead</h4>

                {leads.map((lead) => (
                    <div
                        key={lead._id}
                        onClick={() => generateEmail(lead)}
                        className={`lead-card ${selectedLead?._id === lead._id ? "active" : ""
                            }`}
                    >
                        <h4>{lead.name}</h4>
                        <p>{lead.email}</p>
                    </div>
                ))}
                <NavLink
                    to="/"
                    className={({ isActive, isPending }) =>
                        isPending ? "pending" : isActive ? "active" : "", "text-white nav-link"
                    }
                >
                    <h6 className="mt-4 ">Back to Dashboard</h6>
                </NavLink>

            </div>

            {/* RIGHT SIDE - MAIN */}
            <div className="main">
                <div className="card">
                    <h4 className="text-center">AI Email Generator</h4>

                    <textarea
                        value={emailText}
                        onChange={(e) => setEmailText(e.target.value)}
                        placeholder="Generated email will appear here..."
                    />

                    <div className="actions d-flex gap-2">
                        <button onClick={sendEmail} className="send-btn">
                            Send Email
                        </button>
                        {selectedLead && (<button onClick={sendEmail} className="send-btn">
                            Regenerate Mail
                        </button>)}

                    </div>
                </div>
            </div>

        </div>
    );
}