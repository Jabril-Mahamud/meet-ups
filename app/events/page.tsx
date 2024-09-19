// app/events/page.tsx
import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';

// This is a server component
export default async function EventsListPage() {
  const supabase = createClient();

  // Fetch events from Supabase
  const { data: events, error } = await supabase
    .from('MeetUps')
    .select('id, title, description, date_time');

  if (error) {
    console.error('Error fetching events:', error);
    return <p>Error loading events</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Meetups</h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.map((event) => (
          <li key={event.id} className="border p-4 rounded shadow">
            <h2 className="text-xl font-bold">{event.title}</h2>
            <p>{event.description}</p>
            <p className="text-sm">
              <strong>Date:</strong> {new Date(event.date_time).toLocaleString()}
            </p>
            <Link href={`/events/${event.id}`}>
              <a className="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded">
                View Event
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
