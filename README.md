# TwiHub

![logo](logo/logo.png)

## Build

```bash
tsc
```



## Heat Map Mathematical Model

Convert number of likes to height of heat map using linear interpolation and moving average

### Linear Interpolation

![Interpolation](matlab_model/Interpolation.gif)

where (x1, y1) and (x2, y2) are index and height of two adjacent integer points.

### Moving Average

![MovAvgEqn](matlab_model/MovAvgEqn.gif)

Normalize the vector,

![Normalize](matlab_model/Normalize.gif)

