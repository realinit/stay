"use client";

import React, { useState } from 'react';
import Typography from '../atoms/Typography';
import Button from '../atoms/Button';
import Input from '../atoms/Input';

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSignup: (data: SignupData) => void;
}

interface SignupData {
  businessName: string;
  businessType: string;
  ownerName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  gstNumber?: string;
  panNumber?: string;
  bankName: string;
  accountNumber: string;
  ifscCode: string;
  accountHolderName: string;
  termsAccepted: boolean;
}

const SignupModal: React.FC<SignupModalProps> = ({
  isOpen,
  onClose,
  onSignup,
}) => {
  const [step, setStep] = useState<'basic' | 'business' | 'banking' | 'verification'>('basic');
  const [formData, setFormData] = useState({
    businessName: '',
    businessType: '',
    ownerName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    gstNumber: '',
    panNumber: '',
    bankName: '',
    accountNumber: '',
    ifscCode: '',
    accountHolderName: '',
    termsAccepted: false,
  });
  const [selectedCountry, setSelectedCountry] = useState('+91');

  const businessTypes = [
    'Travel Agency',
    'Hotel/Homestay',
    'Transport Service',
    'Tour Operator',
    'Event Management',
    'Restaurant/Cafe',
    'Retail Store',
    'Other',
  ];

  const states = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
    'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
    'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
    'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
    'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  ];

  const countries = [
    { code: '+91', name: 'India' },
    { code: '+62', name: 'Indonesia' },
    { code: '+60', name: 'Malaysia' },
    { code: '+971', name: 'UAE' },
    { code: '+66', name: 'Thailand' },
    { code: '+63', name: 'Philippines' },
    { code: '+84', name: 'Vietnam' },
    { code: '+966', name: 'Saudi Arabia' },
  ];

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      termsAccepted: e.target.checked,
    }));
  };

  const handleNext = () => {
    if (step === 'basic') setStep('business');
    else if (step === 'business') setStep('banking');
    else if (step === 'banking') setStep('verification');
  };

  const handleBack = () => {
    if (step === 'verification') setStep('banking');
    else if (step === 'banking') setStep('business');
    else if (step === 'business') setStep('basic');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const signupData: SignupData = {
      ...formData,
      phone: selectedCountry + formData.phone,
    };
    onSignup(signupData);
    handleClose();
  };

  const handleClose = () => {
    setFormData({
      businessName: '',
      businessType: '',
      ownerName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      pincode: '',
      gstNumber: '',
      panNumber: '',
      bankName: '',
      accountNumber: '',
      ifscCode: '',
      accountHolderName: '',
      termsAccepted: false,
    });
    setStep('basic');
    onClose();
  };

  const isBasicValid = formData.businessName && formData.ownerName && formData.email && formData.phone;
  const isBusinessValid = formData.address && formData.city && formData.state && formData.pincode;
  const isBankingValid = formData.bankName && formData.accountNumber && formData.ifscCode && formData.accountHolderName;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      ></div>
      
      {/* Modal */}
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-6 text-white text-center relative">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors duration-300"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🏢</span>
          </div>
          
          <Typography variant="h3" className="text-xl font-bold mb-2">
            Partner Registration
          </Typography>
          <Typography variant="body" className="text-blue-100">
            Join Jackstay as a Business Partner
          </Typography>
        </div>

        {/* Progress Bar */}
        <div className="px-6 py-4 bg-gray-50">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">Step {step === 'basic' ? 1 : step === 'business' ? 2 : step === 'banking' ? 3 : 4} of 4</span>
            <span className="text-sm text-gray-500">
              {step === 'basic' ? 'Basic Info' : step === 'business' ? 'Business Details' : step === 'banking' ? 'Banking Info' : 'Verification'}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-600 to-cyan-600 h-2 rounded-full transition-all duration-300"
              style={{ width: step === 'basic' ? '25%' : step === 'business' ? '50%' : step === 'banking' ? '75%' : '100%' }}
            ></div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Step 1: Basic Information */}
            {step === 'basic' && (
              <div className="space-y-4">
                <Typography variant="h4" className="text-lg font-semibold text-gray-800 mb-4">
                  Basic Information
                </Typography>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Business Name *
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your business name"
                      value={formData.businessName}
                      onChange={handleInputChange('businessName')}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Business Type *
                    </label>
                    <select
                      value={formData.businessType}
                      onChange={handleInputChange('businessType')}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    >
                      <option value="">Select business type</option>
                      {businessTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Owner Name *
                    </label>
                    <input
                      type="text"
                      placeholder="Enter owner's full name"
                      value={formData.ownerName}
                      onChange={handleInputChange('ownerName')}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      placeholder="Enter email address"
                      value={formData.email}
                      onChange={handleInputChange('email')}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mobile Number *
                    </label>
                    <div className="flex">
                      <select
                        value={selectedCountry}
                        onChange={(e) => setSelectedCountry(e.target.value)}
                        className="px-3 py-3 border border-gray-300 rounded-l-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                      >
                        {countries.map(country => (
                          <option key={country.code} value={country.code}>
                            {country.code}
                          </option>
                        ))}
                      </select>
                      <input
                        type="tel"
                        placeholder="Enter mobile number"
                        value={formData.phone}
                        onChange={handleInputChange('phone')}
                        className="rounded-r-xl w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Business Details */}
            {step === 'business' && (
              <div className="space-y-4">
                <Typography variant="h4" className="text-lg font-semibold text-gray-800 mb-4">
                  Business Details
                </Typography>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Business Address *
                    </label>
                    <textarea
                      placeholder="Enter complete business address"
                      value={formData.address}
                      onChange={handleInputChange('address')}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        City *
                      </label>
                      <input
                        type="text"
                        placeholder="Enter city"
                        value={formData.city}
                        onChange={handleInputChange('city')}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        State *
                      </label>
                      <select
                        value={formData.state}
                        onChange={handleInputChange('state')}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      >
                        <option value="">Select state</option>
                        {states.map(state => (
                          <option key={state} value={state}>{state}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Pincode *
                      </label>
                      <input
                        type="text"
                        placeholder="Enter pincode"
                        value={formData.pincode}
                        onChange={handleInputChange('pincode')}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        GST Number (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="Enter GST number"
                        value={formData.gstNumber}
                        onChange={handleInputChange('gstNumber')}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        PAN Number (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="Enter PAN number"
                        value={formData.panNumber}
                        onChange={handleInputChange('panNumber')}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Banking Information */}
            {step === 'banking' && (
              <div className="space-y-4">
                <Typography variant="h4" className="text-lg font-semibold text-gray-800 mb-4">
                  Banking Information
                </Typography>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bank Name *
                    </label>
                    <input
                      type="text"
                      placeholder="Enter bank name"
                      value={formData.bankName}
                      onChange={handleInputChange('bankName')}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Account Number *
                    </label>
                    <input
                      type="text"
                      placeholder="Enter account number"
                      value={formData.accountNumber}
                      onChange={handleInputChange('accountNumber')}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      IFSC Code *
                    </label>
                    <input
                      type="text"
                      placeholder="Enter IFSC code"
                      value={formData.ifscCode}
                      onChange={handleInputChange('ifscCode')}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Account Holder Name *
                    </label>
                    <input
                      type="text"
                      placeholder="Enter account holder name"
                      value={formData.accountHolderName}
                      onChange={handleInputChange('accountHolderName')}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Verification */}
            {step === 'verification' && (
              <div className="space-y-4">
                <Typography variant="h4" className="text-lg font-semibold text-gray-800 mb-4">
                  Review & Verification
                </Typography>
                
                <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm font-medium text-gray-600">Business Name:</span>
                      <p className="text-gray-800">{formData.businessName}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-600">Business Type:</span>
                      <p className="text-gray-800">{formData.businessType}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-600">Owner Name:</span>
                      <p className="text-gray-800">{formData.ownerName}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-600">Email:</span>
                      <p className="text-gray-800">{formData.email}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-600">Phone:</span>
                      <p className="text-gray-800">{selectedCountry} {formData.phone}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-600">Bank:</span>
                      <p className="text-gray-800">{formData.bankName}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={formData.termsAccepted}
                    onChange={handleCheckboxChange}
                    className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    required
                  />
                  <label htmlFor="terms" className="text-sm text-gray-700">
                    I agree to the{' '}
                    <a href="#" className="text-blue-600 hover:text-blue-700 underline">
                      Terms & Conditions
                    </a>
                    {' '}and{' '}
                    <a href="#" className="text-blue-600 hover:text-blue-700 underline">
                      Privacy Policy
                    </a>
                  </label>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6">
                             {step !== 'basic' && (
                 <Button
                   variant="outline"
                   size="lg"
                   className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300"
                   onClick={handleBack}
                 >
                   ← Back
                 </Button>
               )}
               
               <div className="flex space-x-3 ml-auto">
                 {step !== 'verification' ? (
                   <Button
                     variant="primary"
                     size="lg"
                     className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 transform hover:scale-105 transition-all duration-300 shadow-lg"
                     onClick={handleNext}
                     disabled={
                       (step === 'basic' && !isBasicValid) ||
                       (step === 'business' && !isBusinessValid) ||
                       (step === 'banking' && !isBankingValid)
                     }
                   >
                     Next Step →
                   </Button>
                 ) : (
                   <Button
                     variant="primary"
                     size="lg"
                     className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 transform hover:scale-105 transition-all duration-300 shadow-lg"
                     disabled={!formData.termsAccepted}
                   >
                     Submit Registration
                   </Button>
                 )}
               </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupModal; 