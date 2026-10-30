import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ParticleCanvas from './components/ParticleCanvas';
import Hero from './components/Hero';
import Tracks from './components/Tracks';
import WarRoom from './components/WarRoom';
import TeamPortal from './components/TeamPortal';
import Submission from './components/Submission';
import Organizers from './components/Organizers';
import Footer from './components/Footer';
import AdminModal from './components/AdminModal';

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [prefilledTeamId, setPrefilledTeamId] = useState('');
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [liveToast, setLiveToast] = useState(null);

  // Scroll to top on tab switch
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  const handleSelectTeamForSubmission = (teamId) => {
    setPrefilledTeamId(teamId);
    setActiveTab('submission');
  };

  const handleBroadcastSuccess = (announcement) => {
    setLiveToast(announcement);
    setTimeout(() => setLiveToast(null), 6000);
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Background Ambience & Cyber Grid */}
      <div className="bg-ambient-layer">
        <div className="orb orb-pink" />
        <div className="orb orb-purple" />
        <div className="orb orb-blue" />
        <div className="cyber-grid" />
      </div>

      {/* Interactive Particle Constellation */}
      <ParticleCanvas />

      {/* Floating Live Broadcast Toast Alert */}
      {liveToast && (
        <div style={{
          position: 'fixed',
          top: '80px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 100,
          background: 'rgba(15, 18, 38, 0.95)',
          border: `2px solid ${liveToast.color || '#ff2a7a'}`,
          boxShadow: `0 0 30px ${liveToast.color || '#ff2a7a'}60`,
          borderRadius: '14px',
          padding: '14px 24px',
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          maxWidth: '90%',
          animation: 'floatOrb 0.5s ease'
        }}>
          <span className="live-dot" style={{ backgroundColor: liveToast.color }} />
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '0.7rem', fontWeight: 800, color: liveToast.color, fontFamily: 'var(--font-mono)' }}>
                {liveToast.tag}
              </span>
              <strong style={{ fontSize: '0.92rem' }}>{liveToast.title}</strong>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
              {liveToast.body}
            </p>
          </div>
        </div>
      )}

      {/* Fixed Navigation Bar */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} onOpenAdmin={() => setIsAdminOpen(true)} />

      {/* Main Content Area */}
      <main style={{ flex: 1, position: 'relative', zIndex: 10, marginTop: '20px' }}>
        {activeTab === 'overview' && (
          <Hero setActiveTab={setActiveTab} />
        )}

        {activeTab === 'tracks' && (
          <div style={{ paddingTop: '80px' }}>
            <Tracks setActiveTab={setActiveTab} />
          </div>
        )}

        {activeTab === 'war-room' && (
          <div style={{ paddingTop: '80px' }}>
            <WarRoom onOpenAdminModal={() => setIsAdminOpen(true)} />
          </div>
        )}

        {activeTab === 'team-portal' && (
          <div style={{ paddingTop: '80px' }}>
            <TeamPortal onSelectTeamForSubmission={handleSelectTeamForSubmission} />
          </div>
        )}

        {activeTab === 'submission' && (
          <div style={{ paddingTop: '80px' }}>
            <Submission prefilledTeamId={prefilledTeamId} />
          </div>
        )}

        {activeTab === 'organizers' && (
          <div style={{ paddingTop: '80px' }}>
            <Organizers />
          </div>
        )}
      </main>

      {/* Organizer Console Modal */}
      <AdminModal 
        isOpen={isAdminOpen} 
        onClose={() => setIsAdminOpen(false)}
        onBroadcastSuccess={handleBroadcastSuccess}
      />

      {/* Footer with discreet Admin Console link */}
      <Footer setActiveTab={setActiveTab} onOpenAdmin={() => setIsAdminOpen(true)} />
    </div>
  );
}
