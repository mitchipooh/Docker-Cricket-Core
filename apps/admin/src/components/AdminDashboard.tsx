import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { useAuth } from '@cricket/shared/hooks/useAuth';

export const AdminDashboard: React.FC = () => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const { user } = useAuth();

    return (
        <div className="main-layout fade-in">
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
            
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
                    {activeTab === 'dashboard' && (
                        <div className="card">
                            <h3>Quick Actions</h3>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
                                <button className="btn btn-outline">Create New Tournament</button>
                                <button className="btn btn-outline">Add New Team</button>
                                <button className="btn btn-outline">Schedule Fixture</button>
                            </div>
                        </div>
                    )}
                    
                    {activeTab === 'tournaments' && (
                        <div className="card">
                            <h3>Tournaments Management</h3>
                            <p>Loading tournaments...</p>
                        </div>
                    )}

                    {activeTab === 'teams' && (
                        <div className="card">
                            <h3>Teams Management</h3>
                            <p>Loading teams...</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};
