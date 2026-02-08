
import React, { useState } from 'react';
import { UserProfile, MatchFixture } from '../../types';

interface ScorerProfileProps {
    profile: UserProfile;
    onUpdateProfile: (updates: Partial<UserProfile>) => void;
    fixtures: MatchFixture[];
}

export const ScorerProfile: React.FC<ScorerProfileProps> = ({ profile, onUpdateProfile, fixtures }) => {
    const details = profile.scorerDetails || { isHireable: false, hourlyRate: 0, experienceYears: 0, bio: '' };
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState(details);

    // Filter fixtures to only those scored by this user
    const scoutedGames = fixtures.filter(f => f.scorerId === profile.id);

    const handleSave = () => {
        onUpdateProfile({
            scorerDetails: editForm
        });
        setIsEditing(false);
    };

    return (
        <div className="animate-in slide-in-from-bottom-8 space-y-8">
            {/* Header / Hero Section */}
            <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-[2.5rem] p-8 md:p-12 border border-slate-800 relative overflow-hidden shadow-2xl">
                <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-12">
                    <div className="w-32 h-32 md:w-40 md:h-40 bg-white rounded-[2.5rem] flex items-center justify-center text-6xl font-black text-slate-900 shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
                        {profile.name.charAt(0)}
                    </div>
                    <div className="text-center md:text-left flex-1">
                        <div className="inline-flex items-center gap-2 bg-indigo-500/20 text-indigo-300 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-4 border border-indigo-500/30">
                            Professional Scorer
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-2">{profile.name}</h1>
                        <p className="text-slate-400 font-bold text-lg">@{profile.handle}</p>

                        <div className="mt-8 flex flex-wrap justify-center md:justify-start gap-4">
                            <button
                                onClick={() => onUpdateProfile({ scorerDetails: { ...details, isHireable: !details.isHireable } })}
                                className={`px-8 py-4 rounded-2xl font-black uppercase text-xs tracking-widest transition-all ${details.isHireable ? 'bg-emerald-500 text-white shadow-xl shadow-emerald-500/20' : 'bg-slate-800 text-slate-400 hover:text-white border border-slate-700'}`}
                            >
                                {details.isHireable ? '✅ Available for Hire' : '❌ Not for Hire'}
                            </button>
                            <button
                                onClick={() => setIsEditing(!isEditing)}
                                className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-2xl font-black uppercase text-xs tracking-widest transition-all border border-white/10 backdrop-blur-md"
                            >
                                {isEditing ? 'Cancel Edit' : 'Edit Profile'}
                            </button>
                        </div>
                    </div>
                </div>
                {/* Decorative background */}
                <div className="absolute top-0 right-0 p-12 opacity-[0.03] text-9xl text-white font-black pointer-events-none select-none">SCORER</div>
            </div>

            {isEditing && (
                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-xl animate-in zoom-in-95 duration-300">
                    <h3 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-3">
                        <span className="w-2 h-8 bg-indigo-600 rounded-full"></span>
                        Edit Career Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Hourly Rate ($)</label>
                            <input
                                type="number"
                                value={editForm.hourlyRate}
                                onChange={(e) => setEditForm({ ...editForm, hourlyRate: Number(e.target.value) })}
                                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 font-bold text-slate-700 outline-none focus:ring-2 ring-indigo-500/20"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Experience (Years)</label>
                            <input
                                type="number"
                                value={editForm.experienceYears}
                                onChange={(e) => setEditForm({ ...editForm, experienceYears: Number(e.target.value) })}
                                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 font-bold text-slate-700 outline-none focus:ring-2 ring-indigo-500/20"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Hireable Status</label>
                            <div className="flex bg-slate-50 p-1 rounded-2xl border border-slate-200 h-[60px]">
                                <button
                                    onClick={() => setEditForm({ ...editForm, isHireable: true })}
                                    className={`flex-1 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${editForm.isHireable ? 'bg-white text-emerald-600 shadow-md' : 'text-slate-400 hover:text-slate-600'}`}
                                >
                                    Public
                                </button>
                                <button
                                    onClick={() => setEditForm({ ...editForm, isHireable: false })}
                                    className={`flex-1 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${!editForm.isHireable ? 'bg-white text-slate-600 shadow-md' : 'text-slate-400 hover:text-slate-600'}`}
                                >
                                    Private
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-2 mb-8">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Professional Bio</label>
                        <textarea
                            value={editForm.bio}
                            onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                            placeholder="Tell leagues about your scoring experience, certifications, and reliability..."
                            className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 font-bold text-slate-700 outline-none focus:ring-2 ring-indigo-500/20 min-h-[120px] resize-none"
                        />
                    </div>
                    <button
                        onClick={handleSave}
                        className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black uppercase text-xs tracking-[0.2em] shadow-xl shadow-indigo-200 hover:bg-indigo-500 transition-all"
                    >
                        Save Career Profile
                    </button>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Stats Cards */}
                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center group hover:scale-105 transition-transform duration-500">
                    <div className="text-5xl font-black text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">{scoutedGames.length}</div>
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Games Scored</div>
                </div>

                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center group hover:scale-105 transition-transform duration-500">
                    <div className="text-5xl font-black text-slate-900 mb-2 group-hover:text-emerald-500 transition-colors">${details.hourlyRate}</div>
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Booking Rate / Hour</div>
                </div>

                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center group hover:scale-105 transition-transform duration-500">
                    <div className="text-5xl font-black text-slate-900 mb-2 group-hover:text-purple-500 transition-colors">{details.experienceYears}</div>
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Years Experience</div>
                </div>
            </div>

            <div className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between mb-10">
                    <h3 className="text-2xl font-black text-slate-900">Scoring History</h3>
                    <span className="bg-slate-100 text-slate-500 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-slate-200">Official Records Only</span>
                </div>

                {scoutedGames.length > 0 ? (
                    <div className="grid grid-cols-1 gap-4">
                        {scoutedGames.map(game => (
                            <div key={game.id} className="group bg-slate-50 border border-slate-100 p-6 rounded-3xl hover:bg-white hover:border-indigo-200 hover:shadow-xl transition-all flex flex-col md:flex-row md:items-center justify-between gap-6">
                                <div className="flex items-center gap-6">
                                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-2xl font-black text-slate-400 group-hover:text-indigo-600 transition-colors shadow-sm">
                                        🏏
                                    </div>
                                    <div>
                                        <div className="font-black text-lg text-slate-900 mb-1">{game.teamAName} vs {game.teamBName}</div>
                                        <div className="flex items-center gap-3">
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{game.venue}</span>
                                            <span className="text-slate-300">•</span>
                                            <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">{new Date(game.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="text-right hidden md:block">
                                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Result</div>
                                        <div className="text-sm font-black text-slate-900">{game.result || 'Match Completed'}</div>
                                    </div>
                                    <div className="px-6 py-3 bg-white border border-slate-200 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-600 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600 transition-all cursor-default">
                                        Verified ✓
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-200">
                        <div className="text-5xl mb-4 grayscale opacity-50">📂</div>
                        <h4 className="text-xl font-black text-slate-900 mb-2">No Verified Records</h4>
                        <p className="text-slate-400 font-bold max-w-sm mx-auto">Complete Match Day assignments to build your professional scoring history.</p>
                    </div>
                )}
            </div>
        </div>
    );
};
