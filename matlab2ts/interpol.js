//	qData = interpol(orgId, orgData, qId)
//		orgId: column index
//		orgData: number of likes
//		qId: querry index (heatmap index)
//		qData: heatmap height, normalize to 1
function interpol(orgId, orgData, qId) {
    var qData = []; // declear output data qData
    // Compute heatmap height at each point
    for (var i in orgId) {
        var qPt = qId[i]; // querry point
        // Get left and right hand points
        var lh_x = Math.floor(qPt);
        var rh_x = Math.ceil(qPt);
        var lh_y = orgData[lh_x];
        var rh_y = orgData[rh_x];
        var qDataPt = mSingleInterpl(lh_x, lh_y, rh_x, rh_y, qPt); // compute heatmap height at given point
        qData[i] = qDataPt; // assign to array
    }
    return qData; // return heatmap height list
}
// Calculate heatmap height at given point qPt using ratios
function mSingleInterpl(x1, y1, x2, y2, qPt) {
    if (x1 == x2) {
        return y1;
    }
    var qDataPt = y1 + (qPt - x1) * (y2 - y1) / (x2 - x1);
    return qDataPt;
}
var colId = [1, 2, 3, 4, 5, 6]; // column index
var numOfLikes = [0, 0, 10, 0, 2, 3]; // number of likes
var hmId = [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6]; // heatmap index
document.body.innerHTML = JSON.stringify(interpol(colId, numOfLikes, hmId));
