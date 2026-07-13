import React from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { fmt } from './utils/format';
import Cylinder          from './components/Cylinder';
import SalaryCard        from './components/SalaryCard';
import CurrencySelector  from './components/CurrencySelector';
import AddExpenseCard    from './components/AddExpenseCard';
import ExpenseList       from './components/ExpenseList';

const styles = {
  app: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },
  heading: {
    fontSize: 22,
    fontWeight: 600,
    letterSpacing: '-0.3px',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    color: 'var(--muted)',
    marginBottom: 4,
  },
  cylRow: {
    display: 'flex',
    gap: 16,
    alignItems: 'center',
  },
  cylStats: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  statBlock: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
  },
  statLabel: {
    fontSize: 11,
    color: 'var(--muted)',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
  },
  statVal: {
    fontFamily: "'DM Mono', monospace",
    fontSize: 19,
    fontWeight: 500,
  },
  warning: {
    background: 'rgba(224,82,82,0.12)',
    border: '0.5px solid rgba(224,82,82,0.3)',
    borderRadius: 'var(--radius-sm)',
    padding: '10px 14px',
    fontSize: 13,
    color: 'var(--red)',
  },
};

export default function App() {
  const [salary,   setSalary]   = useLocalStorage('et_salary',   0);
  const [currency, setCurrency] = useLocalStorage('et_currency', 'EUR');
  const [expenses, setExpenses] = useLocalStorage('et_expenses', []);

  const total     = expenses.reduce((s, e) => s + e.amt, 0);
  const spentPct  = salary > 0 ? total / salary : 1;
  const remaining = salary - total;

  const handleSetSalary = (v) => {
    setSalary(v);
    setExpenses([]);
  };

  const handleEditSalary = () => {
    setSalary(0);
    setExpenses([]);
  };

  // Currency can change freely at any time — no reset needed
  const handleCurrencyChange = (c) => setCurrency(c);

  const handleAddExpense    = (expense) => setExpenses((prev) => [...prev, expense]);
  const handleDeleteExpense = (id)      => setExpenses((prev) => prev.filter((e) => e.id !== id));
  const handleClearAll      = ()        => setExpenses([]);

  const fmtAmt = (n) => (n >= 0 ? fmt(n) : '-' + fmt(Math.abs(n))) + ' ' + currency;

  return (
    <div style={styles.app}>
      <div>
        <h1 style={styles.heading}>Monthly Expenses</h1>
        <p style={styles.subtitle}>Track your budget at a glance</p>
      </div>

      {/* Cylinder + inline stats */}
      <div style={styles.cylRow}>
        <Cylinder spentPct={spentPct} />

        <div style={styles.cylStats}>
          <div style={styles.statBlock}>
            <span style={styles.statLabel}>Remaining</span>
            <span style={{
              ...styles.statVal,
              color: salary === 0 ? 'var(--text)'
                : remaining < 0            ? 'var(--red)'
                : remaining < salary * 0.2 ? 'var(--amber)'
                : 'var(--blue)',
            }}>
              {salary > 0 ? fmtAmt(remaining) : '—'}
            </span>
          </div>

          <div style={styles.statBlock}>
            <span style={styles.statLabel}>Spent</span>
            <span style={styles.statVal}>
              {salary > 0 ? fmt(total) + ' ' + currency : '—'}
            </span>
          </div>

          <div style={styles.statBlock}>
            <span style={styles.statLabel}>Usage</span>
            <span style={{
              ...styles.statVal,
              color: spentPct >= 1 ? 'var(--red)' : spentPct >= 0.75 ? 'var(--amber)' : 'var(--blue)',
            }}>
              {salary > 0 ? Math.min(Math.round(spentPct * 100), 100) + '%' : '—'}
            </span>
            <div style={{ height: 4, background: 'var(--surface2)', borderRadius: 2, overflow: 'hidden', marginTop: 4 }}>
              <div style={{
                height: '100%',
                borderRadius: 2,
                width: salary > 0 ? Math.min(spentPct * 100, 100) + '%' : '0%',
                background: spentPct >= 1 ? 'var(--red)' : spentPct >= 0.75 ? 'var(--amber)' : 'var(--blue)',
                transition: 'width 0.6s cubic-bezier(0.4,0,0.2,1), background 0.4s',
              }} />
            </div>
          </div>
        </div>
      </div>

      {/* Currency — always visible */}
      <CurrencySelector currency={currency} onChange={handleCurrencyChange} />

      {/* Salary */}
      <SalaryCard
        salary={salary}
        currency={currency}
        onSet={handleSetSalary}
        onEdit={handleEditSalary}
      />

      {/* Budget exceeded warning */}
      {salary > 0 && total > salary && (
        <div style={styles.warning}>
          ⚠️ Budget exceeded! You are over by <strong>{fmt(total - salary)} {currency}</strong>.
        </div>
      )}

      {/* Add expense + list */}
      {salary > 0 && (
        <>
          <AddExpenseCard currency={currency} onAdd={handleAddExpense} />
          <ExpenseList
            expenses={expenses}
            salary={salary}
            currency={currency}
            onDelete={handleDeleteExpense}
            onClear={handleClearAll}
          />
        </>
      )}
    </div>
  );
}
