import { galleryConfig } from '@/config/gallery';
import { RemoteImage } from './RemoteImage';

export function GallerySection() {
  return (
    <section id="gallery" className="py-24 bg-neutral">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4 text-secondary">{galleryConfig.title}</h2>
          <p className="text-xl text-gray-700">{galleryConfig.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryConfig.images.map((image, idx) => (
            <div 
              key={idx} 
              className="relative group overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <RemoteImage
                src={image.url}
                alt={image.alt}
                width={600}
                height={400}
                className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <div>
                  <span className="inline-block bg-accent text-white px-4 py-1 rounded-full text-sm font-semibold mb-2">
                    {image.category}
                  </span>
                  <p className="text-white text-lg font-semibold">{image.alt}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
