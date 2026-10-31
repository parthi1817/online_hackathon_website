import React, { useState, useEffect } from 'react';
import { 
  Clock, Flame, Music, Volume2, VolumeX, Sparkles, 
  Bell, CheckCircle2, AlertTriangle, Play, Pause, RefreshCw, 
  Code, Zap, Trophy, Award, Send
} from 'lucide-react';
import { fetchAnnouncements, subscribeToAnnouncements } from '../supabaseClient';

export default function WarRoom({ onOpenAdminModal }) {
  // 24-Hour Milestones
  const milestones = [
    { hour: '00:00', time: 'Oct 30, 7:30 PM', title: 'Grand Kickoff & Problem Release', desc: 'Hackathon officially starts! Problem domains unlock and repo creations begin.', active: true, done: true },
    { hour: '04:00', time: 'Oct 30, 11:30 PM', title: 'Checkpoint 1: Architecture Check', desc: 'Confirm tech stack, repository link, and initial wireframes with your team.', active: true, done: false },
    { hour: '08:00', time: 'Oct 31, 3:30 AM', title: 'Midnight Survival & Speed Challenge', desc: 'Grab coffee, hit the typing speed sprint, and push core backend APIs.', active: false, done: false },
    { hour: '12:00', time: 'Oct 31, 7:30 AM', title: 'Halfway Mark: Functional Demo Sync', desc: 'Connect frontend to backend; verify user authentication and main workflow.', active: false, done: false },
    { hour: '18:00', time: 'Oct 31, 1:30 PM', title: 'Checkpoint 2: Code Freeze Warning', desc: 'No new major features. Shift focus to polish, edge cases, and UI cleanup.', active: false, done: false },
    { hour: '23:00', time: 'Oct 31, 6:30 PM', title: 'Submission Desk Open & Video Prep', desc: 'Record your 2-minute demo video, check public repo permissions, and submit.', active: true, done: true },
    { hour: 'EXTENDED', time: 'Oct 31, 12:00 AM', title: 'Extended Cutoff & Final Submission Lock', desc: 'Extended deadline closes at midnight. Submissions automatically lock and jury evaluation begins.', active: true, done: false }
  ];

  // Live Real-Time Announcements
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    // 1. Initial load
    fetchAnnouncements().then((data) => {
      setAnnouncements(data);
    });

    // 2. Real-time subscription listener
    const unsubscribe = subscribeToAnnouncements((newAnn) => {
      setAnnouncements((prev) => [newAnn, ...prev.filter(a => a.id !== newAnn.id)]);
    });

    return () => {
      if (typeof unsubscribe === 'function') unsubscribe();
    };
  }, []);

  // Audio Atmosphere (Synthwave / Lofi synth generator)
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioVisualizerBars] = useState([12, 28, 45, 20, 36, 52, 30, 18, 42, 60, 25, 38]);

  // Mini Speed Coding Game
  const codeSnippets = [
    "const hackathon = { name: 'ForMa 24H', hours: 24, prizePool: 'Exciting', status: 'Hacking' };",
    "export async function deployInnovation(team) { return await team.buildMasterpiece(); }",
    "if (coffeeCup.isEmpty()) { coffeeCup.refill(); continueCoding(); }"
  ];
  const [currentSnippetIndex, setCurrentSnippetIndex] = useState(0);
  const [typedInput, setTypedInput] = useState('');
  const [gameStartTime, setGameStartTime] = useState(null);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [wpm, setWpm] = useState(0);

  const handleTyping = (e) => {
    const val = e.target.value;
    if (!gameStartTime) setGameStartTime(Date.now());
    setTypedInput(val);

    const target = codeSnippets[currentSnippetIndex];
    if (val === target) {
      const timeTakenMinutes = (Date.now() - gameStartTime) / 1000 / 60;
      const words = target.length / 5;
      const calculatedWpm = Math.round(words / (timeTakenMinutes || 0.05));
      setWpm(calculatedWpm);
      setGameCompleted(true);
    }
  };

  const resetGame = () => {
    setCurrentSnippetIndex((prev) => (prev + 1) % codeSnippets.length);
    setTypedInput('');
    setGameStartTime(null);
    setGameCompleted(false);
    setWpm(0);
  };

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '40px 24px' }}>
      {/* Header Banner */}
      <div style={{
        textAlign: 'center',
        marginBottom: '40px',
        position: 'relative'
      }}>
        <div className="live-pill" style={{ marginBottom: '16px' }}>
          <Flame size={16} />
          <span>LIVE VIRTUAL OPERATIONS</span>
        </div>
        <h2 style={{
          fontSize: '2.8rem',
          fontFamily: 'var(--font-display)',
          fontWeight: 800,
          letterSpacing: '-0.02em',
          marginBottom: '12px'
        }}>
          24-Hour <span className="text-gradient">War Room</span>
        </h2>
        <p style={{
          color: 'var(--text-secondary)',
          fontSize: '1.05rem',
          maxWidth: '680px',
          margin: '0 auto'
        }}>
          Your central mission hub during the hackathon. Track real-time timeline checkpoints, stream official broadcast announcements, and recharge with focus tools.
        </p>
      </div>

      {/* Grid: Milestones & Live Feeds */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
        gap: '28px',
        marginBottom: '40px'
      }}>
        
        {/* Left Column: 24h Roadmap */}
        <div className="glass-panel" style={{ padding: '30px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '24px',
            borderBottom: '1px solid var(--border-subtle)',
            paddingBottom: '16px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Clock color="#ff2a7a" size={22} />
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 700 }}>
                24-Hour Milestone Roadmap
              </h3>
            </div>
            <span style={{
              fontSize: '0.75rem',
              fontFamily: 'var(--font-mono)',
              background: 'rgba(255, 42, 122, 0.1)',
              color: '#ff4f93',
              padding: '3px 10px',
              borderRadius: '6px',
              border: '1px solid rgba(255, 42, 122, 0.25)'
            }}>
              7 CHECKPOINTS
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', position: 'relative' }}>
            {milestones.map((m, idx) => (
              <div 
                key={idx} 
                style={{
                  display: 'flex',
                  gap: '16px',
                  alignItems: 'flex-start',
                  position: 'relative',
                  paddingLeft: '8px'
                }}
              >
                {/* Timeline connector dot */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  marginTop: '4px'
                }}>
                  <div style={{
                    width: '14px',
                    height: '14px',
                    borderRadius: '50%',
                    background: m.done 
                      ? '#10b981' 
                      : m.active 
                        ? 'var(--gradient-forma)' 
                        : 'rgba(255, 255, 255, 0.2)',
                    boxShadow: m.active ? '0 0 10px rgba(255, 42, 122, 0.7)' : 'none',
                    border: '2px solid #060712'
                  }} />
                  {idx < milestones.length - 1 && (
                    <div style={{
                      width: '2px',
                      height: '52px',
                      background: m.done ? 'rgba(16, 185, 129, 0.4)' : 'rgba(255, 255, 255, 0.08)',
                      margin: '4px 0'
                    }} />
                  )}
                </div>

                {/* Content */}
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                    <span style={{
                      fontSize: '0.78rem',
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 700,
                      color: m.active ? '#ff4f93' : 'var(--text-muted)'
                    }}>
                      {m.hour} ({m.time})
                    </span>
                    {m.active && (
                      <span style={{
                        fontSize: '0.65rem',
                        background: 'rgba(16, 185, 129, 0.2)',
                        color: '#34d399',
                        padding: '1px 6px',
                        borderRadius: '4px',
                        fontWeight: 700
                      }}>CURRENT STAGE</span>
                    )}
                  </div>
                  <h4 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1rem',
                    fontWeight: 600,
                    margin: '3px 0',
                    color: m.active ? '#ffffff' : 'var(--text-secondary)'
                  }}>
                    {m.title}
                  </h4>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                    {m.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Live Broadcasts & Midnight Tools */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          
          {/* Realtime Announcement Board */}
          <div className="glass-panel" style={{ padding: '30px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '20px',
              borderBottom: '1px solid var(--border-subtle)',
              paddingBottom: '16px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Bell color="#38bdf8" size={22} />
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 700 }}>
                  Live Broadcast Ticker
                </h3>
              </div>
              <span className="live-pill" style={{ padding: '3px 10px', fontSize: '0.7rem' }}>
                <span className="live-dot" /> SYNCED
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {announcements.map((a) => (
                <div 
                  key={a.id}
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '12px',
                    padding: '16px',
                    transition: 'border-color 0.2s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{
                      fontSize: '0.68rem',
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 700,
                      color: a.color,
                      background: `${a.color}15`,
                      border: `1px solid ${a.color}35`,
                      padding: '2px 8px',
                      borderRadius: '4px'
                    }}>
                      {a.tag}
                    </span>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                      {a.time || (a.created_at ? new Date(a.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Just now')}
                    </span>
                  </div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: '4px' }}>
                    {a.title}
                  </h4>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                    {a.body}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Midnight Chill Station (Lofi & Audio Visualizer) */}
          <div className="glass-panel" style={{
            padding: '24px',
            background: 'linear-gradient(135deg, rgba(28, 18, 48, 0.6) 0%, rgba(13, 15, 33, 0.8) 100%)',
            border: '1px solid rgba(142, 56, 255, 0.3)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Music color="#a855f7" size={20} />
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1rem' }}>
                  2:00 AM Midnight Synth & Focus
                </span>
              </div>
              <button 
                onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                style={{
                  background: isPlayingAudio ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  color: isPlayingAudio ? '#34d399' : '#ffffff',
                  borderRadius: '8px',
                  padding: '6px 14px',
                  cursor: 'pointer',
                  fontSize: '0.8rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                {isPlayingAudio ? <Volume2 size={16} /> : <VolumeX size={16} />}
                <span>{isPlayingAudio ? 'Focus Beats Playing' : 'Play Focus Beats'}</span>
              </button>
            </div>

            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
              Curated ambient cyber frequencies for deep programming states during late night hours.
            </p>

            {/* Simulated Animated Equalizer Bars */}
            <div style={{
              display: 'flex',
              alignItems: 'flex-end',
              gap: '6px',
              height: '42px',
              padding: '8px',
              background: 'rgba(0, 0, 0, 0.3)',
              borderRadius: '8px',
              justifyContent: 'center'
            }}>
              {audioVisualizerBars.map((height, i) => (
                <div 
                  key={i}
                  style={{
                    width: '6px',
                    height: isPlayingAudio ? `${Math.sin(Date.now() / 200 + i) * 15 + 22}px` : '6px',
                    background: 'var(--gradient-forma)',
                    borderRadius: '4px',
                    transition: 'height 0.15s ease'
                  }}
                />
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Midnight Coding Sprint Mini-Game */}
      <div className="glass-panel" style={{
        padding: '30px',
        border: '1px solid rgba(56, 189, 248, 0.25)',
        background: 'linear-gradient(180deg, rgba(16, 24, 48, 0.8) 0%, rgba(10, 13, 28, 0.9) 100%)'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
          marginBottom: '16px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Zap color="#38bdf8" size={24} />
            <div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 700 }}>
                Midnight Hacker Speed Sprint (Boredom Buster)
              </h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                Keep your fingers awake! Type the code snippet accurately to clock your WPM.
              </p>
            </div>
          </div>

          {gameCompleted && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              background: 'rgba(16, 185, 129, 0.15)',
              border: '1px solid rgba(16, 185, 129, 0.4)',
              padding: '6px 16px',
              borderRadius: '10px',
              color: '#34d399'
            }}>
              <Trophy size={18} />
              <span style={{ fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
                {wpm} WPM • NIGHT OWL STATUS!
              </span>
            </div>
          )}
        </div>

        {/* Snippet Display */}
        <div style={{
          background: '#04050b',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '10px',
          padding: '16px',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.95rem',
          color: '#38bdf8',
          marginBottom: '14px',
          userSelect: 'none',
          overflowX: 'auto'
        }}>
          {codeSnippets[currentSnippetIndex]}
        </div>

        {/* Input */}
        <div style={{ display: 'flex', gap: '12px' }}>
          <input 
            type="text"
            value={typedInput}
            onChange={handleTyping}
            placeholder="Click here and start typing the exact code snippet above..."
            disabled={gameCompleted}
            style={{
              flex: 1,
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '10px',
              padding: '12px 18px',
              color: '#ffffff',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.9rem',
              outline: 'none'
            }}
          />

          <button 
            onClick={resetGame}
            className="btn-secondary"
            style={{ padding: '10px 18px' }}
          >
            <RefreshCw size={16} />
            <span>Next Snippet</span>
          </button>
        </div>
      </div>

    </div>
  );
}
