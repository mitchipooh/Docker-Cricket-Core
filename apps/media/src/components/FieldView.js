"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldView = void 0;
var react_1 = require("react");
var FieldView = function (_a) {
    var _b = _a.shots, shots = _b === void 0 ? [] : _b, onRecord = _a.onRecord, _c = _a.readonly, readonly = _c === void 0 ? false : _c;
    var svgRef = (0, react_1.useRef)(null);
    var handleClick = function (e) {
        if (readonly || !onRecord || !svgRef.current)
            return;
        var rect = svgRef.current.getBoundingClientRect();
        var x = ((e.clientX - rect.left) / rect.width) * 100;
        var y = ((e.clientY - rect.top) / rect.height) * 100;
        onRecord({ x: x, y: y });
    };
    return (<div className="relative aspect-square w-full max-w-[300px] mx-auto">
      <svg ref={svgRef} viewBox="0 0 100 100" className={"w-full h-full rounded-full bg-emerald-700 border-4 border-emerald-800 shadow-inner ".concat(!readonly ? 'cursor-crosshair' : '')} onClick={handleClick}>
        {/* Field Markings */}
        <circle cx="50" cy="50" r="48" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5"/>
        <circle cx="50" cy="50" r="30" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" strokeDasharray="2 2"/>
        <rect x="48" y="42" width="4" height="16" fill="#e2e8f0" rx="1" opacity="0.8"/> {/* Pitch */}

        {/* Shots */}
        {shots.map(function (shot, i) { return (<g key={i}>
             <line x1="50" y1="50" x2={shot.coords.x} y2={shot.coords.y} stroke={shot.color || 'yellow'} strokeWidth="0.5" opacity="0.6"/>
             <circle cx={shot.coords.x} cy={shot.coords.y} r="1.5" fill={shot.color || 'yellow'} stroke="white" strokeWidth="0.2"/>
          </g>); })}
      </svg>
      <div className="absolute top-2 right-2 text-[8px] font-black text-white/50 uppercase tracking-widest pointer-events-none">
         Wagon Wheel
      </div>
    </div>);
};
exports.FieldView = FieldView;
