import React, { useState } from 'react';
import { fmt } from '../utils/format';

const styles = {
  card: {
    background: 'var(--surface)',
    border: '0.5px solid var(--border)',
    borderRadius: 'var(--radius)',
    padding: 16,
  },
  label: {
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    color: 'var(--muted)',
    marginBottom: 12,
  },
  row: {
    display: 'flex',
    gap: 8,
    alignItems: 'center',
  },
  unit: {
    fontFamily: "'DM Mono', monospace",
    fontSize: 14,
    color: 'var(--muted)',
    whiteSpace: 'nowrap',
  },
  btnPrimary: {
    background: 'var(--blue)',
    color: '#fff',
    border: 'none',
    borderRadius: 'var(--radius-sm)',
    fontFamily: "'Inter', sans-serif",
    fontSize: 15,
    fontWeight: 600,
    padding: '11px 18px',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
  },
  btnGhost: {
    background: 'transparent',
    border: '0.5px solid var(--border)',
    borderRadius: 'var(--radius-sm)',
    color: 'var(--muted)',
    fontFamily: "'Inter', sans-serif",
    fontSize: 13,
    padding: '6px 12px',
    cursor: 'pointer',
  },
  confirmed: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  salaryBig: {
    fontFamily: "'DM Mono', monospace",
    fontSize: 24,
    fontWeight: 500,
  },
};

export default function SalaryCard({ salary, onSet, onEdit }) {
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);

  const handleSet = () => {
    const v = parseFloat(input);
    if (!v || v <= 0) { setError(true); return; }
    setError(false);
    setInput('');
    onSet(v);
  };

  const handleKey = (e) => {
    if (e.key === 'Enter') handleSet();
  };

  return (
    <div style={styles.card}>
      <div style={styles.label}>Monthly net salary</div>

      {salary === 0 ? (
        <div style={styles.row}>
          <input
            type="number"
            placeholder="e.g. 45000"
            min="1"
            inputMode="numeric"
            value={input}
            onChange={(e) => { setInput(e.target.value); setError(false); }}
            onKeyDown={handleKey}
            style={error ? { borderColor: 'var(--red)' } : {}}
          />
          <span style={styles.unit}>Kč</span>
          <button style={styles.btnPrimary} onClick={handleSet}>
            Set salary
          </button>
        </div>
      ) : (
        <div style={styles.confirmed}>
          <span style={styles.salaryBig}>{fmt(salary)} Kč</span>
          <button style={styles.btnGhost} onClick={onEdit}>Change</button>
        </div>
      )}
    </div>
  );
}
