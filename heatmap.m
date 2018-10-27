% heat map math model
% YC 10/27/2018
clc;clear

%% Generate Input
clc;clear
%%%%%%%%%%%%%%%%% Input Generation %%%%%%%%%%%%%%%%%%%%%%%%%%%%
% Pass in random array denote number of like on each column
length = 100;
index = 1:length;

% make orgIn int and spread out
orgIn = 100*rand(length,1)-80;
orgIn = round(orgIn, 0);
orgIn(orgIn<0) = 0;
figure(1)
stem(orgIn)
% xlabel('Column Number')
% ylabel('# of Likes')
title('Original Input')
%%%%%%%%%%%%%%%%% End Input Generation %%%%%%%%%%%%%%%%%%%%%%%

% Heat map
% # of adjuncent point taken into consideration for heat map
N = 2;
newInd = 1:0.1:length;
heatmapVector = interp1(index, orgIn, newInd);
heatmapVector = movmean(heatmapVector, 10)

figure(2)
clf
hold on
stem(newInd, heatmapVector, 'b')
title('Zero Removal')
