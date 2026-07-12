import React from 'react';
import { fmt } from '../utils/format';

function statColor(value, salary, type) {
  if (type === 'remaining') {
    if (value < 0)              return 'var(--red)';
    if (value < salary * 0.2)  return 'var(--amber)';
    return 'var(--blue)';
  }
  if (type === 'pct') {
    if (value >= 100) return 'var(--red)';
    if (value >= 75)  return 'var(--amber)';
    return 'var(--blue)';
  }
  return 'var(--text)';
}

const styles = {
  row: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gap: 8,
  },
  card: {
    background: 'var(--surface2)',
    borderRadius: 'var(--radius-sm)',
    padding: '10px 12px',
  },
  label: {
    fontSize: 11,
    color: 'var(--muted)',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
  },
  val: {
    fontFamily: "'DM Mono', monospace",
    fontSize: 17,
    fontWeight: 500,
    marginTop: 3,
  },
  barWrap: {
    height: 4,
    background: 'var(--surface)',
    borderRadius: 2,
    overflow: 'hidden',
    marginTop: 4,
  },
};

export default function StatsRow({ salary, total }) {
  const remaining = salary - total;
  const spentPct  = salary > 0 ? Math.min((total / salary) * 100, 100) : 0;
  const barColor  = spentPct >= 100 ? 'var(--red)' : spentPct >= 75 ? 'var(--amber)' : 'var(--blue)';

  return (
    <div style={styles.row}>
      <div style={styles.card}>
        <div style={styles.label}>Remaining</div>
        <div style={{ ...styles.val, color: statColor(remaining, salary, 'remaining') }}>
          {salary > 0
            ? (remaining >= 0 ? fmt(remaining) : '-' + fmt(Math.abs(remaining))) + ' Kč'
            : '—'}
        </div>
      </div>

      <div style={styles.card}>
        <div style={styles.label}>Spent</div>
        <div style={styles.val}>
          {salary > 0 ? fmt(total) + ' Kč' : '—'}
        </div>
      </div>

      <div style={styles.card}>
        <div style={styles.label}>Usage</div>
        <div style={{ ...styles.val, color: statColor(spentPct, salary, 'pct') }}>
          {salary > 0 ? Math.round(spentPct) + '%' : '—'}
        </div>
        <div style={styles.barWrap}>
          <div style={{
            height: '100%',
            borderRadius: 2,
            background: barColor,
            width: spentPct + '%',
            transition: 'width 0.6s cubic-bezier(0.4,0,0.2,1), background 0.4s',
          }} />
        </div>
      </div>
    </div>
  );
}
