import React from 'react';

const styles = {
  overlay: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0,0,0,0.6)',
    backdropFilter: 'blur(4px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
    padding: '0 24px',
  },
  dialog: {
    background: 'var(--surface)',
    border: '0.5px solid var(--border)',
    borderRadius: 'var(--radius)',
    padding: '24px 20px 20px',
    width: '100%',
    maxWidth: 340,
    animation: 'slideUp 0.2s ease',
  },
  title: {
    fontSize: 16,
    fontWeight: 600,
    marginBottom: 8,
  },
  message: {
    fontSize: 14,
    color: 'var(--muted)',
    lineHeight: 1.5,
    marginBottom: 20,
  },
  buttons: {
    display: 'flex',
    gap: 10,
  },
  btnCancel: {
    flex: 1,
    background: 'var(--surface2)',
    color: 'var(--text)',
    border: '0.5px solid var(--border)',
    borderRadius: 'var(--radius-sm)',
    fontFamily: "'Inter', sans-serif",
    fontSize: 15,
    fontWeight: 500,
    padding: '11px 0',
    cursor: 'pointer',
  },
  btnConfirm: {
    flex: 1,
    background: 'var(--red)',
    color: '#fff',
    border: 'none',
    borderRadius: 'var(--radius-sm)',
    fontFamily: "'Inter', sans-serif",
    fontSize: 15,
    fontWeight: 600,
    padding: '11px 0',
    cursor: 'pointer',
  },
};

export default function ConfirmDialog({ title, message, onConfirm, onCancel }) {
  return (
    <div style={styles.overlay} onClick={onCancel}>
      <style>{`
        @keyframes slideUp {
          from { transform: translateY(16px); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
      `}</style>
      <div style={styles.dialog} onClick={(e) => e.stopPropagation()}>
        <div style={styles.title}>{title}</div>
        <div style={styles.message}>{message}</div>
        <div style={styles.buttons}>
          <button style={styles.btnCancel} onClick={onCancel}>Cancel</button>
          <button style={styles.btnConfirm} onClick={onConfirm}>Delete all</button>
        </div>
      </div>
    </div>
  );
}