/**
 * Team object including the name, abbreviation, colors, timezone
 * See: 
 * * BOS - https://statsapi.mlb.com/api/v1/teams/111
 * * ...
 */
export interface Team {
    id: string;
    name: string;
    franchiseName: string;                  // "Boston", "Arizona", ...
    clubName: string;                       // "Red Sox", "Diamondbacks", ...
    abbreviation: string;
    LeagueId: string;
    divisionId: string;
    backgroundColor: string;
    accentColor: string;
    textColor: string;
    redirect?: string;
    timeZone: string;
    venueId: string;
}

export type Teams = Team[];

/**
 * Division object including the name, abbreviation and team list
 * See: 
 * * AL East    - https://statsapi.mlb.com/api/v1/divisions/201
 * * AL Central - https://statsapi.mlb.com/api/v1/divisions/202
 * * AL West    - https://statsapi.mlb.com/api/v1/divisions/200
 * * NL East    - https://statsapi.mlb.com/api/v1/divisions/204
 * * NL Central - https://statsapi.mlb.com/api/v1/divisions/205
 * * NL West    - https://statsapi.mlb.com/api/v1/divisions/203
 * 
 */
export interface Division {
    name: string;
    abbreviation: string;
    id: string;
    LeagueId: string;
    teams: Array<string>;
}

export type Divisions = Division[];

/**
 * League object including the name, abbreviation and division list
 * See: 
 * * https://statsapi.mlb.com/api/v1/league/103
 * * https://statsapi.mlb.com/api/v1/league/104
 */
export interface League {
    name: string;
    abbreviation: string;
    id: string;
    divisions: Array<string>;
}

export type Leagues = League[];

/**
 * Venue object including the name, and colors for a venue
 * * E.g.: Fenway has colors for the Green Monster
 */
export interface Venue {
    id: string;
    shortName: string;
    name: string;
    backgroundColor: string;
    backgroundColor2: string;
    accentColor: string;
    textColor: string;
    timeZone: string;
}

export type Venues = Venue[];

/**
 * Lookup a Team by its abbreviation
 * @param teamAbbreviation Like "BOS", "LAD", "KC", ...
 * @returns Team element with name, colors, timezone, ...
 */
const getTeamByAbbreviation = (teamAbbreviation: string): Team | undefined => {
    return teamsTable.find((team: Team) => {return team.abbreviation === teamAbbreviation;});
};

/**
 * Lookup a Team by its statsapi id
 * @param teamId Like "111" is BOS, "119" is LAD, ...
 * @returns Team element with name, colors, timezone, ... or undefined
 */
const getTeamById = (teamId: string | number): Team | undefined => {
    return teamsTable.find((team: Team) => {return team.id === teamId + "";});
};

/**
 * Lookup a League by its abbreviation
 * @param LeagueAbbreviation Like "AL" or "NL"
 * @returns League element with name, divisions, ... or undefined
 */
const getLeagueByAbbreviation = (LeagueAbbreviation: string): League | undefined => {
    return LeagueIdTable.find((League: League) => {return League.abbreviation === LeagueAbbreviation;});
};

/**
 * Lookup a League by its statsapi id
 * @param LeagueId Like "103" is AL, "104" is NL
 * @returns League element with name, divisions, ... or undefined
 */
const getLeagueById = (LeagueId: string | number): League | undefined => {
    return LeagueIdTable.find((League: League) => {return League.id === LeagueId + "";});
};

/**
 * Lookup a Division by its abbreviation
 * @param divisionAbbreviation Like "E", ...
 * @param LeagueAbbreviation Like "AL" or "NL"
 * @returns Division element with name, League, teams, ...  or undefined
 */
const getDivisionByAbbreviation = (LeagueAbbreviation: string, divisionAbbreviation: string): Division | undefined => {
    const  league = LeagueIdTable.find((League: League) => {return League.abbreviation === LeagueAbbreviation;});

    if (typeof league === "undefined")
        return undefined;

    return divisionIdTable.find((division: Division) => {
        return division.abbreviation === divisionAbbreviation && division.LeagueId === league.id;
    });
};

