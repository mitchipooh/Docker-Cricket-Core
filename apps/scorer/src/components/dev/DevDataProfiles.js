"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEV_PROFILES = void 0;
var generatePlayers = function (count, prefix) {
    return Array.from({ length: count }).map(function (_, i) { return ({
        id: "pl-".concat(prefix, "-").concat(i),
        name: "".concat(prefix, " Player ").concat(i + 1),
        role: i === 0 ? 'Wicket-keeper' : i < 5 ? 'Batsman' : i < 9 ? 'All-rounder' : 'Bowler',
        stats: { runs: 0, wickets: 0, ballsFaced: 0, ballsBowled: 0, runsConceded: 0, matches: 0, catches: 0, runOuts: 0, stumpings: 0, fours: 0, sixes: 0, hundreds: 0, fifties: 0, ducks: 0, threeWickets: 0, fiveWickets: 0, maidens: 0 }
    }); });
};
var generateTeam = function (id, name, prefix) { return ({
    id: id,
    name: name,
    players: generatePlayers(15, prefix),
    logoUrl: ''
}); };
exports.DEV_PROFILES = [
    {
        id: 'reset',
        name: 'Reset Data',
        description: 'Clear all data and start fresh.',
        icon: '🗑️',
        generate: function () { return ({ orgs: [], matches: [] }); }
    },
    {
        id: 'quick_match',
        name: 'Quick Match Ready',
        description: 'Two teams and a match ready to start.',
        icon: '⚡',
        generate: function () {
            var teamA = generateTeam('tm-qm-1', 'Super Strikers', 'Strikers');
            var teamB = generateTeam('tm-qm-2', 'Thunder Bolts', 'Thunder');
            var match = {
                id: "mx-qm-".concat(Date.now()),
                teamAId: teamA.id,
                teamBId: teamB.id,
                date: new Date().toISOString(),
                teamAName: teamA.name,
                teamBName: teamB.name,
                venue: 'Dev Ground',
                status: 'Scheduled'
            };
            var org = {
                id: 'org-dev-qm',
                name: 'Quick Play',
                type: 'CLUB',
                memberTeams: [teamA, teamB],
                fixtures: [],
                tournaments: [],
                groups: [],
                members: [],
                applications: [],
                sponsors: [],
                establishedYear: 2026,
                isPublic: false
            };
            return { orgs: [org], matches: [match] };
        }
    },
    {
        id: 'tournament',
        name: 'Tournament Mode',
        description: 'Full tournament with 8 teams and groups.',
        icon: '🏆',
        generate: function () {
            var teams = Array.from({ length: 8 }).map(function (_, i) {
                return generateTeam("tm-tr-".concat(i), "Team ".concat(String.fromCharCode(65 + i)), "Team ".concat(String.fromCharCode(65 + i)));
            });
            var groupA = { id: 'grp-A', name: 'Group A', teams: teams.slice(0, 4) };
            var groupB = { id: 'grp-B', name: 'Group B', teams: teams.slice(4, 8) };
            var tournament = {
                id: 'trn-dev-1',
                name: 'Dev Cup 2026',
                format: 'T20',
                overs: 20,
                groups: [groupA, groupB],
                status: 'Ongoing',
                pointsConfig: {
                    win: 2, loss: 0, tie: 1, noResult: 1,
                    win_outright: 2, tie_match: 1,
                    first_inning_lead: 0, first_inning_tie: 0, first_inning_loss: 0,
                    bonus_batting_max: 0, bonus_bowling_max: 0, max_total_per_match: 2,
                    batting_bonus_tiers: [], bowling_bonus_tiers: []
                }
            };
            var org = {
                id: 'org-dev-trn',
                name: 'Dev League',
                type: 'GOVERNING_BODY',
                memberTeams: teams,
                fixtures: [],
                tournaments: [tournament],
                groups: [],
                members: [],
                applications: [],
                sponsors: [],
                establishedYear: 2026,
                isPublic: true
            };
            return { orgs: [org], matches: [] };
        }
    },
    {
        id: 'central_zone_full',
        name: 'Central Zone Setup',
        description: 'Seeds the 24 Central Zone clubs with admins, captains, and squads.',
        icon: '🇹🇹',
        generate: function () {
            var teamNames = [
                "Balmain United", "Brickfield Sports", "Orangefield Sports", "Caparo Sports",
                "Centric Academy", "Countryside", "Couva Sports", "Agostini Sports",
                "Esmeralda Sports", "Ragoonanan Road Sports", "Exchange 2", "Felicity Sports",
                "Friendship Hall Sports", "Koreans Sports", "Lange Park Sports", "Line and Length",
                "Madras Divergent Academy", "Mc Bean Sports", "Petersfield Sports",
                "Preysal Valley Boys", "Renoun Sports", "Sital Felicity Youngsters",
                "Supersonic Sports", "Waterloo Sports"
            ];
            var teams = teamNames.map(function (name, i) {
                var slug = name.toLowerCase().replace(/\s+/g, '-');
                var team = generateTeam("tm-cz-".concat(slug), name, name.split(' ')[0]);
                // Customize description for customization request
                team.management = 'Managed by ' + name + ' Board';
                team.location = 'Central Trinidad';
                return team;
            });
            // Generate Members: 1 Admin and 1 Captain per team
            var members = [];
            teams.forEach(function (team) {
                var slug = team.id.replace('tm-cz-', '');
                var baseHandle = slug.split('-')[0];
                // Club Admin (PW: admin)
                members.push({
                    userId: "adm-".concat(slug),
                    name: "".concat(team.name, " Admin"),
                    handle: "@admin_".concat(baseHandle),
                    role: 'Administrator',
                    addedAt: Date.now(),
                    permissions: { canEditOrg: true, canManageMembers: true, canEditSquad: true, canSubmitReport: true }
                });
                // Club Captain (PW: Captain) - Assign to first player
                var captPlayer = team.players[0];
                members.push({
                    userId: captPlayer.id,
                    name: captPlayer.name,
                    handle: "@capt_".concat(baseHandle),
                    role: 'Player',
                    addedAt: Date.now(),
                    permissions: { canSubmitReport: true, canEditSquad: true, canViewReports: true }
                });
                // Club Coach (PW: coach)
                members.push({
                    userId: "coach-".concat(slug),
                    name: "Coach ".concat(team.name.split(' ')[0]),
                    handle: "@coach_".concat(baseHandle),
                    role: 'Coach',
                    addedAt: Date.now(),
                    permissions: { canEditSquad: true, canViewReports: true, canManagePractice: true }
                });
                // Club Scorer (PW: scorer)
                members.push({
                    userId: "scorer-".concat(slug),
                    name: "Scorer ".concat(team.name.split(' ')[0]),
                    handle: "@scorer_".concat(baseHandle),
                    role: 'Scorer',
                    addedAt: Date.now(),
                    permissions: { canScoreMatch: true, canEditScorecard: true, canViewReports: true }
                });
            });
            // 2 Zone Umpires (PW: umpire)
            members.push({
                userId: 'umpire-cz-1',
                name: 'Umpire Steve',
                handle: '@ump_steve',
                role: 'Umpire',
                addedAt: Date.now(),
                permissions: { canOfficiate: true, canViewReports: true }
            }, {
                userId: 'umpire-cz-2',
                name: 'Umpire Mike',
                handle: '@ump_mike',
                role: 'Umpire',
                addedAt: Date.now(),
                permissions: { canOfficiate: true, canViewReports: true }
            });
            var org = {
                id: 'org-central-zone',
                name: 'Central Zone',
                type: 'GOVERNING_BODY', // Acting as the zone wrapper
                description: 'The official governing body for the Central Zone containing all member clubs.',
                memberTeams: teams,
                fixtures: [],
                tournaments: [],
                groups: [],
                members: members,
                applications: [],
                sponsors: [],
                establishedYear: 1980,
                isPublic: true,
                allowUserContent: true,
                country: 'Trinidad & Tobago'
            };
            return { orgs: [org], matches: [] };
        }
    }
];
