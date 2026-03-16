"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminDashboard = void 0;
var react_1 = require("react");
var Sidebar_1 = require("./Sidebar");
var useAuth_1 = require("@cricket/shared/hooks/useAuth");
var AdminDashboard = function () {
    var _a = (0, react_1.useState)('dashboard'), activeTab = _a[0], setActiveTab = _a[1];
    var user = (0, useAuth_1.useAuth)().user;
    return (<div className="main-layout fade-in">
            <Sidebar_1.Sidebar activeTab={activeTab} setActiveTab={setActiveTab}/>
            
            <main className="dashboard-content">
                <section className="welcome-section">
                    <h2>Admin Dashboard</h2>
                    <p className="text-dim">Manage your tournament data and system settings.</p>
                </section>

                <div className="stats-grid">
                    <div className="stat-card">
                        <span className="stat-label">Total Tournaments</span>
                        <span className="stat-value">12</span>
                    </div>
                    <div className="stat-card">
                        <span className="stat-label">Registered Teams</span>
                        <span className="stat-value">48</span>
                    </div>
                    <div className="stat-card">
                        <span className="stat-label">Active Fixtures</span>
                        <span className="stat-value">8</span>
                    </div>
                    <div className="stat-card">
                        <span className="stat-label">System Status</span>
                        <span className="stat-value" style={{ color: '#00ff00' }}>ONLINE</span>
                    </div>
                </div>

                <div className="content-area">
                    {activeTab === 'dashboard' && (<div className="card">
                            <h3>Quick Actions</h3>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
                                <button className="btn btn-outline">Create New Tournament</button>
                                <button className="btn btn-outline">Add New Team</button>
                                <button className="btn btn-outline">Schedule Fixture</button>
                            </div>
                        </div>)}
                    
                    {activeTab === 'tournaments' && (<div className="card">
                            <h3>Tournaments Management</h3>
                            <p>Loading tournaments...</p>
                        </div>)}

                    {activeTab === 'teams' && (<div className="card">
                            <h3>Teams Management</h3>
                            <p>Loading teams...</p>
                        </div>)}
                </div>
            </main>
        </div>);
};
exports.AdminDashboard = AdminDashboard;
