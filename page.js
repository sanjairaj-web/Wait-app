'use client';

import { useState } from 'react';

export default function Home() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [message, setMessage] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Something went wrong');

      setStatus('success');
      setMessage(`You're on the list! (${data.total} people waiting)`);
      setEmail('');
    } catch (err) {
      setStatus('error');
      setMessage(err.message);
    }
  }

  return (
    <main style={styles.main}>
      <div style={styles.card}>
        <h1 style={styles.title}>🚀 LaunchPad</h1>
        <p style={styles.subtitle}>
          The tool busy founders use to ship ideas faster.
          Join the waitlist to get early access.
        </p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="email"
            required
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            style={styles.button}
          >
            {status === 'loading' ? 'Joining...' : 'Join Waitlist'}
          </button>
        </form>

        {status === 'success' && (
          <p style={{ ...styles.feedback, color: '#16a34a' }}>{message}</p>
        )}
        {status === 'error' && (
          <p style={{ ...styles.feedback, color: '#dc2626' }}>{message}</p>
        )}
      </div>
    </main>
  );
}

const styles = {
  main: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)',
    fontFamily: 'system-ui, sans-serif',
    padding: '1rem',
  },
  card: {
    background: '#fff',
    borderRadius: '16px',
    padding: '2.5rem',
    maxWidth: '440px',
    width: '100%',
    textAlign: 'center',
    boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
  },
  title: { fontSize: '2rem', marginBottom: '0.5rem' },
  subtitle: { color: '#555', marginBottom: '1.5rem', lineHeight: 1.5 },
  form: { display: 'flex', gap: '0.5rem', flexWrap: 'wrap' },
  input: {
    flex: 1,
    minWidth: '200px',
    padding: '0.75rem 1rem',
    borderRadius: '8px',
    border: '1px solid #ddd',
    fontSize: '1rem',
  },
  button: {
    padding: '0.75rem 1.5rem',
    borderRadius: '8px',
    border: 'none',
    background: '#4f46e5',
    color: '#fff',
    fontWeight: 600,
    cursor: 'pointer',
    fontSize: '1rem',
  },
  feedback: { marginTop: '1rem', fontSize: '0.9rem' },
};
