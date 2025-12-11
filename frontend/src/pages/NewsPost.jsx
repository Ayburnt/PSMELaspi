import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { client, urlFor } from '../sanityClient';
import { PortableText } from '@portabletext/react';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import TopBar from '../components/layout/TopBar';

export default function NewsPost() {
  const { slug } = useParams(); // Get the URL parameter
  const [post, setPost] = useState(null);

  useEffect(() => {
    // Fetch only the specific article matching the slug
    const query = `*[_type == "event" && slug.current == $slug][0]`;
    client.fetch(query, { slug })
      .then((data) => setPost(data))
      .catch(console.error);
  }, [slug]);

  if (!post) return <div className="text-center py-20">Loading article...</div>;

  return (
    <div className="bg-white min-h-screen font-sans">
      <TopBar />
      <Navbar />

      <article className="max-w-4xl mx-auto px-4 py-12">
        <Link to="/" className="text-blue-900 font-bold flex items-center gap-2 mb-8 hover:underline">
          <ArrowLeft size={20} /> Back to Home
        </Link>

        {/* 1. Category & Date */}
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4 border-b pb-4">
            <span className="bg-blue-100 text-blue-900 px-2 py-1 rounded font-bold uppercase text-xs">
                {post.category}
            </span>
            <span className="flex items-center gap-1">
                <Calendar size={14}/> {post.date}
            </span>
        </div>

        {/* 2. Headline */}
        <h1 className="text-3xl md:text-5xl font-serif font-bold text-blue-950 mb-8 leading-tight">
          {post.title}
        </h1>

        {/* 3. The Image (Shown ONLY here, not on homepage) */}
        {post.image && (
          <div className="mb-10 rounded-lg overflow-hidden shadow-lg">
            <img 
              src={urlFor(post.image).width(1200).url()} 
              alt={post.title} 
              className="w-full h-auto object-cover"
            />
          </div>
        )}

        {/* 4. The Full Body Text */}
        <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
          {post.body ? <PortableText value={post.body} /> : <p>No content details available.</p>}
        </div>
      </article>

      <Footer />
    </div>
  );
}