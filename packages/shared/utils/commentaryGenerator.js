"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addSpeechEmphasis = addSpeechEmphasis;
exports.generateCommentary = generateCommentary;
exports.generateEndOfOverCommentary = generateEndOfOverCommentary;
// Varied phrases for different scenarios
var COMMENTARY_PHRASES = {
    dot: [
        "Dot ball",
        "{batter} defends solidly",
        "No run there",
        "{batter} plays it straight to the fielder",
        "Good defensive shot",
        "{bowler} beats the bat!",
        "Excellent bowling from {bowler}"
    ],
    single: [
        "{batter} takes a quick single",
        "{batter} pushes it for one",
        "They scamper through for a single",
        "{batter} works it away for one run",
        "Good running between the wickets",
        "{batter} places it nicely for a single"
    ],
    two: [
        "{batter} finds the gap for two",
        "They come back for the second!",
        "{batter} pushes it into the gap, two runs",
        "Good placement, two runs",
        "Excellent running, they get two"
    ],
    three: [
        "{batter} finds the gap, they run three!",
        "Superb running, three runs",
        "{batter} places it perfectly, three runs",
        "They push hard and get three!"
    ],
    four: [
        "FOUR! What a shot from {batter}!",
        "BOUNDARY! {batter} finds the rope!",
        "FOUR! Beautifully timed by {batter}!",
        "FOUR! {batter} sends it racing to the boundary!",
        "FOUR! Glorious stroke from {batter}!",
        "FOUR! {batter} pierces the field perfectly!"
    ],
    six: [
        "SIX! {batter} sends it into the stands!",
        "MAXIMUM! What a hit from {batter}!",
        "SIX! {batter} launches it over the boundary!",
        "SIX! Massive hit from {batter}!",
        "SIX! {batter} goes big!",
        "SIX! Out of the park from {batter}!"
    ],
    wide: [
        "Wide! {bowler}'s radar is off",
        "Wide ball, that's wayward from {bowler}",
        "Wide! {bowler} loses his line",
        "Wide! Poor delivery from {bowler}",
        "Wide ball, extra run"
    ],
    noBall: [
        "No ball! {bowler} has overstepped",
        "No ball! Free hit coming up!",
        "No ball from {bowler}",
        "No ball! {bowler} oversteps the crease"
    ],
    bye: [
        "Byes! The keeper misses it",
        "{runs} byes, extras mounting up",
        "Byes, the ball beats everyone"
    ],
    legBye: [
        "Leg bye! Off the pads",
        "{runs} leg byes",
        "Leg bye, off the body"
    ],
    wicket: {
        Bowled: [
            "BOWLED! {bowler} crashes through the defenses!",
            "TIMBER! {outPlayer} is bowled by {bowler}!",
            "BOWLED! What a delivery from {bowler}!",
            "BOWLED! {outPlayer}'s stumps are shattered!"
        ],
        Caught: [
            "OUT! {outPlayer} is caught by {fielder}!",
            "CAUGHT! {fielder} takes a brilliant catch!",
            "OUT! {outPlayer} holes out to {fielder}!",
            "CAUGHT! {fielder} makes no mistake!"
        ],
        "Caught Behind": [
            "OUT! Caught behind! {outPlayer} edges it to the keeper!",
            "CAUGHT BEHIND! {outPlayer} nicks it!",
            "OUT! The keeper takes a good catch!",
            "CAUGHT BEHIND! Thin edge and gone!"
        ],
        LBW: [
            "OUT! LBW! {outPlayer} is trapped in front!",
            "LBW! That looked plumb!",
            "OUT! {outPlayer} is given out LBW!",
            "LBW! {bowler} gets his man!"
        ],
        "Run Out": [
            "RUN OUT! {outPlayer} is short of the crease!",
            "OUT! Brilliant fielding, {outPlayer} is run out!",
            "RUN OUT! {outPlayer} sacrifices his wicket!",
            "OUT! Direct hit! {outPlayer} is gone!"
        ],
        Stumped: [
            "STUMPED! {outPlayer} is out of his crease!",
            "OUT! Lightning quick stumping!",
            "STUMPED! The keeper does the rest!",
            "OUT! {outPlayer} is stumped!"
        ]
    }
};
function getRandomPhrase(phrases) {
    return phrases[Math.floor(Math.random() * phrases.length)];
}
function replacePlaceholders(phrase, context) {
    var _a, _b, _c, _d;
    return phrase
        .replace('{batter}', ((_a = context.batter) === null || _a === void 0 ? void 0 : _a.name) || 'The batter')
        .replace('{bowler}', ((_b = context.bowler) === null || _b === void 0 ? void 0 : _b.name) || 'The bowler')
        .replace('{outPlayer}', ((_c = context.outPlayer) === null || _c === void 0 ? void 0 : _c.name) || 'The batter')
        .replace('{fielder}', ((_d = context.fielder) === null || _d === void 0 ? void 0 : _d.name) || 'the fielder')
        .replace('{runs}', context.runs.toString());
}
/**
 * Adds natural pauses and emphasis to commentary for more realistic speech
 */