/**
 * Lookup a Division by its statsapi id
 * @param divisionId Like "201" is AL East, "206" is "NL West", ...
 * @returns Division element with name, League, teams, ... or undefined
 */
const getDivisionById = (divisionId: string | number): Division | undefined => {
    return divisionIdTable.find((division: Division) => {return division.id === divisionId + "";});
};

/**
 * Get the Leagues
 * @returns Leagues object with name, division list
 */
const getLeagues = (): Leagues => {
    return LeagueIdTable;
};

/**
 * Get an array of Division objects
 * @param leagueId "103" for AL, "104" for NL
 * @returns Array of Division objects with name, list of teams
 */
const getDivisionsByLeagueId = (leagueId: string): Divisions | undefined => {
    const divisions: Divisions = [];

    for (const division of divisionIdTable) { 
        if (division.LeagueId === leagueId) {
            divisions.push(division);
        }
    }

    if (divisions.length === 0) {
        return undefined;
    }

    return divisions;
};

/**
 * Get an array of Team objects
 * @param divisionId "201" for AL East, ...
 * @returns Array of Team objects with name, colors, timezone, ...
 */
const getTeamsByDivision = (divisionId: string): Teams | undefined => {
    const teams: Teams = [];

    for (const team of teamsTable) { 
        if (team.divisionId === divisionId) {
            teams.push(team);
        }
    }

    if (teams.length === 0) {
        return undefined;
    }

    return teams;
};

/**
 * Lookup a Venue by its statsapi id
 * @param venueId Like "3" is Fenway Park, ...
 * @returns Venue objectwith name, colors`, ... or undefined
 */
const getVenueById = (venueId: string | number): Venue | undefined => {
    return venueTable.find((venue: Venue) => {return venue.id === venueId + "";});
};

/**
 * Lookup a Venue by its short name
 * @param venueShortName Like "Fenway", "Petco", "Citi", ...
 * @returns Venue objectwith name, colors`, ... or undefined
 */
const getVenueByShortName = (venueShortName: string): Venue | undefined => {
    return venueTable.find((venue: Venue) => {return venue.shortName === venueShortName;});
};


export const mlbinfo = {
    getTeamByAbbreviation,
    getTeamById,
    getLeagueByAbbreviation,
    getLeagueById,
    getDivisionByAbbreviation,
    getDivisionById,
    getLeagues,
    getDivisionsByLeagueId,
    getTeamsByDivision,
    getVenueById,
    getVenueByShortName,
};

const LeagueIdTable: Leagues = [
    {
        name: "American League",
        abbreviation: "AL",
        id: "103",
        divisions: ["201", "202", "200"]
    },
    {
        name: "National League",
        abbreviation: "NL",
        id: "104",
        divisions: ["204", "205", "203"]
    }
];

const divisionIdTable: Divisions = [
    {
        name: "AL East",
        abbreviation: "E",
        id: "201",
        LeagueId: "103",
        teams: ["111", "110", "147", "141", "139"]
    },
    {
        name: "AL Central",
        abbreviation: "C",
        id: "202",
        LeagueId: "103",
        teams: ["114", "145", "142", "118", "116"]
    },
    {
        name: "AL West",
        abbreviation: "W",
        id: "200",
        LeagueId: "103",
        teams: ["108", "136", "133", "117", "140"]
    },
    {
        name: "NL East",
        abbreviation: "E",
        id: "204",
        LeagueId: "104",
        teams: ["121", "143", "144", "146", "120"] 
    },
    {
        name: "NL Central",
        abbreviation: "C",
        id: "205",
        LeagueId: "104",
        teams: ["112", "158", "113", "138", "134"]
    },
    {
        name: "NL West",
        abbreviation: "W",
        id: "203",
        LeagueId: "104",
        teams: ["119", "137", "145", "115", "109"]
    }
];

