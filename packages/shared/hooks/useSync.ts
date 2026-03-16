import { useState, useRef, useCallback, useEffect } from 'react';
import { Organization, Team, MatchFixture, MediaPost, UserProfile } from '../types';
import { fetchGlobalSync, pushGlobalSync, pushUserData, fetchUserData } from '../services/centralZoneService';
import { io, Socket } from 'socket.io-client';
import { getApiUrl } from '../lib/api';

const SOCKET_URL = getApiUrl().replace('/api', '');

interface UseSyncProps {
    profile: UserProfile | null;
    orgs: Organization[];
    standaloneMatches: MatchFixture[];
    mediaPosts: MediaPost[];
    allTeams: Team[];
    settings: any;
    following: any;
    issues: any[];
    matchReports: any[];
    umpireReports: any[];

    setOrgsState: (val: Organization[]) => void;
    setMatchesState: (val: MatchFixture[]) => void;
    setPostsState: (val: MediaPost[]) => void;
    setAllTeamsState: (val: Team[]) => void;
    setSettings: (val: any) => void;
    setFollowing: (val: any) => void;
    setIssuesState: (val: any[]) => void;
    setMatchReportsState: (val: any[]) => void;
    setUmpireReportsState: (val: any[]) => void;
}

export const useSync = ({
    profile,
    orgs,
    standaloneMatches,
    mediaPosts,
    allTeams,
    settings,
    following,
    issues,
    matchReports,
    umpireReports,
    setOrgsState,
    setMatchesState,
    setPostsState,
    setAllTeamsState,
    setSettings,
    setFollowing,
    setIssuesState,
    setMatchReportsState,
    setUmpireReportsState
}: UseSyncProps) => {
    const [isSyncing, setIsSyncing] = useState(false);
    const isSyncingRef = useRef(false);
    const dirtyRef = useRef(false);
    const socketRef = useRef<Socket | null>(null);

    // Track last pull timestamp
    const lastPullRef = useRef<number>(0);
    const STALE_THRESHOLD_MS = 5 * 60 * 1000; // 5 minutes

    const performPull = useCallback(async (force: boolean = false) => {
        if (isSyncingRef.current) return;
        if (dirtyRef.current && !force) return;

        const now = Date.now();
        const timeSinceLastPull = now - lastPullRef.current;
        if (!force && timeSinceLastPull < STALE_THRESHOLD_MS && lastPullRef.current > 0) return;

        isSyncingRef.current = true;
        setIsSyncing(true);

        const userId = profile?.id;

        try {
            const cloudData = await fetchGlobalSync(userId);
            if (cloudData) {
                setOrgsState(cloudData.orgs || []);
                setMatchesState(cloudData.standaloneMatches || []);
                setPostsState(cloudData.mediaPosts || []);
                setAllTeamsState(cloudData.allTeams || []);
                setIssuesState(cloudData.issues || []);
                setMatchReportsState(cloudData.matchReports || []);
                setUmpireReportsState(cloudData.umpireReports || []);
            }

            if (profile) {
                const userData = await fetchUserData(profile.id);
                if (userData) {
                    if (userData.settings) setSettings(userData.settings);
                    if (userData.following) setFollowing(userData.following);
                }
            }

            lastPullRef.current = Date.now();
        } catch (e) {
            console.error("Sync pull failed:", e);
        } finally {
            isSyncingRef.current = false;
            setIsSyncing(false);
            dirtyRef.current = false;
        }
    }, [profile?.id, setOrgsState, setMatchesState, setPostsState, setAllTeamsState, setIssuesState, setMatchReportsState, setUmpireReportsState, setSettings, setFollowing]);

    const performPush = useCallback(async () => {
        if (isSyncingRef.current) return false;
        isSyncingRef.current = true;
        setIsSyncing(true);

        try {
            const success = await pushGlobalSync({ orgs, standaloneMatches, mediaPosts, issues, matchReports, umpireReports });

            if (success) {
                if (profile) {
                    await pushUserData(profile.id, { profile, settings, following });
                }
                dirtyRef.current = false;
                return true;
            }
            return false;
        } catch (e) {
            console.error("Sync push exception:", e);
            return false;
        } finally {
            isSyncingRef.current = false;
            setIsSyncing(false);
        }
    }, [orgs, standaloneMatches, mediaPosts, issues, matchReports, umpireReports, profile, settings, following]);

    // WebSocket Connection
    useEffect(() => {
        const socket = io(SOCKET_URL);
        socketRef.current = socket;

        socket.on('connect', () => console.log('Connected to local sync WebSocket'));
        
        socket.on('fixture_update', () => {
            console.log('⚡ Received real-time update');
            performPull(true);
        });

        socket.on('sync_push', () => {
            console.log('⚡ Received sync push notification');
            performPull(true);
        });

        return () => {
            socket.disconnect();
        };
    }, [performPull]);

    // Initial Pull & Heartbeat
    useEffect(() => {
        performPull();
        const interval = setInterval(performPull, 60000); // 1m heartbeat
        return () => clearInterval(interval);
    }, [performPull]);

    // Debounced Push
    useEffect(() => {
        if (!dirtyRef.current) return;
        const timer = setTimeout(() => {
            performPush();
        }, 2000); 
        return () => clearTimeout(timer);
    }, [orgs, standaloneMatches, mediaPosts, issues, matchReports, umpireReports, profile, settings, following, performPush]);

    const markDirty = () => {
        dirtyRef.current = true;
    };

    return {
        isSyncing,
        pullNow: performPull,
        pushNow: performPush,
        markDirty
    };
};
