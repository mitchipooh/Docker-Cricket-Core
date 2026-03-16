"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.PointsConfigSettings = void 0;
var react_1 = require("react");
var pointsEngine_1 = require("@cricket/shared/competition/pointsEngine");
var PointsConfigSettings = function (_a) {
    var config = _a.config, onSave = _a.onSave;
    // Merge with defaults to handle legacy tournaments missing new fields
    var mergedConfig = __assign(__assign({}, pointsEngine_1.DEFAULT_POINTS_CONFIG), config);
    var _b = (0, react_1.useState)(mergedConfig), localConfig = _b[0], setLocalConfig = _b[1];
    var applyPreset = function (preset) {
        if (confirm('Apply this preset? This will overwrite your current point settings.')) {
            setLocalConfig(__assign({}, preset));
        }
    };
    var handleChange = function (field, value) {
        setLocalConfig(function (prev) {
            var _a;
            return (__assign(__assign({}, prev), (_a = {}, _a[field] = value, _a)));
        });
    };
    var handleTierChange = function (type, index, field, value) {
        var _a;
        var fieldName = type === 'batting' ? 'batting_bonus_tiers' : 'bowling_bonus_tiers';
        var newTiers = __spreadArray([], localConfig[fieldName], true);
        newTiers[index] = __assign(__assign({}, newTiers[index]), (_a = {}, _a[field] = value, _a));
        handleChange(fieldName, newTiers);
    };
    var addTier = function (type) {
        var fieldName = type === 'batting' ? 'batting_bonus_tiers' : 'bowling_bonus_tiers';
        var newTiers = __spreadArray(__spreadArray([], localConfig[fieldName], true), [{ threshold: 0, points: 0 }], false);
        handleChange(fieldName, newTiers);
    };
    var removeTier = function (type, index) {
        var fieldName = type === 'batting' ? 'batting_bonus_tiers' : 'bowling_bonus_tiers';
        var newTiers = localConfig[fieldName].filter(function (_, i) { return i !== index; });
        handleChange(fieldName, newTiers);
    };
    return (<div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-xl space-y-8 animate-in fade-in slide-in-from-bottom-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h3 className="text-2xl font-black text-slate-900">Points Configuration</h3>
                    <p className="text-sm text-slate-400 font-bold uppercase tracking-widest mt-1">Regulatory Logic Settings</p>
                </div>

                <div className="flex items-center gap-4 w-full md:w-auto">
                    <div className="flex-1 md:flex-none">
                        <select onChange={function (e) {
            if (e.target.value === 'T20')
                applyPreset(pointsEngine_1.PRESET_T20);
            if (e.target.value === 'TEST')
                applyPreset(pointsEngine_1.PRESET_TEST);
            e.target.value = ''; // Reset select
        }} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-black uppercase tracking-widest outline-none focus:ring-2 ring-indigo-500">
                            <option value="">Apply Preset...</option>
                            <option value="T20">Standard T20/Limited Overs</option>
                            <option value="TEST">Standard Test/Multi-Day</option>
                        </select>
                    </div>

                    <button onClick={function () { return onSave(localConfig); }} className="bg-indigo-600 text-white px-8 py-3 rounded-2xl font-black uppercase text-xs tracking-widest shadow-lg shadow-indigo-200 hover:bg-indigo-500 transition-all">
                        Save Configuration
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Standard Points */}
                <section className="space-y-4">
                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">Standard Match Points</h4>
                    <div className="space-y-3">
                        <ConfigInput label="Win (Reg/Outright)" value={localConfig.win_outright} onChange={function (v) { handleChange('win_outright', v); handleChange('win', v); }}/>
                        <ConfigInput label="Tie (Reg/Match)" value={localConfig.tie_match} onChange={function (v) { handleChange('tie_match', v); handleChange('tie', v); }}/>
                        <ConfigInput label="No Result / Abandoned" value={localConfig.noResult} onChange={function (v) { return handleChange('noResult', v); }}/>
                    </div>
                </section>

                {/* Inning Points */}
                <section className="space-y-4">
                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">Test/Multi-Day Points</h4>
                    <div className="space-y-3">
                        <ConfigInput label="1st Innings Lead" value={localConfig.first_inning_lead} onChange={function (v) { return handleChange('first_inning_lead', v); }}/>
                        <ConfigInput label="1st Innings Tie" value={localConfig.first_inning_tie} onChange={function (v) { return handleChange('first_inning_tie', v); }}/>
                        <ConfigInput label="1st Innings Loss" value={localConfig.first_inning_loss} onChange={function (v) { return handleChange('first_inning_loss', v); }}/>
                    </div>
                </section>

                {/* Validation & Caps */}
                <section className="space-y-4">
                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">Bonus Caps & Limits</h4>
                    <div className="space-y-3">
                        <ConfigInput label="Max Pts Per Match" value={localConfig.max_total_per_match} onChange={function (v) { return handleChange('max_total_per_match', v); }}/>
                        <ConfigInput label="Max Batting Bonus" value={localConfig.bonus_batting_max} onChange={function (v) { return handleChange('bonus_batting_max', v); }}/>
                        <ConfigInput label="Max Bowling Bonus" value={localConfig.bonus_bowling_max} onChange={function (v) { return handleChange('bonus_bowling_max', v); }}/>
                    </div>
                </section>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-6 border-t border-slate-100">
                {/* Batting Bonus Tiers */}
                <TierEditor title="Batting Bonus Tiers" unit="Runs" tiers={localConfig.batting_bonus_tiers} onAdd={function () { return addTier('batting'); }} onRemove={function (i) { return removeTier('batting', i); }} onChange={function (i, f, v) { return handleTierChange('batting', i, f, v); }}/>

                {/* Bowling Bonus Tiers */}
                <TierEditor title="Bowling Bonus Tiers" unit="Wickets" tiers={localConfig.bowling_bonus_tiers} onAdd={function () { return addTier('bowling'); }} onRemove={function (i) { return removeTier('bowling', i); }} onChange={function (i, f, v) { return handleTierChange('bowling', i, f, v); }}/>
            </div>
        </div>);
};
exports.PointsConfigSettings = PointsConfigSettings;
var ConfigInput = function (_a) {
    var label = _a.label, value = _a.value, onChange = _a.onChange;
    return (<div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
        <span className="text-sm font-bold text-slate-600">{label}</span>
        <input type="number" value={value} onChange={function (e) { return onChange(parseInt(e.target.value) || 0); }} className="w-16 bg-white border border-slate-200 rounded-lg p-2 text-center font-black text-indigo-600 outline-none focus:ring-2 ring-indigo-500"/>
    </div>);
};
var TierEditor = function (_a) {
    var title = _a.title, unit = _a.unit, tiers = _a.tiers, onAdd = _a.onAdd, onRemove = _a.onRemove, onChange = _a.onChange;
    return (<div className="space-y-4">
        <div className="flex justify-between items-center">
            <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight">{title}</h4>
            <button onClick={onAdd} className="text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:underline">+ Add Tier</button>
        </div>
        <div className="space-y-2">
            {tiers.map(function (tier, i) { return (<div key={i} className="flex items-center gap-3 animate-in slide-in-from-left-2">
                    <div className="flex-1 flex items-center gap-2 bg-slate-50 p-2 px-4 rounded-xl border border-slate-100">
                        <span className="text-[10px] font-black text-slate-400">MIN {unit}:</span>
                        <input type="number" value={tier.threshold} onChange={function (e) { return onChange(i, 'threshold', parseInt(e.target.value) || 0); }} className="w-full bg-transparent font-bold text-sm outline-none"/>
                    </div>
                    <div className="w-24 flex items-center gap-2 bg-indigo-50/50 p-2 px-4 rounded-xl border border-indigo-100/50">
                        <span className="text-[10px] font-black text-indigo-400">PTS:</span>
                        <input type="number" value={tier.points} onChange={function (e) { return onChange(i, 'points', parseInt(e.target.value) || 0); }} className="w-full bg-transparent font-black text-sm text-indigo-600 outline-none"/>
                    </div>
                    <button onClick={function () { return onRemove(i); }} className="text-slate-300 hover:text-red-500 transition-colors">✕</button>
                </div>); })}
        </div>
    </div>);
};
