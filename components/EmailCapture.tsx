'use client';

import { useState } from 'react';
import { X, Mail, ArrowRight } from 'lucide-react';

interface EmailCaptureProps {
  isOpen: boolean;
  onClose: () => void;
  projectTitle: string;
}

export default function EmailCapture({ isOpen, onClose, projectTitle }: EmailCaptureProps) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // In production, you would:
    // 1. Send to your backend/email service
    // 2. Add to mailing list
    // 3. Send the PDF guide

    console.log('Email submitted:', email);
    setIsSubmitted(true);
    setIsSubmitting(false);
    setEmail('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />

      {/* Modal */}
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10"
          >
            <X className="w-6 h-6" />
          </button>

          {!isSubmitted ? (
            <>
              {/* Header */}
              <div className="bg-gradient-to-r from-primary to-secondary p-8 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                <div className="flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-4 mx-auto backdrop-blur-sm">
                  <Mail className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-center mb-2 tracking-tight">
                  Get the Full Guide
                </h3>
                <p className="text-center text-white/90 font-medium">
                  We'll send you a detailed guide for "{projectTitle}" plus 5 more ideas
                </p>
              </div>

              {/* Form */}
              <div className="p-8">
                <form onSubmit={handleSubmit}>
                  <div className="mb-6">
                    <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                      Your Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      required
                      className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/10 focus:outline-none transition-all font-medium"
                      disabled={isSubmitting}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || !email}
                    className="w-full py-4 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-xl hover:shadow-lg hover:shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center transform hover:-translate-y-0.5"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <>
                        Send My Guide
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </>
                    )}
                  </button>

                  <p className="text-center text-gray-500 text-sm mt-4">
                    No spam, just creative ideas. Unsubscribe anytime.
                  </p>
                </form>
              </div>
            </>
          ) : (
            /* Success State */
            <div className="p-12 text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Guide Sent!</h3>
              <p className="text-gray-600 mb-8">
                Check your inbox for the "{projectTitle}" guide and 5 bonus ideas.
              </p>
              <button
                onClick={onClose}
                className="py-3 px-6 bg-gradient-to-r from-gray-100 to-gray-50 text-gray-800 font-semibold rounded-xl hover:from-gray-200 hover:to-gray-100 transition-all border border-gray-200"
              >
                Back to Generator
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}