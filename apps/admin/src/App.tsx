import React from 'react';
import { Header, AdminDashboard } from './components';
import { useAuth } from '@cricket/shared/hooks/useAuth';

const App: React.FC = () => {
    const { user } = useAuth();

    return (
        <div className="app-wrapper">
            <Header />
            {user ? (
                <AdminDashboard />
            ) : (
                <div className="auth-gate fade-in" style={{ textAlign: 'center', padding: '10rem 2rem' }}>
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', background: 'var(--primary-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        Welcome to Cricket-Core Pro
                    </h2>
                    <p style={{ color: 'var(--text-dim)', maxWidth: '600px', margin: '0 auto 2rem' }}>
                        Access the administrative tools to manage tournaments, teams, and real-time match scoring. Please login to continue.
                    </p>
                </div>
            )}
        </div>
    );
};

export default App;
