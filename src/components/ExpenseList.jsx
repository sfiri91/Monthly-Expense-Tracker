import React from 'react';
import { fmt } from '../utils/format';

const styles = {
  card: {
    background: 'var(--surface)',
    border: '0.5px solid var(--border)',
    borderRadius: 'var(--radius)',
    overflow: 'hidden',
    marginBottom: 'calc(env(safe-area-inset-bottom) + 16px)',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 16px',
    borderBottom: '0.5px solid var(--border)',
  },
  label: {
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    color: 'var(--muted)',
  },
  btnClear: {
    background: 'none',
    border: 'none',
    color: 'var(--muted)',
    fontSize: 13,
    cursor: 'pointer',
    fontFamily: "'Inter', sans-serif",
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    padding: '10px 16px',
    borderBottom: '0.5px solid var(--border)',
    animation: 'slideIn 0.25s ease',
  },
  name: {
    flex: 1,
    fontSize: 14,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  pct: {
    fontFamily: "'DM Mono', monospace",
    fontSize: 11,
    color: 'var(--muted)',
  },
  amount: {
    fontFamily: "'DM Mono', monospace",
    fontSize: 14,
    fontWeight: 500,
    minWidth: 90,
    textAlign: 'right',
  },
  btnDel: {
    background: 'none',
    border: 'none',
    color: 'var(--muted)',
    fontSize: 18,
    cursor: 'pointer',
    padding: '4px 0 4px 8px',
    lineHeight: 1,
  },
  empty: {
    padding: '20px 16px',
    textAlign: 'center',
    fontSize: 13,
    color: 'var(--muted)',
  },
};

export default function ExpenseList({ expenses, salary, currency, onDelete, onClear }) {
  return (
    <div style={styles.card}>
      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(10px); }
          to   { opacity: 1; transform: translateX(0); }
        }
      `}</style>

      <div style={styles.header}>
        <span style={styles.label}>Expenses this month</span>
        <button style={styles.btnClear} onClick={onClear}>Clear all</button>
      </div>

      <div style={styles.list}>
        {expenses.length === 0 ? (
          <div style={styles.empty}>No expenses yet.</div>
        ) : (
          expenses.map((e, idx) => {
            const pct    = salary > 0 ? ((e.amt / salary) * 100).toFixed(1) : '—';
            const isLast = idx === expenses.length - 1;
            return (
              <div
                key={e.id}
                style={{ ...styles.item, ...(isLast ? { borderBottom: 'none' } : {}) }}
              >
                <span style={styles.name} title={e.name}>{e.name}</span>
                <span style={styles.pct}>{pct}%</span>
                <span style={styles.amount}>{fmt(e.amt)} {currency}</span>
                <button
                  style={styles.btnDel}
                  onClick={() => onDelete(e.id)}
                  aria-label="Remove"
                >
                  ×
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
