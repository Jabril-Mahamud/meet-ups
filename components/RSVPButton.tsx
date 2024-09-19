// app/events/[id]/RSVPButton.tsx
"use client";  // Client component since it uses hooks

import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';

export default function RSVPButton({ eventId }) {
  const [rsvpStatus, setRsvpStatus] = useState(null);
  const supabase = createClient();

  const handleRSVP = async () => {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      alert('You must be logged in to RSVP!');
      return;
    }

    const { error } = await supabase
      .from('RSVPs')
      .insert({ user_id: user.id, meetup_id: eventId, status: 'going' });

    if (error) {
      console.error('RSVP failed:', error);
      alert('RSVP failed!');
    } else {
      setRsvpStatus('going');
      alert('RSVP Successful!');
    }
  };

  return (
    <button onClick={handleRSVP} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
      {rsvpStatus === 'going' ? 'You are going!' : 'RSVP'}
    </button>
  );
}
