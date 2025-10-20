import { siteConfig } from '@/config/site';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-primary text-white shadow-lg">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <div className="text-2xl font-heading font-bold">{siteConfig.name}</div>
        
        <nav className="hidden md:flex gap-8 text-lg">
          <a href="#services" className="hover:text-accent transition-colors">Menu</a>
          <a href="#about" className="hover:text-accent transition-colors">About</a>
          <a href="#gallery" className="hover:text-accent transition-colors">Gallery</a>
          <a href="#contact" className="hover:text-accent transition-colors">Contact</a>
        </nav>

        <button 
          onClick={() => setOpen(!open)} 
          className="md:hidden p-2"
          aria-label="Toggle menu"
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {open && (
        <nav className="md:hidden bg-secondary px-6 py-6 flex flex-col gap-4 text-lg">
          <a href="#services" onClick={() => setOpen(false)}>Menu</a>
          <a href="#about" onClick={() => setOpen(false)}>About</a>
          <a href="#gallery" onClick={() => setOpen(false)}>Gallery</a>
          <a href="#contact" onClick={() => setOpen(false)}>Contact</a>
        </nav>
      )}
    </header>
  );
}
