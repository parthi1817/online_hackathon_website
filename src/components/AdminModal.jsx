import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, Send, Bell, Key, X, CheckCircle, 
  ExternalLink, Video, RefreshCw, FileText, Database,
  Users, UserPlus, Phone, Mail, CheckCircle2, ChevronDown, ChevronUp
} from 'lucide-react';
import { 
  postAnnouncement, 
  fetchAllSubmissions, 
  fetchAllTeams, 
  addTeam, 
  isSupabaseConfigured 
} from '../supabaseClient';

export default function AdminModal({ isOpen, onClose, onBroadcastSuccess }) {
  const [passcode, setPasscode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [activeTab, setActiveTab] = useState('teams'); // 'teams' | 'broadcast' | 'submissions'

  // Broadcast form state
  const [tag, setTag] = useState('URGENT');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [color, setColor] = useState('#ff2a7a');
  const [publishing, setPublishing] = useState(false);
  const [broadcastSuccess, setBroadcastSuccess] = useState(false);

  // Submissions list
  const [submissions, setSubmissions] = useState([]);
  const [loadingSubmissions, setLoadingSubmissions] = useState(false);

  // Teams management state
  const [teams, setTeams] = useState([]);
  const [loadingTeams, setLoadingTeams] = useState(false);
  const [showAddTeamModal, setShowAddTeamModal] = useState(false);
  const [teamFormError, setTeamFormError] = useState('');
  const [teamAddSuccess, setTeamAddSuccess] = useState('');
  const [submittingTeam, setSubmittingTeam] = useState(false);
  const [newTeam, setNewTeam] = useState({
    team_id: '',
    team_name: '',
    leader_name: '',
    leader_phone: '',
    leader_email: '',
    member2_name: '',
    member2_email: '',
    member3_name: '',
    member3_email: '',
    member4_name: '',
    member4_email: '',
    track: 'General / Open Track (Selection at Check-in)',
    payment_status: 'Verified'
  });

  const correctPasscode = import.meta.env.VITE_ORGANIZER_PASSCODE || 'parthi1001';

  const handleLogin = (e) => {
    e.preventDefault();
    if (passcode.trim() === correctPasscode) {
      setIsAuthenticated(true);
      setErrorMsg('');
      loadTeams();
      loadSubmissions();
    } else {
      setErrorMsg('Incorrect passcode. Access denied.');
    }
  };

  const loadTeams = async () => {
    setLoadingTeams(true);
    try {
      const data = await fetchAllTeams();
      setTeams(data || []);
      // Auto suggest next team id
      const nextNum = (data?.length || 0) + 101;
      setNewTeam(prev => ({ ...prev, team_id: `FM-${nextNum}` }));
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingTeams(false);
    }
  };

  const loadSubmissions = async () => {
    setLoadingSubmissions(true);
    try {
      const data = await fetchAllSubmissions();
      setSubmissions(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingSubmissions(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      if (activeTab === 'submissions') loadSubmissions();
      if (activeTab === 'teams') loadTeams();
    }
  }, [isAuthenticated, activeTab]);

  const handleBroadcast = async (e) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return;

    setPublishing(true);
    try {
      const created = await postAnnouncement({ tag, title, body, color });
      setBroadcastSuccess(true);
      setTitle('');
      setBody('');
      if (onBroadcastSuccess) onBroadcastSuccess(created);
      setTimeout(() => setBroadcastSuccess(false), 4000);
    } catch (err) {
      console.error(err);
      alert('Error broadcasting announcement: ' + err.message);
    } finally {
      setPublishing(false);
    }
  };

  const handleSaveNewTeam = async (e) => {
    e.preventDefault();
    setTeamFormError('');
    if (!newTeam.team_id.trim()) {
      setTeamFormError('Team ID is required (e.g. FM-103)');
      return;
    }
    if (!newTeam.leader_name.trim()) {
      setTeamFormError('Leader full name is required');
      return;
    }
    if (!newTeam.leader_email.trim()) {
      setTeamFormError('Leader email is required');
      return;
    }

    const members = [newTeam.leader_name.trim() + ' (Lead)'];
    const member_emails = [newTeam.leader_email.trim()];

    if (newTeam.member2_name.trim()) {
      members.push(newTeam.member2_name.trim());
      member_emails.push(newTeam.member2_email.trim() || newTeam.leader_email.trim());
    }
    if (newTeam.member3_name.trim()) {
      members.push(newTeam.member3_name.trim());
      member_emails.push(newTeam.member3_email.trim() || newTeam.leader_email.trim());
    }
    if (newTeam.member4_name.trim()) {
      members.push(newTeam.member4_name.trim());
      member_emails.push(newTeam.member4_email.trim() || newTeam.leader_email.trim());
    }

    setSubmittingTeam(true);
    try {
      await addTeam({
        team_id: newTeam.team_id,
        team_name: newTeam.team_name.trim() || `Team ${newTeam.leader_name.trim()}`,
        leader_name: newTeam.leader_name.trim(),
        leader_phone: newTeam.leader_phone.trim(),
        leader_email: newTeam.leader_email.trim(),
        members,
        member_emails,
        track: newTeam.track,
        payment_status: newTeam.payment_status
      });

      setTeamAddSuccess(`Team ${newTeam.team_id} successfully added!`);
      setShowAddTeamModal(false);
      setNewTeam({
        team_id: '',
        team_name: '',
        leader_name: '',
        leader_phone: '',
        leader_email: '',
        member2_name: '',
        member2_email: '',
        member3_name: '',
        member3_email: '',
        member4_name: '',
        member4_email: '',
        track: 'General / Open Track (Selection at Check-in)',
        payment_status: 'Verified'
      });
      await loadTeams();
      setTimeout(() => setTeamAddSuccess(''), 4000);
    } catch (err) {
      console.error(err);
      setTeamFormError(err.message || 'Failed to save team');
    } finally {
      setSubmittingTeam(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 100,
      background: 'rgba(0, 0, 0, 0.85)',
      backdropFilter: 'blur(12px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div 
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: '750px',
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: '32px',
          border: '1px solid rgba(255, 42, 122, 0.4)',
          boxShadow: '0 0 50px rgba(255, 42, 122, 0.25)',
          position: 'relative'
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'rgba(255, 255, 255, 0.08)',
            border: 'none',
            color: '#ffffff',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <X size={18} />
        </button>

        {/* Modal Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            background: 'rgba(255, 42, 122, 0.15)',
            border: '1px solid rgba(255, 42, 122, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <ShieldAlert size={24} color="#ff2a7a" />
          </div>
          <div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 800 }}>
              Organizer Command Console
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Reserved for Club ForMa (Parthiban, Jerrin) & Akshath Manoj
            </p>
          </div>
        </div>

        {!isAuthenticated ? (
          /* Authentication Screen */
          <form onSubmit={handleLogin} style={{ maxWidth: '400px', margin: '40px auto', textAlign: 'center' }}>
            <Key size={40} color="#38bdf8" style={{ margin: '0 auto 16px auto' }} />
            <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '8px' }}>
              Enter Organizer Passcode
            </h4>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '20px' }}>
              Enter your master key to broadcast live alerts and access incoming submissions.
            </p>

            {errorMsg && (
              <p style={{ color: '#f87171', fontSize: '0.85rem', marginBottom: '14px' }}>
                {errorMsg}
              </p>
            )}

            <input 
              type="password"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              placeholder="Enter organizer passcode"
              style={{
                width: '100%',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '10px',
                padding: '12px 16px',
                color: '#ffffff',
                textAlign: 'center',
                fontFamily: 'var(--font-mono)',
                fontSize: '1rem',
                marginBottom: '16px'
              }}
            />

            <button 
              type="submit"
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center', padding: '12px' }}
            >
              <span>Authenticate Console</span>
            </button>
          </form>
        ) : (
          /* Authenticated Dashboard */
          <div>
            {/* Status indicator */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: 'rgba(255, 255, 255, 0.03)',
              padding: '10px 16px',
              borderRadius: '10px',
              marginBottom: '20px',
              fontSize: '0.8rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="live-dot" />
                <span>Backend Status: <strong>{isSupabaseConfigured ? 'Supabase Realtime Connected' : 'Local Testing Mode (Instant)'}</strong></span>
              </div>
              <span style={{ color: '#10b981', fontWeight: 700 }}>Authorized ✓</span>
            </div>

            {/* Sub-tabs */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' }}>
              <button
                onClick={() => setActiveTab('teams')}
                style={{
                  flex: 1,
                  minWidth: '140px',
                  padding: '10px',
                  borderRadius: '10px',
                  border: 'none',
                  background: activeTab === 'teams' ? 'var(--gradient-forma)' : 'rgba(255, 255, 255, 0.05)',
                  color: '#ffffff',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  fontSize: '0.85rem'
                }}
              >
                <Users size={16} />
                <span>Teams & Roster ({teams.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('broadcast')}
                style={{
                  flex: 1,
                  minWidth: '140px',
                  padding: '10px',
                  borderRadius: '10px',
                  border: 'none',
                  background: activeTab === 'broadcast' ? 'var(--gradient-forma)' : 'rgba(255, 255, 255, 0.05)',
                  color: '#ffffff',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  fontSize: '0.85rem'
                }}
              >
                <Bell size={16} />
                <span>Live Broadcast</span>
              </button>

              <button
                onClick={() => setActiveTab('submissions')}
                style={{
                  flex: 1,
                  minWidth: '140px',
                  padding: '10px',
                  borderRadius: '10px',
                  border: 'none',
                  background: activeTab === 'submissions' ? 'var(--gradient-forma)' : 'rgba(255, 255, 255, 0.05)',
                  color: '#ffffff',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  fontSize: '0.85rem'
                }}
              >
                <FileText size={16} />
                <span>Submissions ({submissions.length})</span>
              </button>
            </div>

            {activeTab === 'teams' ? (
              /* Teams Management Panel */
              <div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '16px',
                  flexWrap: 'wrap',
                  gap: '10px'
                }}>
                  <div>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Users size={18} color="#ff2a7a" />
                      <span>Registered Teams Database ({teams.length})</span>
                    </h4>
                    <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                      All registered teams appear in the live Verification Portal instantly
                    </p>
                  </div>

                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => setShowAddTeamModal(!showAddTeamModal)}
                      className="btn-primary"
                      style={{ padding: '8px 16px', fontSize: '0.82rem', gap: '6px' }}
                    >
                      <UserPlus size={15} />
                      <span>{showAddTeamModal ? 'Cancel' : '+ Add Registered Team'}</span>
                    </button>

                    <button 
                      onClick={loadTeams}
                      className="btn-secondary"
                      style={{ padding: '8px 12px', fontSize: '0.82rem' }}
                      title="Reload from Database"
                    >
                      <RefreshCw size={14} className={loadingTeams ? 'live-dot' : ''} />
                    </button>
                  </div>
                </div>

                {teamAddSuccess && (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '12px 18px',
                    background: 'rgba(16, 185, 129, 0.15)',
                    border: '1px solid rgba(16, 185, 129, 0.4)',
                    borderRadius: '10px',
                    color: '#34d399',
                    marginBottom: '16px',
                    fontSize: '0.88rem'
                  }}>
                    <CheckCircle2 size={18} />
                    <span>{teamAddSuccess}</span>
                  </div>
                )}

                {/* Add Team Form */}
                {showAddTeamModal && (
                  <form 
                    onSubmit={handleSaveNewTeam}
                    style={{
                      background: 'rgba(255, 42, 122, 0.05)',
                      border: '1px solid rgba(255, 42, 122, 0.3)',
                      borderRadius: '12px',
                      padding: '20px',
                      marginBottom: '20px'
                    }}
                  >
                    <h5 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '14px', color: '#ff4f93' }}>
                      Add New Registered Team (Post-Google Form Sync)
                    </h5>

                    {teamFormError && (
                      <div style={{
                        padding: '8px 12px',
                        background: 'rgba(239, 68, 68, 0.2)',
                        border: '1px solid #ef4444',
                        borderRadius: '6px',
                        color: '#f87171',
                        fontSize: '0.82rem',
                        marginBottom: '12px'
                      }}>
                        {teamFormError}
                      </div>
                    )}

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', marginBottom: '12px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, marginBottom: '4px' }}>
                          Team ID *
                        </label>
                        <input
                          type="text"
                          required
                          value={newTeam.team_id}
                          onChange={(e) => setNewTeam({ ...newTeam, team_id: e.target.value })}
                          placeholder="e.g. FM-103"
                          style={{
                            width: '100%',
                            background: 'rgba(255, 255, 255, 0.05)',
                            border: '1px solid var(--border-subtle)',
                            borderRadius: '6px',
                            padding: '8px 10px',
                            color: '#ffffff',
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.85rem'
                          }}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, marginBottom: '4px' }}>
                          Team Name (Optional, defaults to Team [Leader])
                        </label>
                        <input
                          type="text"
                          value={newTeam.team_name}
                          onChange={(e) => setNewTeam({ ...newTeam, team_name: e.target.value })}
                          placeholder="e.g. Neural Hawks"
                          style={{
                            width: '100%',
                            background: 'rgba(255, 255, 255, 0.05)',
                            border: '1px solid var(--border-subtle)',
                            borderRadius: '6px',
                            padding: '8px 10px',
                            color: '#ffffff',
                            fontSize: '0.85rem'
                          }}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, marginBottom: '4px' }}>
                          Track
                        </label>
                        <select
                          value={newTeam.track}
                          onChange={(e) => setNewTeam({ ...newTeam, track: e.target.value })}
                          style={{
                            width: '100%',
                            background: '#0d1022',
                            border: '1px solid var(--border-subtle)',
                            borderRadius: '6px',
                            padding: '8px 10px',
                            color: '#ffffff',
                            fontSize: '0.85rem'
                          }}
                        >
                          <option value="General / Open Track (Selection at Check-in)">General / Open Track (Selection at Check-in)</option>
                          <option value="Artificial Intelligence & Smart Agents">Artificial Intelligence & Smart Agents</option>
                          <option value="FinTech, Security & Decentralized Tech">FinTech, Security & Decentralized Tech</option>
                          <option value="EdTech, HealthTech & Social Impact">EdTech, HealthTech & Social Impact</option>
                          <option value="Open Innovation & Wildcard">Open Innovation & Wildcard</option>
                        </select>
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', marginBottom: '14px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, marginBottom: '4px' }}>
                          Team Leader Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={newTeam.leader_name}
                          onChange={(e) => setNewTeam({ ...newTeam, leader_name: e.target.value })}
                          placeholder="Leader Full Name"
                          style={{
                            width: '100%',
                            background: 'rgba(255, 255, 255, 0.05)',
                            border: '1px solid var(--border-subtle)',
                            borderRadius: '6px',
                            padding: '8px 10px',
                            color: '#ffffff',
                            fontSize: '0.85rem'
                          }}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, marginBottom: '4px' }}>
                          Leader Email *
                        </label>
                        <input
                          type="email"
                          required
                          value={newTeam.leader_email}
                          onChange={(e) => setNewTeam({ ...newTeam, leader_email: e.target.value })}
                          placeholder="leader@gmail.com"
                          style={{
                            width: '100%',
                            background: 'rgba(255, 255, 255, 0.05)',
                            border: '1px solid var(--border-subtle)',
                            borderRadius: '6px',
                            padding: '8px 10px',
                            color: '#ffffff',
                            fontSize: '0.85rem'
                          }}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, marginBottom: '4px' }}>
                          Leader Phone
                        </label>
                        <input
                          type="text"
                          value={newTeam.leader_phone}
                          onChange={(e) => setNewTeam({ ...newTeam, leader_phone: e.target.value })}
                          placeholder="+91 98765 43210"
                          style={{
                            width: '100%',
                            background: 'rgba(255, 255, 255, 0.05)',
                            border: '1px solid var(--border-subtle)',
                            borderRadius: '6px',
                            padding: '8px 10px',
                            color: '#ffffff',
                            fontSize: '0.85rem'
                          }}
                        />
                      </div>
                    </div>

                    <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '8px', borderTop: '1px solid var(--border-subtle)', paddingTop: '10px' }}>
                      Additional Members (Leave blank if solo or smaller team)
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '8px' }}>
                      <input
                        type="text"
                        value={newTeam.member2_name}
                        onChange={(e) => setNewTeam({ ...newTeam, member2_name: e.target.value })}
                        placeholder="Member 2 Full Name"
                        style={{
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid var(--border-subtle)',
                          borderRadius: '6px',
                          padding: '7px 10px',
                          color: '#ffffff',
                          fontSize: '0.82rem'
                        }}
                      />
                      <input
                        type="email"
                        value={newTeam.member2_email}
                        onChange={(e) => setNewTeam({ ...newTeam, member2_email: e.target.value })}
                        placeholder="Member 2 Email"
                        style={{
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid var(--border-subtle)',
                          borderRadius: '6px',
                          padding: '7px 10px',
                          color: '#ffffff',
                          fontSize: '0.82rem'
                        }}
                      />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '8px' }}>
                      <input
                        type="text"
                        value={newTeam.member3_name}
                        onChange={(e) => setNewTeam({ ...newTeam, member3_name: e.target.value })}
                        placeholder="Member 3 Full Name"
                        style={{
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid var(--border-subtle)',
                          borderRadius: '6px',
                          padding: '7px 10px',
                          color: '#ffffff',
                          fontSize: '0.82rem'
                        }}
                      />
                      <input
                        type="email"
                        value={newTeam.member3_email}
                        onChange={(e) => setNewTeam({ ...newTeam, member3_email: e.target.value })}
                        placeholder="Member 3 Email"
                        style={{
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid var(--border-subtle)',
                          borderRadius: '6px',
                          padding: '7px 10px',
                          color: '#ffffff',
                          fontSize: '0.82rem'
                        }}
                      />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '16px' }}>
                      <input
                        type="text"
                        value={newTeam.member4_name}
                        onChange={(e) => setNewTeam({ ...newTeam, member4_name: e.target.value })}
                        placeholder="Member 4 Full Name"
                        style={{
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid var(--border-subtle)',
                          borderRadius: '6px',
                          padding: '7px 10px',
                          color: '#ffffff',
                          fontSize: '0.82rem'
                        }}
                      />
                      <input
                        type="email"
                        value={newTeam.member4_email}
                        onChange={(e) => setNewTeam({ ...newTeam, member4_email: e.target.value })}
                        placeholder="Member 4 Email"
                        style={{
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid var(--border-subtle)',
                          borderRadius: '6px',
                          padding: '7px 10px',
                          color: '#ffffff',
                          fontSize: '0.82rem'
                        }}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={submittingTeam}
                      className="btn-primary"
                      style={{ width: '100%', justifyContent: 'center', padding: '10px' }}
                    >
                      <UserPlus size={16} />
                      <span>{submittingTeam ? 'Registering Team...' : 'Save & Register Team to Supabase'}</span>
                    </button>
                  </form>
                )}

                {/* Teams List */}
                {teams.length === 0 ? (
                  <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '30px' }}>
                    No registered teams loaded yet.
                  </p>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {teams.map((t, idx) => (
                      <div
                        key={t.team_id || idx}
                        style={{
                          background: 'rgba(255, 255, 255, 0.03)',
                          border: '1px solid var(--border-subtle)',
                          borderRadius: '10px',
                          padding: '16px'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px', marginBottom: '8px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{
                              fontSize: '0.8rem',
                              fontFamily: 'var(--font-mono)',
                              color: '#ff2a7a',
                              background: 'rgba(255, 42, 122, 0.15)',
                              padding: '2px 8px',
                              borderRadius: '4px',
                              fontWeight: 700
                            }}>
                              {t.team_id}
                            </span>
                            <strong style={{ fontSize: '1.05rem' }}>
                              {t.team_name || `Team ${t.leader_name}`}
                            </strong>
                          </div>

                          <span style={{
                            fontSize: '0.75rem',
                            color: '#34d399',
                            background: 'rgba(16, 185, 129, 0.15)',
                            padding: '3px 8px',
                            borderRadius: '4px',
                            fontWeight: 700
                          }}>
                            ✓ {t.payment_status || 'Verified'}
                          </span>
                        </div>

                        <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                          <span>Track: <strong>{t.track}</strong></span>
                        </div>

                        <div style={{
                          background: 'rgba(0,0,0,0.2)',
                          padding: '10px',
                          borderRadius: '6px',
                          fontSize: '0.8rem',
                          marginBottom: '6px'
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                            <Mail size={13} color="#ff2a7a" />
                            <span>Leader Email: <strong style={{ color: '#ffffff' }}>{t.leader_email}</strong></span>
                            {t.leader_phone && (
                              <span style={{ marginLeft: '12px' }}>• Phone: <strong style={{ color: '#ffffff' }}>{t.leader_phone}</strong></span>
                            )}
                          </div>
                          
                          {t.members && t.members.length > 0 && (
                            <div style={{ marginTop: '6px', display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                              <span style={{ color: 'var(--text-muted)' }}>Roster:</span>
                              {t.members.map((m, mIdx) => {
                                const mEmail = t.member_emails?.[mIdx];
                                return (
                                  <span key={mIdx} style={{
                                    background: 'rgba(255,255,255,0.06)',
                                    padding: '2px 8px',
                                    borderRadius: '4px',
                                    color: '#e2e8f0',
                                    fontSize: '0.75rem'
                                  }}>
                                    {m} {mEmail && mEmail !== t.leader_email ? `(${mEmail})` : ''}
                                  </span>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : activeTab === 'broadcast' ? (
              /* Broadcast Form */
              <form onSubmit={handleBroadcast}>
                {broadcastSuccess && (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '12px 18px',
                    background: 'rgba(16, 185, 129, 0.15)',
                    border: '1px solid rgba(16, 185, 129, 0.4)',
                    borderRadius: '10px',
                    color: '#34d399',
                    marginBottom: '20px'
                  }}>
                    <CheckCircle size={18} />
                    <span>Broadcast successfully pushed to all participants!</span>
                  </div>
                )}

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '6px' }}>
                      Alert Tag / Type
                    </label>
                    <select
                      value={tag}
                      onChange={(e) => {
                        setTag(e.target.value);
                        if (e.target.value === 'URGENT') setColor('#ef4444');
                        else if (e.target.value === 'MILESTONE') setColor('#38bdf8');
                        else if (e.target.value === 'PERK') setColor('#10b981');
                        else setColor('#ff2a7a');
                      }}
                      style={{
                        width: '100%',
                        background: '#0d1022',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: '8px',
                        padding: '10px 14px',
                        color: '#ffffff',
                        fontSize: '0.9rem'
                      }}
                    >
                      <option value="URGENT">URGENT ALERT</option>
                      <option value="MILESTONE">MILESTONE UPDATE</option>
                      <option value="CHECKPOINT">CHECKPOINT ANNOUNCEMENT</option>
                      <option value="PERK">PERK / FOOD / BREAK</option>
                      <option value="INFO">GENERAL BROADCAST</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '6px' }}>
                      Accent Color
                    </label>
                    <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
                      {['#ef4444', '#ff2a7a', '#8e38ff', '#38bdf8', '#10b981'].map((c) => (
                        <div
                          key={c}
                          onClick={() => setColor(c)}
                          style={{
                            width: '30px',
                            height: '30px',
                            borderRadius: '50%',
                            background: c,
                            cursor: 'pointer',
                            border: color === c ? '3px solid #ffffff' : '2px solid transparent'
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '6px' }}>
                    Headline / Title *
                  </label>
                  <input 
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Checkpoint 1 submission starts in 15 minutes!"
                    style={{
                      width: '100%',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '8px',
                      padding: '10px 14px',
                      color: '#ffffff',
                      fontSize: '0.95rem'
                    }}
                  />
                </div>

                <div style={{ marginBottom: '24px' }}>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '6px' }}>
                    Broadcast Message Details *
                  </label>
                  <textarea 
                    rows={3}
                    required
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    placeholder="Enter instructions, meeting links, or advice for teams..."
                    style={{
                      width: '100%',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '8px',
                      padding: '10px 14px',
                      color: '#ffffff',
                      fontSize: '0.9rem',
                      resize: 'vertical'
                    }}
                  />
                </div>

                <button 
                  type="submit"
                  disabled={publishing}
                  className="btn-primary"
                  style={{ width: '100%', justifyContent: 'center', padding: '14px' }}
                >
                  <Send size={18} />
                  <span>{publishing ? 'Broadcasting...' : 'Broadcast to All Participants Now'}</span>
                </button>
              </form>
            ) : (
              /* Submissions Viewer */
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: 700 }}>
                    Incoming Project Submissions
                  </h4>
                  <button 
                    onClick={loadSubmissions}
                    className="btn-secondary"
                    style={{ padding: '6px 14px', fontSize: '0.8rem' }}
                  >
                    <RefreshCw size={14} className={loadingSubmissions ? 'live-dot' : ''} />
                    <span>Refresh</span>
                  </button>
                </div>

                {submissions.length === 0 ? (
                  <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '30px' }}>
                    No project submissions received yet. Submissions open on Hack Day!
                  </p>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {submissions.map((sub, i) => (
                      <div 
                        key={sub.id || i}
                        style={{
                          background: 'rgba(255, 255, 255, 0.03)',
                          border: '1px solid var(--border-subtle)',
                          borderRadius: '10px',
                          padding: '16px'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                          <div>
                            <span style={{
                              fontSize: '0.72rem',
                              fontFamily: 'var(--font-mono)',
                              color: '#ff2a7a',
                              background: 'rgba(255, 42, 122, 0.15)',
                              padding: '2px 8px',
                              borderRadius: '4px',
                              marginRight: '8px'
                            }}>
                              {sub.team_id}
                            </span>
                            <strong style={{ fontSize: '1.05rem' }}>{sub.project_title}</strong>
                          </div>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                            {new Date(sub.submitted_at || Date.now()).toLocaleTimeString()}
                          </span>
                        </div>

                        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '10px' }}>
                          {sub.description}
                        </p>

                        <div style={{ display: 'flex', gap: '16px', fontSize: '0.8rem', flexWrap: 'wrap' }}>
                          {sub.live_demo_url && (
                            <a 
                              href={sub.live_demo_url} 
                              target="_blank" 
                              rel="noreferrer"
                              style={{ color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px', textDecoration: 'none' }}
                            >
                              <ExternalLink size={14} /> Live Prototype
                            </a>
                          )}
                          {sub.github_url && (
                            <a 
                              href={sub.github_url} 
                              target="_blank" 
                              rel="noreferrer"
                              style={{ color: '#38bdf8', display: 'flex', alignItems: 'center', gap: '4px', textDecoration: 'none' }}
                            >
                              <ExternalLink size={14} /> GitHub Repo
                            </a>
                          )}
                          {sub.video_url && (
                            <a 
                              href={sub.video_url} 
                              target="_blank" 
                              rel="noreferrer"
                              style={{ color: '#ec4899', display: 'flex', alignItems: 'center', gap: '4px', textDecoration: 'none' }}
                            >
                              <Video size={14} /> Video Demo
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
