import React from 'react';

const CURRENCIES = ['EUR', 'CZK', 'GBP', 'USD'];

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
  chips: {
    display: 'flex',
    gap: 6,
    flexWrap: 'wrap',
  },
  chip: {
    fontFamily: "'DM Mono', monospace",
    fontSize: 13,
    fontWeight: 500,
    padding: '6px 14px',
    borderRadius: 20,
    border: '0.5px solid var(--border)',
    background: 'var(--surface2)',
    color: 'var(--muted)',
    cursor: 'pointer',
    transition: 'background 0.15s, color 0.15s, border-color 0.15s',
    userSelect: 'none',
  },
  chipActive: {
    background: 'var(--blue)',
    color: '#fff',
    borderColor: 'var(--blue)',
  },
};

export default function CurrencySelector({ currency, onChange }) {
  return (
    <div style={styles.card}>
      <div style={styles.label}>Currency</div>
      <div style={styles.chips}>
        {CURRENCIES.map((c) => (
          <div
            key={c}
            style={{ ...styles.chip, ...(currency === c ? styles.chipActive : {}) }}
            onClick={() => onChange(c)}
          >
            {c}
          </div>
        ))}
      </div>
    </div>
  );
}
