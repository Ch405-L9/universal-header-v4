import { siteConfig } from '@/config/site';
import { RemoteImage } from './RemoteImage';

export function Hero() {
  return (
    <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center text-white">
      <RemoteImage
        src="https://res.cloudinary.com/demo/image/upload/f_auto,q_auto,c_limit,w_1600/samples/food/dessert.jpg"
        alt="Bakery hero"
        priority
        width={1600}
        height={900}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/30" />
      
      <div className="relative z-10 text-center px-4 max-w-4xl">
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          {siteConfig.name}
        </h1>
        <p className="text-2xl md:text-3xl mb-8 font-light">
          {siteConfig.tagline}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href="#services"
            className="inline-block bg-accent hover:bg-accent/90 text-white px-10 py-4 rounded-lg text-xl font-semibold transition-all shadow-lg hover:shadow-xl"
          >
            View Menu
          </a>
          <a 
            href="#contact"
            className="inline-block bg-white/10 backdrop-blur hover:bg-white/20 text-white px-10 py-4 rounded-lg text-xl font-semibold transition-all border-2 border-white"
          >
            Order Now
          </a>
        </div>
      </div>
    </section>
  );
}
