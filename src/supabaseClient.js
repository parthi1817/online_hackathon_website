import { createClient } from '@supabase/supabase-js';

const rawSupabaseUrl = (import.meta.env.VITE_SUPABASE_URL || '').trim();
const supabaseAnonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY || '').trim();

// Sanitize URL in case /rest/v1 or trailing slashes were copied
const supabaseUrl = rawSupabaseUrl
  .replace(/\/rest\/v1\/?$/, '')
  .replace(/\/+$/, '');

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl !== 'https://your-project-id.supabase.co' &&
  supabaseUrl !== 'YOUR_SUPABASE_URL' && 
  supabaseAnonKey !== 'YOUR_SUPABASE_ANON_KEY'
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Registered Teams (Accurate data from registration)
export const initialMockTeams = [
  {
    team_id: "FM-101",
    team_name: "Team Meet Amit Dharaiya",
    leader_name: "Meet Amit Dharaiya",
    leader_email: "meetadharaiya@gmail.com",
    leader_phone: "86180 93307",
    members: ["Meet Amit Dharaiya (Lead)", "S.Anjali", "R. Tanushree", "Mohnish B Nair"],
    member_emails: [
      "meetadharaiya@gmail.com",
      "yashaswinisriram578@gmail.com",
      "rtanushree.609052@gmail.com",
      "mohnishbnair235@gmail.com"
    ],
    track: "General / Open Track (Selection at Check-in)",
    payment_status: "Verified",
    registered_at: new Date().toISOString()
  },
  {
    team_id: "FM-102",
    team_name: "Team Thanishka Koppanathi",
    leader_name: "Thanishka Koppanathi",
    leader_email: "thanishka.k06@gmail.com",
    leader_phone: "8088018007",
    members: ["Thanishka Koppanathi (Lead)", "M Kaushal", "Koushik S"],
    member_emails: [
      "thanishka.k06@gmail.com",
      "kaushal090807@gmail.com",
      "koushik12567s@gmail.com"
    ],
    track: "General / Open Track (Selection at Check-in)",
    payment_status: "Verified",
    registered_at: new Date().toISOString()
  }
];

// Initial default announcements
export const defaultAnnouncements = [
  {
    id: 'ann-ext',
    tag: 'URGENT',
    title: '⏰ Submission Deadline Extended to 12:00 AM Midnight!',
    body: 'Great news participants! The submission deadline has been extended until 12:00 AM Midnight IST tonight. Complete your live prototypes and submit.',
    created_at: new Date().toISOString(),
    color: '#ff2a7a'
  },
  {
    id: 'ann-1',
    tag: 'MILESTONE',
    title: 'Hackathon Schedule & Extended Deadline',
    body: 'Building sprint active: Oct 30, 7:30 PM to Oct 31, 12:00 AM Midnight IST.',
    created_at: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    color: '#38bdf8'
  },
  {
    id: 'ann-2',
    tag: 'IMPORTANT',
    title: 'Google Form Verification Live',
    body: 'Teams registered through the Google Form can now check their Team ID in the Check-in Portal.',
    created_at: new Date(Date.now() - 1000 * 60 * 20).toISOString(),
    color: '#ec4899'
  },
  {
    id: 'ann-3',
    tag: 'TIPS',
    title: 'Repository Guidelines',
    body: 'Ensure your GitHub repository remains PUBLIC throughout the 24 hours so judges can evaluate commits.',
    created_at: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    color: '#10b981'
  }
];

// --- ANNOUNCEMENTS API ---

export async function fetchAnnouncements() {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from('announcements')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(20);
    if (error) {
      console.warn('Supabase fetch error, fallback to local', error);
      return getLocalAnnouncements();
    }
    return data && data.length > 0 ? data : getLocalAnnouncements();
  }
  return getLocalAnnouncements();
}

export function getLocalAnnouncements() {
  const stored = localStorage.getItem('forma_announcements');
  return stored ? JSON.parse(stored) : defaultAnnouncements;
}

export async function postAnnouncement({ tag, title, body, color = '#ff2a7a' }) {
  const newAnn = {
    tag,
    title,
    body,
    color,
    created_at: new Date().toISOString()
  };

  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from('announcements')
      .insert([newAnn])
      .select();
    if (error) throw error;
    return data[0];
  } else {
    // Local storage fallback for testing
    const existing = getLocalAnnouncements();
    const created = { ...newAnn, id: 'ann_' + Date.now() };
    const updated = [created, ...existing];
    localStorage.setItem('forma_announcements', JSON.stringify(updated));
    // Dispatch custom browser event for instant testing across tabs
    window.dispatchEvent(new CustomEvent('forma-new-announcement', { detail: created }));
    return created;
  }
}

// Subscribe to Realtime announcements
export function subscribeToAnnouncements(onNewAnnouncement) {
  if (isSupabaseConfigured && supabase) {
    const channel = supabase
      .channel('announcements-feed')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'announcements' },
        (payload) => {
          onNewAnnouncement(payload.new);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  } else {
    // Listen to local broadcast events in testing mode
    const handler = (e) => onNewAnnouncement(e.detail);
    window.addEventListener('forma-new-announcement', handler);
    return () => window.removeEventListener('forma-new-announcement', handler);
  }
}

