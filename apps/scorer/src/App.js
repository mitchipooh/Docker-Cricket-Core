"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var Scorer_1 = require("./components/Scorer");
var MatchSetup_1 = require("./components/MatchSetup");
var DataProvider_1 = require("./contexts/DataProvider");
require("./index.css");
var ScorerAppContent = function () {
    var _a = (0, DataProvider_1.useData)(), standaloneMatches = _a.standaloneMatches, orgs = _a.orgs;
    var _b = (0, react_1.useState)(null), activeMatch = _b[0], setActiveMatch = _b[1];
    var _c = (0, react_1.useState)(false), showSetup = _c[0], setShowSetup = _c[1];
    if (activeMatch) {
        return <Scorer_1.Scorer match={activeMatch} onBack={function () { return setActiveMatch(null); }}/>;
    }
    if (showSetup) {
        return (<MatchSetup_1.MatchSetup onComplete={function (match) {
                setActiveMatch(match);
                setShowSetup(false);
            }} onCancel={function () { return setShowSetup(false); }}/>);
    }
    var allFixtures = __spreadArray(__spreadArray([], standaloneMatches, true), orgs.flatMap(function (o) { return o.fixtures; }), true);
    return (<div className="p-4 max-w-lg mx-auto">
            <h1 className="text-2xl font-bold mb-4">Cricket-Core Scorer</h1>
            <button onClick={function () { return setShowSetup(true); }} className="w-full bg-blue-600 text-white py-3 rounded-lg mb-6 font-semibold">
                New Quick Match
            </button>

            <h2 className="text-lg font-semibold mb-2">Recent Matches</h2>
            <div className="space-y-3">
                {allFixtures.map(function (m) { return (<div key={m.id} className="p-4 border rounded-lg bg-white shadow-sm flex justify-between items-center" onClick={function () { return setActiveMatch(m); }}>
                        <div>
                            <div className="font-medium">{m.teamAName} vs {m.teamBName}</div>
                            <div className="text-sm text-gray-500">{m.date}</div>
                        </div>
                        <div className={"text-xs px-2 py-1 rounded ".concat(m.status === 'Live' ? 'bg-red-100 text-red-600' : 'bg-gray-100')}>
                            {m.status}
                        </div>
                    </div>); })}
            </div>
        </div>);
};
var App = function () { return (<DataProvider_1.DataProvider>
        <ScorerAppContent />
    </DataProvider_1.DataProvider>); };
exports.default = App;
