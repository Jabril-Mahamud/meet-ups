// app/events/[id]/page.tsx
import { createClient } from "@/utils/supabase/server";
import { notFound } from 'next/navigation';

export default async function EventPage({ params }) {
  const supabase = createClient();
  const { id } = params;

  // Fetch the event details
  const { data: event, error } = await supabase
    .from('MeetUps')
    .select(`
      id, title, description, date_time,
      Locations (name, address),
      Profiles (name)
    `)
    .eq('id', id)
    .single();

  if (error || !event) {
    console.error('Error fetching event:', error);
    return notFound();
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{event.title}</h1>
      <p>{event.description}</p>
      <p><strong>Date:</strong> {new Date(event.date_time).toLocaleString()}</p>
      <p><strong>Location:</strong> {event.Locations.name}, {event.Locations.address}</p>
      <p><strong>Organized by:</strong> {event.Profiles.name}</p>
      {/* RSVP button will be a client component */}
      <RSVPButton eventId={id} />
    </div>
  );
}
