"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { ChevronDown, Check } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export interface AppSelectOption {
  value: string;
  label: string;
}

interface AppSelectProps {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  options: AppSelectOption[];
  placeholder?: string;
}

export function AppSelect({
  id,
  value,
  onChange,
  options,
  placeholder = "Selecione...",
}: AppSelectProps) {
  const [open, setOpen] = useState(false);
  const [dropdownStyle, setDropdownStyle] = useState<React.CSSProperties>({});
  const triggerRef = useRef<HTMLDivElement>(null);

  const selected = options.find((o) => o.value === value);

  const reposition = useCallback(() => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    setDropdownStyle({
      position: "fixed",
      top: rect.bottom + 6,
      left: rect.left,
      width: rect.width,
      zIndex: 9999,
    });
  }, []);

  useEffect(() => {
    if (open) reposition();
  }, [open, reposition]);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (triggerRef.current && !triggerRef.current.contains(e.target as Node))
        setOpen(false);
    };
    const onScroll = () => {
      if (open) reposition();
    };
    document.addEventListener("mousedown", close);
    window.addEventListener("scroll", onScroll, true);
    window.addEventListener("resize", reposition);
    return () => {
      document.removeEventListener("mousedown", close);
      window.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("resize", reposition);
    };
  }, [open, reposition]);

  const dropdown = (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -6, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -6, scale: 0.98 }}
          transition={{ duration: 0.15, ease: [0.2, 0, 0, 1] }}
          style={{
            ...dropdownStyle,
            background: "var(--surface)",
            border: "1px solid var(--border-glass)",
            borderRadius: "var(--radius-lg)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            boxShadow: "var(--shadow-lg)",
            overflow: "hidden",
            padding: "0.375rem",
          }}
        >
          {options.map((opt) => {
            const isSelected = opt.value === value;
            return (
              <button
                key={opt.value}
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                  padding: "0.6rem 0.875rem",
                  borderRadius: "var(--radius-md)",
                  border: "none",
                  background: isSelected
                    ? "var(--accent-light)"
                    : "transparent",
                  color: isSelected ? "var(--accent)" : "var(--text-primary)",
                  fontSize: "0.925rem",
                  fontWeight: isSelected ? 600 : 400,
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "background 120ms ease",
                }}
                onMouseEnter={(e) => {
                  if (!isSelected)
                    (e.currentTarget as HTMLElement).style.background =
                      "var(--surface-raised)";
                }}
                onMouseLeave={(e) => {
                  if (!isSelected)
                    (e.currentTarget as HTMLElement).style.background =
                      "transparent";
                }}
              >
                <span>{opt.label}</span>
                {isSelected && <Check size={14} style={{ flexShrink: 0 }} />}
              </button>
            );
          })}
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div
      ref={triggerRef}
      style={{ position: "relative", width: "100%" }}
      id={id}
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        style={{
          width: "100%",
          padding: "0.75rem 2.5rem 0.75rem 1rem",
          fontSize: "0.95rem",
          background: "var(--surface-glass)",
          color: selected ? "var(--text-primary)" : "var(--text-muted)",
          border: `1px solid ${open ? "var(--accent-blue)" : "var(--border)"}`,
          borderRadius: "var(--radius-lg)",
          outline: "none",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          boxShadow: open ? "0 0 0 3px rgba(59,130,246,0.15)" : "none",
          cursor: "pointer",
          textAlign: "left",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          transition: "border-color 150ms ease, box-shadow 150ms ease",
        }}
      >
        <span
          style={{
            flex: 1,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {selected ? selected.label : placeholder}
        </span>
        <ChevronDown
          size={16}
          style={{
            position: "absolute",
            right: "0.875rem",
            color: "var(--text-muted)",
            transition: "transform 200ms ease",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            flexShrink: 0,
          }}
        />
      </button>

      {typeof document !== "undefined" && createPortal(dropdown, document.body)}
    </div>
  );
}
