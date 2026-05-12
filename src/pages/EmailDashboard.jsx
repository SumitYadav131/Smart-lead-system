import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:3000/getleads";

export default function EmailDashboard() {
    const [leads, setLeads] = useState([]);
    const [selectedLead, setSelectedLead] = useState(null);
    const [emailText, setEmailText] = useState("");

    // 🔥 Load leads
    useEffect(() => {
        const fetchLeads = async () => {
            const res = await axios.get("http://localhost:3000/getleads");
            setLeads(res.data);
        };

        fetchLeads();
    }, []);

    // 🔥 Generate AI Email
    const generateEmail = async (lead) => {
        setSelectedLead(lead);

        const res = await axios.post(`http://localhost:3000/ai-email`, {
            name: lead.name,
        });

        setEmailText(res.data.text);
    };

    // 🔥 Send Email
    const sendEmail = async () => {
        if (!selectedLead) {
            alert("Select a lead first");
            return;
        }

        await axios.post(`${API}/send-email`, {
            email: selectedLead.email,
            text: emailText,
        });

        alert("Email sent!");
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

            </div>

            {/* RIGHT SIDE - MAIN */}
            <div className="main">
                <div className="card">
                    <h2>AI Email Generator</h2>

                    <textarea
                        value={emailText}
                        onChange={(e) => setEmailText(e.target.value)}
                        placeholder="Generated email will appear here..."
                    />

                    <div className="actions">
                        <button onClick={sendEmail} className="send-btn">
                            Send Email
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
}