% logo plot
clc;clear;close all

x = -5:0.01:5;
y = sinc(x);

plot(x,y, 'LineWidth',2)
% axis equal
xlim([-3 3])
ylim([-0.5 1.5])