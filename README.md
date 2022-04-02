# mlbinfo
Helper package for working with Major League Baseball (MLB) leagues, divisions, teams and venues.  The statsapi.mlb.com refers to these elements by an ID they assign to each.  
Leagues are defined like this:
* 103 - American League
* 104 - American League

Divisions are defined like this:
* 201 - AL East
* ...

Teams are defined like this:
* 111 - Boston Red Sox
* 144 - Atlanta Braves
* ...

Venues are defined like this:
* 3 - Fenway Park
* 3313 - Yankee Stadium
* ...

While parsing information on statsapi.mlb.comm it is certainly possible to do calls the the following REST endpoints:
* https://statsapi.mlb.com/api/v1/league/103 - Get details for the AL
* https://statsapi.mlb.com/api/v1/divisions/201 - Get details for the AL East division
* https://statsapi.mlb.com/api/v1/teams/111 - Get details for the Boston Red Sox
* https://statsapi.mlb.com/api/v1/venues/3 - Get details for Fenway Park

This module should make that easier for static data.  It is also easy to iterate of leagues, divisions and teams without the extra calls to stasapi.mlb.com and the extra parsing.

The teams also include the local timezone so if a game between the Boston Red Sox and the Los Angeles Angels is scheduled for "2022-06-07T01:38:00Z" it is easy to map this to 9:38PM for Red Sox fans and 6:38 for Angels fans.  Similarly, each venue has a timezone property.

The teams and some venues have a set of colors associated with them.  The team colors are derived from https://teamcolorcodes.com/mlb-color-codes/.  The venue codes are a work in progress and are intended to match the colors used within a ballpark.  The colors for Fenway Park for example, use the colors of the Green Monster.

## Install

```bash
npm install mlbinfo --save
```

## Usage
Sample.ts 
```typescript
import { mlbinfo } from "mlbinfo";

const main = async () => {
    const leagues = MlbInfo.getLeagues();

    for (const league of leagues) {
        const divisions = mlbinfo.getDivisionsByLeagueId(league.id);
        if (typeof divisions === "undefined") {
            continue;
        }
        
        for (const division of divisions) {
            const teams = mlbinfo.getTeamsByDivision(division.id);
            if (typeof teams === "undefined") {
                continue;
            }
            console.log(`${league.name} ${division.name}`);
            for (const team of teams) {
                const venue = mlbinfo.getVenueById(team.venueId);
                console.log(`    ${(team.abbreviation).padEnd(5)} ${(team.name).padEnd(22)} play at ${(venue?.name)?.padEnd(28)} ${team.timeZone}`);
            }
        }
    }
};

main();
```

## Interfaces
### Team
Team object including the name, abbreviation, colors, timezone
 See:
 * BOS - https://statsapi.mlb.com/api/v1/teams/111
 * ...
```typescript
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
```
### Division
 Division object including the name, abbreviation and team list
 See:
 * AL East    - https://statsapi.mlb.com/api/v1/divisions/201
 * AL Central - https://statsapi.mlb.com/api/v1/divisions/202
 * AL West    - https://statsapi.mlb.com/api/v1/divisions/200
 * NL East    - https://statsapi.mlb.com/api/v1/divisions/204
 * NL Central - https://statsapi.mlb.com/api/v1/divisions/205
 * NL West    - https://statsapi.mlb.com/api/v1/divisions/203
 
```typescript
export interface Division {
    name: string;
    abbreviation: string;
    id: string;
    LeagueId: string;
    teams: Array<string>;
}
export declare type Divisions = Division[];
```
### Leauge
League object including the name, abbreviation and division list
See:
* https://statsapi.mlb.com/api/v1/league/103
* https://statsapi.mlb.com/api/v1/league/104
```typescript
export interface League {
    name: string;
    abbreviation: string;
    id: string;
    divisions: Array<string>;
}
export declare type Leagues = League[];

```
### Venue
Venue object including the name, and colors for a venue
See: 
* https://statsapi.mlb.com/api/v1/venues/3

E.g.: Fenway has colors for the Green Monster
```typescript
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
```
## Functions
### getTeamByAbbreviation(teamAbbreviation) 

Lookup a Team by its abbreviation

**Parameters**

**teamAbbreviation**: , Like "BOS", "LAD", "KC", ...

**Returns**: , Team element with name, colors, timezone, ...


### getTeamById(teamId) 

Lookup a Team by its statsapi id

**Parameters**

**teamId**: , Like "111" is BOS, "119" is LAD, ...

**Returns**: , Team element with name, colors, timezone, ... or undefined


### getLeagueByAbbreviation(LeagueAbbreviation) 

Lookup a League by its abbreviation

**Parameters**

**LeagueAbbreviation**: , Like "AL" or "NL"

**Returns**: , League element with name, divisions, ... or undefined


### getLeagueById(LeagueId) 

Lookup a League by its statsapi id

**Parameters**

**LeagueId**: , Like "103" is AL, "104" is NL

**Returns**: , League element with name, divisions, ... or undefined


### getDivisionByAbbreviation(divisionAbbreviation, LeagueAbbreviation) 

Lookup a Division by its abbreviation

**Parameters**

**divisionAbbreviation**: , Like "E", ...

**LeagueAbbreviation**: , Like "AL" or "NL"

**Returns**: , Division element with name, League, teams, ...  or undefined


### getDivisionById(divisionId) 

Lookup a Division by its statsapi id

**Parameters**

**divisionId**: , Like "201" is AL East, "206" is "NL West", ...

**Returns**: , Division element with name, League, teams, ... or undefined


### getLeagues() 

Get the Leagues

**Returns**: , Leagues object with name, division list


### getDivisionsByLeagueId(confId) 

Get an array of Division objects

**Parameters**

**confId**: , "103" for AL, "104" for NL

**Returns**: , Array of Division objects with name, list of teams


### getTeamsByDivision(divisionId) 

Get an array of Team objects

**Parameters**

**divisionId**: , "201" for AL East, ...

**Returns**: , Array of Team objects with name, colors, timezone, ...

### getTeamByVenueId(venueId)

Lookup a Team by the venueId

**Parameters**

**venueId**: , Like "3" is Fenway Park, ...

**Returns**: , Team object with name, colors`, ... or undefined

### getVenueById(venueId) 

Lookup a Venue by its statsapi id

**Parameters**

**venueId**: , Like "3" is Fenway Park, ...

**Returns**: , Venue objectwith name, colors`, ... or undefined


### getVenueByShortName(venueShortName) 

Lookup a Venue by its short name

**Parameters**

**venueShortName**: , Like "Fenway", "Petco", "Citi", ...

**Returns**: , Venue objectwith name, colors`, ... or undefined
