import { useEffect, useState } from 'react';
import { client, urlFor } from '../../sanityClient'; // <--- Import urlFor

export default function NewsFeed() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // 1. We added 'image' to the query below
    const query = `*[_type == "event"] | order(date desc) {
      title,
      date,
      category,
      image 
    }`;

    client.fetch(query)
      .then((data) => setEvents(data))
      .catch(console.error);
  }, []);

  return (
    <section id="news" className="py-20 bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-10">Latest News & Updates</h2>

        <div className="grid md:grid-cols-3 gap-6">
          {events.map((event, index) => (
            <div key={index} className="bg-white rounded shadow-sm border-l-4 border-blue-900 overflow-hidden hover:shadow-md transition">
              
              {/* --- IMAGE FIX IS HERE --- */}
              {event.image && (
                <div className="h-48 w-full overflow-hidden">
                  <img 
                    // This generates the actual URL
                    src={urlFor(event.image).width(400).url()} 
                    alt={event.title}
                    className="w-full h-full object-cover transform hover:scale-105 transition duration-500"
                  />
                </div>
              )}
              {/* ------------------------- */}

              <div className="p-6">
                <span className="text-xs font-bold text-yellow-600 uppercase tracking-wider">
                  {event.category}
                </span>
                <h3 className="text-lg font-bold text-gray-800 mt-2 mb-4 leading-snug">
                  {event.title}
                </h3>
                <p className="text-gray-400 text-xs font-medium">
                  {event.date}
                </p>
              </div>
            </div>
          ))}

          {events.length === 0 && (
            <p className="text-gray-500 col-span-3 text-center">Loading events...</p>
          )}
        </div>
      </div>
    </section>
  );
}