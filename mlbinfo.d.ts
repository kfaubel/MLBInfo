/**
 * Team object including the name, abbreviation, colors, timezone
 * See:
 * * BOS - https://statsapi.mlb.com/api/v1/teams/111
 * * ...
 */
export interface Team {
    id: string;
    name: string;
    franchiseName: string;
    clubName: string;
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
export declare type Teams = Team[];
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
export declare type Divisions = Division[];
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
export declare type Leagues = League[];
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
export declare type Venues = Venue[];
export declare const mlbinfo: {
    getTeamByAbbreviation: (teamAbbreviation: string) => Team | undefined;
    getTeamById: (teamId: string | number) => Team | undefined;
    getLeagueByAbbreviation: (LeagueAbbreviation: string) => League | undefined;
    getLeagueById: (LeagueId: string | number) => League | undefined;
    getDivisionByAbbreviation: (LeagueAbbreviation: string, divisionAbbreviation: string) => Division | undefined;
    getDivisionById: (divisionId: string | number) => Division | undefined;
    getLeagues: () => Leagues;
    getDivisionsByLeagueId: (leagueId: string) => Divisions | undefined;
    getTeamsByDivision: (divisionId: string) => Teams | undefined;
    getVenueById: (venueId: string | number) => Venue | undefined;
    getVenueByShortName: (venueShortName: string) => Venue | undefined;
};
