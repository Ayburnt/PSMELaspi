import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import TopBar from '../components/layout/TopBar';
import { CheckCircle, CreditCard, FileText, Download, ArrowRight } from 'lucide-react';

const JoinPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <TopBar />
      <Navbar />

      {/* Page Header */}
      <div className="bg-blue-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Membership Application</h1>
          <p className="text-blue-200 text-lg max-w-2xl mx-auto">
            Join the premier organization for Mechanical Engineers in Las Piñas. 
            Enhance your professional growth and expand your network.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          
          {/* LEFT COLUMN: Requirements */}
          <div className="md:col-span-2 space-y-8">
            
            {/* Section 1: Qualifications */}
            <section className="bg-white p-8 rounded-lg shadow-sm border-t-4 border-blue-900">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <FileText className="text-yellow-500" /> Qualifications
              </h2>
              <ul className="space-y-4 text-gray-600">
                <li className="flex gap-3">
                  <CheckCircle className="text-blue-600 flex-shrink-0" size={20} />
                  <span>Must be a registered Mechanical Engineer (PME, RME, or CPM) with a valid PRC License.</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle className="text-blue-600 flex-shrink-0" size={20} />
                  <span>Must reside or work within Las Piñas City or nearby areas.</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle className="text-blue-600 flex-shrink-0" size={20} />
                  <span>Willing to actively participate in chapter activities and general membership meetings.</span>
                </li>
              </ul>
            </section>

            {/* Section 2: Application Process */}
            <section className="bg-white p-8 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">How to Join</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-900 font-bold shrink-0">1</div>
                  <div>
                    <h3 className="font-bold text-lg">Fill out the Application Form</h3>
                    <p className="text-gray-600">Download the PDF form below or fill out our online Google Form.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-900 font-bold shrink-0">2</div>
                  <div>
                    <h3 className="font-bold text-lg">Pay the Membership Fee</h3>
                    <p className="text-gray-600">Settle your annual dues via Bank Transfer or GCash (details on the right).</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-900 font-bold shrink-0">3</div>
                  <div>
                    <h3 className="font-bold text-lg">Submit Proof of Payment</h3>
                    <p className="text-gray-600">Email your deposit slip and completed form to <span className="text-blue-600">random@psmelaspinas.org</span>.</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <button className="bg-blue-900 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-800 flex items-center gap-2">
                   Apply Online <ArrowRight size={18} />
                </button>
                <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-bold hover:bg-gray-50 flex items-center gap-2">
                   <Download size={18} /> Download Form (PDF)
                </button>
              </div>
            </section>
          </div>

          {/* RIGHT COLUMN: Fees & Bank Info */}
          <div className="md:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-md sticky top-24">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <CreditCard className="text-yellow-500" /> Membership Fees
              </h3>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center border-b pb-2">
                  <span className="text-gray-600">Entrance Fee</span>
                  <span className="font-bold text-gray-900">₱ 500.00</span>
                </div>
                <div className="flex justify-between items-center border-b pb-2">
                  <span className="text-gray-600">Annual Dues</span>
                  <span className="font-bold text-gray-900">₱ 1,500.00</span>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="font-bold text-lg text-blue-900">Total</span>
                  <span className="font-bold text-lg text-blue-900">₱ 2,000.00</span>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-bold text-blue-900 mb-2">Bank Details</h4>
                <p className="text-sm text-gray-600 mb-1">Bank: <span className="font-bold">Metrobank</span></p>
                <p className="text-sm text-gray-600 mb-1">Acct Name: <span className="font-bold">PSME Las Piñas Chapter</span></p>
                <p className="text-sm text-gray-600">Acct No: <span className="font-bold">123-456-7890</span></p>
                
                <div className="my-4 border-t border-blue-200"></div>
                
                <h4 className="font-bold text-blue-900 mb-2">GCash</h4>
                <p className="text-sm text-gray-600">Number: <span className="font-bold">0917-123-4567</span></p>
              </div>

              <p className="text-xs text-gray-500 mt-4 text-center">
                * Please keep your transaction slip for verification.
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