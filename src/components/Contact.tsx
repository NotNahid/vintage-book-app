import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    'first-name': '',
    'last-name': '',
    email: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    setFormData({
      'first-name': '',
      'last-name': '',
      email: '',
      message: '',
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8 animate-fade-in">
      <div className="bg-[#FBF9F3] border-2 border-[#E6D6C1] rounded-lg shadow-lg p-6 md:p-12" style={{boxShadow: '0 10px 30px rgba(0,0,0,0.1)'}}>
        <h2 className="font-playfair text-3xl md:text-5xl text-center mb-4 animate-fade-in-up" style={{ color: '#5A452C' }}>Leave a Note</h2>
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
                defaultValue={''}
              />
            </div>
          </div>
          <div className="sm:col-span-2 text-center animate-fade-in-up animation-delay-600">
            <button
              type="submit"
              className="w-full sm:w-auto inline-block px-8 py-3 rounded-full text-white font-semibold transition-transform duration-200 transform hover:scale-105"
              style={{ backgroundColor: '#5D503C', boxShadow: '0 4px 15px rgba(0,0,0,0.2)' }}
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
