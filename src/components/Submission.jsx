import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Rocket, Video, ExternalLink, Code2, 
  CheckCircle, FileText, Sparkles, AlertCircle, Copy, Check 
} from 'lucide-react';

const GithubIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);
import { submitProject } from '../supabaseClient';

export default function Submission({ prefilledTeamId = '' }) {
  const [formData, setFormData] = useState({
    teamId: prefilledTeamId || '',
    projectTitle: '',
    track: 'PS-ED01: Regional Language AI Tutor & Homework Helper',
    githubUrl: '',
    videoUrl: '',
    liveDemoUrl: '',
    techStack: 'React, Node.js, Python',
    description: '',
    challengesSolved: ''
  });

  const [loading, setLoading] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.teamId.trim()) {
      setErrorMsg('Please provide your official Team ID (e.g., FM-101).');
      return;
    }
    if (!formData.projectTitle.trim()) {
      setErrorMsg('Please enter your project title.');
      return;
    }
    if (!formData.githubUrl.includes('github.com')) {
      setErrorMsg('Please enter a valid GitHub repository URL.');
      return;
    }

    setLoading(true);
    try {
      const result = await submitProject({
        team_id: formData.teamId.toUpperCase().trim(),
        project_title: formData.projectTitle,
        track: formData.track,
        github_url: formData.githubUrl,
        video_url: formData.videoUrl,
        live_demo_url: formData.liveDemoUrl,
        tech_stack: formData.techStack,
        description: formData.description,
        challenges_solved: formData.challengesSolved
      });

      setSubmittedData(result);

      // Trigger celebratory confetti blast
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#ff2a7a', '#8e38ff', '#2a75ff', '#00d2ff', '#ffffff']
      });

    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || 'Error saving submission. Please check network.');
    } finally {
      setLoading(false);
    }
  };

  const copyReceipt = () => {
    navigator.clipboard.writeText(
      `ForMa 24H Hackathon Submission Receipt\nTeam ID: ${submittedData.team_id}\nProject: ${submittedData.project_title}\nTimestamp: ${submittedData.submitted_at || new Date().toISOString()}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 24px' }}>
      <div style={{ textAlign: 'center', marginBottom: '36px' }}>
        <span className="live-pill" style={{ marginBottom: '14px' }}>
          <Rocket size={14} />
          <span>PROJECT HAND-OFF</span>
        </span>
        <h2 style={{
          fontSize: '2.8rem',
          fontFamily: 'var(--font-display)',
          fontWeight: 800,
          marginBottom: '12px'
        }}>
          Project <span className="text-gradient">Submission Hub</span>
        </h2>
        <p style={{
          color: 'var(--text-secondary)',
          fontSize: '1.05rem',
          maxWidth: '650px',
          margin: '0 auto'
        }}>
          Final code submissions close precisely at 7:30 PM IST on Oct 31. Ensure your GitHub repo is public and your demo video is accessible.
        </p>
      </div>

      {submittedData ? (
        /* Submission Success Receipt */
        <div 
          className="glass-panel"
          style={{
            padding: '40px',
            textAlign: 'center',
            border: '2px solid rgba(16, 185, 129, 0.4)',
            background: 'linear-gradient(180deg, rgba(16, 185, 129, 0.08) 0%, rgba(6, 7, 18, 0.9) 100%)'
          }}
        >
          <div style={{
            width: '68px',
            height: '68px',
            borderRadius: '50%',
            background: 'rgba(16, 185, 129, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px auto',
            border: '2px solid #10b981'
          }}>
            <CheckCircle size={36} color="#10b981" />
          </div>

          <h3 style={{ fontSize: '2rem', fontFamily: 'var(--font-display)', fontWeight: 800, marginBottom: '8px' }}>
            Submission Successfully Received!
          </h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
            Congratulations on completing the 24-hour sprint! Your project is now queued for evaluation by the judging panel.
          </p>

          <div style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '12px',
            padding: '24px',
            maxWidth: '550px',
            margin: '0 auto 24px auto',
            textAlign: 'left'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '10px' }}>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Receipt ID</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#38bdf8' }}>{submittedData.id || 'SUB-FORMA-2026'}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '10px' }}>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Team ID</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#ff2a7a' }}>{submittedData.team_id}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '10px' }}>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Project Title</span>
              <span style={{ fontWeight: 600 }}>{submittedData.project_title}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Track</span>
              <span style={{ color: '#a855f7', fontWeight: 600 }}>{submittedData.track}</span>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <button 
              onClick={copyReceipt}
              className="btn-secondary"
            >
              {copied ? <Check size={16} color="#10b981" /> : <Copy size={16} />}
              <span>{copied ? 'Copied Receipt!' : 'Copy Submission Receipt'}</span>
            </button>
            <button 
              onClick={() => setSubmittedData(null)}
              className="btn-primary"
            >
              <span>Edit / Update Submission</span>
            </button>
          </div>
        </div>
      ) : (
        /* Submission Form */
        <form 
          onSubmit={handleSubmit}
          className="glass-panel"
          style={{ padding: '36px' }}
        >
          {errorMsg && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '12px 18px',
              background: 'rgba(239, 68, 68, 0.15)',
              border: '1px solid rgba(239, 68, 68, 0.4)',
              borderRadius: '10px',
              color: '#f87171',
              marginBottom: '24px',
              fontSize: '0.9rem'
            }}>
              <AlertCircle size={18} />
              <span>{errorMsg}</span>
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '20px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
                Team ID * (from Google Form verification)
              </label>
              <input 
                type="text"
                required
                value={formData.teamId}
                onChange={(e) => setFormData({ ...formData, teamId: e.target.value })}
                placeholder="e.g. FM-101"
                style={{
                  width: '100%',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '10px',
                  padding: '12px 16px',
                  color: '#ffffff',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.95rem'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
                Project Title *
              </label>
              <input 
                type="text"
                required
                value={formData.projectTitle}
                onChange={(e) => setFormData({ ...formData, projectTitle: e.target.value })}
                placeholder="e.g. NovaShield AI"
                style={{
                  width: '100%',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '10px',
                  padding: '12px 16px',
                  color: '#ffffff',
                  fontSize: '0.95rem'
                }}
              />
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
              Submission Track / Domain *
            </label>
            <select
              value={formData.track}
              onChange={(e) => setFormData({ ...formData, track: e.target.value })}
              style={{
                width: '100%',
                background: '#0e1224',
                border: '1px solid var(--border-subtle)',
                borderRadius: '10px',
                padding: '12px 16px',
                color: '#ffffff',
                fontSize: '0.95rem',
                outline: 'none'
              }}
            >
              <optgroup label="Education Domain">
                <option value="PS-ED01: Regional Language AI Tutor & Homework Helper">PS-ED01: Regional Language AI Tutor & Homework Helper</option>
                <option value="PS-ED02: Personalized AI Learning & Exam Prep Platform">PS-ED02: Personalized AI Learning & Exam Prep Platform</option>
              </optgroup>
              <optgroup label="Healthcare Domain">
                <option value="PS-HC01: Emergency Blood Donor & Rare Group Matcher">PS-HC01: Emergency Blood Donor & Rare Group Matcher</option>
                <option value="PS-HC02: Smart Hospital Queue & Appointment Manager">PS-HC02: Smart Hospital Queue & Appointment Manager</option>
              </optgroup>
            </select>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '20px' }}>
            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
                <GithubIcon size={16} />
                <span>Public GitHub Repository URL *</span>
              </label>
              <input 
                type="url"
                required
                value={formData.githubUrl}
                onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                placeholder="https://github.com/username/project"
                style={{
                  width: '100%',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '10px',
                  padding: '12px 16px',
                  color: '#ffffff',
                  fontSize: '0.95rem'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
                <Video size={16} />
                <span>Demo Video / Pitch Link (YouTube, Drive, Loom) *</span>
              </label>
              <input 
                type="url"
                required
                value={formData.videoUrl}
                onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                placeholder="https://youtu.be/... or Google Drive Link"
                style={{
                  width: '100%',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '10px',
                  padding: '12px 16px',
                  color: '#ffffff',
                  fontSize: '0.95rem'
                }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '20px' }}>
            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
                <ExternalLink size={16} />
                <span>Live Prototype / Deployment Link (Optional)</span>
              </label>
              <input 
                type="url"
                value={formData.liveDemoUrl}
                onChange={(e) => setFormData({ ...formData, liveDemoUrl: e.target.value })}
                placeholder="https://myproject.vercel.app"
                style={{
                  width: '100%',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '10px',
                  padding: '12px 16px',
                  color: '#ffffff',
                  fontSize: '0.95rem'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
                <Code2 size={16} />
                <span>Technologies / Tech Stack</span>
              </label>
              <input 
                type="text"
                value={formData.techStack}
                onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
                placeholder="e.g. Next.js, FastAPI, PostgreSQL, Tailwind"
                style={{
                  width: '100%',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '10px',
                  padding: '12px 16px',
                  color: '#ffffff',
                  fontSize: '0.95rem'
                }}
              />
            </div>
          </div>

          <div style={{ marginBottom: '28px' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
              Project Summary & Innovation (What makes it special?) *
            </label>
            <textarea 
              rows={4}
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Briefly describe what problem your project solves and how it works in 24 hours..."
              style={{
                width: '100%',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '10px',
                padding: '12px 16px',
                color: '#ffffff',
                fontSize: '0.95rem',
                resize: 'vertical',
                fontFamily: 'var(--font-body)'
              }}
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="btn-primary"
            style={{ width: '100%', justifyContent: 'center', padding: '16px', fontSize: '1.05rem' }}
          >
            <Sparkles size={20} />
            <span>{loading ? 'Submitting Project...' : 'Submit Project for Evaluation'}</span>
          </button>
        </form>
      )}
    </div>
  );
}
