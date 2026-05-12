import React from 'react'

const Sidebar = () => {
    return (
        <>
            <div className="sidebar bg-dark text-white p-3 vh-100" style={{ minHeight: "100vh" }}>

                <h4 className=" mb-4">🚀 SmartLead</h4>

                <ul className="nav flex-column">

                    <li className="nav-item mb-2 py-2">
                        <a href="#" className="nav-link text-white">
                            <i className="bi bi-house"></i> Dashboard
                        </a>
                    </li>

                    <li className="nav-item mb-2 py-2">
                        <a href="#" className="nav-link text-white">
                            <i class="bi bi-journal-bookmark"></i> Leads
                        </a>
                    </li>

                    <li className="nav-item mb-2 py-2">
                        <a href="#" className="nav-link text-white">
                            <i class="bi bi-gear"></i> Settings
                        </a>
                    </li>

                    <li className="nav-item mb-2 py-2">
                        <a href="#" className="nav-link text-white">
                            <i class="bi bi-person-check"></i> My Account
                        </a>
                    </li>

                </ul>

            </div>
        </>
    )
}

export default Sidebar