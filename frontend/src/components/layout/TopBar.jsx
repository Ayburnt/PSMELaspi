import { useEffect, useState } from 'react';
import { Phone, Mail, Facebook } from 'lucide-react';
import { client } from '../../sanityClient';

export default function TopBar() {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    const query = `*[_type == "siteSettings"][0]{
      contactPhone,
      contactEmail,
      facebookUrl,
      organizationSubtitle
    }`;

    client
      .fetch(query)
      .then((data) => setSettings(data))
      .catch((err) => console.error('Error fetching site settings:', err));
  }, []);

  if (!settings) return null;

  return (
    <div className="bg-blue-900 text-white text-xs py-2 w-full relative z-50">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        <div className="flex gap-4">
          <span className="flex items-center gap-2"><Phone size={14} /> {settings.contactPhone}</span>
          <span className="flex items-center gap-2"><Mail size={14} /> {settings.contactEmail}</span>
        </div>
        <div className="hidden md:flex gap-4">
          <a href={settings.facebookUrl || '#'} target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400 flex items-center gap-1"><Facebook size={14}/> Follow us</a>
          <span className="text-yellow-400 font-bold tracking-wide">{settings.organizationSubtitle?.toUpperCase() || 'LAS PIÑAS CHAPTER'}</span>
        </div>
      </div>
    </div>
  );
}