import React from 'react';
import { Users, Award, Shield, Heart, Sparkles, ExternalLink, Terminal, Mail, CheckCircle } from 'lucide-react';

export default function Organizers() {
  const clubMembers = [
    {
      name: 'PARTHIBAN S',
      role: 'Core Member & Tech Lead',
      club: 'Club ForMa',
      tag: 'ForMa Member',
      avatarColor: 'linear-gradient(135deg, #ff2a7a, #8e38ff)'
    },
    {
      name: 'A JERRIN ANTO',
      role: 'Core Member & Operations Lead',
      club: 'Club ForMa',
      tag: 'ForMa Member',
      avatarColor: 'linear-gradient(135deg, #8e38ff, #2a75ff)'
    }
  ];

  const coOrganizer = {
    name: 'AKSHATH MANOJ',
    role: 'Co-Organizer & Event Coordinator',
    badge: 'Strategic Co-Organizer',
    desc: 'Passionate organizer collaborating with Club ForMa to bring this 24-hour virtual hackathon to life for builders, developers, and visionaries.',
    avatarColor: 'linear-gradient(135deg, #00d2ff, #2a75ff)'
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '44px' }}>
        <span className="live-pill" style={{ marginBottom: '14px' }}>
          <Sparkles size={14} />
          <span>BEHIND THE HACKATHON</span>
        </span>
        <h2 style={{
          fontSize: '2.8rem',
          fontFamily: 'var(--font-display)',
          fontWeight: 800,
          marginBottom: '12px'
        }}>
          Meet the <span className="text-gradient">Organizing Force</span>
        </h2>
        <p style={{
          color: 'var(--text-secondary)',
          fontSize: '1.05rem',
          maxWidth: '680px',
          margin: '0 auto'
        }}>
          Powered by the collaboration between <strong>Club ForMa</strong> and co-organizer <strong>Akshath Manoj</strong>, uniting passion and technology for 24 hours of pure creativity.
        </p>
      </div>

      {/* Collaboration Spotlight Card */}
      <div 
        className="glass-panel"
        style={{
          padding: '36px',
          marginBottom: '40px',
          background: 'linear-gradient(135deg, rgba(255, 42, 122, 0.08) 0%, rgba(142, 56, 255, 0.08) 50%, rgba(42, 117, 255, 0.08) 100%)',
          border: '1px solid rgba(255, 42, 122, 0.25)'
        }}
      >
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '24px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '20px',
              padding: '6px',
              background: 'var(--gradient-forma)',
              boxShadow: '0 0 25px rgba(255, 42, 122, 0.45)',
              flexShrink: 0
            }}>
              <img 
                src="/forma-logo.png" 
                alt="ForMa Logo" 
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  borderRadius: '14px',
                  background: '#ffffff'
                }}
              />
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                <h3 style={{ fontSize: '1.8rem', fontFamily: 'var(--font-display)', fontWeight: 800 }}>
                  Club ForMa
                </h3>
                <span style={{
                  fontSize: '0.72rem',
                  fontFamily: 'var(--font-mono)',
                  color: '#ff4f93',
                  background: 'rgba(255, 42, 122, 0.15)',
                  padding: '3px 8px',
                  borderRadius: '6px',
                  fontWeight: 700
                }}>
                  OFFICIAL HOST
                </span>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', maxWidth: '580px' }}>
                A vibrant developer collective driven by curiosity, code craftsmanship, and next-generation ideas.
              </p>
            </div>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            background: 'rgba(255, 255, 255, 0.04)',
            padding: '12px 20px',
            borderRadius: '12px',
            border: '1px solid var(--border-subtle)'
          }}>
            <Shield color="#38bdf8" size={24} />
            <div>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>COLLABORATION MODEL</span>
              <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#ffffff' }}>Club ForMa × Akshath Manoj</div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Co-Organizer + Club Members */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '24px',
        marginBottom: '40px'
      }}>
        
        {/* Co-Organizer Card */}
        <div 
          className="glass-panel"
          style={{
            padding: '32px',
            border: '1px solid rgba(56, 189, 248, 0.35)',
            background: 'linear-gradient(180deg, rgba(14, 24, 46, 0.75) 0%, rgba(10, 13, 26, 0.9) 100%)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
            <span style={{
              fontSize: '0.72rem',
              fontFamily: 'var(--font-mono)',
              color: '#38bdf8',
              background: 'rgba(56, 189, 248, 0.15)',
              padding: '3px 10px',
              borderRadius: '6px',
              fontWeight: 700,
              border: '1px solid rgba(56, 189, 248, 0.3)'
            }}>
              {coOrganizer.badge}
            </span>
            <Sparkles size={18} color="#38bdf8" />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '18px' }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '16px',
              background: coOrganizer.avatarColor,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontFamily: 'var(--font-display)',
              fontSize: '1.3rem',
              color: '#ffffff',
              boxShadow: '0 4px 15px rgba(0, 210, 255, 0.3)'
            }}>
              AM
            </div>
            <div>
              <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', fontWeight: 800 }}>
                {coOrganizer.name}
              </h4>
              <p style={{ fontSize: '0.82rem', color: '#38bdf8', fontWeight: 600 }}>
                {coOrganizer.role}
              </p>
            </div>
          </div>

          <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: '1.6' }}>
            {coOrganizer.desc}
          </p>
        </div>

        {/* Club Members */}
        {clubMembers.map((member, idx) => (
          <div 
            key={idx}
            className="glass-panel"
            style={{
              padding: '32px',
              border: '1px solid rgba(255, 42, 122, 0.25)',
              background: 'linear-gradient(180deg, rgba(28, 18, 38, 0.75) 0%, rgba(10, 13, 26, 0.9) 100%)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <span style={{
                fontSize: '0.72rem',
                fontFamily: 'var(--font-mono)',
                color: '#ff4f93',
                background: 'rgba(255, 42, 122, 0.15)',
                padding: '3px 10px',
                borderRadius: '6px',
                fontWeight: 700,
                border: '1px solid rgba(255, 42, 122, 0.3)'
              }}>
                {member.tag}
              </span>
              <Terminal size={18} color="#ff4f93" />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '18px' }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '16px',
                background: member.avatarColor,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontFamily: 'var(--font-display)',
                fontSize: '1.3rem',
                color: '#ffffff',
                boxShadow: '0 4px 15px rgba(255, 42, 122, 0.3)'
              }}>
                {member.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', fontWeight: 800 }}>
                  {member.name}
                </h4>
                <p style={{ fontSize: '0.82rem', color: '#ff4f93', fontWeight: 600 }}>
                  {member.role}
                </p>
              </div>
            </div>

            <div style={{
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '8px',
              padding: '10px 14px',
              fontSize: '0.82rem',
              color: 'var(--text-secondary)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <CheckCircle size={15} color="#10b981" />
              <span>Full-Stack & Event Infrastructure Lead</span>
            </div>
          </div>
        ))}

      </div>

      {/* Event Details Summary Banner */}
      <div className="glass-panel" style={{ padding: '24px 32px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px',
          textAlign: 'center'
        }}>
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>START TIME</span>
            <div style={{ fontWeight: 700, fontSize: '1.1rem', marginTop: '4px' }}>Oct 30, 7:30 PM IST</div>
          </div>
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>END TIME</span>
            <div style={{ fontWeight: 700, fontSize: '1.1rem', marginTop: '4px' }}>Oct 31, 12:00 AM Midnight IST (Extended)</div>
          </div>
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>TEAM DYNAMICS</span>
            <div style={{ fontWeight: 700, fontSize: '1.1rem', marginTop: '4px' }}>1 to 4 Members</div>
          </div>
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>REGISTRATION FEE</span>
            <div style={{ fontWeight: 700, fontSize: '1.1rem', color: '#10b981', marginTop: '4px' }}>₹200 / Team (Verified)</div>
          </div>
        </div>
      </div>

    </div>
  );
}
