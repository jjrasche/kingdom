import { lineWidth } from "./grid";
import { getLineObjectString, getPointsInGameSpace, Hex } from "./hex";
// import { strict as assert } from 'assert';

export interface Point {
    x: number;
    y: number;
}

export interface Line {
    p1: Point;
    p2: Point;
}

/*
    how to determine if two points make a line
    - distance between 2 points = side of hex
    - 
    steps:
    1. get lines from hexes
    2. identify exterior lines by eleminating lines that have points with 3 connections

    this is producing results that are slightly off and I think the easier solution is to simply brighten a group and dim the rest
*/
export function getExteiorLines(hexGroup: Hex[]): Line[] {
    const points =  hexGroup.map(hex => getPointsInGameSpace(hex)).flat();
    const lines = hexGroup.map(hex => {
        const points = getPointsInGameSpace(hex);
        const lines = points.map((point: Point, idx: number) => {
            return {
                p1: point,
                p2: idx === (points.length - 1) ? points[0] : points[idx+1]
            } as Line;
        });
        return lines;
    }).flat();

    const groupedPoints = points.groupBy((p: Point) => JSON.stringify(p));
    const interiorPoints = Object.keys(groupedPoints)
        .filter(groupKey => groupedPoints[groupKey].length == 3)
        .map(groupKey => JSON.stringify(groupedPoints[groupKey][0]));

    const exteriorLines = lines.filter(line => !interiorPoints.includes(JSON.stringify(line.p1)) && !interiorPoints.includes(JSON.stringify(line.p2)));
    exteriorLines.forEach(line => console.log(`${getLineObjectString(line)}\n`))
    return exteriorLines;
}

export function testInteriorPoints(acutal: Line[]) {
    const expectedPoints = [
        {x: 23.094010767585033, y: 31} as Point,
        {x: 34.64101615137755, y: 31} as Point,
        {x: 40.41451884327381, y: 21} as Point,
        {x: 51.96152422706632, y: 21} as Point,
    ];
    // assert.equal(1, 1);
}

export function testExteriorLines(acutal: Line[]) {
    const expectedLines = [
        // 0,1
        { p1: {x: 0, y: 31}, p2: {x: 5.773502691896258, y: 21} } as Line,
        { p1: {x: 5.773502691896258, y: 21}, p2: {x: 17.320508075688775, y: 21} } as Line,
        { p1: {x: 17.320508075688775, y: 41}, p2: {x: 5.773502691896258, y: 41} } as Line,
        { p1: {x: 5.773502691896258, y: 41}, p2: {x: 0, y: 31} } as Line,
        // 1,1
        { p1: {x: 40.41451884327381, y: 41}, p2: {x: 34.64101615137755, y: 51} } as Line,
        { p1: {x: 34.64101615137755, y: 51}, p2: {x: 23.094010767585033, y: 51} } as Line,
        { p1: {x: 23.094010767585033, y: 51}, p2: {x: 17.320508075688775, y: 41} } as Line,
        // 2,1
        { p1: {x: 57.73502691896258, y: 31}, p2: {x: 51.96152422706632, y: 41} } as Line,
        { p1: {x: 51.96152422706632, y: 41}, p2: {x: 40.41451884327381, y: 41} } as Line,
        // 3,0
        { p1: {x: 57.735026918962575, y: 10}, p2: {x: 69.2820323027551, y: 10} } as Line,
        { p1: {x: 69.2820323027551, y: 10}, p2: {x: 75.05553499465135, y: 20} } as Line,
        { p1: {x: 75.05553499465135, y: 20}, p2: {x: 69.2820323027551, y: 30} } as Line,
        { p1: {x: 69.2820323027551, y: 30}, p2: {x: 57.735026918962575, y: 30} } as Line,
        // 2,0
        { p1: {x: 34.64101615137755, y: 10}, p2: {x: 40.41451884327381, y: 0} } as Line,
        { p1: {x: 40.41451884327381, y: 0}, p2: {x: 51.96152422706632, y: 0} } as Line,
        { p1: {x: 51.96152422706632, y: 0}, p2: {x: 57.73502691896258, y: 10} } as Line,
        // 1,0
        { p1: {x: 17.320508075688775, y: 20}, p2: {x: 23.094010767585033, y: 10} } as Line,
        { p1: {x: 23.094010767585033, y: 10}, p2: {x: 34.64101615137755, y: 10} } as Line,
    ];
    // assert.equal(1, 1);
}