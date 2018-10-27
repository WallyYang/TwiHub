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
clf
ax(1) = subplot(211);
stem(orgIn)
grid; grid minor
xlabel('Column Number');ylabel('# of Likes');title('Original Input')
%%%%%%%%%%%%%%%%% End Input Generation %%%%%%%%%%%%%%%%%%%%%%%
% Heat map
% # of adjuncent point taken into consideration for heat map
newInd = 1:0.1:length; % new index used for interpolation
heatmapVector = interp1(index, orgIn, newInd); % interpol genrate trangular shape
% heatmapVector = movmean(heatmapVector, 8); % moving avg create spline style

% Plot generated heat map curve
ax(2) = subplot(212);
hold on
plot(newInd, heatmapVector, '-xm')
title('Heat Map');xlabel('Column Position');ylabel('Heat');
grid; grid minor

linkaxes(ax, 'x') % link axis
%%%%%%%%%%%%%%%% End Expected Output %%%%%%%%%%%%%%%%%%%%%%%%%%

% length, index (for input data), orgIn
%%%%%%%%%%%%%%%% Begin interpolation calculation %%%%%%%%%%%%%%
pixInd = 0.1; % value obatined from how dense the pixals are, depending on screen size;
hmInd = 1:pixInd:length; % generate heatmap index

% create function hmHeight = mInterp(oriIndex, oriData, querryPt)
outTest = mInterpl(index, orgIn, hmInd);
plot(hmInd, outTest, '-ob')

% Test if manually compute result match expected output