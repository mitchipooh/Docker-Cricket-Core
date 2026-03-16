"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AudioSettingsModal = void 0;
var react_1 = require("react");
var AudioSettingsModal = function (_a) {
    var isOpen = _a.isOpen, onClose = _a.onClose, voices = _a.voices, settings = _a.settings, onVoiceChange = _a.onVoiceChange, onSpeedChange = _a.onSpeedChange, onPitchChange = _a.onPitchChange, onVolumeChange = _a.onVolumeChange, onTest = _a.onTest;
    if (!isOpen)
        return null;
    return (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
                    <h2 className="text-xl font-black text-slate-900">Audio Commentary Settings</h2>
                    <button onClick={onClose} className="w-8 h-8 flex items-center justify-center bg-slate-100 hover:bg-slate-200 rounded-lg transition-all">
                        ✕
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    {/* Voice Selection */}
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">
                            Voice
                        </label>
                        <select value={settings.voiceIndex} onChange={function (e) { return onVoiceChange(Number(e.target.value)); }} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                            {voices.map(function (voice, index) { return (<option key={index} value={index}>
                                    {voice.name} ({voice.lang})
                                </option>); })}
                        </select>
                    </div>

                    {/* Speed */}
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">
                            Speed: {settings.speed.toFixed(1)}x
                        </label>
                        <input type="range" min="0.5" max="2" step="0.1" value={settings.speed} onChange={function (e) { return onSpeedChange(Number(e.target.value)); }} className="w-full"/>
                        <div className="flex justify-between text-xs text-slate-500 mt-1">
                            <span>Slower</span>
                            <span>Faster</span>
                        </div>
                    </div>

                    {/* Pitch */}
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">
                            Pitch: {settings.pitch.toFixed(1)}
                        </label>
                        <input type="range" min="0.5" max="2" step="0.1" value={settings.pitch} onChange={function (e) { return onPitchChange(Number(e.target.value)); }} className="w-full"/>
                        <div className="flex justify-between text-xs text-slate-500 mt-1">
                            <span>Lower</span>
                            <span>Higher</span>
                        </div>
                    </div>

                    {/* Volume */}
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">
                            Volume: {Math.round(settings.volume * 100)}%
                        </label>
                        <input type="range" min="0" max="1" step="0.1" value={settings.volume} onChange={function (e) { return onVolumeChange(Number(e.target.value)); }} className="w-full"/>
                        <div className="flex justify-between text-xs text-slate-500 mt-1">
                            <span>Quiet</span>
                            <span>Loud</span>
                        </div>
                    </div>

                    {/* Test Button */}
                    <button onClick={onTest} className="w-full px-4 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition-all">
                        🔊 Test Voice
                    </button>
                </div>

                {/* Footer */}
                <div className="sticky bottom-0 bg-slate-50 border-t border-slate-200 px-6 py-4 rounded-b-2xl">
                    <button onClick={onClose} className="w-full px-4 py-2 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800 transition-all">
                        Done
                    </button>
                </div>
            </div>
        </div>);
};
exports.AudioSettingsModal = AudioSettingsModal;