const teamsTable: Teams = [
    {
        id: "109",
        name: "Arizona Diamondbacks",
        clubName: "",
        franchiseName: "Arizona",
        abbreviation: "ARI",
        LeagueId: "104",
        divisionId: "203",
        backgroundColor: "#A71930",
        accentColor: "#E3D4AD",
        textColor: "#FFFFFF",
        timeZone: "America/Los_Angeles",
        venueId: "15"
    },
    {
        id: "144",
        name: "Atlanta Braves",
        abbreviation: "ATL",
        franchiseName: "Atlanta",
        clubName: "Braves",
        LeagueId: "104",
        divisionId: "204",
        backgroundColor: "#13274F",
        accentColor: "#CE1141",
        textColor: "#FFFFFF",
        timeZone: "America/New_York",
        venueId: "4705"
    },
    {
        id: "110",
        name: "Baltimore Orioles",
        abbreviation: "BAL",
        franchiseName: "Baltimore",
        clubName: "Orioles",
        LeagueId: "103",
        divisionId: "201",
        backgroundColor: "#DF4601",
        accentColor: "#000000",
        textColor: "#FFFFFF",
        timeZone: "America/New_York",
        venueId: "2"
    },
    {
        id: "111",
        name: "Boston Red Sox",
        abbreviation: "BOS",
        franchiseName: "Boston",
        clubName: "Red Sox",
        LeagueId: "103",
        divisionId: "201",
        backgroundColor: "#BD3039",
        accentColor: "#0C2340",
        textColor: "#FFFFFF",
        timeZone: "America/New_York",
        venueId: "3"
    },
    {
        id: "112",
        name: "Chicago Cubs",
        abbreviation: "CHC",
        franchiseName: "Chicago",
        clubName: "Cubs",
        LeagueId: "104",
        divisionId: "205",
        backgroundColor: "#0E3386",
        accentColor: "#CC3433",
        textColor: "#FFFFFF",
        timeZone: "America/Chicago",
        venueId: "17"
    },
    {
        id: "145",
        name: "Chicago White Sox",
        abbreviation: "CWS",
        franchiseName: "Chicago",
        clubName: "White Sox",
        LeagueId: "103",
        divisionId: "202",
        backgroundColor: "#27251F",
        accentColor: "#C4CED4",
        textColor: "#FFFFFF",
        timeZone: "America/Chicago",
        venueId: "4"
    },
    {
        id: "113",
        name: "Cincinnati Reds",
        abbreviation: "CIN",
        franchiseName: "Cincinnati",
        clubName: "Reds",
        LeagueId: "104",
        divisionId: "205",
        backgroundColor: "#C6011F",
        accentColor: "#000000",
        textColor: "#FFFFFF",
        timeZone: "America/New_York",
        venueId: "2602"
    },
    {
        id: "115",
        name: "Colorado Rockies",
        abbreviation: "COL",
        franchiseName: "Colorado",
        clubName: "Rockies",
        LeagueId: "104",
        divisionId: "203",
        backgroundColor: "#33006F",
        accentColor: "#C4CED4",
        textColor: "#C4CED4",
        timeZone: "America/Denver",
        venueId: "19"
    },
    {
        id: "114",
        name: "Cleveland Guardians",
        abbreviation: "CLE",
        franchiseName: "Cleveland",
        clubName: "Guardians",
        LeagueId: "103",
        divisionId: "202",
        backgroundColor: "#0C2340",
        accentColor: "#E31937",
        textColor: "#FFFFFF",
        timeZone: "America/New_York",
        venueId: "5"
    },
    {
        id: "116",
        name: "Detroit Tigers",
        abbreviation: "DET",
        franchiseName: "Detroit",
        clubName: "Tigers",
        LeagueId: "103",
        divisionId: "202",
        backgroundColor: "#0C2340",
        accentColor: "#FA4616",
        textColor: "#FFFFFF",
        timeZone: "America/Chicago",
        venueId: "2394"
    },
    {
        id: "117",
        name: "Houston Astros",
        abbreviation: "HOU",
        franchiseName: "Houston",
        clubName: "Astros",
        LeagueId: "103",
        divisionId: "200",
        backgroundColor: "#002D62",
        accentColor: "#EB6E1F",
        textColor: "#FFFFFF",
        timeZone: "America/Chicago",
        venueId: "2392"
    },
    {
        id: "118",
        name: "Kansas City Royals",
        abbreviation: "KC",
        franchiseName: "Kansas City",
        clubName: "Royals",
        LeagueId: "103",
        divisionId: "202",
        backgroundColor: "#004687",
        accentColor: "#BD9B60",
        textColor: "#FFFFFF",
        timeZone: "America/Chicago",
        venueId: "7"
    },
    {
        id: "108",
        name: "Los Angeles Angels",
        abbreviation: "LAA",
        franchiseName: "Anaheim",
        clubName: "Angels",
        LeagueId: "103",
        divisionId: "200",
        backgroundColor: "#BA0021",
        accentColor: "#003263",
        textColor: "#C4CED4",
        timeZone: "America/Los_Angeles",
        venueId: "1"
    },
    {
        id: "119",
        name: "Los Angeles Dodgers",
        abbreviation: "LAD",
        franchiseName: "Los Angeles",
        clubName: "Dodgers",
        LeagueId: "104",
        divisionId: "203",
        backgroundColor: "#005A9C",
        accentColor: "#EF3E42",
        textColor: "#FFFFFF",
        timeZone: "America/Los_Angeles",
        venueId: "22"
    },
    {
        id: "146",
        name: "Miami Marlins",
        abbreviation: "MIA",
        franchiseName: "Miami",
        clubName: "Marlins",
        LeagueId: "104",
        divisionId: "204",
        backgroundColor: "#000000",
        accentColor: "#00A3E0",
        textColor: "#FFFFFF",
        timeZone: "America/New_York",
        venueId: "4169"
    },
    {
        id: "158",
        name: "Milwaukee Brewers",
        abbreviation: "MIL",
        franchiseName: "Milwaukee",
        clubName: "Brewers",
        LeagueId: "104",
        divisionId: "205",
        backgroundColor: "#12284B",
        accentColor: "#FFC52F",
        textColor: "#FFFFFF",
        timeZone: "America/Chicago",
        venueId: "32"
    },
    {
        id: "142",
        name: "Minnesota Twins",
        abbreviation: "MIN",
        franchiseName: "Minnesota",
        clubName: "Twins",
        LeagueId: "103",
        divisionId: "202",
        backgroundColor: "#002B5C",
        accentColor: "#D31145",
        textColor: "#FFFFFF",
        timeZone: "America/Chicago",
        venueId: "3312"
    },
    {
        id: "121",
        name: "New York Mets",
        abbreviation: "NYM",
        franchiseName: "New York",
        clubName: "Mets",
        LeagueId: "104",
        divisionId: "204",
        backgroundColor: "#002D72",
        accentColor: "#FF5910",
        textColor: "#FFFFFF",
        timeZone: "America/New_York",
        venueId: "3289"
    },
    {
        id: "147",
        name: "New York Yankees",
        abbreviation: "NYY",
        franchiseName: "New York",
        clubName: "Yankees",
        LeagueId: "103",
        divisionId: "201",
        backgroundColor: "#003087",
        accentColor: "#E4002C",
        textColor: "#FFFFFF",
        timeZone: "America/New_York",
        venueId: "3313"
    },
    {
        id: "133",
        name: "Oakland Athletics",
        abbreviation: "OAK",
        franchiseName: "Oakland",
        clubName: "Athletics",
        LeagueId: "103",
        divisionId: "200",
        backgroundColor: "#003831",
        accentColor: "#EFB21E",
        textColor: "#FFFFFF",
        timeZone: "America/Los_Angeles",
        venueId: "10"
    },
    {
        id: "143",
        name: "Philadelphia Phillies",
        abbreviation: "PHI",
        franchiseName: "Philadelphia",
        clubName: "Phillies",
        LeagueId: "104",
        divisionId: "204",
        backgroundColor: "#E81828",
        accentColor: "#002D72",
        textColor: "#FFFFFF",
        timeZone: "America/New_York",
        venueId: "2681"
    },
    {
        id: "134",
        name: "Pittsburgh Pirates",
        abbreviation: "PIT",
        franchiseName: "Pittsburgh",
        clubName: "Pirates",
        LeagueId: "104",
        divisionId: "205",
        backgroundColor: "#27251F",
        accentColor: "#FDB827",
        textColor: "#FFFFFF",
        timeZone: "America/New_York",
        venueId: "31"
    },
    {
        id: "135",
        name: "San Diego Padres",
        abbreviation: "SD",
        franchiseName: "San Diego",
        clubName: "Padres",
        LeagueId: "104",
        divisionId: "203",
        backgroundColor: "#2F241D",
        accentColor: "#FFC425",
        textColor: "#FFFFFF",
        timeZone: "America/Los_Angeles",
        venueId: "2680"
    },
    {
        id: "137",
        name: "San Francisco Giants",
        abbreviation: "SF",
        franchiseName: "San Francisco",
        clubName: "Giants",
        LeagueId: "104",
        divisionId: "203",
        backgroundColor: "#FD5A1E",
        accentColor: "#27251F",
        textColor: "#FFFFFF",
        timeZone: "America/Los_Angeles",
        venueId: "2395"
    },
    {
        id: "136",
        name: "Seattle Mariners",
        abbreviation: "SEA",
        franchiseName: "Seattle",
        clubName: "Mariners",
        LeagueId: "103",
        divisionId: "200",
        backgroundColor: "#0C2C56",
        accentColor: "#005C5C",
        textColor: "#C4CED4",
        timeZone: "America/Los_Angeles",
        venueId: "680"
    },
    {
        id: "138",
        name: "St Louis Cardinals",
        abbreviation: "STL",
        franchiseName: "St Louis",
        clubName: "Cardinals",
        LeagueId: "104",
        divisionId: "205",
        backgroundColor: "#C41E3A",
        accentColor: "#FEDB00",
        textColor: "#FFFFFF",
        timeZone: "America/Chicago",
        venueId: "2889"
    },
    {
        id: "139",
        name: "Tampa Bay Rays",
        abbreviation: "TB",
        franchiseName: "Tampa Bay",
        clubName: "Rays",
        LeagueId: "103",
        divisionId: "201",
        backgroundColor: "#092C5C",
        accentColor: "#8FBCE6",
        textColor: "#F5D130",
        timeZone: "America/New_York",
        venueId: "12"
    },
    {
        id: "140",
        name: "Texas Rangers",
        abbreviation: "TEX",
        franchiseName: "Texas",
        clubName: "Rangers",
        LeagueId: "103",
        divisionId: "200",
        backgroundColor: "#003278",
        accentColor: "#C0111F",
        textColor: "#FFFFFF",
        timeZone: "America/Chicago",
        venueId: "5325"
    },
    {
        id: "141",
        name: "Toronto Blue Jays",
        abbreviation: "TOR",
        franchiseName: "Toronto",
        clubName: "Blue Jays",
        LeagueId: "103",
        divisionId: "201",
        backgroundColor: "#134A8E",
        accentColor: "#E8291C",
        textColor: "#FFFFFF",
        timeZone: "America/New_York",
        venueId: "14"
    },
    {
        id: "120",
        name: "Washington Nationals",
        abbreviation: "WSH",
        franchiseName: "Washington",
        clubName: "Nationals",
        LeagueId: "104",
        divisionId: "204",
        backgroundColor: "#AB0003",
        accentColor: "#14225A",
        textColor: "#FFFFFF",
        timeZone: "America/New_York",
        venueId: "3309"
    }
];

