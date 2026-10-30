import React, { useState } from 'react';
import { 
  Sparkles, Terminal, Shield, Trophy, ArrowRight, 
  HelpCircle, ChevronDown, CheckCircle, Code2, Users, Rocket, Clock
} from 'lucide-react';
import Countdown from './Countdown';

export default function Hero({ setActiveTab }) {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      q: 'When does the 24-hour hackathon begin and end?',
      a: 'The hackathon starts promptly on October 30, 2026, at 7:30 PM IST and concludes exactly 24 hours later on October 31, 2026, at 7:30 PM IST.'
    },
    {
      q: 'How many members are allowed per team?',
      a: 'Each team can have a minimum of 1 member (solo participants are welcome!) and a maximum of 4 members.'
    },
    {
      q: 'How does team verification work if we already registered & paid ₹200 on Google Forms?',
      a: 'Head over to the "Check-in Portal" on this website. Enter your Team Name or Registered Email, and the system will pull up your verified Team ID and registration roster.'
    },
    {
      q: 'Where do we submit our projects?',
      a: 'Projects are submitted via the "Submit Project" tab on this website before 7:30 PM on October 31. You will need your Team ID, public GitHub repo link, and a short demo video link.'
    },
    {
      q: 'Who is organizing this hackathon?',
      a: 'This hackathon is proudly organized by Club ForMa (core members Parthiban S and A Jerrin Anto) in strategic collaboration with co-organizer Akshath Manoj.'
    }
  ];

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '120px 24px 60px 24px' }}>
      
      {/* Hero Header Section */}
      <div style={{ textAlign: 'center', position: 'relative', zIndex: 10 }}>
        
        {/* Glowing Collaboration Pill */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '10px',
          padding: '6px 20px',
          borderRadius: '9999px',
          background: 'rgba(255, 42, 122, 0.1)',
          border: '1px solid rgba(255, 42, 122, 0.3)',
          marginBottom: '24px',
          boxShadow: '0 0 20px rgba(255, 42, 122, 0.2)'
        }}>
          <span style={{
            fontSize: '0.8rem',
            fontFamily: 'var(--font-mono)',
            fontWeight: 700,
            color: '#ff4f93'
          }}>
            CLUB FORMA
          </span>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>✕</span>
          <span style={{
            fontSize: '0.8rem',
            fontFamily: 'var(--font-mono)',
            fontWeight: 700,
            color: '#38bdf8'
          }}>
            AKSHATH MANOJ
          </span>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>•</span>
          <span style={{
            fontSize: '0.75rem',
            color: '#34d399',
            fontWeight: 700,
            letterSpacing: '0.05em'
          }}>
            OCT 30–31, 2026
          </span>
        </div>

        {/* Main Title */}
        <h1 style={{
          fontSize: 'clamp(2.5rem, 6vw, 4.8rem)',
          fontFamily: 'var(--font-display)',
          fontWeight: 800,
          lineHeight: 1.08,
          letterSpacing: '-0.03em',
          maxWidth: '1050px',
          margin: '0 auto 20px auto'
        }}>
          The Ultimate 24-Hour <br />
          <span className="text-gradient">Online Hackathon</span>
        </h1>

        <p style={{
          fontSize: 'clamp(1rem, 2vw, 1.25rem)',
          color: 'var(--text-secondary)',
          maxWidth: '720px',
          margin: '0 auto 32px auto',
          lineHeight: '1.6'
        }}>
          24 continuous hours of coding, architecture, and bold ideas. From Oct 30 at 7:30 PM to Oct 31 at 7:30 PM, build alongside passionate creators across the country.
        </p>

        {/* Dynamic Countdown */}
        <Countdown />

        {/* CTA Buttons */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '16px',
          flexWrap: 'wrap',
          marginTop: '32px'
        }}>
          <button 
            onClick={() => setActiveTab('war-room')}
            className="btn-primary"
            style={{ padding: '14px 32px', fontSize: '1rem' }}
          >
            <Sparkles size={18} />
            <span>Enter 24h War Room</span>
          </button>

          <button 
            onClick={() => setActiveTab('team-portal')}
            className="btn-secondary"
            style={{ padding: '14px 28px', fontSize: '1rem' }}
          >
            <Shield size={18} color="#38bdf8" />
            <span>Check-in & Verify Team</span>
          </button>

          <button 
            onClick={() => setActiveTab('submission')}
            className="btn-secondary"
            style={{ padding: '14px 28px', fontSize: '1rem' }}
          >
            <Rocket size={18} color="#ff2a7a" />
            <span>Submit Project</span>
          </button>
        </div>

        {/* Highlight Stats Pill Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '16px',
          marginTop: '60px',
          maxWidth: '1000px',
          margin: '60px auto 0 auto'
        }}>
          {[
            { icon: Clock, label: 'Duration', val: '24 Hours Non-Stop', desc: '7:30 PM to 7:30 PM IST', color: '#ff2a7a' },
            { icon: Users, label: 'Team Size', val: '1 to 4 Members', desc: 'Solo or squad squads', color: '#8e38ff' },
            { icon: Trophy, label: 'Entry Fee', val: '₹200 / Team', desc: 'Pre-paid via Google Form', color: '#10b981' },
            { icon: Code2, label: 'Format', val: '100% Online', desc: 'Discord, Meet & GitHub', color: '#00d2ff' }
          ].map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div 
                key={idx}
                className="glass-panel"
                style={{
                  padding: '20px',
                  textAlign: 'left',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px'
                }}
              >
                <div style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '12px',
                  background: `${stat.color}15`,
                  border: `1px solid ${stat.color}35`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Icon size={22} color={stat.color} />
                </div>
                <div>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                    {stat.label.toUpperCase()}
                  </span>
                  <div style={{ fontWeight: 800, fontSize: '1.05rem', fontFamily: 'var(--font-display)' }}>
                    {stat.val}
                  </div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                    {stat.desc}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Quick Navigation Cards */}
      <div style={{ marginTop: '80px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h3 style={{ fontSize: '2rem', fontFamily: 'var(--font-display)', fontWeight: 800 }}>
            Everything You Need For The Sprint
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            Built specifically to give teams maximum agility and clear checkpoints.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px'
        }}>
          <div 
            onClick={() => setActiveTab('tracks')}
            className="glass-panel"
            style={{ padding: '30px', cursor: 'pointer' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
              <Code2 size={28} color="#ff2a7a" />
              <ArrowRight size={20} color="#ff2a7a" />
            </div>
            <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 700, marginBottom: '8px' }}>
              2 Domains • 4 Problem Statements
            </h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              Focused real-world challenges across Education and Healthcare domains.
            </p>
          </div>

          <div 
            onClick={() => setActiveTab('war-room')}
            className="glass-panel"
            style={{ padding: '30px', cursor: 'pointer' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
              <Clock size={28} color="#8e38ff" />
              <ArrowRight size={20} color="#8e38ff" />
            </div>
            <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 700, marginBottom: '8px' }}>
              24-Hour Live Roadmap
            </h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              7 milestone checkpoints, live broadcast ticker, and late-night focus tools to keep the energy soaring.
            </p>
          </div>

          <div 
            onClick={() => setActiveTab('organizers')}
            className="glass-panel"
            style={{ padding: '30px', cursor: 'pointer' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
              <Users size={28} color="#00d2ff" />
              <ArrowRight size={20} color="#00d2ff" />
            </div>
            <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 700, marginBottom: '8px' }}>
              ForMa & Organizers
            </h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              Meet Parthiban S, A Jerrin Anto, and co-organizer Akshath Manoj behind the initiative.
            </p>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div style={{ marginTop: '90px', maxWidth: '850px', margin: '90px auto 0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <span className="live-pill" style={{ marginBottom: '12px' }}>
            <HelpCircle size={14} />
            <span>FREQUENTLY ASKED QUESTIONS</span>
          </span>
          <h3 style={{ fontSize: '2.2rem', fontFamily: 'var(--font-display)', fontWeight: 800 }}>
            Got Questions? We Have Answers
          </h3>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div 
                key={idx}
                className="glass-panel"
                style={{ padding: '20px 24px', cursor: 'pointer' }}
                onClick={() => setOpenFaq(isOpen ? null : idx)}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
                  <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', fontWeight: 700 }}>
                    {faq.q}
                  </h4>
                  <ChevronDown 
                    size={20} 
                    style={{ 
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0)', 
                      transition: 'transform 0.25s ease',
                      flexShrink: 0
                    }} 
                  />
                </div>

                {isOpen && (
                  <p style={{ 
                    marginTop: '12px', 
                    fontSize: '0.92rem', 
                    color: 'var(--text-secondary)', 
                    lineHeight: '1.6',
                    borderTop: '1px solid var(--border-subtle)',
                    paddingTop: '12px'
                  }}>
                    {faq.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
