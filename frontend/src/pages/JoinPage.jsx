import { useState } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import TopBar from '../components/layout/TopBar';
import MembershipForm from '../components/sections/MembershipForm';
import { CreditCard, Download, ArrowRight, Mail, ArrowLeft } from 'lucide-react';

const JoinPage = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <TopBar />
      <Navbar />

      {/* Page Header */}
      <div className="bg-blue-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Membership Application</h1>
          <p className="text-blue-200 text-lg max-w-2xl mx-auto">
            Join the business community of Las Piñas. Select your membership category below.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          
          {/* LEFT COLUMN: Logic to switch between Info and Form */}
          <div className="md:col-span-2 space-y-8">
            
            {showForm ? (
              // ---------------- VIEW A: THE FORM ----------------
              <div className="animate-fade-in-up">
                <button 
                  onClick={() => setShowForm(false)} 
                  className="mb-4 text-gray-500 hover:text-blue-900 flex items-center gap-2 font-medium"
                >
                  <ArrowLeft size={18} /> Back to Instructions
                </button>
                <MembershipForm />
              </div>
            ) : (
              // ---------------- VIEW B: INSTRUCTIONS (Default) ----------------
              <>
                <section className="bg-white p-8 rounded-lg shadow-sm border-t-4 border-blue-900">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">How to Join</h2>
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-900 font-bold shrink-0">1</div>
                      <div>
                        <h3 className="font-bold text-lg">Determine your Category</h3>
                        <p className="text-gray-600">Check the fee table to see where your business classification falls (Micro to Large).</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-900 font-bold shrink-0">2</div>
                      <div>
                        <h3 className="font-bold text-lg">Settle the Fee</h3>
                        <p className="text-gray-600">Pay via Bank Deposit (Bank of Makati) or GCash.</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-900 font-bold shrink-0">3</div>
                      <div>
                        <h3 className="font-bold text-lg">Request Invoice</h3>
                        <p className="text-gray-600">Email your proof of payment to the secretariat to receive your official invoice.</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 p-4 bg-blue-50 rounded border border-blue-200 flex items-center gap-3">
                    <Mail className="text-blue-900" />
                    <span className="text-blue-900 font-medium">For invoice requests, email: <span className="font-bold underline">secretariat@pccilaspinas.org</span></span>
                  </div>
                </section>

                <section className="bg-white p-8 rounded-lg shadow-sm">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Ready to apply?</h3>
                  <div className="flex flex-wrap gap-4">
                    <button 
                      onClick={() => setShowForm(true)} 
                      className="bg-blue-900 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-800 flex items-center gap-2"
                    >
                      Apply Online <ArrowRight size={18} />
                    </button>
                    
                    {/* --- UPDATED BUTTON START --- */}
                    <a 
                      href="/membership-form.pdf" 
                      download="PCCI-Membership-Form.pdf"
                      className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-bold hover:bg-gray-50 flex items-center gap-2"
                    >
                      <Download size={18} /> Download Form
                    </a>
                    {/* --- UPDATED BUTTON END --- */}
                  </div>
                </section>
              </>
            )}

          </div>

          {/* RIGHT COLUMN: Fees & Bank Info */}
          <div className="md:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-md sticky top-24">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <CreditCard className="text-yellow-500" /> Annual Membership Fees
              </h3>
              
              <div className="space-y-0 mb-8 divide-y">
                <div className="flex justify-between items-center py-3">
                  <span className="text-gray-600 font-medium">Micro</span>
                  <span className="font-bold text-gray-900">₱ 1,500.00</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-gray-600 font-medium">Small</span>
                  <span className="font-bold text-gray-900">₱ 2,500.00</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-gray-600 font-medium">Medium</span>
                  <span className="font-bold text-gray-900">₱ 5,000.00</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-gray-600 font-medium">Large</span>
                  <span className="font-bold text-gray-900">₱ 10,000.00</span>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg space-y-4">
                <div>
                  <h4 className="font-bold text-blue-900 mb-1">GCASH Payment</h4>
                  <p className="text-sm text-gray-600">Number: <span className="font-bold text-gray-900">0917 717 9658</span></p>
                  <p className="text-sm text-gray-600">Name: <span className="font-bold text-gray-900">Jhie Fabellano</span></p>
                </div>
                <div className="border-t border-blue-200"></div>
                <div>
                  <h4 className="font-bold text-blue-900 mb-1">Bank Transfer</h4>
                  <p className="text-sm text-gray-600 mb-1">Bank: <span className="font-bold text-gray-900">Bank of Makati (Las Piñas)</span></p>
                  <p className="text-sm text-gray-600 mb-1">Acct No: <span className="font-bold text-gray-900">0561 3500 0058</span></p>
                  <p className="text-sm text-gray-600 leading-tight">Name: <span className="font-bold text-gray-900">Philippine Chamber of Commerce and Industry – Las Pinas City Inc.</span></p>
                </div>
              </div>

              <p className="text-xs text-gray-500 mt-4 text-center">
                * Please send proof of payment to the email provided for invoicing.
              </p>
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default JoinPage;