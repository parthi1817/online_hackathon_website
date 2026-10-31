import React from 'react';
import { Heart, Sparkles, Terminal } from 'lucide-react';

export default function Footer({ setActiveTab, onOpenAdmin }) {
  return (
    <footer style={{
      borderTop: '1px solid rgba(255, 255, 255, 0.08)',
      background: 'rgba(6, 7, 18, 0.95)',
      padding: '48px 24px 32px 24px',
      marginTop: '80px',
      position: 'relative',
      zIndex: 10
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '32px'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '24px'
        }}>
          {/* Logo & Vision */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{
              width: '46px',
              height: '46px',
              borderRadius: '12px',
              padding: '4px',
              background: 'var(--gradient-forma)',
              boxShadow: '0 0 15px rgba(255, 42, 122, 0.35)'
            }}>
              <img 
                src="/forma-logo.png" 
                alt="ForMa Logo" 
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  borderRadius: '8px',
                  background: '#ffffff'
                }} 
              />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 800,
                  fontSize: '1.25rem',
                  color: '#ffffff'
                }}>
                  Club ForMa
                </span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>×</span>
                <span style={{ fontSize: '0.9rem', color: '#38bdf8', fontWeight: 700 }}>
                  Akshath Manoj
                </span>
              </div>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Online Hackathon • October 30, 7:30 PM – October 31, 12:00 AM Midnight IST (Extended Deadline)
              </p>
            </div>
          </div>

          {/* Quick links */}
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', fontSize: '0.85rem' }}>
            <span onClick={() => setActiveTab('overview')} style={{ color: 'var(--text-secondary)', cursor: 'pointer' }}>Overview</span>
            <span onClick={() => setActiveTab('tracks')} style={{ color: 'var(--text-secondary)', cursor: 'pointer' }}>Tracks</span>
            <span onClick={() => setActiveTab('war-room')} style={{ color: 'var(--text-secondary)', cursor: 'pointer' }}>War Room</span>
            <span onClick={() => setActiveTab('team-portal')} style={{ color: 'var(--text-secondary)', cursor: 'pointer' }}>Check-in</span>
            <span onClick={() => setActiveTab('submission')} style={{ color: 'var(--text-secondary)', cursor: 'pointer' }}>Submissions</span>
            <span onClick={() => setActiveTab('organizers')} style={{ color: 'var(--text-secondary)', cursor: 'pointer' }}>Organizers</span>
          </div>
        </div>

        {/* Organizer credits & copyright */}
        <div style={{
          borderTop: '1px solid var(--border-subtle)',
          paddingTop: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
          fontSize: '0.8rem',
          color: 'var(--text-muted)'
        }}>
          <div>
            Organized with passion by <strong>Club ForMa</strong> (Members: <em>Parthiban S, A Jerrin Anto</em>) & Co-Organizer <em>Akshath Manoj</em>.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            {onOpenAdmin && (
              <button
                onClick={onOpenAdmin}
                style={{
                  background: 'rgba(255, 42, 122, 0.1)',
                  border: '1px solid rgba(255, 42, 122, 0.3)',
                  color: '#ff4f93',
                  padding: '4px 12px',
                  borderRadius: '6px',
                  fontSize: '0.75rem',
                  fontFamily: 'var(--font-mono)',
                  cursor: 'pointer'
                }}
              >
                🔒 Organizer Broadcast Console
              </button>
            )}
            <span>© 2026 ForMa Hackathon</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
