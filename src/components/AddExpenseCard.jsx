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
    transition: 'background 0.2s, color 0.2s',
  },
  btnDisabled: {
    background: 'var(--surface2)',
    color: 'var(--muted)',
    cursor: 'not-allowed',
  },
  errorMsg: {
    color: 'var(--red)',
    fontSize: 12,
    marginTop: 4,
  },
};

export default function AddExpenseCard({ currency, onAdd }) {
  const [name,  setName]  = useState('');
  const [amt,   setAmt]   = useState('');
  const [error, setError] = useState('');

  const handleAmtChange = (e) => {
    const raw = e.target.value;
    if (raw !== '' && !/^\d*\.?\d*$/.test(raw)) {
      setError('Only numbers are allowed.');
      return;
    }
    setError('');
    setAmt(raw);
  };

  const isValid = name.trim().length > 0 && parseFloat(amt) > 0;

  const handleAdd = () => {
    if (!isValid) return;
    onAdd({ name: name.trim(), amt: parseFloat(amt), id: Date.now() });
    setName('');
    setAmt('');
    setError('');
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' && isValid) handleAdd();
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
        <div>
          <div style={styles.row}>
            <input
              type="text"
              placeholder="Amount"
              inputMode="decimal"
              value={amt}
              onChange={handleAmtChange}
              onKeyDown={handleKey}
              style={{ flex: 1, ...(error ? { borderColor: 'var(--red)' } : {}) }}
            />
            <span style={styles.unit}>{currency}</span>
            <button
              style={{ ...styles.btnPrimary, ...(!isValid ? styles.btnDisabled : {}) }}
              onClick={handleAdd}
              disabled={!isValid}
            >
              + Add
            </button>
          </div>
          {error && <div style={styles.errorMsg}>{error}</div>}
        </div>
      </div>
    </div>
  );
}
