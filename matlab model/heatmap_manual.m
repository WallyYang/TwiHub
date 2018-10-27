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
