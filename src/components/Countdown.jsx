import React, { useState, useEffect } from 'react';
import { Clock, Flame, CheckCircle, Zap } from 'lucide-react';

export default function Countdown() {
  // Target: October 30, 2026, 7:30 PM IST (UTC + 05:30) to Extended Deadline: Nov 1, 2026, 12:00 AM IST (Midnight)
  const targetStartTime = new Date('2026-10-30T19:30:00+05:30').getTime();
  const targetEndTime = new Date('2026-11-01T00:00:00+05:30').getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00',
    status: 'upcoming' // 'upcoming' | 'live' | 'ended'
  });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();

      let diff = targetStartTime - now;
      let status = 'upcoming';

      if (diff <= 0) {
        // Hackathon has started! Check remaining hack time
        diff = targetEndTime - now;
        if (diff > 0) {
          status = 'live';
        } else {
          status = 'ended';
          diff = 0;
        }
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({
        days: String(days).padStart(2, '0'),
        hours: String(hours).padStart(2, '0'),
        minutes: String(minutes).padStart(2, '0'),
        seconds: String(seconds).padStart(2, '0'),
        status
      });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [targetStartTime, targetEndTime]);

  const units = [
    { label: 'DAYS', value: timeLeft.days },
    { label: 'HOURS', value: timeLeft.hours },
    { label: 'MINUTES', value: timeLeft.minutes },
    { label: 'SECONDS', value: timeLeft.seconds }
  ];

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '14px',
      margin: '28px 0'
    }}>
      {/* Status indicator bar */}
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        padding: '6px 18px',
        borderRadius: '9999px',
        background: timeLeft.status === 'live' 
          ? 'rgba(239, 68, 68, 0.15)' 
          : 'rgba(255, 42, 122, 0.12)',
        border: `1px solid ${timeLeft.status === 'live' ? 'rgba(239, 68, 68, 0.4)' : 'rgba(255, 42, 122, 0.3)'}`,
        color: timeLeft.status === 'live' ? '#f87171' : '#ff4f93',
        fontSize: '0.85rem',
        fontWeight: 700,
        fontFamily: 'var(--font-mono)'
      }}>
        {timeLeft.status === 'live' ? (
          <>
            <Flame size={16} className="live-dot" />
            <span>HACKATHON IS LIVE • EXTENDED SPRINT TILL 12:00 AM</span>
          </>
        ) : timeLeft.status === 'ended' ? (
          <>
            <CheckCircle size={16} />
            <span>HACKATHON CONCLUDED • OCT 30 – NOV 1, 2026</span>
          </>
        ) : (
          <>
            <Zap size={16} />
            <span>COUNTDOWN TO KICKOFF • OCT 30, 7:30 PM IST</span>
          </>
        )}
      </div>

      {/* Countdown Digits */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '14px',
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}>
        {units.map((unit, index) => (
          <div
            key={unit.label}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              position: 'relative'
            }}
          >
            <div style={{
              background: 'linear-gradient(180deg, rgba(28, 32, 64, 0.9) 0%, rgba(13, 15, 33, 0.95) 100%)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              boxShadow: '0 8px 30px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
              borderRadius: '16px',
              padding: '16px 20px',
              minWidth: '85px',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* Subtle top glare */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '45%',
                background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.08) 0%, transparent 100%)',
                pointerEvents: 'none'
              }} />

              <span style={{
                fontSize: '2.5rem',
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                lineHeight: 1,
                background: 'linear-gradient(180deg, #ffffff 40%, #e2e8f0 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'block'
              }}>
                {unit.value}
              </span>

              <span style={{
                fontSize: '0.68rem',
                fontFamily: 'var(--font-mono)',
                fontWeight: 700,
                color: 'var(--text-muted)',
                letterSpacing: '0.1em',
                marginTop: '8px',
                display: 'block'
              }}>
                {unit.label}
              </span>
            </div>

            {index < units.length - 1 && (
              <span style={{
                display: 'none',
                position: 'absolute',
                right: '-10px',
                top: '30%',
                color: 'rgba(255, 255, 255, 0.3)',
                fontSize: '1.5rem',
                fontWeight: 700
              }}>:</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
