import { aboutConfig } from '@/config/about';
import { Calendar, Award, Leaf, Heart } from 'lucide-react';

const iconMap = {
  calendar: Calendar,
  award: Award,
  leaf: Leaf,
  heart: Heart
};

export function AboutSection() {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-5xl font-bold mb-6 text-secondary">{aboutConfig.title}</h2>
          <p className="text-xl text-gray-700 mb-6 leading-relaxed">{aboutConfig.description}</p>
          <p className="text-lg text-gray-600 italic">{aboutConfig.mission}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {aboutConfig.highlights.map(highlight => {
            const Icon = iconMap[highlight.icon as keyof typeof iconMap];
            return (
              <div key={highlight.title} className="text-center p-6 bg-neutral rounded-xl">
                <Icon className="mx-auto mb-4 text-primary" size={48} />
                <h3 className="text-2xl font-bold mb-2 text-secondary">{highlight.title}</h3>
                <p className="text-gray-700">{highlight.description}</p>
              </div>
            );
          })}
        </div>

        <div className="max-w-3xl mx-auto">
          <h3 className="text-3xl font-bold mb-8 text-center text-secondary">
            {aboutConfig.team.title}
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            {aboutConfig.team.members.map(member => (
              <div key={member.name} className="bg-neutral p-8 rounded-xl">
                <h4 className="text-2xl font-bold mb-2 text-primary">{member.name}</h4>
                <p className="text-lg text-secondary font-semibold mb-3">{member.role}</p>
                <p className="text-gray-700">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
