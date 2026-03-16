"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var components_1 = require("./components");
var useAuth_1 = require("@cricket/shared/hooks/useAuth");
var App = function () {
    var user = (0, useAuth_1.useAuth)().user;
    return (<div className="app-wrapper">
            <components_1.Header />
            {user ? (<components_1.AdminDashboard />) : (<div className="auth-gate fade-in" style={{ textAlign: 'center', padding: '10rem 2rem' }}>
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', background: 'var(--primary-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        Welcome to Cricket-Core Pro
                    </h2>
                    <p style={{ color: 'var(--text-dim)', maxWidth: '600px', margin: '0 auto 2rem' }}>
                        Access the administrative tools to manage tournaments, teams, and real-time match scoring. Please login to continue.
                    </p>
                </div>)}
        </div>);
};
exports.default = App;
