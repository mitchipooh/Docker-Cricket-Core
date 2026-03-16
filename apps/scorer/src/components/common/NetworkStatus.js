"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NetworkStatus = void 0;
var react_1 = require("react");
var offlineQueue_1 = require("@cricket/shared/services/offlineQueue");
var NetworkStatus = function () {
    var _a = (0, react_1.useState)({
        pendingCount: 0,
        isOnline: navigator.onLine,
        isProcessing: false
    }), status = _a[0], setStatus = _a[1];
    (0, react_1.useEffect)(function () {
        var unsub = offlineQueue_1.offlineQueue.subscribe(function (queue, isOnline) {
            setStatus({
                pendingCount: queue.length,
                isOnline: isOnline,
                isProcessing: offlineQueue_1.offlineQueue.getStatus().isProcessing
            });
        });
        return unsub;
    }, []);
    // Determine State
    var isSynced = status.pendingCount === 0;
    var isOffline = !status.isOnline;
    return (<div className={"\n      flex items-center gap-3 px-4 py-2 rounded-full border shadow-lg backdrop-blur-md transition-all duration-500\n      ".concat(isOffline
            ? 'bg-red-500/10 border-red-500/50 text-red-500'
            : status.isProcessing
                ? 'bg-indigo-500/10 border-indigo-500/50 text-indigo-500'
                : isSynced
                    ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-500'
                    : 'bg-amber-500/10 border-amber-500/50 text-amber-500', "\n    ")}>
      <div className="relative">
        {isOffline ? (<span className="text-lg">☁️</span>) : status.isProcessing ? (<div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>) : isSynced ? (<span className="text-lg">☁️</span>) : (<span className="text-lg">📤</span>)}
        
        {/* Status Dot */}
        <div className={"absolute -bottom-1 -right-1 w-2.5 h-2.5 rounded-full border-2 border-white ".concat(isOffline ? 'bg-red-500' : isSynced ? 'bg-emerald-500' : 'bg-amber-500')}></div>
      </div>

      <div className="flex flex-col leading-none">
        <span className="text-[10px] font-black uppercase tracking-widest">
            {isOffline ? 'Offline' : status.isProcessing ? 'Syncing...' : isSynced ? 'Cloud Synced' : 'Changes Pending'}
        </span>
        {!isSynced && (<span className="text-[9px] font-bold opacity-80">
                {status.pendingCount} action{status.pendingCount !== 1 ? 's' : ''} queued
            </span>)}
      </div>
    </div>);
};
exports.NetworkStatus = NetworkStatus;
