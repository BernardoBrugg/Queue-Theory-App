"use client";

import { useChronometers } from "./hooks/useChronometers";
import { Nav } from "../../components/Nav";
import { AddQueue } from "./components/AddQueue";
import { QueueItem } from "./components/QueueItem";

export default function Chronometers() {
  const {
    queues,
    queueTotals,
    newQueue,
    setNewQueue,
    newQueueType,
    setNewQueueType,
    numAttendants,
    setNumAttendants,
    currentAppTimeMs,
    addQueue,
    removeQueue,
    getNextElement,
    recordEvent,
  } = useChronometers();

  return (
    <div>
      <Nav />
      <div className="min-h-screen bg-gradient-to-br from-[var(--bg-gradient-start)] via-[var(--element-bg)] to-[var(--bg-gradient-end)] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)] mb-8 text-center">
            Cronômetros
          </h1>
          <div className="mb-8">
            <AddQueue
              newQueue={newQueue}
              setNewQueue={setNewQueue}
              newQueueType={newQueueType}
              setNewQueueType={setNewQueueType}
              numAttendants={numAttendants}
              setNumAttendants={setNumAttendants}
              addQueue={addQueue}
            />
          </div>
          <div className="mb-8">
            <h2 className="text-xl font-bold text-[var(--text-primary)] mb-4">
              Filas Ativas
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {queues.map((queue, index) => (
              <QueueItem
                key={index}
                queue={queue}
                index={index}
                removeQueue={removeQueue}
                getNextElement={getNextElement}
                currentTotal={queueTotals[queue.name] || 0}
                onRecord={recordEvent}
                currentAppTimeMs={currentAppTimeMs}
              />
            ))}
          </div>
          {queues.length === 0 && (
            <div className="text-center py-12">
              <p className="text-[var(--text-secondary)] text-lg">
                Nenhuma fila configurada. Adicione uma fila acima para começar.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
