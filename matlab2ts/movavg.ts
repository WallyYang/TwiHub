// avgData = movavg(data, windowSize)
// 		data: original data
// 		windowSize: width of window
// 		avgData: new data after applying moving average filter

function movavg(data: number[], windowSize: number) {
	// body...
	let avgData: number[] = data;	// moveing averged data

	let endInd = data.length - windowSize - 2;  // iterate ending point

	let windows: number[] = [];
	
	for (var i = windowSize; i < endInd; i++) {
		windows = getDataSeg(data, i, windowSize);
		avgData[i - windowSize] = mean(windows); // compute mean
	}
	return avgData;
}

// getDataSeg: get segment of data with middle point x[n] and segment length
function getDataSeg(data: number[], midPt: number, N: number) {
	let dataSeg: number[] = [];
	let i_length = 2*N + 1;
	// get all data within midPt-N to midPt+N
	for (var i = 0; i < i_length; i++) {
		let id = midPt -N +i;
		dataSeg[i] = data[id];
		// console.log(id);
	}

	return dataSeg;
}

function mean(list: number[]) {
	let sum:number = 0; 

	// Compute sum
	for (let i of list) {
		sum = sum + i;
	}
	console.log(list.length);
	// Compute and return avg
	return sum / list.length;
}

let data = [0,1,2,3,4,5,6,6,6,5,4,3,2,1,0,0,0];
let N = 3;

let testOutput: number[] = movavg(data, N);
document.body.innerHTML = JSON.stringify(testOutput);
// document.body.innerHTML = JSON.stringify(testOutput.length);