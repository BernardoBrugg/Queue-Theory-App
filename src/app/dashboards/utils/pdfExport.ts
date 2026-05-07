import jsPDF from "jspdf";
import { QueueMetrics } from "../../../types";

function fmt(v: number | null | undefined, d = 4): string {
  return v != null && isFinite(v) ? v.toFixed(d) : "N/A";
}

export async function exportMetricsToPDF(
  serviceName: string,
  metrics: QueueMetrics,
  numServers?: number,
): Promise<void> {
  const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const pw = pdf.internal.pageSize.getWidth();
  const ph = pdf.internal.pageSize.getHeight();
  const mg = 20;
  const cw = pw - 2 * mg;
  let y = 20;

  const checkPageBreak = (needed: number) => {
    if (y + needed > ph - mg) {
      pdf.addPage();
      y = 20;
    }
  };

  // ── HEADER ────────────────────────────────────────────────────────────────
  pdf.setFillColor(37, 99, 235);
  pdf.rect(0, 0, pw, 36, "F");

  pdf.setFontSize(18);
  pdf.setFont("helvetica", "bold");
  pdf.setTextColor(255, 255, 255);
  pdf.text("Relatório de Análise de Filas", pw / 2, 14, { align: "center" });

  pdf.setFontSize(11);
  pdf.setFont("helvetica", "normal");
  pdf.text(`Serviço: ${serviceName}`, pw / 2, 24, { align: "center" });

  pdf.setFontSize(8);
  pdf.text(
    `Gerado em: ${new Date().toLocaleString("pt-BR")}`,
    pw / 2,
    31,
    { align: "center" },
  );

  y = 46;

  // ── METRICS TABLE ─────────────────────────────────────────────────────────
  pdf.setFontSize(12);
  pdf.setFont("helvetica", "bold");
  pdf.setTextColor(30, 30, 30);
  pdf.text("Métricas do Sistema M/M/c", mg, y);
  y += 6;

  const rh = 7;
  // Column X positions: offset, param label, symbol, value, unit
  const COL_OFFSET = 2;
  const COL_PARAM = mg + COL_OFFSET;
  const COL_SYMBOL = mg + 88;
  const COL_VALUE = mg + 125;
  const COL_UNIT = mg + 153;
  const colX = [COL_PARAM, COL_SYMBOL, COL_VALUE, COL_UNIT];

  const drawHeader = (labels: string[]) => {
    pdf.setFillColor(37, 99, 235);
    pdf.rect(mg, y, cw, rh, "F");
    pdf.setFontSize(9);
    pdf.setFont("helvetica", "bold");
    pdf.setTextColor(255, 255, 255);
    labels.forEach((lbl, i) => pdf.text(lbl, colX[i], y + rh - 2));
    y += rh;
  };

  const drawRow = (cells: string[], even: boolean) => {
    if (even) {
      pdf.setFillColor(245, 247, 250);
      pdf.rect(mg, y, cw, rh, "F");
    }
    pdf.setFontSize(9);
    pdf.setFont("helvetica", "normal");
    pdf.setTextColor(40, 40, 40);
    cells.forEach((c, i) => pdf.text(c, colX[i], y + rh - 2));
    pdf.setDrawColor(220, 220, 220);
    pdf.setLineWidth(0.2);
    pdf.line(mg, y + rh, mg + cw, y + rh);
    y += rh;
  };

  const tableStartY = y;
  drawHeader(["Parâmetro", "Símbolo", "Valor", "Unidade"]);

  const mainMetrics: string[][] = [
    ["Taxa de Chegada", "λ", fmt(metrics.lambda, 6), "chegadas/s"],
    ["Taxa de Serviço", "μ", fmt(metrics.mu, 6), "atend./s"],
    ["Utilização do Sistema", "ρ", fmt(metrics.rho, 6), ""],
  ];
  if (numServers != null) {
    mainMetrics.push(["Número de Servidores", "c", String(numServers), ""]);
  }
  mainMetrics.push(
    ["Clientes no Sistema", "L", fmt(metrics.L, 6), ""],
    ["Clientes na Fila", "Lq", fmt(metrics.Lq, 6), ""],
    ["Tempo no Sistema", "W", fmt(metrics.W, 6), "s"],
    ["Tempo de Espera", "Wq", fmt(metrics.Wq, 6), "s"],
    ["Proporção Ociosa", "ρ_idle", fmt(metrics.idleProportion, 6), ""],
    ["Tempo Médio de Serviço", "E[S]", fmt(metrics.avgServiceTime, 6), "s"],
    ["Tempo Ocioso Médio", "—", fmt(metrics.idleTime, 6), "s"],
  );

  mainMetrics.forEach((row, i) => drawRow(row, i % 2 === 0));

  pdf.setDrawColor(180, 180, 180);
  pdf.setLineWidth(0.4);
  pdf.rect(mg, tableStartY, cw, y - tableStartY);
  y += 10;

  // ── P(n) TABLE ────────────────────────────────────────────────────────────
  if (metrics.P && metrics.P.length > 0) {
    const pCols = 4;
    const rowsNeeded = Math.ceil(metrics.P.length / pCols);
    checkPageBreak(rh + rowsNeeded * rh + 16);

    pdf.setFontSize(12);
    pdf.setFont("helvetica", "bold");
    pdf.setTextColor(30, 30, 30);
    pdf.text("Probabilidades de Estado P(n)", mg, y);
    y += 6;

    const pColW = cw / pCols;
    const pColX = Array.from({ length: pCols }, (_, i) => mg + i * pColW + 2);

    const pStartY = y;

    pdf.setFillColor(37, 99, 235);
    pdf.rect(mg, y, cw, rh, "F");
    pdf.setFontSize(9);
    pdf.setFont("helvetica", "bold");
    pdf.setTextColor(255, 255, 255);
    for (let c = 0; c < pCols; c++) {
      pdf.text("Estado (n)   P(n)", pColX[c], y + rh - 2);
    }
    y += rh;

    for (let i = 0; i < metrics.P.length; i += pCols) {
      const rowIdx = Math.floor(i / pCols);
      if (rowIdx % 2 === 0) {
        pdf.setFillColor(245, 247, 250);
        pdf.rect(mg, y, cw, rh, "F");
      }
      pdf.setFontSize(9);
      pdf.setFont("helvetica", "normal");
      pdf.setTextColor(40, 40, 40);
      for (let c = 0; c < pCols && i + c < metrics.P.length; c++) {
        const n = i + c;
        const p = metrics.P[n];
        pdf.text(
          `P(${n}) = ${p != null && isFinite(p) ? p.toFixed(4) : "N/A"}`,
          pColX[c],
          y + rh - 2,
        );
      }
      pdf.setDrawColor(220, 220, 220);
      pdf.setLineWidth(0.2);
      pdf.line(mg, y + rh, mg + cw, y + rh);
      y += rh;
    }

    pdf.setDrawColor(180, 180, 180);
    pdf.setLineWidth(0.4);
    pdf.rect(mg, pStartY, cw, y - pStartY);
    y += 10;
  }

  // ── SERVICE TIMES ─────────────────────────────────────────────────────────
  if (metrics.serviceTimes && metrics.serviceTimes.length > 0) {
    checkPageBreak(30);

    pdf.setFontSize(12);
    pdf.setFont("helvetica", "bold");
    pdf.setTextColor(30, 30, 30);
    pdf.text("Tempos de Serviço Registrados (s)", mg, y);
    y += 6;

    const displayTimes = metrics.serviceTimes.slice(0, 100);
    const timesStr =
      displayTimes.map((t) => fmt(t, 3)).join(", ") +
      (metrics.serviceTimes.length > 100
        ? ` ... (${metrics.serviceTimes.length - 100} mais)`
        : "");

    pdf.setFontSize(9);
    pdf.setFont("helvetica", "normal");
    pdf.setTextColor(60, 60, 60);
    const lines = pdf.splitTextToSize(timesStr, cw);
    lines.forEach((line: string) => {
      checkPageBreak(6);
      pdf.text(line, mg, y);
      y += 6;
    });

    y += 4;
  }

  // ── INTER-ARRIVALS ────────────────────────────────────────────────────────
  if (metrics.interArrivals && metrics.interArrivals.length > 0) {
    checkPageBreak(30);

    pdf.setFontSize(12);
    pdf.setFont("helvetica", "bold");
    pdf.setTextColor(30, 30, 30);
    pdf.text("Tempos de Interchegada (s)", mg, y);
    y += 6;

    const displayArr = metrics.interArrivals.slice(0, 100);
    const arrStr =
      displayArr.map((t) => fmt(t, 3)).join(", ") +
      (metrics.interArrivals.length > 100
        ? ` ... (${metrics.interArrivals.length - 100} mais)`
        : "");

    pdf.setFontSize(9);
    pdf.setFont("helvetica", "normal");
    pdf.setTextColor(60, 60, 60);
    const lines = pdf.splitTextToSize(arrStr, cw);
    lines.forEach((line: string) => {
      checkPageBreak(6);
      pdf.text(line, mg, y);
      y += 6;
    });
  }

  // ── FOOTER ────────────────────────────────────────────────────────────────
  const totalPages = pdf.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    pdf.setPage(i);
    pdf.setFontSize(8);
    pdf.setTextColor(150, 150, 150);
    pdf.text(
      `Queue Theory App — Página ${i} de ${totalPages}`,
      pw / 2,
      ph - 10,
      { align: "center" },
    );
  }

  const safeName = serviceName.replace(/[^a-z0-9]/gi, "-").toLowerCase();
  pdf.save(`relatorio-${safeName}.pdf`);
}
