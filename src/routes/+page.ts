import { MemberStanding } from '$lib/types';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { members } from '$lib/global-var';

let standings: MemberStanding[] = [];

const url = 'https://www.cbssports.com/nfl/standings/';

// export const load = (async ({ fetch, params }) => {
// 	return { members: standings };
// }) satisfies Standings;

// function to reset standings
const resetStandings = () => {
	standings = [
		new MemberStanding('Marcel'),
		new MemberStanding('Nate'),
		new MemberStanding('Bob'),
		new MemberStanding('Tom'),
		new MemberStanding('Carter'),
		new MemberStanding('Matt')
	];
};

// Team name mapping: maps common variations to the names used in global-var.ts
const teamNameMap: Record<string, string> = {
	// Washington
	'washington commanders': 'Washington',
	'washington': 'Washington',
	
	// Cincinnati
	'cincinnati bengals': 'Cincinnati',
	'cincinnati': 'Cincinnati',
	
	// Seattle
	'seattle seahawks': 'Seattle',
	'seattle': 'Seattle',
	
	// Miami
	'miami dolphins': 'Miami',
	'miami': 'Miami',
	
	// N.Y. Giants
	'new york giants': 'N.Y. Giants',
	'ny giants': 'N.Y. Giants',
	'n.y. giants': 'N.Y. Giants',
	'giants': 'N.Y. Giants',
	
	// Detroit
	'detroit lions': 'Detroit',
	'detroit': 'Detroit',
	
	// Tampa Bay
	'tampa bay buccaneers': 'Tampa Bay',
	'tampa bay': 'Tampa Bay',
	
	// Dallas
	'dallas cowboys': 'Dallas',
	'dallas': 'Dallas',
	
	// New England
	'new england patriots': 'New England',
	'new england': 'New England',
	'ne patriots': 'New England',
	
	// Tennessee
	'tennessee titans': 'Tennessee',
	'tennessee': 'Tennessee',
	
	// Baltimore
	'baltimore ravens': 'Baltimore',
	'baltimore': 'Baltimore',
	
	// Houston
	'houston texans': 'Houston',
	'houston': 'Houston',
	
	// Pittsburgh
	'pittsburgh steelers': 'Pittsburgh',
	'pittsburgh': 'Pittsburgh',
	
	// Las Vegas
	'las vegas raiders': 'Las Vegas',
	'las vegas': 'Las Vegas',
	'oakland raiders': 'Las Vegas', // Handle old name
	
	// Jacksonville
	'jacksonville jaguars': 'Jacksonville',
	'jacksonville': 'Jacksonville',
	
	// Buffalo
	'buffalo bills': 'Buffalo',
	'buffalo': 'Buffalo',
	
	// Green Bay
	'green bay packers': 'Green Bay',
	'green bay': 'Green Bay',
	
	// L.A. Rams
	'los angeles rams': 'L.A. Rams',
	'la rams': 'L.A. Rams',
	'l.a. rams': 'L.A. Rams',
	'rams': 'L.A. Rams',
	
	// Indianapolis
	'indianapolis colts': 'Indianapolis',
	'indianapolis': 'Indianapolis',
	
	// Atlanta
	'atlanta falcons': 'Atlanta',
	'atlanta': 'Atlanta',
	
	// Kansas City
	'kansas city chiefs': 'Kansas City',
	'kansas city': 'Kansas City',
	'kc chiefs': 'Kansas City',
	
	// Denver
	'denver broncos': 'Denver',
	'denver': 'Denver',
	
	// San Francisco
	'san francisco 49ers': 'San Francisco',
	'san francisco': 'San Francisco',
	'sf 49ers': 'San Francisco',
	'49ers': 'San Francisco',
	
	// Minnesota
	'minnesota vikings': 'Minnesota',
	'minnesota': 'Minnesota',
	
	// Carolina
	'carolina panthers': 'Carolina',
	'carolina': 'Carolina',
	
	// Philadelphia
	'philadelphia eagles': 'Philadelphia',
	'philadelphia': 'Philadelphia',
	
	// L.A. Chargers
	'los angeles chargers': 'L.A. Chargers',
	'la chargers': 'L.A. Chargers',
	'l.a. chargers': 'L.A. Chargers',
	'chargers': 'L.A. Chargers',
	
	// Chicago
	'chicago bears': 'Chicago',
	'chicago': 'Chicago',
	
	// Arizona
	'arizona cardinals': 'Arizona',
	'arizona': 'Arizona',
	
	// N.Y. Jets
	'new york jets': 'N.Y. Jets',
	'ny jets': 'N.Y. Jets',
	'n.y. jets': 'N.Y. Jets',
	'jets': 'N.Y. Jets'
};

// Helper function to normalize team names for matching
const normalizeTeamName = (name: string): string => {
	return name.trim().replace(/\s+/g, ' ');
};

