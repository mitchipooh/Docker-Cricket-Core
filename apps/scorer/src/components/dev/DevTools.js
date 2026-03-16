"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DevTools = void 0;
var react_1 = require("react");
var DevDataProfiles_1 = require("./DevDataProfiles");
var DataProvider_1 = require("@cricket/shared/contexts/DataProvider");
var DevTools = function () {
    var _a = (0, DataProvider_1.useData)(), setOrgs = _a.setOrgs, setStandaloneMatches = _a.setStandaloneMatches;
    var handleApplyProfile = function (profileId) {
        var profile = DevDataProfiles_1.DEV_PROFILES.find(function (p) { return p.id === profileId; });
        if (!profile)
            return;
        if (!confirm("Are you sure you want to load \"".concat(profile.name, "\"? This will overwrite existing data.")))
            return;
        var data = profile.generate();
        setOrgs(data.orgs);
        setStandaloneMatches(data.matches);
        alert("Loaded profile: ".concat(profile.name));
    };
    return (<div className="space-y-4">
            <h3 className="text-xs font-black text-indigo-400 uppercase tracking-widest mb-3">Dev Data Profiles</h3>
            <div className="grid grid-cols-1 gap-2">
                {DevDataProfiles_1.DEV_PROFILES.map(function (profile) { return (<button key={profile.id} onClick={function () { return handleApplyProfile(profile.id); }} className="flex items-center gap-3 p-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition-all text-left group">
                        <span className="text-2xl group-hover:scale-110 transition-transform">{profile.icon}</span>
                        <div>
                            <div className="text-sm font-bold text-white">{profile.name}</div>
                            <div className="text-[10px] text-slate-500">{profile.description}</div>
                        </div>
                    </button>); })}
            </div>
        </div>);
};
exports.DevTools = DevTools;
