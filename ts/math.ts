'use strict';

function singleInterpolation(x1: number, y1: number, x2: number, y2: number, x: number): number {
    if (x1 == x2) {
        return y1;
    }

    return y1 + (x - x1) * (y2 - y1) / (x2 - x1);
}

function interpolation(points: [number, number][]): number[] {
    const result = [];

    for (let i = 0; i < points.length - 1; i += 1) {
        for (let j = points[i][0]; j < points[i + 1][0]; j += 1) {
            result.push(singleInterpolation(points[i][0], points[i][1], points[i + 1][0], points[i + 1][1], j));
        }
    }

    return result;
}

function movingAverage(data: number[], windowSize: number): number[] {
    const result = [];
    let sum = 0;

    for (let i = -windowSize; i < data.length; i += 1) {
        sum += data[i + windowSize] || 0;
        sum -= data[i - windowSize] || 0;

        if (i >= 0) {
            result.push(sum / (2 * windowSize));
        }
    }

    return result;
}

function normalize(data: number[]): number[] {
    const result = [];
    let max = 0;

    for (let i = 0; i < data.length; i += 1) {
        max = Math.max(max, data[i]);
    }

    for (let i = 0; i < data.length; i += 1) {
        result.push(data[i] / max);
    }

    return result;
}

function colorInterpolation(y: number): [number, number, number] {
    const colors = [
        [235, 237, 240],
        [198, 228, 139],
        [123, 201, 111],
        [35, 154, 59],
        [25, 97, 39],
    ];

    if (y < 0.1) {
        return [
            singleInterpolation(0, colors[0][0], 0.1, colors[1][0], y),
            singleInterpolation(0, colors[0][1], 0.1, colors[1][1], y),
            singleInterpolation(0, colors[0][2], 0.1, colors[1][2], y),
        ];
    } else if (y < 0.5) {
        return [
            singleInterpolation(0.1, colors[1][0], 0.4, colors[2][0], y),
            singleInterpolation(0.1, colors[1][1], 0.4, colors[2][1], y),
            singleInterpolation(0.1, colors[1][2], 0.4, colors[2][2], y),
        ];
    } else if (y < 0.9) {
        return [
            singleInterpolation(0.4, colors[2][0], 0.7, colors[3][0], y),
            singleInterpolation(0.4, colors[2][1], 0.7, colors[3][1], y),
            singleInterpolation(0.4, colors[2][2], 0.7, colors[3][2], y),
        ];
    } else {
        return [
            singleInterpolation(0.7, colors[3][0], 1, colors[4][0], y),
            singleInterpolation(0.7, colors[3][1], 1, colors[4][1], y),
            singleInterpolation(0.7, colors[3][2], 1, colors[4][2], y),
        ];
    }
}
