"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Header = void 0;
var react_1 = require("react");
var useAuth_1 = require("@cricket/shared/hooks/useAuth");
var LoginForm_1 = require("./LoginForm");
var Header = function () {
    var _a = (0, react_1.useState)(false), isLoginModalOpen = _a[0], setIsLoginModalOpen = _a[1];
    var _b = (0, useAuth_1.useAuth)(), user = _b.user, logout = _b.logout;
    return (<header className="app-header">
      <div className="logo-section">
        <div className="logo-icon">C</div>
        <div className="logo-text">
          <h1>Cricket-Core Pro</h1>
        </div>
      </div>

      <div className="auth-nav">
        {user ? (<div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <span className="user-welcome" style={{ color: 'var(--text-dim)' }}>
              Welcome, <strong style={{ color: 'var(--primary-color)' }}>{user.name}</strong>
            </span>
            <button onClick={logout} className="btn btn-outline" style={{ padding: '8px 16px' }}>Logout</button>
          </div>) : (<button onClick={function () { return setIsLoginModalOpen(true); }} className="btn btn-primary">Administrator Login</button>)}
      </div>

      {isLoginModalOpen && (<div className="modal-overlay" onClick={function () { return setIsLoginModalOpen(false); }}>
          <div className="modal-content" onClick={function (e) { return e.stopPropagation(); }}>
            <LoginForm_1.LoginForm onClose={function () { return setIsLoginModalOpen(false); }}/>
          </div>
        </div>)}
    </header>);
};
exports.Header = Header;
