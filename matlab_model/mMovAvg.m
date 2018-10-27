function [avgData] = mMovAvg(data, N)
%mMovAvg Moving average a given data using width of 2N +1
%   [avgData] = mMovAvg(id, data, N)
% Declear avgData
avgData = data;

for i = N:length(data)-N-1
    windows(1:2*N+1) = 0;
    % get all data values within window
    for j = -N:N
        windows(j+N+1) = data(i-j+1);
    end
    avgData(i) = mSingleAvg(windows);
end

