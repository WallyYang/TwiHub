function [qData] = mSingleAvg(windows)
%mMovavg moving average given data with adjucent data defined by window
%size
%   [qData] = mMovavg(windows,qPt)
% there is a sum() in matlab, but js doesn't
sum = 0;
for i = 1:length(windows)
    sum = sum + windows(i);
end
qData = sum / length(windows);
end

