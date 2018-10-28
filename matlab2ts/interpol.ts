//	qData = interpol(orgId, orgData, qId)
//		orgId: column index
//		orgData: number of likes
//		qId: querry index (heatmap index)
//		qData: heatmap height, normalize to 1
function interpol(orgId: number[], orgData: number[], qId: number[]) {
	let qData: number[] = [];	// declear output data qData

	// Compute heatmap height at each point
	for (let i in qId) {
		let qPt: number = qId[i];	// querry point

		// Get left and right hand points
		let lh_x: number = Math.floor(qPt);
		let rh_x: number = Math.ceil(qPt);
		let lh_y: number = orgData[lh_x];
		let rh_y: number = orgData[rh_x];

		let qDataPt = mSingleInterpl(lh_x, lh_y, rh_x, rh_y, qPt); // compute heatmap height at given point
		qData[i] = qDataPt;	// assign to array
	}

	return qData; // return heatmap height list
}

// Calculate heatmap height at given point qPt using ratios
function mSingleInterpl(x1: number, y1: number, x2: number, y2: number, qPt: number){
	if (x1 == x2) {
		return y1;	// in case a int querry point
	}
	
	let qDataPt: number = y1 + (qPt - x1) * (y2 - y1) / (x2 - x1);
	
	return qDataPt;
}

let colId: number[] = [1, 2, 3, 4, 5, 6, 7, 8];							// column index
let numOfLikes: number[] = [0, 0, 10, 0, 2, 3, 0, 0];						// number of likes
// TODO: autogenerate hmId based on given interval
let hmId: number[] = [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6];	// heatmap index


document.body.innerHTML = JSON.stringify(interpol(colId, numOfLikes, hmId));