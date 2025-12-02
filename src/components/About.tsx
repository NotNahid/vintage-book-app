import React from 'react';

const About: React.FC = () => {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 text-left animate-fade-in">
      <h1 className="font-playfair text-5xl md:text-6xl font-medium mb-8" style={{ color: '#5A452C' }}>
        About the Author
      </h1>
      <div className="space-y-6 text-lg text-gray-700">
        <p>
          Welcome to my digital library. I'm a creator who finds joy in the spaces where technology and storytelling intersect. My work is driven by a passion for building elegant solutions and crafting narratives that resonate.
        </p>
        <p>
          This portfolio is a curated collection of my professional projects, personal essays, and creative experiments. Each "book" on the shelf represents a story—a problem solved, a skill learned, or an idea explored.
        </p>
        <p>
          When I'm not coding or writing, you can find me exploring abstract photography, getting lost in a good book, or planning my next adventure. Feel free to browse the shelves and get in touch.
        </p>
      </div>
    </div>
  );
};

// We can add a simple fade-in animation to App.css if you like
const style = document.createElement('style');
style.innerHTML = `
  @keyframes fade-in {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fade-in {
    animation: fade-in 0.5s ease-out forwards;
  }
`;
document.head.appendChild(style);

export default About;
