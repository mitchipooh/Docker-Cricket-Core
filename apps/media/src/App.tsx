import React, { useState, useMemo } from 'react';
import { MediaCenter } from './components/MediaCenter';
import { StatsAnalytics } from './components/StatsAnalytics';
import { GlobalDashboard } from './components/GlobalDashboard';
import { DataProvider, useData } from '@cricket/shared/contexts/DataProvider';
import { MatchFixture, PlayerWithContext } from '@cricket/shared';
import './index.css';

const MediaAppContent: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'hub' | 'media' | 'stats'>('hub');
    const { orgs, standaloneMatches, profile, allTeams } = useData();

    const globalFixtures = useMemo((): MatchFixture[] => 
        [...orgs.flatMap(org => org.fixtures), ...standaloneMatches].sort((a, b) => {
            const weight = { 'Live': 0, 'Scheduled': 1, 'Completed': 2 };
            const diff = (weight[a.status] || 1) - (weight[b.status] || 1);
            return diff !== 0 ? diff : a.status === 'Completed' ? new Date(b.date).getTime() - new Date(a.date).getTime() : new Date(a.date).getTime() - new Date(b.date).getTime();
        }), [orgs, standaloneMatches]);

    const globalPlayers = useMemo((): PlayerWithContext[] => 
        orgs.flatMap(org => org.memberTeams.flatMap(t => t.players.map(p => ({ ...p, teamName: t.name, teamId: t.id, orgId: org.id, orgName: org.name })))), [orgs]);

    const topBatsmen = useMemo(() => [...globalPlayers].sort((a, b) => b.stats.runs - a.stats.runs).slice(0, 5), [globalPlayers]);
    const topBowlers = useMemo(() => [...globalPlayers].sort((a, b) => b.stats.wickets - a.stats.wickets).slice(0, 5), [globalPlayers]);

    const following = { teams: [], players: [], orgs: [] }; // Mock for now or get from context if available

    if (!profile) return <div className="p-10 text-center font-bold text-slate-400">Loading Profile...</div>;

    return (
        <div className="min-h-screen bg-gray-50">
            <nav className="bg-white border-b border-gray-200 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <span className="text-xl font-bold text-blue-600">Cricket-Core Hub</span>
                        </div>
                        <div className="flex space-x-8 items-center">
                            <button
                                onClick={() => setActiveTab('hub')}
                                className={`px-3 py-2 text-sm font-medium ${activeTab === 'hub' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                            >
                                Match Center
                            </button>
                            <button
                                onClick={() => setActiveTab('media')}
                                className={`px-3 py-2 text-sm font-medium ${activeTab === 'media' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                            >
                                Media Feed
                            </button>
                            <button
                                onClick={() => setActiveTab('stats')}
                                className={`px-3 py-2 text-sm font-medium ${activeTab === 'stats' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                            >
                                Statistics
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                {activeTab === 'hub' && (
                    <GlobalDashboard 
                        organizations={orgs}
                        profile={profile}
                        onUpdateProfile={() => {}}
                        onSelectOrg={() => {}}
                        onRequestDeleteOrg={() => {}}
                        onRequestCreateOrg={() => {}}
                        onRequestQuickMatch={() => {}}
                        onOpenMediaStudio={() => setActiveTab('media')}
                        fixtures={globalFixtures}
                        topBatsmen={topBatsmen}
                        topBowlers={topBowlers}
                        onStartMatch={() => {}}
                        onViewMatch={() => {}}
                        onViewTeam={() => {}}
                    />
                )}
                {activeTab === 'media' && (
                    <MediaCenter 
                        onBack={() => setActiveTab('hub')}
                        fixtures={globalFixtures}
                        teams={allTeams}
                        players={globalPlayers}
                        mediaPosts={[]}
                        onAddMediaPost={() => {}}
                        onUpdatePost={() => {}}
                        following={following}
                        onToggleFollow={() => {}}
                        onViewTeam={() => {}}
                        onViewPlayer={() => {}}
                        currentProfile={profile}
                        organizations={orgs}
                    />
                )}
                {activeTab === 'stats' && <StatsAnalytics teams={allTeams} onBack={() => setActiveTab('hub')} />}
            </main>
        </div>
    );
};

const App: React.FC = () => (
    <DataProvider>
        <MediaAppContent />
    </DataProvider>
);

export default App;
