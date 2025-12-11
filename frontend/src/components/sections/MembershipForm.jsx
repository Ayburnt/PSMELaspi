import { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';

export default function MembershipForm() {
  const [formData, setFormData] = useState({
    applicantType: 'New Applicant',
    lastName: '',
    firstName: '',
    gender: '',
    email: '',
    mobile: '',
    companyName: '',
    companyAddress: '',
    jobTitle: '',
    companyCategory: '',
    employeeCount: '',
    industry: '',
    committees: [],
    advocacies: [],
    paymentRef: '',
    source: '',
    privacyConsent: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox' && (name === 'committees' || name === 'advocacies')) {
      // Handle multi-select checkboxes
      const currentList = formData[name];
      const newList = checked 
        ? [...currentList, value] 
        : currentList.filter(item => item !== value);
        
      setFormData({ ...formData, [name]: newList });
    } else if (type === 'checkbox' && name === 'privacyConsent') {
       setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!formData.privacyConsent) {
        alert("Please agree to the Data Privacy Notice.");
        return;
    }
    // Here you would normally send this data to your backend or EmailJS
    console.log("Form Submitted:", formData);
    alert("Application Submitted! Please check your email for confirmation.");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md border-t-4 border-blue-900 space-y-6">
      
      {/* 1. Applicant Type */}
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-2">1. Applicant Status</label>
        <div className="flex gap-4">
          {['New Applicant', 'No (Current Member)'].map((opt) => (
            <label key={opt} className="flex items-center gap-2 cursor-pointer">
              <input 
                type="radio" 
                name="applicantType" 
                value={opt}
                checked={formData.applicantType === opt}
                onChange={handleChange}
                className="text-blue-900 focus:ring-blue-900"
              />
              <span className="text-gray-600">{opt}</span>
            </label>
          ))}
        </div>
      </div>

      {/* 2 & 3 Name */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">2. Last Name</label>
          <input required name="lastName" onChange={handleChange} className="w-full border p-2 rounded" />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">3. First Name</label>
          <input required name="firstName" onChange={handleChange} className="w-full border p-2 rounded" />
        </div>
      </div>

      {/* 4. Gender */}
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-2">4. Gender</label>
        <div className="flex gap-4">
            {['Female', 'Male', 'Prefer Not To Say'].map(g => (
                <label key={g} className="flex items-center gap-2"><input type="radio" name="gender" value={g} onChange={handleChange} /> {g}</label>
            ))}
        </div>
      </div>

      {/* 5 & 6 Contact */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">5. Email Address</label>
            <input required type="email" name="email" onChange={handleChange} className="w-full border p-2 rounded" />
        </div>
        <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">6. Mobile Number</label>
            <input required type="tel" name="mobile" onChange={handleChange} className="w-full border p-2 rounded" />
        </div>
      </div>

      <hr className="border-gray-200" />

      {/* 7 & 8 Company Info */}
      <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">7. Company Name</label>
          <input required name="companyName" onChange={handleChange} className="w-full border p-2 rounded" />
      </div>
      <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">8. Company Address</label>
          <input required name="companyAddress" onChange={handleChange} className="w-full border p-2 rounded" />
      </div>

      {/* 9. Job Title */}
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-1">9. Job Title</label>
        <select name="jobTitle" onChange={handleChange} className="w-full border p-2 rounded bg-white">
            <option value="">Select Job Title...</option>
            {['Chairman', 'President', 'Vice-President', 'Director', 'Manager', 'Proprietor'].map(t => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>

      {/* 10. Company Category */}
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-1">10. Company Category - Asset (Determines Fee)</label>
        <select required name="companyCategory" onChange={handleChange} className="w-full border p-2 rounded bg-white">
            <option value="">Select Category...</option>
            <option value="Micro">Micro (Less than P3M) - P1,500</option>
            <option value="Small">Small (P3M - P15M) - P2,500</option>
            <option value="Medium">Medium (P15M - P100M) - P5,000</option>
            <option value="Large">Large (P100M+) - P10,000</option>
        </select>
      </div>

      {/* 11 & 12 Employees & Industry */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">11. No. of Employees</label>
            <input type="number" name="employeeCount" onChange={handleChange} className="w-full border p-2 rounded" />
        </div>
        <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">12. Industry</label>
            <select name="industry" onChange={handleChange} className="w-full border p-2 rounded bg-white">
                <option value="">Select Industry...</option>
                {['Agriculture', 'Food and Beverage', 'Furniture', 'Hospitality', 'Manufacturing', 'Education', 'Retail Store', 'Marketing Agency', 'Web/Software', 'Construction', 'Logistics', 'Utility', 'Grocery', 'Professional Services', 'Travel', 'Financial', 'Automotive', 'Fabrication', 'Beauty', 'Medical'].map(i => <option key={i} value={i}>{i}</option>)}
            </select>
        </div>
      </div>

      {/* 13. Committees */}
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-2">13. Committee Interested to Join</label>
        <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
            {['Membership', 'Revenue Generation', 'Marketing', 'Events', 'Newsletter', 'HRD', 'Constitution', 'Research', 'Business Conference', 'Sports', 'Walk of Fame', 'CSR'].map(c => (
                <label key={c} className="flex items-center gap-2">
                    <input type="checkbox" name="committees" value={c} onChange={handleChange} /> {c}
                </label>
            ))}
        </div>
      </div>

      {/* 14. Advocacy */}
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-2">14. Advocacy Interested to Join</label>
        <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
            {['Education', 'Intl Biz Networking', 'MSME', 'Tourism', 'Environment', 'Legislation/Tax', 'Innovation/Tech', 'Youth', 'SDG', 'Safety', 'Fire Protection'].map(a => (
                <label key={a} className="flex items-center gap-2">
                    <input type="checkbox" name="advocacies" value={a} onChange={handleChange} /> {a}
                </label>
            ))}
        </div>
      </div>

      {/* 15. Payment */}
      <div className="bg-yellow-50 p-4 rounded border border-yellow-200">
        <label className="block text-sm font-bold text-blue-900 mb-2">15. Payment Reference</label>
        <p className="text-xs text-gray-600 mb-2">Please enter your GCash/Bank Reference Number and Amount Paid.</p>
        <textarea name="paymentRef" onChange={handleChange} placeholder="Ref No: XXXXXX, Amount: PHP 1,500" className="w-full border p-2 rounded h-20"></textarea>
      </div>

      {/* 16. Source */}
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-1">16. How did you learn about us?</label>
        <select name="source" onChange={handleChange} className="w-full border p-2 rounded bg-white">
            <option value="">Select Option...</option>
            {['Friends/Family', 'PCCI Member', 'Facebook', 'Advertisement', 'Online Search'].map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      {/* 17. Consent */}
      <div className="flex items-start gap-3 p-4 bg-gray-50 rounded">
        <input type="checkbox" name="privacyConsent" onChange={handleChange} className="mt-1" />
        <p className="text-xs text-gray-600 leading-relaxed">
            <strong>Data Privacy Notice:</strong> The data generated will be handled with strict confidentiality in accordance with RA 10173 (Data Privacy Act). By checking this box, you agree that PCCI Las Piñas can collect and process your responses.
        </p>
      </div>

      <button type="submit" className="w-full bg-blue-900 text-white py-3 font-bold uppercase rounded hover:bg-blue-800 transition flex items-center justify-center gap-2">
        <Send size={18} /> Submit Application
      </button>

    </form>
  );
}