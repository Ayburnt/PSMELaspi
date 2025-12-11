const newsItems = [
  { date: "JAN 12, 2025", category: "Event", title: "Green Building Strategies for MSMEs Seminar" },
  { date: "JAN 06, 2025", category: "Survey", title: "2025 Engineering Industry Health Survey" },
  { date: "NOV 28, 2024", category: "Webinar", title: "Tax Updates for Engineering Consultants" },
];

export default function NewsFeed() {
  return (
    <section id="news" className="py-20 bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Latest News & Updates</h2>
            <p className="text-gray-500 mt-1">Stay informed with chapter activities.</p>
          </div>
          <a href="#" className="text-blue-900 font-bold text-sm hover:underline">View All Posts</a>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {newsItems.map((item, index) => (
            <div key={index} className="bg-white p-6 rounded shadow-sm hover:shadow-md transition border-l-4 border-blue-900">
              <span className="text-xs font-bold text-yellow-600 uppercase tracking-wider">{item.category}</span>
              <h3 className="text-lg font-bold text-gray-800 mt-2 mb-4 leading-snug">{item.title}</h3>
              <p className="text-gray-400 text-xs font-medium">{item.date}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}