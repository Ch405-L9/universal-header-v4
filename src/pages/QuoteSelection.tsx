import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const QuoteSelection: React.FC = () => {
  const nav = useNavigate();
  const [selected, setSelected] = useState<string[]>([]);
  const toggle = (id: string) =>
    setSelected(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);

  const go = () => {
    if (selected.length === 0) return;
    const [first, ...rest] = selected;
    const href = first === 'branding' ? '/quote/branding'
      : first === 'visual' ? '/quote/visual'
      : '/quote/development';
    const url = rest.length ? `${href}?services=${selected.join(',')}` : href;
    nav(url);
  };

  const Card = ({ id, name, desc }:{id:string;name:string;desc:string}) => {
    const checked = selected.includes(id);
    return (
      <button onClick={() => toggle(id)}
        className={`p-4 text-left border-2 rounded-lg mb-3 ${checked?'border-blue-500 bg-blue-500/10':'border-gray-300 hover:border-gray-400'}`}>
        <div className="flex justify-between">
          <div>
            <div className="font-semibold">{name}</div>
            <div className="text-sm text-gray-500">{desc}</div>
          </div>
          <input type="checkbox" readOnly checked={checked} />
        </div>
      </button>
    );
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Select Your Services</h1>
      <p className="text-sm text-green-600 mb-4">30% off base + extra 30% off when bundling 2+.</p>
      <Card id="development" name="Full-Stack Development" desc="Websites & web apps" />
      <Card id="branding" name="Branding & Identity" desc="Logo, style, brand system" />
      <Card id="visual" name="Visual Content & Editing" desc="Photo/graphics editing" />
      <button onClick={go} disabled={!selected.length}
        className="mt-4 w-full py-3 rounded bg-blue-600 disabled:bg-gray-400 text-white font-semibold">
        Continue to Quote
      </button>
    </div>
  );
};
export default QuoteSelection;
