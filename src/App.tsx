import React, { useState } from 'react';
import { Bot, Mail, Shield, LineChart, MessageSquare, Calendar, Instagram, Database } from 'lucide-react';
import { Toaster, toast } from 'react-hot-toast';
import { supabase } from './lib/supabase';

function FeatureCard({ icon: Icon, title, description, benefits }: { 
  icon: React.ElementType, 
  title: string, 
  description: string,
  benefits: string[]
}) {
  return (
    <div className="border border-[#B38B59] bg-black/5 backdrop-blur-sm p-8 rounded hover:bg-black/10 transition-all duration-300 group">
      <Icon className="w-12 h-12 text-[#B38B59] mb-4 group-hover:scale-110 transition-transform" />
      <h3 className="text-xl font-light mb-3">{title}</h3>
      <p className="text-gray-400 font-light mb-6">{description}</p>
      <ul className="space-y-2">
        {benefits.map((benefit, index) => (
          <li key={index} className="text-sm text-gray-500 flex items-start">
            <span className="text-[#B38B59] mr-2">•</span>
            {benefit}
          </li>
        ))}
      </ul>
    </div>
  );
}

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('contact_submissions')
        .insert([formData]);

      if (error) throw error;

      toast.success('Message envoyé avec succès!');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Toaster position="top-center" />
      {/* Hero Section */}
      <header className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#B38B59_0%,_transparent_50%)] opacity-20"></div>
        <div className="container mx-auto px-4 py-32 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-extralight mb-8 tracking-wider">
              Digitalisation et{' '}
              <span className="text-[#B38B59] font-normal">Automatisation</span>
            </h1>
            <p className="text-xl mb-12 text-gray-400 font-light tracking-wide">
              Transformez votre entreprise avec l'Intelligence Artificielle
            </p>
            <div className="flex justify-center gap-6">
              <a 
                href="#solutions" 
                className="inline-block border border-[#B38B59] text-[#B38B59] px-12 py-4 rounded-none hover:bg-[#B38B59] hover:text-black transition-all duration-300"
              >
                Découvrir
              </a>
              <a 
                href="#contact" 
                className="inline-block border border-[#B38B59] bg-[#B38B59] text-black px-12 py-4 rounded-none hover:bg-transparent hover:text-[#B38B59] transition-all duration-300"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* About Section */}
      <section className="py-32 border-t border-[#B38B59]/20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-light mb-8 tracking-wide">Notre Vision</h2>
            <p className="text-gray-400 font-light leading-relaxed">
              Chez Laith Method, nous redéfinissons l'avenir de l'entreprise. Notre expertise en intelligence artificielle 
              permet à votre organisation de transcender ses limites traditionnelles, ouvrant la voie à une efficacité 
              et une innovation sans précédent.
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="solutions" className="py-32 border-t border-[#B38B59]/20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-light text-center mb-16 tracking-wide">Solutions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={MessageSquare}
              title="Support Client Intelligent"
              description="Révolutionnez votre relation client avec des assistants virtuels disponibles 24/7, offrant une expérience personnalisée et instantanée."
              benefits={[
                "Réponses instantanées aux questions fréquentes",
                "Personnalisation basée sur l'historique client",
                "Réduction de 70% du temps de traitement",
                "Satisfaction client améliorée de 45%"
              ]}
            />
            <FeatureCard
              icon={LineChart}
              title="Marketing Prédictif"
              description="Optimisez vos campagnes marketing grâce à l'analyse prédictive et l'intelligence artificielle pour des résultats exceptionnels."
              benefits={[
                "Prédiction précise des tendances du marché",
                "Segmentation client ultra-ciblée",
                "ROI marketing augmenté de 35%",
                "Campagnes personnalisées automatisées"
              ]}
            />
            <FeatureCard
              icon={Database}
              title="Analyse Avancée"
              description="Transformez vos données en insights stratégiques avec nos outils d'analyse avancée pour une prise de décision éclairée."
              benefits={[
                "Tableaux de bord en temps réel",
                "Prévisions précises à 95%",
                "Identification des opportunités cachées",
                "Optimisation des processus métier"
              ]}
            />
            <FeatureCard
              icon={Instagram}
              title="Présence Digitale"
              description="Maximisez votre impact sur les réseaux sociaux avec une gestion intelligente et automatisée de votre présence en ligne."
              benefits={[
                "Planification automatique des posts",
                "Analyse des tendances en temps réel",
                "Engagement augmenté de 60%",
                "Contenu optimisé par l'IA"
              ]}
            />
            <FeatureCard
              icon={Calendar}
              title="Gestion Intelligente"
              description="Optimisez votre temps et vos ressources avec notre système de gestion intelligent qui anticipe vos besoins."
              benefits={[
                "Planification automatique intelligente",
                "Réduction des conflits d'horaire",
                "Optimisation des ressources",
                "Rappels contextuels personnalisés"
              ]}
            />
            <FeatureCard
              icon={Bot}
              title="Innovation Sur Mesure"
              description="Développez des solutions IA personnalisées qui répondent parfaitement à vos défis spécifiques et objectifs business."
              benefits={[
                "Solutions adaptées à votre secteur",
                "Intégration transparente",
                "ROI mesurable et significatif",
                "Support technique dédié"
              ]}
            />
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="py-32 border-t border-[#B38B59]/20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Shield className="w-16 h-16 text-[#B38B59] mx-auto mb-8" />
            <h2 className="text-3xl font-light mb-8 tracking-wide">Sécurité Absolue</h2>
            <p className="text-gray-400 font-light mb-8">
              La protection de vos données est au cœur de notre engagement. Nos protocoles 
              de sécurité avancés garantissent une confidentialité totale.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 border-t border-[#B38B59]/20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-light text-center mb-16 tracking-wide">Contact</h2>
            <div className="flex items-center justify-center mb-12">
              <Mail className="w-6 h-6 text-[#B38B59] mr-2" />
              <a href="mailto:contact@laithmethod.com" className="text-[#B38B59] hover:text-[#B38B59]/80">
                contact@laithmethod.com
              </a>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Nom"
                  required
                  className="w-full px-6 py-4 bg-black border border-[#B38B59]/30 rounded-none focus:outline-none focus:border-[#B38B59] transition-colors text-white placeholder-gray-500"
                />
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  required
                  className="w-full px-6 py-4 bg-black border border-[#B38B59]/30 rounded-none focus:outline-none focus:border-[#B38B59] transition-colors text-white placeholder-gray-500"
                />
              </div>
              <div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Message"
                  required
                  rows={4}
                  className="w-full px-6 py-4 bg-black border border-[#B38B59]/30 rounded-none focus:outline-none focus:border-[#B38B59] transition-colors text-white placeholder-gray-500"
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full border border-[#B38B59] text-[#B38B59] py-4 px-8 rounded-none hover:bg-[#B38B59] hover:text-black transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Envoi en cours...' : 'Envoyer'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-[#B38B59]/20">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400 font-light">&copy; {new Date().getFullYear()} Laith Method. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;