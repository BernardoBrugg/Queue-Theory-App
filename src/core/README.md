# Core Logic

This directory contains pure business logic and mathematical models for queueing theory. The code here is framework-agnostic and relies strictly on standard TypeScript to calculate queue metrics.

## `math.ts`
Contains functions for:
- M/M/1 and M/M/s calculations (`calculateMetrics`)
- Helper functions like `factorial`
- Time measurements (`calculateInterArrivalTimes`, `calculateServiceTimes`)
