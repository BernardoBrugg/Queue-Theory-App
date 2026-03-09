import React from "react";
import { StoredService } from "../../../../types";

interface PDFDetailedDataProps {
  service: StoredService;
}

export function PDFDetailedData({ service }: PDFDetailedDataProps) {
  return (
    <>
      <h2>Dados Detalhados</h2>
      <h3>Tempos de Serviço</h3>
      <p>{service.serviceTimes?.join(", ") || "N/A"}</p>
      <h3>Tempos de Interchegada</h3>
      <p>{service.interArrivals?.join(", ") || "N/A"}</p>
      <h3>Tempos de Espera</h3>
      <p>{service.metrics.waitingTimes?.join(", ") || "N/A"}</p>
      <h3>Tempos Ociosos</h3>
      <p>{service.metrics.idleTimes?.join(", ") || "N/A"}</p>
      <h3>Timestamps</h3>
      <p>
        {service.timestamps
          ?.map((t) => new Date(t).toLocaleString())
          .join(", ") || "N/A"}
      </p>
    </>
  );
}
