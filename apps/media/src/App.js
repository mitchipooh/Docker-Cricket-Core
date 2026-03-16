"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var MediaCenter_1 = require("./components/MediaCenter");
var StatsAnalytics_1 = require("./components/StatsAnalytics");
var GlobalDashboard_1 = require("./components/GlobalDashboard");
var DataProvider_1 = require("./contexts/DataProvider");
require("./index.css");
var MediaAppContent = function () {
    var _a = (0, react_1.useState)('hub'), activeTab = _a[0], setActiveTab = _a[1];
    return (<div className="min-h-screen bg-gray-50">
            <nav className="bg-white border-b border-gray-200 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <span className="text-xl font-bold text-blue-600">Cricket-Core Hub</span>
                        </div>
                        <div className="flex space-x-8 items-center">
                            <button onClick={function () { return setActiveTab('hub'); }} className={"px-3 py-2 text-sm font-medium ".concat(activeTab === 'hub' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700')}>
                                Match Center
                            </button>
                            <button onClick={function () { return setActiveTab('media'); }} className={"px-3 py-2 text-sm font-medium ".concat(activeTab === 'media' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700')}>
                                Media Feed
                            </button>
                            <button onClick={function () { return setActiveTab('stats'); }} className={"px-3 py-2 text-sm font-medium ".concat(activeTab === 'stats' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700')}>
                                Statistics
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                {activeTab === 'hub' && <GlobalDashboard_1.GlobalDashboard />}
                {activeTab === 'media' && <MediaCenter_1.MediaCenter />}
                {activeTab === 'stats' && <StatsAnalytics_1.StatsAnalytics />}
            </main>
        </div>);
};
var App = function () { return (<DataProvider_1.DataProvider>
        <MediaAppContent />
    </DataProvider_1.DataProvider>); };
exports.default = App;
