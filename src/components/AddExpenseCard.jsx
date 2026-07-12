import React, { useState } from 'react';

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
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
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
};

export default function AddExpenseCard({ onAdd }) {
  const [name, setName]   = useState('');
  const [amt,  setAmt]    = useState('');
  const [error, setError] = useState(false);

  const handleAdd = () => {
    const v = parseFloat(amt);
    if (!v || v <= 0) { setError(true); return; }
    setError(false);
    onAdd({ name: name.trim() || 'Expense', amt: v, id: Date.now() });
    setName('');
    setAmt('');
  };

  const handleKey = (e) => {
    if (e.key === 'Enter') handleAdd();
  };

  return (
    <div style={styles.card}>
      <div style={styles.label}>Add expense</div>
      <div style={styles.form}>
        <input
          type="text"
          placeholder="Description (e.g. Rent, Groceries)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={handleKey}
        />
        <div style={styles.row}>
          <input
            type="number"
            placeholder="Amount"
            min="0.01"
            step="0.01"
            inputMode="decimal"
            value={amt}
            onChange={(e) => { setAmt(e.target.value); setError(false); }}
            onKeyDown={handleKey}
            style={{ flex: 1, ...(error ? { borderColor: 'var(--red)' } : {}) }}
          />
          <span style={styles.unit}>Kč</span>
          <button style={styles.btnPrimary} onClick={handleAdd}>+ Add</button>
        </div>
      </div>
    </div>
  );
}
