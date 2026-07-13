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
    transition: 'background 0.2s, color 0.2s',
  },
  btnDisabled: {
    background: 'var(--surface2)',
    color: 'var(--muted)',
    cursor: 'not-allowed',
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
  errorMsg: {
    color: 'var(--red)',
    fontSize: 12,
    marginTop: 6,
  },
};

export default function SalaryCard({ salary, currency, onSet, onEdit }) {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const raw = e.target.value;
    if (raw !== '' && !/^\d*\.?\d*$/.test(raw)) {
      setError('Only numbers are allowed.');
      return;
    }
    setError('');
    setInput(raw);
  };

  const isValid = parseFloat(input) > 0;

  const handleSet = () => {
    if (!isValid) return;
    setInput('');
    setError('');
    onSet(parseFloat(input));
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' && isValid) handleSet();
  };

  return (
    <div style={styles.card}>
      <div style={styles.label}>Monthly net salary</div>

      {salary === 0 ? (
        <div>
          <div style={styles.row}>
            <input
              type="text"
              placeholder={currency === 'CZK' ? 'e.g. 45000' : 'e.g. 3500'}
              inputMode="numeric"
              value={input}
              onChange={handleChange}
              onKeyDown={handleKey}
              style={error ? { borderColor: 'var(--red)' } : {}}
            />
            <span style={styles.unit}>{currency}</span>
            <button
              style={{ ...styles.btnPrimary, ...(!isValid ? styles.btnDisabled : {}) }}
              onClick={handleSet}
              disabled={!isValid}
            >
              Set salary
            </button>
          </div>
          {error && <div style={styles.errorMsg}>{error}</div>}
        </div>
      ) : (
        <div style={styles.confirmed}>
          <span style={styles.salaryBig}>{fmt(salary)} {currency}</span>
          <button style={styles.btnGhost} onClick={onEdit}>Change</button>
        </div>
      )}
    </div>
  );
}
