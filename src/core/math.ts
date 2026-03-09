export function calculateMetrics(lambda: number, mu: number, numServers: number = 1) {
  if (!isFinite(lambda) || lambda <= 0 || !isFinite(mu) || mu <= 0 || numServers < 1) {
    return {
      lambda,
      mu,
      rho: 0,
      L: 0,
      Lq: 0,
      W: 0,
      Wq: 0,
      P: [],
    };
  }

  const rho = lambda / (numServers * mu);
  let P: number[] = [];
  let L = 0;
  let Lq = 0;

  if (rho >= 1) {
    return { lambda, mu, rho, L: Infinity, Lq: Infinity, W: Infinity, Wq: Infinity, P: [] };
  }

  if (numServers === 1) {
    const p0 = 1 - rho;
    P.push(p0);
    L = rho / (1 - rho);
    Lq = Math.pow(rho, 2) / (1 - rho);
  } else {
    let sum = 0;
    for (let n = 0; n < numServers; n++) {
      sum += Math.pow(numServers * rho, n) / factorial(n);
    }
    const p0 = 1 / (sum + Math.pow(numServers * rho, numServers) / (factorial(numServers) * (1 - rho)));
    P.push(p0);
    
    Lq = (p0 * Math.pow(lambda / mu, numServers) * rho) / (factorial(numServers) * Math.pow(1 - rho, 2));
    L = Lq + (lambda / mu);
  }

  const W = L / lambda;
  const Wq = Lq / lambda;

  return { lambda, mu, rho, L, Lq, W, Wq, P };
}

export function factorial(n: number): number {
  if (n === 0 || n === 1) return 1;
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

export function calculateInterArrivalTimes(arrivalRecords: { startTime: number; endTime: number; type: string }[]) {
  if (arrivalRecords.length < 2) return { avgInterArrival: 0, lambda: 0 };
  
  const sortedArrivals = [...arrivalRecords].sort((a, b) => a.startTime - b.startTime);
  let totalInterArrival = 0;
  
  for (let i = 1; i < sortedArrivals.length; i++) {
    totalInterArrival += (sortedArrivals[i].startTime - sortedArrivals[i - 1].startTime);
  }
  
  const avgInterArrival = totalInterArrival / (sortedArrivals.length - 1);
  const lambda = avgInterArrival > 0 ? 1 / avgInterArrival : 0;
  
  return { avgInterArrival, lambda };
}

export function calculateServiceTimes(serviceRecords: { startTime: number; endTime: number; type: string }[]) {
  if (serviceRecords.length === 0) return { avgServiceTime: 0, mu: 0 };
  
  const totalServiceTime = serviceRecords.reduce((acc, curr) => acc + (curr.endTime - curr.startTime), 0);
  const avgServiceTime = totalServiceTime / serviceRecords.length;
  const mu = avgServiceTime > 0 ? 1 / avgServiceTime : 0;
  
  return { avgServiceTime, mu };
}
