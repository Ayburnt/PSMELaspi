import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  ArrowLeft,
  Building2,
  Mail,
  Phone,
  MapPin,
  Globe,
  Clock,
  User,
  Briefcase,
  Tag,
  ExternalLink,
  Loader2,
  Package,
  Facebook,
  Linkedin,
  Instagram,
  QrCode,
  Gift,
  Ticket,
  ShieldCheck,
  CalendarCheck,
  FileText,
} from "lucide-react";
import { FaXTwitter, FaViber } from "react-icons/fa6";
import QRCode from "react-qr-code"; // Import QR library
import { client, urlFor } from "../../sanityClient";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import TopBar from "../../components/layout/TopBar";

function slugifyCompany(str = "") {
  return str
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default function MemberProfile() {
  const { slug } = useParams();
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Capture current profile URL
  const currentUrl = window.location.href;

  useEffect(() => {
    const fetchMember = async () => {
      try {
        setLoading(true);
        const query = `*[
          _type == "member" &&
          status == "active" &&
          (slug.current == $key || _id == $key)
        ][0]{
          _id,
          company,
          membershipType,
          category,
          description,
          overview,
          location,
          keyServices,
          products,
          email,
          phone,
          website,
          memberSince,
          logo,
          memberDiscount {
            enabled,
            description,
            appliesTo,
            conditions,
            validUntil
          },
          socialMedia {
            facebook,
            linkedin,
            instagram,
            twitter,
            viber
          },
          keyRepresentative {
            name,
            position,
            photo
          },
          businessHours {
            monday,
            tuesday,
            wednesday,
            thursday,
            friday,
            saturday,
            sunday
          }
        }`;

        const data = await client.fetch(query, { key: slug });

        if (data) {
          setMember(data);
          setError(null);
        } else {
          setError("Member not found.");
        }
      } catch (err) {
        console.error("Error fetching member:", err);
        setError("Failed to load member details.");
      } finally {
        setLoading(false);
      }
    };

    fetchMember();
  }, [slug]);

  const days = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];
  const dayLabels = {
    monday: "Monday",
    tuesday: "Tuesday",
    wednesday: "Wednesday",
    thursday: "Thursday",
    friday: "Friday",
    saturday: "Saturday",
    sunday: "Sunday",
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <TopBar />
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-20 flex justify-center items-center">
          <div className="text-center">
            <Loader2
              className="animate-spin text-green-700 mx-auto mb-4"
              size={48}
            />
            <p className="text-slate-600">Loading member profile...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!member) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <TopBar />
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-red-900 mb-2">
              Member Not Found
            </h2>
            <p className="text-red-700 mb-6">
              {error || "This member profile could not be found."}
            </p>
            <Link
              to="/members-directory"
              className="inline-flex items-center text-green-700 hover:text-green-900 font-semibold"
            >
              <ArrowLeft size={20} className="mr-2" /> Back to Directory
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <TopBar />
      <Navbar />

      <div className="bg-gradient-to-r from-green-900 to-green-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <Link
            to="/members-directory"
            className="inline-flex items-center text-green-100 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft size={20} className="mr-2" /> Back to Directory
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-8 pb-16">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
              <div className="bg-gradient-to-br from-slate-50 to-white p-8 border-b border-slate-100">
                <div className="flex items-start gap-6">
                  {member.logo ? (
                    <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-slate-200 shadow-lg flex-shrink-0 flex items-center justify-center bg-white">
                      <img
                        src={urlFor(member.logo).url()}
                        alt={`${member.company} logo`}
                        className="max-w-full max-h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-24 h-24 bg-gradient-to-br from-green-600 to-green-800 rounded-2xl flex items-center justify-center text-white shadow-lg flex-shrink-0">
                      <Building2 size={48} strokeWidth={1.5} />
                    </div>
                  )}
                  <div className="flex-1">
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">
                      {member.company}
                    </h1>
                    <div className="flex flex-wrap gap-3">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-800 border border-green-200">
                        {member.membershipType}
                      </span>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-slate-100 text-slate-700 border border-slate-200">
                        <Tag size={14} className="mr-1.5" /> {member.category}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-8">
                <p className="text-slate-600 leading-relaxed">
                  {member.description}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                <User className="mr-3 text-green-700" size={28} /> Key
                Representative
              </h2>
              <div className="flex items-center gap-6">
                {member.keyRepresentative?.photo ? (
                  <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-slate-200 flex-shrink-0">
                    <img
                      src={urlFor(member.keyRepresentative.photo)
                        .width(200)
                        .height(200)
                        .url()}
                      alt={member.keyRepresentative.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-24 h-24 bg-gradient-to-br from-slate-200 to-slate-300 rounded-full flex items-center justify-center flex-shrink-0">
                    <User
                      size={40}
                      className="text-slate-500"
                      strokeWidth={1.5}
                    />
                  </div>
                )}
                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    {member.keyRepresentative?.name}
                  </h3>
                  <p className="text-slate-600 mt-1">
                    {member.keyRepresentative?.position}
                  </p>
                </div>
              </div>
            </div>

            {member.overview && (
              <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center">
                  <Briefcase className="mr-3 text-green-700" size={28} />{" "}
                  Company Overview
                </h2>
                <p className="text-slate-600 leading-relaxed">
                  {member.overview}
                </p>
              </div>
            )}

            <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                <Tag className="mr-3 text-green-700" size={28} /> Services
              </h2>
              <div className="grid md:grid-cols-2 gap-3">
                {(member.keyServices ?? []).map((service, index) => (
                  <div
                    key={index}
                    className="flex items-center p-4 bg-gradient-to-r from-green-50 to-slate-50 rounded-lg border border-green-100"
                  >
                    <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                    <span className="text-slate-700 font-medium">
                      {service}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Products */}
            {member.products && member.products.length > 0 && (
              <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                  <Package className="mr-3 text-green-700" size={28} />
                  Products
                </h2>
                <div className="grid md:grid-cols-2 gap-3">
                  {member.products.map((product, index) => (
                    <div
                      key={index}
                      className="flex items-center p-4 bg-gradient-to-r from-emerald-50 to-slate-50 rounded-lg border border-emerald-100"
                    >
                      <div className="w-2 h-2 bg-emerald-600 rounded-full mr-3"></div>
                      <span className="text-slate-700 font-medium">
                        {product}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ======================================================== */}
            {/* DISCOUNT CONTAINER - GOVERNMENT/CORPORATE VOUCHER STYLE */}
            {/* ======================================================== */}
            {member.memberDiscount?.enabled && (
              <div className="mt-8 border-2 border-slate-300 bg-white shadow-lg rounded-xl overflow-hidden">
                {/* Header Strip - Navy Blue (Official) */}
                <div className="bg-orange-600/80 text-white p-4 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Ticket className="text-yellow-400" size={24} />
                    <h2 className="text-base font-bold tracking-widest uppercase md:text-xl ">
                       Member Privilege
                    </h2>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-semibold bg-white text-slate-900 px-2 py-1 rounded-sm">
                    <ShieldCheck size={14} className="text-green-700" />
                    <span>PCCI VERIFIED</span>
                  </div>
                </div>

                <div className="p-0">
                  {/* The Main Offer - Center Stage */}
                  <div className="text-center p-8 bg-slate-50 border-b-2 border-dashed border-slate-300">
                    <p className="text-slate-500 font-bold uppercase text-xs mb-2 tracking-widest">
                      Details of Privilege
                    </p>
                    <h3 className="text-3xl md:text-4xl font-black text-slate-900 uppercase">
                      {member.memberDiscount.description}
                    </h3>
                    <p className="text-slate-600 mt-2 text-sm italic">
                      *This privilege is exclusively available to active PCCI
                      members.
                    </p>
                  </div>

                  {/* Tabular Details Section */}
                  <div className="grid md:grid-cols-[30%_70%] text-sm">

                    {/* Left: Validity */}
                    <div className="p-5 border-b md:border-b-0 md:border-r border-slate-300 flex flex-col justify-center">
                      <div className="flex items-start gap-3">
                        <CalendarCheck
                          className="text-slate-500 mt-1"
                          size={20}
                        />
                        <div>
                          <p className="font-bold text-slate-700 uppercase text-xs mb-1">
                            Valid Until
                          </p>
                          {member.memberDiscount.validUntil ? (
                            <p className="text-lg font-bold text-slate-900">
                              {new Date(
                                member.memberDiscount.validUntil
                              ).toLocaleDateString("en-US", {
                                month: "long",
                                day: "numeric",
                                year: "numeric",
                              })}
                            </p>
                          ) : (
                            <p className="text-lg font-bold text-slate-900">
                              No Expiration Date
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Right: Conditions */}
                    <div className="p-5">
                      <div className="flex items-start gap-3">
                        <FileText className="text-slate-500 mt-1" size={20} />
                        <div>
                          <p className="font-bold text-slate-700 uppercase text-xs mb-1">
                            Terms & Conditions
                          </p>
                          <p className="text-slate-800 leading-snug">
                            {member.memberDiscount.conditions ||
                              "Standard membership terms apply."}
                          </p>
                          {member.memberDiscount.appliesTo &&
                            member.memberDiscount.appliesTo.length > 0 && (
                              <div className="mt-2 pt-2 border-t border-slate-200">
                                <span className="font-semibold text-slate-700">
                                  Applies to:{" "}
                                </span>
                                <div className="flex flex-wrap gap-2">
                                  {member.memberDiscount.appliesTo.map(
                                    (item, index) => (
                                      <span
                                        key={index}
                                        className="inline-block px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium text-sm"
                                      >
                                        {item}
                                      </span>
                                    )
                                  )}
                                </div>
                              </div>
                            )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Footer Strip */}
                <div className="bg-slate-100 p-2 text-center border-t border-slate-300">
                  <p className="text-xs text-slate-500 uppercase font-semibold">
                    This voucher is non-transferable and subject to merchant
                    approval
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* NEW: QR Code Card */}
            <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-6 text-center">
              <div className="flex items-center justify-center gap-2 mb-4 text-slate-900">
                <QrCode size={20} className="text-green-700" />
                <h3 className="text-lg font-bold">Share Profile</h3>
              </div>
              <div className="bg-white p-3 rounded-xl border border-slate-100 inline-block shadow-sm">
                <QRCode
                  size={160}
                  style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                  value={currentUrl}
                  viewBox={`0 0 256 256`}
                  fgColor="#14532d" // Deep Green to match your theme
                />
              </div>
              <p className="text-xs text-slate-500 mt-4 leading-relaxed">
                Scan this code to view this business profile on your mobile
                device.
              </p>
            </div>

            {/* Get in Touch Card */}
            <div className="bg-gradient-to-br from-green-900 to-green-700 text-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold mb-2">Get in Touch</h2>
              <p className="text-green-100 text-sm mb-6">
                Ready to connect? Reach out to us below.
              </p>
              <div className="space-y-4">
                <a
                  href={`mailto:${member.email}`}
                  className="block w-full bg-white text-green-900 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition-all text-center shadow-lg"
                >
                  <Mail className="inline mr-2" size={18} /> Contact via Email
                </a>
                {member.phone && (
                  <a
                    href={`tel:${member.phone}`}
                    className="block w-full bg-green-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-900 transition-all text-center border-2 border-white/20"
                  >
                    <Phone className="inline mr-2" size={18} /> Call Now
                  </a>
                )}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-4">
                Contact Information
              </h3>
              <div className="space-y-4">
                {member.phone && (
                  <div className="flex items-start">
                    <Phone
                      className="text-slate-400 mt-1 flex-shrink-0"
                      size={18}
                    />
                    <div className="ml-3">
                      <p className="text-xs text-slate-500 font-medium uppercase mb-1">
                        Phone
                      </p>
                      <a
                        href={`tel:${member.phone}`}
                        className="text-slate-700 hover:text-green-700 font-medium"
                      >
                        {member.phone}
                      </a>
                    </div>
                  </div>
                )}
                <div className="flex items-start">
                  <Mail
                    className="text-slate-400 mt-1 flex-shrink-0"
                    size={18}
                  />
                  <div className="ml-3">
                    <p className="text-xs text-slate-500 font-medium uppercase mb-1">
                      Email
                    </p>
                    <a
                      href={`mailto:${member.email}`}
                      className="text-slate-700 hover:text-green-700 font-medium break-all"
                    >
                      {member.email}
                    </a>
                  </div>
                </div>

                {member.socialMedia &&
                  Object.values(member.socialMedia).some((val) => val) && (
                    <div className="pt-4 border-t border-slate-100">
                      <p className="text-xs text-slate-500 font-medium uppercase mb-3">
                        Connect With Us
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {member.socialMedia.facebook && (
                          <a
                            href={member.socialMedia.facebook}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-blue-50 hover:bg-blue-600 text-blue-600 hover:text-white rounded-lg transition-all"
                          >
                            <Facebook size={18} />
                          </a>
                        )}
                        {member.socialMedia.linkedin && (
                          <a
                            href={member.socialMedia.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-blue-50 hover:bg-blue-700 text-blue-700 hover:text-white rounded-lg transition-all"
                          >
                            <Linkedin size={18} />
                          </a>
                        )}
                        {member.socialMedia.instagram && (
                          <a
                            href={member.socialMedia.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-pink-50 hover:bg-pink-600 text-pink-600 hover:text-white rounded-lg transition-all"
                          >
                            <Instagram size={18} />
                          </a>
                        )}
                        {member.socialMedia.twitter && (
                          <a
                            href={member.socialMedia.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-slate-50 hover:bg-slate-900 text-slate-700 hover:text-white rounded-lg transition-all"
                          >
                            <FaXTwitter size={18} />
                          </a>
                        )}
                      </div>
                    </div>
                  )}

                {member.website && (
                  <div className="flex items-start">
                    <Globe
                      className="text-slate-400 mt-1 flex-shrink-0"
                      size={18}
                    />
                    <div className="ml-3">
                      <p className="text-xs text-slate-500 font-medium uppercase mb-1">
                        Website
                      </p>
                      <a
                        href={
                          member.website.startsWith("http")
                            ? member.website
                            : `https://${member.website}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-700 hover:text-green-700 font-medium break-all inline-flex items-center"
                      >
                        {member.website.replace(/^https?:\/\//, "")}{" "}
                        <ExternalLink size={14} className="ml-1" />
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center">
                <MapPin className="mr-2 text-green-700" size={20} /> Our
                Location
              </h3>
              <p className="text-slate-700 leading-relaxed mb-4">
                {member.location}
              </p>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  member.location
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-green-700 hover:text-green-900 font-semibold text-sm"
              >
                <ExternalLink size={16} className="mr-2" /> View on Google Maps
              </a>
            </div>

            {member.businessHours && (
              <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center">
                  <Clock className="mr-2 text-green-700" size={20} /> Business
                  Hours
                </h3>
                <div className="space-y-2">
                  {days.map((day) =>
                    member.businessHours?.[day] ? (
                      <div
                        key={day}
                        className="flex justify-between items-center py-2 border-b border-slate-100 last:border-0"
                      >
                        <span className="text-slate-600 font-medium capitalize">
                          {dayLabels[day]}
                        </span>
                        <span
                          className={`text-sm font-semibold ${
                            member.businessHours[day] === "Closed"
                              ? "text-slate-400"
                              : "text-slate-700"
                          }`}
                        >
                          {member.businessHours[day]}
                        </span>
                      </div>
                    ) : null
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-12 bg-gradient-to-r from-green-900 to-green-700 rounded-2xl p-8 text-center text-white shadow-2xl">
          <h2 className="text-2xl font-bold mb-3">Interested in Joining?</h2>
          <p className="text-green-100 mb-6">
            Become a member of PCCI Las Piñas and grow your business network
          </p>
          <Link
            to="/join"
            className="inline-block bg-white text-green-900 px-8 py-3 rounded-lg font-bold hover:bg-green-50 transition-all shadow-lg"
          >
            Become a Member
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
