export class Standings {
	members: MemberStanding[] = [];
}

export class MemberStanding {
	name = '';
	wins = 0;
	losses = 0;
	ties = 0;
	teams: Team[] = [];
	gamesBehind = 0;
	collapsed = true;

	constructor(name: string) {
		this.name = name;
	}
}

export class Team {
	name = '';
	wins = 0;
	losses = 0;
	ties = 0;
	img = '';
}
