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
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAudioCommentary = void 0;
var react_1 = require("react");
var STORAGE_KEY = 'cricket-audio-commentary-settings';
var DEFAULT_SETTINGS = {
    enabled: false,
    voiceIndex: 0,
    speed: 0.95, // Slightly slower for clearer, more natural delivery
    pitch: 1.1, // Slightly higher pitch for more energetic commentary
    volume: 1.0
};
/**
 * Finds the best quality voice from available voices
 * Prioritizes: English voices, natural/enhanced voices, male voices for sports commentary
 */
function findBestVoice(voices) {
    if (voices.length === 0)
        return 0;
    // Preferred voice names (in order of preference)
    var preferredNames = [
        'Google UK English Male',
        'Google US English Male',
        'Microsoft David',
        'Microsoft Mark',
        'Alex',
        'Daniel',
        'Google UK English Female',
        'Google US English Female',
        'Microsoft Zira',
        'Samantha'
    ];
    var _loop_1 = function (name_1) {
        var index = voices.findIndex(function (v) { return v.name.includes(name_1); });
        if (index !== -1)
            return { value: index };
    };
    // Try to find a preferred voice
    for (var _i = 0, preferredNames_1 = preferredNames; _i < preferredNames_1.length; _i++) {
        var name_1 = preferredNames_1[_i];
        var state_1 = _loop_1(name_1);
        if (typeof state_1 === "object")
            return state_1.value;
    }
    // Fallback: find any English voice
    var englishIndex = voices.findIndex(function (v) { return v.lang.startsWith('en'); });
    if (englishIndex !== -1)
        return englishIndex;
    // Last resort: use first voice
    return 0;
}
var useAudioCommentary = function () {
    var _a = (0, react_1.useState)(function () {
        if (typeof window === 'undefined')
            return DEFAULT_SETTINGS;
        var stored = localStorage.getItem(STORAGE_KEY);
        return stored ? __assign(__assign({}, DEFAULT_SETTINGS), JSON.parse(stored)) : DEFAULT_SETTINGS;
    }), settings = _a[0], setSettings = _a[1];
    var _b = (0, react_1.useState)(false), speaking = _b[0], setSpeaking = _b[1];
    var _c = (0, react_1.useState)([]), voices = _c[0], setVoices = _c[1];
    var queueRef = (0, react_1.useRef)([]);
    var isSupported = typeof window !== 'undefined' && 'speechSynthesis' in window;
    // Load available voices and auto-select best voice
    (0, react_1.useEffect)(function () {
        if (!isSupported)
            return;
        var loadVoices = function () {
            var availableVoices = window.speechSynthesis.getVoices();
            setVoices(availableVoices);
            // Auto-select best voice on first load if using default
            if (availableVoices.length > 0 && settings.voiceIndex === 0) {
                var bestVoiceIndex_1 = findBestVoice(availableVoices);
                if (bestVoiceIndex_1 !== 0) {
                    setSettings(function (prev) { return (__assign(__assign({}, prev), { voiceIndex: bestVoiceIndex_1 })); });
                }
            }
        };
        loadVoices();
        window.speechSynthesis.onvoiceschanged = loadVoices;
        return function () {
            window.speechSynthesis.onvoiceschanged = null;
        };
    }, [isSupported]);
    // Save settings to localStorage
    (0, react_1.useEffect)(function () {
        if (typeof window !== 'undefined') {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
        }
    }, [settings]);
    // Process speech queue
    var processQueue = (0, react_1.useCallback)(function () {
        if (!isSupported || queueRef.current.length === 0 || speaking)
            return;
        var text = queueRef.current.shift();
        if (!text)
            return;
        var utterance = new SpeechSynthesisUtterance(text);
        // Apply settings
        if (voices[settings.voiceIndex]) {
            utterance.voice = voices[settings.voiceIndex];
        }
        utterance.rate = settings.speed;
        utterance.pitch = settings.pitch;
        utterance.volume = settings.volume;
        utterance.onstart = function () { return setSpeaking(true); };
        utterance.onend = function () {
            setSpeaking(false);
            // Process next item in queue
            setTimeout(function () { return processQueue(); }, 100);
        };
        utterance.onerror = function () {
            setSpeaking(false);
            setTimeout(function () { return processQueue(); }, 100);
        };
        window.speechSynthesis.speak(utterance);
    }, [isSupported, speaking, voices, settings]);
    // Speak function - adds to queue
    var speak = (0, react_1.useCallback)(function (text) {
        if (!isSupported || !settings.enabled || !text.trim())
            return;
        queueRef.current.push(text);
        processQueue();
    }, [isSupported, settings.enabled, processQueue]);
    // Cancel all speech
    var cancel = (0, react_1.useCallback)(function () {
        if (!isSupported)
            return;
        window.speechSynthesis.cancel();
        queueRef.current = [];
        setSpeaking(false);
    }, [isSupported]);
    // Setting updaters
    var setEnabled = (0, react_1.useCallback)(function (enabled) {
        setSettings(function (prev) { return (__assign(__assign({}, prev), { enabled: enabled })); });
        if (!enabled)
            cancel();
    }, [cancel]);
    var setVoice = (0, react_1.useCallback)(function (voiceIndex) {
        setSettings(function (prev) { return (__assign(__assign({}, prev), { voiceIndex: voiceIndex })); });
    }, []);
    var setSpeed = (0, react_1.useCallback)(function (speed) {
        setSettings(function (prev) { return (__assign(__assign({}, prev), { speed: speed })); });
    }, []);
    var setPitch = (0, react_1.useCallback)(function (pitch) {
        setSettings(function (prev) { return (__assign(__assign({}, prev), { pitch: pitch })); });
    }, []);
    var setVolume = (0, react_1.useCallback)(function (volume) {
        setSettings(function (prev) { return (__assign(__assign({}, prev), { volume: volume })); });
    }, []);
    return {
        enabled: settings.enabled,
        speaking: speaking,
        voices: voices,
        settings: settings,
        speak: speak,
        cancel: cancel,
        setEnabled: setEnabled,
        setVoice: setVoice,
        setSpeed: setSpeed,
        setPitch: setPitch,
        setVolume: setVolume,
        isSupported: isSupported
    };
};
exports.useAudioCommentary = useAudioCommentary;
