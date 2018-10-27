// avgData = movavg(data, windowSize)
// 		data: original data
// 		windowSize: width of window
// 		avgData: new data after applying moving average filter

function movavg(data: number[], windowSize: number) {
	// body...
	let avgData = data;	// moveing averged data

	let endInd = data.length - windowSize - 2;  // iterate ending point
	
	for (var i = windowSize-1; i <= endInd; i++) {
		let windows: number[];	// array contain data values within window range

		// get every data value within window
		for (var j = -windowSize; j <= windowSize; j++) { 
			windows[j+windowSize] = data[i-j];
		}

		avgData[i] = mean(windows); // compute mean
	}
	return avgData;
}

function mean(list: number[]) {
	let sum:number = 0; 

	// Compute sum
	for (let i of list) {
		sum = sum + i;
	}

	// Compute and return avg
	return sum / list.length;
}