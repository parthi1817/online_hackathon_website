import React, { useState } from 'react';
import { 
  GraduationCap, HeartPulse, Sparkles, ChevronRight, 
  CheckCircle, AlertCircle, Target, ArrowRight, Layers
} from 'lucide-react';

export default function Tracks({ setActiveTab }) {
  const [selectedDomain, setSelectedDomain] = useState('all');

  const problemStatements = [
    {
      id: 'ed-01',
      code: 'PS-ED01',
      domain: 'education',
      domainName: 'Education Domain',
      domainTag: 'EDTECH & LEARNING',
      color: '#38bdf8',
      icon: GraduationCap,
      title: 'Regional Language AI Tutor & Homework Helper',
      problem: 'Students studying in vernacular or regional mediums struggle to understand complex STEM concepts without local language explanations, and lack access to 24/7 personal tutors when stuck on homework.',
      challenge: 'Build a voice-based AI tutor that explains difficult school concepts step-by-step in local languages and helps students solve doubts without just giving away direct answers.',
      features: [
        'Voice & audio explanations in native regional languages',
        'Step-by-step guided hints instead of instant direct solutions',
        'Photo upload of handwritten math/science problems for guided walkthroughs'
      ],
      techStack: 'Voice AI / TTS, Multilingual LLMs, OCR, Web/Mobile App'
    },
    {
      id: 'ed-02',
      code: 'PS-ED02',
      domain: 'education',
      domainName: 'Education Domain',
      domainTag: 'ADAPTIVE EDTECH',
      color: '#818cf8',
      icon: GraduationCap,
      title: 'Personalized AI Learning & Exam Prep Platform',
      problem: 'Students have different learning speeds, knowledge gaps, and learning preferences, but most educational platforms provide the same learning materials to everyone. This makes it difficult for students to identify their weaknesses and prepare effectively for examinations.',
      challenge: "Build an AI-powered learning platform that assesses a student's knowledge, identifies weak topics, and generates a personalized study plan with suitable explanations, practice questions, and progress tracking.",
      features: [
        'Diagnostic assessments to automatically detect weak subjects/topics',
        'Dynamic custom study timetable tailored to individual learning speeds',
        'Adaptive practice question sets with instant progress mastery tracking'
      ],
      techStack: 'Analytics Engine, Adaptive Testing, Generative AI, React / Node.js'
    },
    {
      id: 'hc-01',
      code: 'PS-HC01',
      domain: 'healthcare',
      domainName: 'Healthcare Domain',
      domainTag: 'EMERGENCY HEALTHTECH',
      color: '#ff2a7a',
      icon: HeartPulse,
      title: 'Emergency Blood Donor & Rare Group Matcher',
      problem: 'During surgeries or road accidents, families desperately post on WhatsApp groups trying to find rare blood groups or platelets while wasting crucial minutes.',
      challenge: 'Build a real-time emergency platform that instantly matches hospital blood requirements with nearby verified donors based on live location, sending instant push alerts to save lives faster.',
      features: [
        'Live geolocation-based matching of nearby verified donors',
        'Urgent hospital blood & platelet request broadcasts with instant SOS alerts',
        'Donor verification, eligibility tracker, and emergency contact network'
      ],
      techStack: 'Geolocation API, Real-Time WebSockets, Push Notifications, PWA'
    },
    {
      id: 'hc-02',
      code: 'PS-HC02',
      domain: 'healthcare',
      domainName: 'Healthcare Domain',
      domainTag: 'CLINICAL OPERATIONS',
      color: '#f43f5e',
      icon: HeartPulse,
      title: 'Smart Hospital Queue & Appointment Management Platform',
      problem: 'Patients often experience long waiting times at clinics and hospitals because appointment schedules, doctor availability, and patient queues are not efficiently coordinated. This can lead to overcrowding, uncertainty, and wasted time for both patients and healthcare staff.',
      challenge: 'Develop a platform that manages appointment bookings, provides estimated waiting times, and helps clinics organize patient queues based on appointment schedules and operational priorities.',
      features: [
        'Live virtual token system with dynamic, real-time wait time estimates',
        'Smart appointment scheduling synced with doctor availability & delays',
        'Priority-based queue sorting for emergencies vs. regular outpatients'
      ],
      techStack: 'Queue Algorithms, Real-time Dashboard, SMS/WhatsApp Alerts, Cloud DB'
    }
  ];

  const filteredStatements = selectedDomain === 'all'
    ? problemStatements
    : problemStatements.filter(ps => ps.domain === selectedDomain);

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '40px 24px' }}>
      {/* Header Section */}
      <div style={{ textAlign: 'center', marginBottom: '36px' }}>
        <span className="live-pill" style={{ marginBottom: '14px' }}>
          <Sparkles size={14} />
          <span>2 CORE DOMAINS • 4 PROBLEM STATEMENTS</span>
        </span>
        <h2 style={{
          fontSize: '2.8rem',
          fontFamily: 'var(--font-display)',
          fontWeight: 800,
          marginBottom: '12px'
        }}>
          Hackathon <span className="text-gradient">Problem Statements</span>
        </h2>
        <p style={{
          color: 'var(--text-secondary)',
          fontSize: '1.05rem',
          maxWidth: '680px',
          margin: '0 auto',
          lineHeight: '1.6'
        }}>
          Choose from 2 high-impact domains: <strong>Education</strong> and <strong>Healthcare</strong>. 
          Each domain features 2 focused, real-world problem statements designed for practical 24-hour innovation.
        </p>
      </div>

      {/* Filter Buttons */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px',
        flexWrap: 'wrap',
        marginBottom: '40px'
      }}>
        <button
          onClick={() => setSelectedDomain('all')}
          style={{
            background: selectedDomain === 'all' ? 'var(--gradient-forma)' : 'rgba(255, 255, 255, 0.05)',
            color: selectedDomain === 'all' ? '#ffffff' : 'var(--text-secondary)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '9999px',
            padding: '10px 22px',
            fontFamily: 'var(--font-display)',
            fontWeight: 600,
            fontSize: '0.9rem',
            cursor: 'pointer',
            transition: 'all 0.2s',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <Layers size={16} />
          <span>All Problem Statements (4)</span>
        </button>

        <button
          onClick={() => setSelectedDomain('education')}
          style={{
            background: selectedDomain === 'education' ? 'rgba(56, 189, 248, 0.2)' : 'rgba(255, 255, 255, 0.05)',
            color: selectedDomain === 'education' ? '#38bdf8' : 'var(--text-secondary)',
            border: `1px solid ${selectedDomain === 'education' ? '#38bdf8' : 'var(--border-subtle)'}`,
            borderRadius: '9999px',
            padding: '10px 22px',
            fontFamily: 'var(--font-display)',
            fontWeight: 600,
            fontSize: '0.9rem',
            cursor: 'pointer',
            transition: 'all 0.2s',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <GraduationCap size={16} />
          <span>Education Domain (2)</span>
        </button>

        <button
          onClick={() => setSelectedDomain('healthcare')}
          style={{
            background: selectedDomain === 'healthcare' ? 'rgba(255, 42, 122, 0.2)' : 'rgba(255, 255, 255, 0.05)',
            color: selectedDomain === 'healthcare' ? '#ff2a7a' : 'var(--text-secondary)',
            border: `1px solid ${selectedDomain === 'healthcare' ? '#ff2a7a' : 'var(--border-subtle)'}`,
            borderRadius: '9999px',
            padding: '10px 22px',
            fontFamily: 'var(--font-display)',
            fontWeight: 600,
            fontSize: '0.9rem',
            cursor: 'pointer',
            transition: 'all 0.2s',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <HeartPulse size={16} />
          <span>Healthcare Domain (2)</span>
        </button>
      </div>

      {/* Problem Statements Cards Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
        gap: '28px'
      }}>
        {filteredStatements.map((ps) => {
          const Icon = ps.icon;
          return (
            <div 
              key={ps.id}
              className="glass-panel"
              style={{
                padding: '32px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                borderTop: `4px solid ${ps.color}`,
                position: 'relative'
              }}
            >
              <div>
                {/* Card Top Pill Bar */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '12px',
                      background: `${ps.color}18`,
                      border: `1px solid ${ps.color}40`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Icon size={22} color={ps.color} />
                    </div>
                    <div>
                      <span style={{
                        fontSize: '0.72rem',
                        fontFamily: 'var(--font-mono)',
                        fontWeight: 800,
                        letterSpacing: '0.06em',
                        color: ps.color,
                        display: 'block'
                      }}>
                        {ps.domainName.toUpperCase()}
                      </span>
                      <span style={{
                        fontSize: '0.7rem',
                        color: 'var(--text-muted)'
                      }}>
                        {ps.domainTag}
                      </span>
                    </div>
                  </div>

                  <span style={{
                    fontSize: '0.78rem',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 800,
                    letterSpacing: '0.06em',
                    color: ps.color,
                    background: `${ps.color}15`,
                    padding: '4px 12px',
                    borderRadius: '8px',
                    border: `1px solid ${ps.color}35`
                  }}>
                    {ps.code}
                  </span>
                </div>

                {/* Problem Title */}
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.35rem',
                  fontWeight: 800,
                  marginBottom: '16px',
                  lineHeight: '1.3'
                }}>
                  {ps.title}
                </h3>

                {/* The Problem Section */}
                <div style={{
                  background: 'rgba(239, 68, 68, 0.05)',
                  border: '1px solid rgba(239, 68, 68, 0.2)',
                  borderRadius: '10px',
                  padding: '14px',
                  marginBottom: '14px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                    <AlertCircle size={14} color="#f87171" />
                    <span style={{
                      fontSize: '0.72rem',
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 700,
                      color: '#f87171',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em'
                    }}>
                      The Problem:
                    </span>
                  </div>
                  <p style={{
                    color: 'var(--text-secondary)',
                    fontSize: '0.86rem',
                    lineHeight: '1.55',
                    margin: 0
                  }}>
                    {ps.problem}
                  </p>
                </div>

                {/* The Challenge Section */}
                <div style={{
                  background: `${ps.color}0a`,
                  border: `1px solid ${ps.color}30`,
                  borderRadius: '10px',
                  padding: '14px',
                  marginBottom: '18px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                    <Target size={14} color={ps.color} />
                    <span style={{
                      fontSize: '0.72rem',
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 700,
                      color: ps.color,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em'
                    }}>
                      The Challenge & Goal:
                    </span>
                  </div>
                  <p style={{
                    color: '#f1f5f9',
                    fontSize: '0.88rem',
                    lineHeight: '1.55',
                    margin: 0,
                    fontWeight: 500
                  }}>
                    {ps.challenge}
                  </p>
                </div>

                {/* Suggested Key Features */}
                <div style={{
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '10px',
                  padding: '14px',
                  marginBottom: '20px'
                }}>
                  <span style={{
                    fontSize: '0.72rem',
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--text-muted)',
                    textTransform: 'uppercase',
                    display: 'block',
                    marginBottom: '10px',
                    letterSpacing: '0.05em'
                  }}>
                    Key Features To Build:
                  </span>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {ps.features.map((feature, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                        <CheckCircle size={14} color={ps.color} style={{ marginTop: '2px', flexShrink: 0 }} />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Stack Hint */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '0.75rem',
                  color: 'var(--text-muted)',
                  fontFamily: 'var(--font-mono)',
                  marginBottom: '20px'
                }}>
                  <span style={{ color: ps.color, fontWeight: 700 }}>STACK:</span>
                  <span>{ps.techStack}</span>
                </div>
              </div>

              {/* Bottom Card Footer */}
              <div style={{
                borderTop: '1px solid var(--border-subtle)',
                paddingTop: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                  TEAM SIZE: 1–4 MEMBERS
                </span>
                {setActiveTab && (
                  <button
                    onClick={() => setActiveTab('submission')}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: ps.color,
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      cursor: 'pointer',
                      padding: 0
                    }}
                  >
                    <span>Submit Under This Track</span>
                    <ChevronRight size={14} />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
