import { mlbinfo } from "./mlbinfo";

const main = () => {
    let teamsCount = 0;

    const leagues = mlbinfo.getLeagues();

    for (const league of leagues) {
        const divisions = mlbinfo.getDivisionsByLeagueId(league.id);
        if (typeof divisions === "undefined") {
            console.error(`No divsions for leauge ${league.name}`);
            continue;
        }
        
        for (const division of divisions) {
            const teams = mlbinfo.getTeamsByDivision(division.id);
            if (typeof teams === "undefined") {
                console.error(`No teams for division ${division.name}`);
                continue;
            }
            console.log(`${league.name} ${division.name}`);
            for (const team of teams) {
                teamsCount++;
                const venue = mlbinfo.getVenueById(team.venueId);
                console.log(`    ${(team.abbreviation).padEnd(5)} ${(team.name).padEnd(22)} play at ${(venue?.name)?.padEnd(28)} ${team.timeZone}`);
            }
        }
    }

    process.exit(teamsCount === 30 ? 0 : 1);
};

main();
