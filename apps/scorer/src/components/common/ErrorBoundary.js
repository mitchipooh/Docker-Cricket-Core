"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorBoundary = void 0;
var react_1 = require("react");
var ErrorBoundary = /** @class */ (function (_super) {
    __extends(ErrorBoundary, _super);
    function ErrorBoundary(props) {
        var _this = _super.call(this, props) || this;
        _this.state = { hasError: false, error: null };
        return _this;
    }
    ErrorBoundary.getDerivedStateFromError = function (error) {
        return { hasError: true, error: error };
    };
    ErrorBoundary.prototype.componentDidCatch = function (error, errorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    };
    ErrorBoundary.prototype.render = function () {
        var _a, _b;
        if (this.state.hasError) {
            return (<div className="flex flex-col items-center justify-center h-screen bg-slate-950 text-white p-8 text-center">
          <div className="text-4xl mb-4">⚠️</div>
          <h1 className="text-2xl font-black mb-2 uppercase tracking-widest">System Error</h1>
          <p className="text-slate-400 text-sm mb-6">The application encountered a critical failure.</p>
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl max-w-md w-full overflow-auto mb-6 text-left">
            <pre className="text-[10px] font-mono text-red-400 whitespace-pre-wrap break-all">
              {((_a = this.state.error) === null || _a === void 0 ? void 0 : _a.message) || ((_b = this.state.error) === null || _b === void 0 ? void 0 : _b.toString())}
            </pre>
          </div>
          <button onClick={function () {
                    localStorage.removeItem('cc_profile'); // Clear potentially corrupted profile
                    window.location.reload();
                }} className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-black uppercase text-xs tracking-widest transition-all shadow-lg">
            Reset & Reload
          </button>
        </div>);
        }
        return this.props.children;
    };
    return ErrorBoundary;
}(react_1.default.Component));
exports.ErrorBoundary = ErrorBoundary;
