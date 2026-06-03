import React from 'react'
import { NavLink } from 'react-router-dom'
const Sidebar = () => {
    return (
        <>
            <div className="sidebar bg-dark text-white p-3 vh-100" style={{ minHeight: "100vh" }}>

                <h4 className=" mb-4">🚀 SmartLead</h4>

                <ul className="nav flex-column">

                    <li className="nav-item mb-2 py-2">


                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                `nav-link ${isActive ? "active-link" : "text-white"}`
                            }
                        >
                            <i className="bi bi-house"></i> Dashboard
                        </NavLink>

                    </li>

                    <li className="nav-item mb-2 py-2">

                        <NavLink
                            to="/emaildashboard"
                            className={({ isActive }) =>
                                `nav-link ${isActive ? "active-link" : "text-white"}`
                            }
                        >
                            <i className="bi bi-journal-bookmark"></i> AI Email
                        </NavLink>
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