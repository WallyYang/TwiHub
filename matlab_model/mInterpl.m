function [qData] = mInterpl(orgId,orgData, qId)
%mInterpl interpolation computation using semi-spline method
%   [qData] = mInterpl(orgId,orgData, qId)
    qData(1:length(qId)) = 0;
    
for i = 1:length(qId)
    % get querry pt (single)
    qPt = qId(i);
    % LH and RH pts
    lh_x = floor(qPt);  % x1
    rh_x = ceil(qPt);   % x2
%     lh_y = orgData(orgId==lh_x);    % y1
%     rh_y = orgData(orgId==rh_x);    % y2
    lh_y = orgData(lh_x);    % y1
    rh_y = orgData(rh_x);    % y2
    % Interpol to get data val at given pt
    qDataPt = mSingleInterpl(lh_x, lh_y, rh_x, rh_y, qPt);
    qData(i) = qDataPt;
end


end

