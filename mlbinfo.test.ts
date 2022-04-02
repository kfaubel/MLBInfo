
import { mlbinfo } from "./mlbinfo";

// Team tests
test("getTeamById get abbreviation BOS from team ID 111", () => {
    expect(mlbinfo.getTeamById("111")?.abbreviation).toBe("BOS");
});
test("getTeamById get abbreviation ARI from team numeric ID 109", () => {
    expect(mlbinfo.getTeamById(109)?.abbreviation).toBe("ARI");
});
test("getTeamById get abbreviation undefined from invalid team ID 000", () => {
    expect(mlbinfo.getTeamById("000")?.abbreviation).toBe(undefined);
});

test("getTeamByAbbreviation get id 119 from team abbreviation LAD", () => {
    expect(mlbinfo.getTeamByAbbreviation("LAD")?.id).toBe("119");
});

test("getTeamByAbbreviation get id undefined from team abbreviation MTL", () => {
    expect(mlbinfo.getTeamByAbbreviation("MTL")?.id).toBe(undefined);
});

// League tests
test("getLeagueByAbbreviation get id 103 from league abbreviation AL", () => {
    expect(mlbinfo.getLeagueByAbbreviation("AL")?.id).toBe("103");
});

test("getLeagueByAbbreviation get id undefine from league abbreviation XL", () => {
    expect(mlbinfo.getLeagueByAbbreviation("XL")?.id).toBe(undefined);
});

test("getLeagueById get abbreviation NL from league id 104", () => {
    expect(mlbinfo.getLeagueById("104")?.abbreviation).toBe("NL");
});

test("getLeagueById get abbreviation undefined from league id 000", () => {
    expect(mlbinfo.getLeagueById("000")?.abbreviation).toBe(undefined);
});

test("getDivisions get abbreviation undefined from league id 999", () => {
    expect(mlbinfo.getDivisionById("999")?.name).toBe(undefined);
});

test("getLeagues get array with 2 elements", () => {
    expect(mlbinfo.getLeagues()?.length).toBe(2);
});

// Division tests
test("getDivisionByAbbreviation get id 201 from converence abbreviaton E and league abbreviation AL", () => {
    expect(mlbinfo.getDivisionByAbbreviation("AL", "E")?.id).toBe("201");
});

test("getDivisionByAbbreviation get undefined from converence abbreviaton X and league abbreviation NL", () => {
    expect(mlbinfo.getDivisionByAbbreviation("NL", "X")?.id).toBe(undefined);
});

test("getDivisionByAbbreviation get undefined from converence abbreviaton E and league abbreviation YZ", () => {
    expect(mlbinfo.getDivisionByAbbreviation("YZ", "E")?.id).toBe(undefined);
});

test("getDivisionById get abbreviation NL from league id 104", () => {
    expect(mlbinfo.getDivisionById("203")?.name).toBe("NL West");
});

test("getDivisionById get abbreviation undefined from league id 999", () => {
    expect(mlbinfo.getDivisionById("999")?.name).toBe(undefined);
});

test("getDivisionsByLeague get abbreviation NL from league id 104", () => {
    expect(mlbinfo.getDivisionsByLeagueId("104")?.length).toBe(3);
});

test("getDivisionsByLeague get abbreviation undefined from league id 999", () => {
    expect(mlbinfo.getDivisionsByLeagueId("999")).toBe(undefined);
});

// Team list tests
test("getTeamsByDivision get 5 elements division id 202", () => {
    expect(mlbinfo.getTeamsByDivision("202")?.length).toBe(5);
});

test("getTeamsByDivision get array with the first object for the Atlanta Braves from Division 204", () => {
    expect(mlbinfo.getTeamsByDivision("204")?.[0].name).toBe("Atlanta Braves");
});

test("getTeamsByDivision get undefined for division id 500", () => {
    expect(mlbinfo.getTeamsByDivision("500")?.[0].name).toBe(undefined);
});

test("getTeamByVenueId get Red Sox for venueID of 3", () => {
    expect(mlbinfo.getTeamByVenueId("3")?.abbreviation).toBe("BOS");
});

// Venue tests
test("getVenueById get object with name \"Coors Field\" from venueId 19", () => {
    expect(mlbinfo.getVenueById("19")?.name).toBe("Coors Field");
});

test("getVenueByShortName get object with name \"Fenway Park\" from short name \"Fenway\"", () => {
    expect(mlbinfo.getVenueByShortName("Fenway")?.name).toBe("Fenway Park");
});