function addSpeechEmphasis(text) {
    // Add slight pauses after exclamations for dramatic effect
    var enhanced = text.replace(/!/g, '!,');
    // Add pause after player names for clarity
    enhanced = enhanced.replace(/([A-Z][a-z]+ [A-Z][a-z]+)/g, '$1,');
    // Remove double commas
    enhanced = enhanced.replace(/,,/g, ',');
    return enhanced;
}
function generateCommentary(context) {
    var commentary = '';
    // Handle extras first
    if (context.isWide) {
        commentary = replacePlaceholders(getRandomPhrase(COMMENTARY_PHRASES.wide), context);
    }
    else if (context.isNoBall) {
        commentary = replacePlaceholders(getRandomPhrase(COMMENTARY_PHRASES.noBall), context);
    }
    else if (context.isBye) {
        commentary = replacePlaceholders(getRandomPhrase(COMMENTARY_PHRASES.bye), context);
    }
    else if (context.isLegBye) {
        commentary = replacePlaceholders(getRandomPhrase(COMMENTARY_PHRASES.legBye), context);
    }
    else if (context.wicketType) {
        // Handle wickets
        var wicketPhrases = COMMENTARY_PHRASES.wicket[context.wicketType];
        if (wicketPhrases) {
            commentary = replacePlaceholders(getRandomPhrase(wicketPhrases), context);
        }
        else {
            commentary = "WICKET! ".concat(context.wicketType, "!");
        }
    }
    else {
        // Handle runs
        switch (context.runs) {
            case 0:
                commentary = replacePlaceholders(getRandomPhrase(COMMENTARY_PHRASES.dot), context);
                break;
            case 1:
                commentary = replacePlaceholders(getRandomPhrase(COMMENTARY_PHRASES.single), context);
                break;
            case 2:
                commentary = replacePlaceholders(getRandomPhrase(COMMENTARY_PHRASES.two), context);
                break;
            case 3:
                commentary = replacePlaceholders(getRandomPhrase(COMMENTARY_PHRASES.three), context);
                break;
            case 4:
                commentary = replacePlaceholders(getRandomPhrase(COMMENTARY_PHRASES.four), context);
                break;
            case 6:
                commentary = replacePlaceholders(getRandomPhrase(COMMENTARY_PHRASES.six), context);
                break;
            default:
                commentary = "".concat(context.runs, " runs");
        }
    }
    // Add natural speech emphasis
    return addSpeechEmphasis(commentary);
}
/**
 * Generates end-of-over commentary with game updates
 */
