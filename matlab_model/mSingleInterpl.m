function [qDataPt] = mSingleInterpl(x1, y1, x2, y2 , qPt)
%mSingleInterpl linear interpolation computation at SINGLE Point
%   [qData] = mSingleInterpl(orgId,orgData, qId)
if x1 == x2
    qDataPt = y1;
else
    qDataPt = y1 + (qPt - x1)*(y2 - y1) / (x2 - x1);
end
end

