import { Organization, Team, MatchFixture, MediaPost, UserProfile, GameIssue, MatchReportSubmission, UmpireMatchReport } from '../types';
import { apiFetch } from '../lib/api';

// --- GLOBAL LEAGUE DATA SYNC ---

export const pushGlobalSync = async (data: {
  orgs: Organization[],
  standaloneMatches: MatchFixture[],
  mediaPosts: MediaPost[],
  issues?: GameIssue[],
  matchReports?: MatchReportSubmission[],
  umpireReports?: UmpireMatchReport[]
}) => {
  try {
    const res = await apiFetch('/sync/push', {
      method: 'POST',
      body: JSON.stringify(data)
    });
    return res.success;
  } catch (e) {
    console.error("Global Sync Push Failed:", e);
    return false;
  }
};

export const fetchGlobalSync = async (userId?: string): Promise<{
  orgs: Organization[],
  allTeams: Team[],
  standaloneMatches: MatchFixture[],
  mediaPosts: MediaPost[],
  issues: GameIssue[],
  matchReports: MatchReportSubmission[],
  umpireReports: UmpireMatchReport[]
} | null> => {
  try {
    return await apiFetch(`/sync/pull${userId ? `?userId=${userId}` : ''}`);
  } catch (e) {
    console.error("Global Sync Fetch Failed:", e);
    return null;
  }
};

// --- GRANULAR OPERATIONS ---

export const updateFixture = async (fixtureId: string, data: Partial<MatchFixture>) => {
  return await apiFetch(`/fixtures/${fixtureId}`, {
    method: 'PATCH',
    body: JSON.stringify(data)
  });
};

export const deleteMatchFixture = async (fixtureId: string) => {
  const res = await apiFetch(`/fixtures/${fixtureId}`, { method: 'DELETE' });
  return res.success;
};

export const deleteTeam = async (teamId: string) => {
  const res = await apiFetch(`/teams/${teamId}`, { method: 'DELETE' });
  return res.success;
};

export const deleteTournament = async (tournamentId: string) => {
  const res = await apiFetch(`/tournaments/${tournamentId}`, { method: 'DELETE' });
  return res.success;
};

export const deleteMediaPost = async (postId: string) => {
  const res = await apiFetch(`/media/${postId}`, { method: 'DELETE' });
  return res.success;
};

export const pushUserData = async (userId: string, data: any) => {
  const res = await apiFetch(`/user/${userId}`, {
    method: 'POST',
    body: JSON.stringify(data)
  });
  return res.success;
};

export const fetchUserData = async (userId: string) => {
  return await apiFetch(`/user/${userId}`);
};

// Mocked/Simplified for local mode
export const claimPlayerProfile = async (_playerId: string, _userId: string, _applicantName: string) => {
    console.warn("Player claiming not fully implemented in local mode");
    return { success: false, message: 'Feature not available in offline mode' };
};

export const approvePlayerClaim = async (_claimId: string, _playerId: string, _userId: string) => true;

export const requestAffiliation = async (_targetOrgId: string, _application: any) => true;

export const updateAffiliationStatus = async (_parentOrgId: string, _childOrgId: string, _status: any) => true;

export const removeTeamFromOrg = async (_orgId: string, _teamId: string) => true;

export const removeTeamFromTournament = async (_tournamentId: string, _teamId: string) => true;