// --- SUBMISSIONS API ---

export async function submitProject(submissionData) {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from('submissions')
      .insert([submissionData])
      .select();
    if (error) throw error;
    return data[0];
  } else {
    const existing = JSON.parse(localStorage.getItem('forma_submissions') || '[]');
    const newEntry = {
      ...submissionData,
      id: 'sub_' + Date.now(),
      submitted_at: new Date().toISOString()
    };
    existing.unshift(newEntry);
    localStorage.setItem('forma_submissions', JSON.stringify(existing));
    window.dispatchEvent(new CustomEvent('forma-new-submission', { detail: newEntry }));
    return newEntry;
  }
}

export async function fetchAllSubmissions() {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from('submissions')
      .select('*')
      .order('submitted_at', { ascending: false });
    if (error) throw error;
    return data || [];
  } else {
    return JSON.parse(localStorage.getItem('forma_submissions') || '[]');
  }
}

// --- TEAMS API ---

export async function lookupTeam(query) {
  const cleanQuery = query.trim().toLowerCase();
  if (!cleanQuery) return [];

  if (isSupabaseConfigured && supabase) {
    // 1. Check indexed text columns (ID, Name, Leader Name, Leader Email, Leader Phone)
    const { data, error } = await supabase
      .from('teams')
      .select('*')
      .or(`team_id.ilike.%${cleanQuery}%,team_name.ilike.%${cleanQuery}%,leader_name.ilike.%${cleanQuery}%,leader_email.ilike.%${cleanQuery}%,leader_phone.ilike.%${cleanQuery}%`)
      .limit(10);
    
    if (error) {
      console.warn('Supabase lookup error:', error);
      return lookupLocalTeam(cleanQuery);
    }

    if (data && data.length > 0) {
      return data;
    }

    // 2. If no direct match, check if any member name or member email matches
    const { data: allTeams } = await supabase
      .from('teams')
      .select('*')
      .limit(100);

    if (allTeams && allTeams.length > 0) {
      const memberMatches = allTeams.filter(t => 
        (t.members && t.members.some(m => String(m).toLowerCase().includes(cleanQuery))) ||
        (t.member_emails && t.member_emails.some(e => String(e).toLowerCase().includes(cleanQuery)))
      );
      if (memberMatches.length > 0) return memberMatches;
    }

    return [];
  } else {
    return lookupLocalTeam(cleanQuery);
  }
}

function lookupLocalTeam(cleanQuery) {
  const stored = localStorage.getItem('forma_teams');
  const list = stored ? JSON.parse(stored) : initialMockTeams;
  return list.filter(t => 
    t.team_id.toLowerCase().includes(cleanQuery) ||
    (t.team_name && t.team_name.toLowerCase().includes(cleanQuery)) ||
    (t.leader_email && t.leader_email.toLowerCase().includes(cleanQuery)) ||
    (t.leader_name && t.leader_name.toLowerCase().includes(cleanQuery)) ||
    (t.leader_phone && t.leader_phone.includes(cleanQuery)) ||
    (t.members && t.members.some(m => String(m).toLowerCase().includes(cleanQuery))) ||
    (t.member_emails && t.member_emails.some(e => String(e).toLowerCase().includes(cleanQuery)))
  );
}

export async function fetchAllTeams() {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from('teams')
      .select('*')
      .order('registered_at', { ascending: false });
    if (error) {
      console.warn('Supabase fetchAllTeams error:', error);
      const stored = localStorage.getItem('forma_teams');
      return stored ? JSON.parse(stored) : initialMockTeams;
    }
    return data || [];
  } else {
    const stored = localStorage.getItem('forma_teams');
    return stored ? JSON.parse(stored) : initialMockTeams;
  }
}

export async function addTeam(teamData) {
  const record = {
    team_id: teamData.team_id.toUpperCase().trim(),
    team_name: teamData.team_name?.trim() || `Team ${teamData.leader_name}`,
    leader_name: teamData.leader_name.trim(),
    leader_email: teamData.leader_email.trim(),
    leader_phone: teamData.leader_phone?.trim() || '',
    members: teamData.members || [teamData.leader_name],
    member_emails: teamData.member_emails || [teamData.leader_email],
    track: teamData.track || 'General / Open Track (Selection at Check-in)',
    payment_status: teamData.payment_status || 'Verified',
    registered_at: new Date().toISOString()
  };

  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from('teams')
      .insert([record])
      .select();
    if (error) throw error;
    return data[0];
  } else {
    const stored = localStorage.getItem('forma_teams');
    const list = stored ? JSON.parse(stored) : [...initialMockTeams];
    list.unshift(record);
    localStorage.setItem('forma_teams', JSON.stringify(list));
    return record;
  }
}