const venueTable: Venues = [
    {
        id: "2",
        shortName: "",
        name: "Oriole Park at Camden Yards",
        backgroundColor: "#0066DD",
        backgroundColor2: "#004D99",
        accentColor: "#E0E0E0",
        textColor: "#E0E0E0",
        timeZone: "America/New_York"
    },
    {
        id: "3",
        shortName: "Fenway",
        name: "Fenway Park",
        backgroundColor: "#54796D",
        backgroundColor2: "#44655D",
        accentColor: "#E0E0E0",
        textColor: "#E0E0E0",
        timeZone: "America/New_York"
    },
    {
        id: "3313",
        shortName: "",
        name: "Yankee Stadium",
        backgroundColor: "#0066DD",
        backgroundColor2: "#004D99",
        accentColor: "#E0E0E0",
        textColor: "#E0E0E0",
        timeZone: "America/New_York"
    },
    {
        id: "12",
        shortName: "",
        name: "Tropicana Field",
        backgroundColor: "#0066DD",
        backgroundColor2: "#004D99",
        accentColor: "#E0E0E0",
        textColor: "#E0E0E0",
        timeZone: "America/New_York"
    },
    {
        id: "14",
        shortName: "",
        name: "Rogers Centre",
        backgroundColor: "#0066DD",
        backgroundColor2: "#004D99",
        accentColor: "#E0E0E0",
        textColor: "#E0E0E0",
        timeZone: "America/New_York"
    },
    {
        id: "4",
        shortName: "",
        name: "Guaranteed Rate Field",
        backgroundColor: "#0066DD",
        backgroundColor2: "#004D99",
        accentColor: "#E0E0E0",
        textColor: "#E0E0E0",
        timeZone: "America/Chicago"
    },
    {
        id: "5",
        shortName: "",
        name: "Progressive Field",
        backgroundColor: "#0066DD",
        backgroundColor2: "#004D99",
        accentColor: "#E0E0E0",
        textColor: "#E0E0E0",
        timeZone: "America/New_York"
    },
    {
        id: "2394",
        shortName: "",
        name: "Comerica Park",
        backgroundColor: "#0066DD",
        backgroundColor2: "#004D99",
        accentColor: "#E0E0E0",
        textColor: "#E0E0E0",
        timeZone: "America/Chicago"
    },
    {
        id: "7",
        shortName: "",
        name: "Kauffman Stadium",
        backgroundColor: "#0066DD",
        backgroundColor2: "#004D99",
        accentColor: "#E0E0E0",
        textColor: "#E0E0E0",
        timeZone: "America/Chicago"
    },
    {
        id: "3312",
        shortName: "",
        name: "Target Field",
        backgroundColor: "#0066DD",
        backgroundColor2: "#004D99",
        accentColor: "#E0E0E0",
        textColor: "#E0E0E0",
        timeZone: "America/Chicago"
    },
    {
        id: "2392",
        shortName: "",
        name: "Minute Maid Park",
        backgroundColor: "#0066DD",
        backgroundColor2: "#004D99",
        accentColor: "#E0E0E0",
        textColor: "#E0E0E0",
        timeZone: "America/Chicago"
    },
    {
        id: "1",
        shortName: "",
        name: "Angel Stadium",
        backgroundColor: "#0066DD",
        backgroundColor2: "#004D99",
        accentColor: "#E0E0E0",
        textColor: "#E0E0E0",
        timeZone: "America/Los_Angeles"
    },
    {
        id: "10",
        shortName: "",
        name: "Oakland Coliseum",
        backgroundColor: "#0066DD",
        backgroundColor2: "#004D99",
        accentColor: "#E0E0E0",
        textColor: "#E0E0E0",
        timeZone: "America/Los_Angeles"
    },
    {
        id: "680",
        shortName: "",
        name: "T-Mobile Park",
        backgroundColor: "#0066DD",
        backgroundColor2: "#004D99",
        accentColor: "#E0E0E0",
        textColor: "#E0E0E0",
        timeZone: "America/Los_Angeles"
    },
    {
        id: "5325",
        shortName: "",
        name: "Globe Life Field",
        backgroundColor: "#0066DD",
        backgroundColor2: "#004D99",
        accentColor: "#E0E0E0",
        textColor: "#E0E0E0",
        timeZone: "America/Los_Angeles"
    },
    {
        id: "4705",
        shortName: "",
        name: "Truist Park",
        backgroundColor: "#0066DD",
        backgroundColor2: "#004D99",
        accentColor: "#E0E0E0",
        textColor: "#E0E0E0",
        timeZone: "America/New_York"
    },
    {
        id: "4169",
        shortName: "",
        name: "loanDepot park",
        backgroundColor: "#0066DD",
        backgroundColor2: "#004D99",
        accentColor: "#E0E0E0",
        textColor: "#E0E0E0",
        timeZone: "America/New_York"
    },
    {
        id: "3289",
        shortName: "",
        name: "Citi Field",
        backgroundColor: "#0066DD",
        backgroundColor2: "#004D99",
        accentColor: "#E0E0E0",
        textColor: "#E0E0E0",
        timeZone: "America/New_York"
    },
    {
        id: "2681",
        shortName: "",
        name: "Citizens Bank Park",
        backgroundColor: "#0066DD",
        backgroundColor2: "#004D99",
        accentColor: "#E0E0E0",
        textColor: "#E0E0E0",
        timeZone: "America/New_York"
    },
    {
        id: "3309",
        shortName: "",
        name: "Nationals Park",
        backgroundColor: "#0066DD",
        backgroundColor2: "#004D99",
        accentColor: "#E0E0E0",
        textColor: "#E0E0E0",
        timeZone: "America/New_York"
    },
    {
        id: "17",
        shortName: "",
        name: "Wrigley Field",
        backgroundColor: "#0066DD",
        backgroundColor2: "#004D99",
        accentColor: "#E0E0E0",
        textColor: "#E0E0E0",
        timeZone: "America/Chicago"
    },
    {
        id: "2602",
        shortName: "",
        name: "Great American Ball Park",
        backgroundColor: "#0066DD",
        backgroundColor2: "#004D99",
        accentColor: "#E0E0E0",
        textColor: "#E0E0E0",
        timeZone: "America/New_York"
    },
    {
        id: "32",
        shortName: "",
        name: "American Family Field",
        backgroundColor: "#0066DD",
        backgroundColor2: "#004D99",
        accentColor: "#E0E0E0",
        textColor: "#E0E0E0",
        timeZone: "America/Chicago"
    },
    {
        id: "31",
        shortName: "",
        name: "PNC Park",
        backgroundColor: "#0066DD",
        backgroundColor2: "#004D99",
        accentColor: "#E0E0E0",
        textColor: "#E0E0E0",
        timeZone: "America/New_York"
    },
    {
        id: "2889",
        shortName: "",
        name: "Busch Stadium",
        backgroundColor: "#0066DD",
        backgroundColor2: "#004D99",
        accentColor: "#E0E0E0",
        textColor: "#E0E0E0",
        timeZone: "America/Chicago"
    },
    {
        id: "15",
        shortName: "",
        name: "Chase Field",
        backgroundColor: "#0066DD",
        backgroundColor2: "#004D99",
        accentColor: "#E0E0E0",
        textColor: "#E0E0E0",
        timeZone: "America/Los_Angeles"
    },
    {
        id: "19",
        shortName: "",
        name: "Coors Field",
        backgroundColor: "#0066DD",
        backgroundColor2: "#004D99",
        accentColor: "#E0E0E0",
        textColor: "#E0E0E0",
        timeZone: "America/Denver"
    },
    {
        id: "22",
        shortName: "",
        name: "Dodger Stadium",
        backgroundColor: "#0066DD",
        backgroundColor2: "#004D99",
        accentColor: "#E0E0E0",
        textColor: "#E0E0E0",
        timeZone: "America/Los_Angeles"
    },
    {
        id: "2680",
        shortName: "",
        name: "Petco Park",
        backgroundColor: "#0066DD",
        backgroundColor2: "#004D99",
        accentColor: "#E0E0E0",
        textColor: "#E0E0E0",
        timeZone: "America/Los_Angeles"
    },
    {
        id: "2395",
        shortName: "",
        name: "Oracle Park",
        backgroundColor: "#0066DD",
        backgroundColor2: "#004D99",
        accentColor: "#E0E0E0",
        textColor: "#E0E0E0",
        timeZone: "America/Los_Angeles"
    }
];