function generateEndOfOverCommentary(context) {
    var overNumber = context.overNumber, score = context.score, wickets = context.wickets, currentRunRate = context.currentRunRate, innings = context.innings, target = context.target, requiredRate = context.requiredRate, batterName = context.batterName, batterScore = context.batterScore, projectedScore = context.projectedScore, lead = context.lead;
    var templates = [];
    // First innings templates
    if (innings === 1) {
        templates.push("End of over ".concat(overNumber, ". The score is ").concat(score, " for ").concat(wickets, ". Current run rate, ").concat(currentRunRate, "."), "That's the end of over ".concat(overNumber, ". ").concat(score, " for ").concat(wickets, ". They're scoring at ").concat(currentRunRate, " runs per over."), "Over ".concat(overNumber, " complete. ").concat(score, " for ").concat(wickets, ". Run rate ").concat(currentRunRate, "."));
        if (batterName && batterScore !== undefined) {
            templates.push("End of over ".concat(overNumber, ". ").concat(score, " for ").concat(wickets, ". ").concat(batterName, " on ").concat(batterScore, "."), "That's over ".concat(overNumber, " done. ").concat(batterName, " has ").concat(batterScore, ". Team score ").concat(score, " for ").concat(wickets, "."));
        }
        if (projectedScore) {
            templates.push("Over ".concat(overNumber, " complete. ").concat(score, " for ").concat(wickets, ". At this rate, they're projected to reach ").concat(projectedScore, "."), "End of over ".concat(overNumber, ". Current score ").concat(score, " for ").concat(wickets, ". Projected total, ").concat(projectedScore, "."));
        }
        if (lead && lead > 0) {
            templates.push("Over ".concat(overNumber, " done. ").concat(score, " for ").concat(wickets, ". They lead by ").concat(lead, " runs."), "End of over ".concat(overNumber, ". ").concat(score, " for ").concat(wickets, ". Lead of ").concat(lead, " runs."));
        }
        else if (lead && lead < 0) {
            templates.push("Over ".concat(overNumber, " complete. ").concat(score, " for ").concat(wickets, ". They trail by ").concat(Math.abs(lead), " runs."), "End of over ".concat(overNumber, ". ").concat(score, " for ").concat(wickets, ". Still ").concat(Math.abs(lead), " runs behind."));
        }
    }
    // Second innings (chasing) templates
    if (innings === 2 && target) {
        var runsNeeded = target - score;
        if (runsNeeded > 0) {
            templates.push("End of over ".concat(overNumber, ". ").concat(score, " for ").concat(wickets, ". They need ").concat(runsNeeded, " more runs to win."), "Over ".concat(overNumber, " complete. ").concat(runsNeeded, " runs needed from here. Current score ").concat(score, " for ").concat(wickets, "."), "That's over ".concat(overNumber, ". ").concat(score, " for ").concat(wickets, ". ").concat(runsNeeded, " runs required."));
            if (requiredRate) {
                templates.push("End of over ".concat(overNumber, ". ").concat(score, " for ").concat(wickets, ". Need ").concat(runsNeeded, " runs. Required rate ").concat(requiredRate, "."), "Over ".concat(overNumber, " done. ").concat(runsNeeded, " to win. Required run rate, ").concat(requiredRate, ". Current rate, ").concat(currentRunRate, "."), "That's the end of over ".concat(overNumber, ". ").concat(score, " for ").concat(wickets, ". ").concat(runsNeeded, " needed at ").concat(requiredRate, " per over."));
            }
            if (batterName && batterScore !== undefined) {
                templates.push("Over ".concat(overNumber, " complete. ").concat(batterName, " on ").concat(batterScore, ". Team needs ").concat(runsNeeded, " more runs."), "End of over ".concat(overNumber, ". ").concat(score, " for ").concat(wickets, ". ").concat(batterName, " has ").concat(batterScore, ". ").concat(runsNeeded, " runs to win."));
            }
        }
    }
    // Pick a random template
    var template = templates[Math.floor(Math.random() * templates.length)];
    return addSpeechEmphasis(template);
}
