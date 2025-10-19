import React from 'react';
import { Check, Zap, Palette, Video, ArrowLeft, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PricingSections = () => {
  const navigate = useNavigate();

  const handleSelectTier = (tier: any, serviceType: string) => {
    navigate('/quote', {
      state: {
        selectedTier: {
          name: tier.name,
          price: tier.sbaPrice,
          serviceType,
        },
      },
    });
  };

  const webDevTiers = [
    {
      id: 'launch-pad',
      name: 'Launch Pad',
      price: 1125,
      sbaPrice: 563,
      features: [
        '5-page responsive website',
        'Basic on-page SEO',
        'Mobile optimization',
        '90+ Lighthouse score',
        '1 month support',
      ],
    },
    {
      id: 'growth-engine',
      name: 'Growth Engine',
      price: 3750,
      sbaPrice: 1875,
      popular: true,
      features: [
        '10-page website',
        'Advanced SEO (local + technical)',
        'Lead capture forms',
        'Analytics setup',
        '3 months support',
      ],
    },
    {
      id: 'market-dominator',
      name: 'Market Dominator',
      price: 11250,
      sbaPrice: 5625,
      features: [
        'Custom CMS integration',
        'E-commerce capability',
        'Stripe payment processing',
        'Conversion optimization',
        '6 months support',
      ],
    },
  ];

  const brandingTiers = [
    {
      id: 'brand-essentials',
      name: 'Brand Essentials',
      price: 600,
      sbaPrice: 300,
      features: [
        'Logo design (3 concepts)',
        'Color palette',
        'Typography system',
        'Brand guidelines PDF',
        '2 revisions',
      ],
    },
    {
      id: 'brand-authority',
      name: 'Brand Authority',
      price: 1500,
      sbaPrice: 750,
      popular: true,
      features: [
        'Everything in Essentials',
        'Business card design',
        'Social media templates',
        'Email signature',
        'Unlimited revisions',
      ],
    },
  ];

  const visualTiers = [
    {
      id: 'content-starter',
      name: 'Content Starter',
      price: 250,
      sbaPrice: 125,
      features: [
        '5 edited photos',
        'Basic color correction',
        'Social media sizing',
        '72-hour turnaround',
      ],
    },
    {
      id: 'content-pro',
      name: 'Content Pro',
      price: 750,
      sbaPrice: 375,
      popular: true,
      features: [
        '15 edited photos/graphics',
        'Advanced retouching',
        'Motion graphics (3 clips)',
        'Brand consistency check',
        '48-hour turnaround',
      ],
    },
  ];

  const TierCard = ({ tier, serviceType }: any) => (
    <div
      className={`
      relative bg-white/5 backdrop-blur-md rounded-lg border-2 p-6
      transition-all duration-300 hover:scale-105
      ${tier.popular ? 'border-amber-400 shadow-lg shadow-amber-400/20' : 'border-purple-500/30'}
    `}
    >
      {tier.popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-400 text-gray-900 px-4 py-1 rounded-full text-sm font-bold">
          MOST POPULAR
        </div>
      )}

      <h3 className="text-2xl font-bold text-white mb-4">{tier.name}</h3>

      <div className="mb-6">
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-bold text-white">${tier.price.toLocaleString()}</span>
        </div>
        <div className="text-sm text-amber-400 mt-1">
          SBA Owners: ${tier.sbaPrice.toLocaleString()} (First 25)
        </div>
      </div>

      <ul className="space-y-3 mb-6">
        {tier.features.map((feature: string, idx: number) => (
          <li key={idx} className="flex items-start gap-2 text-gray-200">
            <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
            <span className="text-sm">{feature}</span>
          </li>
        ))}
      </ul>

      <button
        onClick={() => handleSelectTier(tier, serviceType)}
        className={`
          w-full py-3 rounded-lg font-bold transition-all
          ${
            tier.popular
              ? 'bg-amber-400 text-gray-900 hover:bg-amber-300'
              : 'bg-purple-600 text-white hover:bg-purple-500'
          }
        `}
      >
        Select This Package
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="fixed top-20 right-4 z-50 flex flex-col gap-2">
        <button
          onClick={() => navigate('/')}
          className="bg-purple-600 text-white p-3 rounded-full shadow-lg hover:bg-purple-500"
        >
          <Home className="w-5 h-5" />
        </button>
        <button
          onClick={() => navigate('/#services')}
          className="bg-gray-700 text-white p-3 rounded-full shadow-lg hover:bg-gray-600"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
      </div>

      <section
        id="web-dev"
        className="relative min-h-screen py-20 px-4"
        style={{
          backgroundImage: `url('https://res.cloudinary.com/dsxpcwjwb/image/upload/c_scale,w_800,q_auto:eco,f_auto/v1760826970/branding-prcing_dt1ygp.webp')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 via-purple-900/85 to-gray-900/90" />
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Zap className="w-12 h-12 text-purple-400" />
              <h2 className="text-4xl md:text-5xl font-bold text-white">
                Full-Stack Web Development
              </h2>
            </div>
            <p className="text-xl text-gray-300">Lightning-fast websites that convert</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {webDevTiers.map((tier) => (
              <TierCard key={tier.id} tier={tier} serviceType="web-development" />
            ))}
          </div>
        </div>
      </section>

      <section
        id="branding"
        className="relative min-h-screen py-20 px-4"
        style={{
          backgroundImage: `url('https://res.cloudinary.com/dsxpcwjwb/image/upload/c_scale,w_800,q_auto:eco,f_auto/v1760826922/brand-talent-showcase_nzme5u.webp')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 via-amber-900/75 to-gray-900/90" />
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Palette className="w-12 h-12 text-amber-400" />
              <h2 className="text-4xl md:text-5xl font-bold text-white">
                Strategic Branding & Identity
              </h2>
            </div>
            <p className="text-xl text-gray-300">Build market authority and customer trust</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {brandingTiers.map((tier) => (
              <TierCard key={tier.id} tier={tier} serviceType="branding" />
            ))}
          </div>
        </div>
      </section>

      <section
        id="visual-content"
        className="relative min-h-screen py-20 px-4"
        style={{
          backgroundImage: `url('https://res.cloudinary.com/dsxpcwjwb/image/upload/c_scale,w_800,q_auto:eco,f_auto/v1760826970/web-dev-prcng_uw5tlz.webp')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 via-purple-900/80 to-amber-900/75" />
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Video className="w-12 h-12 text-purple-400" />
              <h2 className="text-4xl md:text-5xl font-bold text-white">
                Visual Content & Editing
              </h2>
            </div>
            <p className="text-xl text-gray-300">Professional content that drives engagement</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {visualTiers.map((tier) => (
              <TierCard key={tier.id} tier={tier} serviceType="visual-content" />
            ))}
          </div>
        </div>
      </section>

      <div className="bg-gray-900 py-12 border-t border-purple-500/30">
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-8 text-center text-white px-4">
          <div>
            <div className="text-3xl font-bold text-purple-400">99/100</div>
            <div className="text-sm text-gray-400">Lighthouse Score</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-amber-400">16+</div>
            <div className="text-sm text-gray-400">Years Experience</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-green-400">100%</div>
            <div className="text-sm text-gray-400">Atlanta-Based</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingSections;