// Helper function to find matching team name, handling variations
const findMatchingTeam = (scrapedTeam: string, memberTeams: string[]): string | undefined => {
	const normalizedScraped = normalizeTeamName(scrapedTeam).toLowerCase();
	
	// First, try to find a match using the team name map
	const mappedName = teamNameMap[normalizedScraped];
	if (mappedName && memberTeams.includes(mappedName)) {
		return mappedName;
	}
	
	// Try exact match (after normalization)
	const exactMatch = memberTeams.find(team => normalizeTeamName(team).toLowerCase() === normalizedScraped);
	if (exactMatch) return exactMatch;
	
	// Try case-insensitive match
	const caseInsensitiveMatch = memberTeams.find(team => 
		normalizeTeamName(team).toLowerCase() === normalizedScraped
	);
	if (caseInsensitiveMatch) return caseInsensitiveMatch;
	
	// Try partial match - check if scraped name contains member team name or vice versa
	const partialMatch = memberTeams.find(team => {
		const normalizedMember = normalizeTeamName(team).toLowerCase();
		
		// Check if one contains the other
		if (normalizedScraped.includes(normalizedMember) || normalizedMember.includes(normalizedScraped)) {
			return true;
		}
		
		// Check if the key parts match (e.g., "New York" matches "N.Y.")
		const normalizeForMatch = (str: string) => {
			return str
				.replace(/^n\.y\./i, 'new york')
				.replace(/^l\.a\./i, 'los angeles')
				.replace(/\./g, '')
				.replace(/\s+/g, ' ')
				.trim()
				.toLowerCase();
		};
		
		return normalizeForMatch(normalizedMember) === normalizeForMatch(normalizedScraped);
	});
	
	return partialMatch;
};

export const load = async () => {
	resetStandings();

	return axios.get(url).then((response) => {
		// Load HTML we fetched in the previous line
		const $ = cheerio.load(response.data);

		const listItems = $('tbody > tr');

		listItems.each((index: number, element: any) => {
			const scrapedTeam = $(element).find('td').eq(0).text();
			if (scrapedTeam) {
				const wins = $(element).find('td').eq(1).text().trim();
				const losses = $(element).find('td').eq(2).text().trim();
				const teamImg = $(element).find('td').eq(0).find('img').attr('src') || '';
				
				// Find the matching team name from member teams
				let matchedTeamName: string | undefined;
				let member = members.find((member) => {
					matchedTeamName = findMatchingTeam(scrapedTeam, member.teams);
					return matchedTeamName !== undefined;
				});
				
				if (member && matchedTeamName) {
					const memberStanding = standings.find((standing) => standing.name === member.name);
					if (memberStanding) {
						memberStanding.wins += parseInt(wins) || 0;
						memberStanding.losses += parseInt(losses) || 0;
						memberStanding.teams.push({
							name: matchedTeamName, // Use the normalized team name from global-var
							wins: parseInt(wins) || 0,
							losses: parseInt(losses) || 0,
							img: teamImg
						});
					}
				}
			}
			// const record = $(element).find('td').eq(2).text();
			// const runsScored = parseInt($(element).find('td').eq(7).text());
			// const diff = parseInt($(element).find('td').eq(9).text());

			// // get img src from team
			// const teamImg = $(element).find('td').eq(1).find('img').attr('src');

			// // remove leading and trailing whitespace from team name
			// const teamSanitized = team.trim();
			// // remove whitepsace from record
			// const recordSanitized = record.replace(/\s/g, '');

			// const split = recordSanitized.split('-');
			// const wins = parseInt(split[0]);
			// const losses = parseInt(split[1]);

			// // console.log(teamSanitized, wins, losses);
			// // find member that has this team

			// if (member) {
			// 	// find member in standings list
			// 	const memberStanding = standings.find((person) => person.name === member.name);
			// 	if (memberStanding) {
			// 		// add wins and losses to memberStanding
			// 		memberStanding.wins += wins;
			// 		memberStanding.losses += losses;
			// 		memberStanding.runsScored += runsScored;
			// 		memberStanding.diff += diff;
			// 		// add team to memberStanding
			// 		memberStanding.teams.push({
			// 			name: teamSanitized,
			// 			img: teamImg || '',
			// 			wins,
			// 			losses,
			// 			runsScored: runsScored,
			// 			diff: diff
			// 		});
			// 	}
			// }
		});

		// sort standings by wins, total games
		standings.sort((a, b) => b.wins - a.wins || a.wins + a.losses - (b.wins + b.losses));

		// sort each member's teams by wins, name
		standings.forEach((member) => {
			member.teams.sort((a, b) => b.wins - a.wins || a.name.localeCompare(b.name));
		});

		// calculate games behind
		standings.forEach((member, index) => {
			if (index === 0) {
				member.gamesBehind = 0;
			} else {
				const leader = standings[0];
				member.gamesBehind = leader.wins - member.wins;
			}
		});

		return { members: standings };
	});
};
