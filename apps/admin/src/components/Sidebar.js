"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sidebar = void 0;
var react_1 = require("react");
var Sidebar = function (_a) {
    var activeTab = _a.activeTab, setActiveTab = _a.setActiveTab;
    var navItems = [
        { id: 'dashboard', label: 'Dashboard', icon: '📊' },
        { id: 'tournaments', label: 'Tournaments', icon: '🏆' },
        { id: 'teams', label: 'Teams', icon: '👥' },
        { id: 'fixtures', label: 'Fixtures', icon: '📅' },
        { id: 'users', label: 'User Management', icon: '👤' },
        { id: 'sync', label: 'Data Sync', icon: '🔄' },
        { id: 'settings', label: 'Settings', icon: '⚙️' },
    ];
    return (<aside className="sidebar">
      <nav className="sidebar-nav">
        {navItems.map(function (item) { return (<a key={item.id} href={"#".concat(item.id)} onClick={function (e) {
                e.preventDefault();
                setActiveTab(item.id);
            }} className={"nav-link ".concat(activeTab === item.id ? 'active' : '')}>
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </a>); })}
      </nav>
    </aside>);
};
exports.Sidebar = Sidebar;
