import React, { useState } from 'react';
import { useAuth } from '@cricket/shared/hooks/useAuth';
import { LoginForm } from './LoginForm';

export const Header: React.FC = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <header className="app-header">
      <div className="logo-section">
        <div className="logo-icon">C</div>
        <div className="logo-text">
          <h1>Cricket-Core Pro</h1>
        </div>
      </div>

      <div className="auth-nav">
        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <span className="user-welcome" style={{ color: 'var(--text-dim)' }}>
              Welcome, <strong style={{ color: 'var(--primary-color)' }}>{user.name}</strong>
            </span>
            <button onClick={logout} className="btn btn-outline" style={{ padding: '8px 16px' }}>Logout</button>
          </div>
        ) : (
          <button onClick={() => setIsLoginModalOpen(true)} className="btn btn-primary">Administrator Login</button>
        )}
      </div>

      {isLoginModalOpen && (
        <div className="modal-overlay" onClick={() => setIsLoginModalOpen(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <LoginForm onClose={() => setIsLoginModalOpen(false)} />
          </div>
        </div>
      )}
    </header>
  );
};
