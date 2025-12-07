import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    'first-name': '',
    'last-name': '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const response = await fetch('https://formspree.io/f/xanrdwdn', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('sent');
        setFormData({
          'first-name': '',
          'last-name': '',
          email: '',
          message: '',
        });
      } else {
        setStatus('error');
        console.error('Form submission failed:', response.statusText);
      }
    } catch (error) {
      setStatus('error');
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8 animate-fade-in">
      <div className="contact-form-container">
        <h2 className="font-playfair text-3xl md:text-5xl text-center mb-4 animate-fade-in-up contact-form-title">Leave a Note</h2>
        <p className="text-base md:text-lg text-center text-gray-700 mb-8 md:mb-10 animate-fade-in-up animation-delay-100">
          I'll get back to you as soon as I can.
        </p>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
          <div className="animate-fade-in-up animation-delay-200">
            <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="first-name"
                id="first-name"
                autoComplete="given-name"
                value={formData['first-name']}
                onChange={handleChange}
                className="py-3 px-4 block w-full shadow-sm rounded-md bg-[#FBF9F3] border-[#C6A889] focus:ring-[#5A452C] focus:border-[#5A452C]"
                required
              />
            </div>
          </div>
          <div className="animate-fade-in-up animation-delay-300">
            <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="last-name"
                id="last-name"
                autoComplete="family-name"
                value={formData['last-name']}
                onChange={handleChange}
                className="py-3 px-4 block w-full shadow-sm rounded-md bg-[#FBF9F3] border-[#C6A889] focus:ring-[#5A452C] focus:border-[#5A452C]"
                required
              />
            </div>
          </div>
          <div className="sm:col-span-2 animate-fade-in-up animation-delay-400">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Your Email
            </label>
            <div className="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                className="py-3 px-4 block w-full shadow-sm rounded-md bg-[#FBF9F3] border-[#C6A889] focus:ring-[#5A452C] focus:border-[#5A452C]"
                required
              />
            </div>
          </div>
          <div className="sm:col-span-2 animate-fade-in-up animation-delay-500">
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
              Your Message
            </label>
            <div className="mt-1">
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className="py-3 px-4 block w-full shadow-sm rounded-md bg-[#FBF9F3] border-[#C6A889] focus:ring-[#5A452C] focus:border-[#5A452C]"
                required
              />
            </div>
          </div>
          <div className="sm:col-span-2 text-center animate-fade-in-up animation-delay-600">
            <button
              type="submit"
              className="w-full sm:w-auto inline-block px-8 py-3 rounded-full text-white font-semibold transition-transform duration-200 transform hover:scale-105 contact-form-button"
              disabled={status === 'sending'}
            >
              {status === 'sending' ? 'Sending...' : 'Send Message'}
            </button>
            {status === 'sent' && <p className="text-green-600 mt-4">Message sent successfully!</p>}
            {status === 'error' && <p className="text-red-600 mt-4">Something went wrong. Please try again.</p>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
