import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Award, Users, Anchor, Heart, Star, Trophy, Shield, Camera, MapPin, Calendar, Target, Compass } from 'lucide-react';
import SEOHead from '../components/SEOHead';

const AboutPage: React.FC = () => {
  const { t } = useTranslation();

  const milestones = [
    { 
      year: '2009', 
      title: t('about.theBeginning'), 
      description: 'Founded by passionate sailor Marco Benedetti with a single yacht and a dream to share authentic racing experiences',
      icon: Anchor
    },
    { 
      year: '2012', 
      title: 'First 1000 Guests', 
      description: 'Reached our first major milestone of satisfied customers from across Europe',
      icon: Users
    },
    { 
      year: '2015', 
      title: 'RYA Certification', 
      description: 'Achieved Royal Yachting Association certification for professional sailing instruction',
      icon: Award
    },
    { 
      year: '2018', 
      title: 'Fleet Expansion', 
      description: 'Added modern Bavaria racing yachts to provide the ultimate sailing experience',
      icon: Trophy
    },
    { 
      year: '2020', 
      title: 'Digital Innovation', 
      description: 'Launched online booking platform and digital guest services',
      icon: Target
    },
    { 
      year: '2024', 
      title: '2000+ Happy Sailors', 
      description: 'Celebrating over 2000 satisfied customers from 30+ countries worldwide',
      icon: Star
    }
  ];

  const team = [
    {
      name: 'Marco Benedetti',
      role: 'Founder & Head Skipper',
      image: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
      description: 'RYA Yachtmaster with 20+ years of sailing experience on Lake Garda. Former competitive racer turned passionate instructor.',
      specialties: ['Racing Strategy', 'Safety Management', 'Guest Experience']
    },
    {
      name: 'Sofia Rossi',
      role: 'Operations Manager',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
      description: 'Ensures every guest has an unforgettable experience. Multilingual hospitality expert with a passion for sailing.',
      specialties: ['Guest Relations', 'Quality Assurance', 'Team Coordination']
    },
    {
      name: 'Andreas Mueller',
      role: 'Senior Skipper',
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
      description: 'Former Olympic sailor and certified sailing instructor. Brings world-class racing expertise to every experience.',
      specialties: ['Advanced Techniques', 'Competition Training', 'Weather Analysis']
    },
    {
      name: 'Elena Bianchi',
      role: 'Safety Officer & Instructor',
      image: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
      description: 'Certified marine safety expert and sailing instructor. Ensures all experiences meet the highest safety standards.',
      specialties: ['Safety Protocols', 'Emergency Response', 'Equipment Management']
    }
  ];

  const values = [
    {
      icon: Shield,
      title: 'Safety First',
      description: 'Your safety is our absolute priority. We maintain the highest safety standards, use only certified equipment, and conduct thorough briefings before every experience.',
      color: 'bg-green-50 text-green-600'
    },
    {
      icon: Heart,
      title: 'Passion for Sailing',
      description: 'We live and breathe sailing. Our genuine passion for the sport drives everything we do, from instruction quality to creating unforgettable memories.',
      color: 'bg-red-50 text-red-600'
    },
    {
      icon: Users,
      title: 'Inclusive Excellence',
      description: 'Whether you\'re a complete beginner or experienced sailor, everyone is welcome. We tailor each experience to ensure everyone feels confident and engaged.',
      color: 'bg-blue-50 text-blue-600'
    },
    {
      icon: Trophy,
      title: 'Authentic Racing',
      description: 'We provide genuine yacht racing experiences with real competition, official timing, and meaningful recognition of achievement.',
      color: 'bg-yellow-50 text-yellow-600'
    },
    {
      icon: Target,
      title: 'Continuous Innovation',
      description: 'We constantly evolve our services, incorporating the latest sailing techniques, safety protocols, and guest experience innovations.',
      color: 'bg-purple-50 text-purple-600'
    }
  ];

  const achievements = [
    {
      icon: Award,
      title: 'RYA Certified Excellence',
      description: 'Royal Yachting Association certification for professional sailing instruction',
      year: '2015'
    },
    {
      icon: Star,
      title: '4.9★ Guest Rating',
      description: 'Consistently high ratings across all review platforms',
      year: 'Ongoing'
    },
    {
      icon: Shield,
      title: 'Zero Safety Incidents',
      description: '15 years of operations with perfect safety record',
      year: '2009-2024'
    },
    {
      icon: Users,
      title: '2000+ Satisfied Guests',
      description: 'Welcomed sailors from over 30 countries worldwide',
      year: '2024'
    },
    {
      icon: Trophy,
      title: 'Industry Recognition',
      description: 'Featured in leading sailing and travel publications',
      year: '2020-2024'
    },
    {
      icon: Camera,
      title: 'Media Excellence',
      description: 'Professional photography and videography services included',
      year: '2018'
    }
  ];

  const differentiators = [
    {
      title: 'Authentic Racing Experience',
      description: 'Unlike tourist sailing trips, we offer real yacht racing with official timing, scoring, and competitive elements that create genuine excitement.',
      icon: Trophy
    },
    {
      title: 'Professional Instruction',
      description: 'Our RYA-certified skippers provide world-class instruction, ensuring you learn proper techniques while having fun.',
      icon: Award
    },
    {
      title: 'Complete Experience Package',
      description: 'Everything included: professional photos, racing medals, certificates, safety equipment, and expert guidance.',
      icon: Star
    },
    {
      title: 'Perfect Location',
      description: 'Lake Garda offers ideal sailing conditions with consistent thermal winds and stunning Alpine scenery.',
      icon: MapPin
    },
    {
      title: 'Multilingual Team',
      description: 'Our team speaks English, Italian, German, and Russian, ensuring clear communication and comfort for all guests.',
      icon: Users
    },
    {
      title: 'Flexible & Reliable',
      description: 'Daily departures, weather guarantees, and flexible booking policies make planning your experience stress-free.',
      icon: Calendar
    }
  ];

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <SEOHead
        title={t('about.title')}
        description="Learn about Garda Racing Yacht Club - passionate about sailing since 2009. Meet our expert team and discover our story of creating unforgettable yacht racing experiences on Lake Garda."
        keywords="about Garda Racing, yacht club history, sailing instructors Lake Garda, RYA certified, professional sailing team"
        url="/about"
      />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-900 via-primary-900 to-blue-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/5 rounded-full blur-xl"></div>
          <div className="absolute bottom-20 right-20 w-48 h-48 bg-gold-400/10 rounded-full blur-2xl"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              <div className="flex items-center space-x-3 mb-6">
                <Anchor className="h-12 w-12 text-gold-400" />
                <div>
                  <h1 className="text-5xl md:text-6xl font-bold font-serif">
                    {t('about.title')}
                  </h1>
                  <p className="text-xl text-white/80 mt-2">Est. 2009</p>
                </div>
              </div>
              
              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                {t('about.subtitle')}
              </p>
              
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gold-400 mb-1">2000+</div>
                  <div className="text-white/80 text-sm">Happy Sailors</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gold-400 mb-1">15</div>
                  <div className="text-white/80 text-sm">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gold-400 mb-1">30+</div>
                  <div className="text-white/80 text-sm">Countries</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gold-400 mb-1">4.9★</div>
                  <div className="text-white/80 text-sm">Rating</div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm">
                  <Award className="h-5 w-5 text-gold-400" />
                  <span>RYA Certified</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm">
                  <Shield className="h-5 w-5 text-green-400" />
                  <span>Fully Insured</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm">
                  <Star className="h-5 w-5 text-gold-400" />
                  <span>Zero Incidents</span>
                </div>
              </div>
            </div>
            
            <div className="relative animate-fade-in">
              <img
                src="https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Yacht racing on Lake Garda with professional instruction"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center space-x-3">
                  <Compass className="h-8 w-8 text-primary-600" />
                  <div>
                    <p className="font-semibold text-gray-900">Since 2009</p>
                    <p className="text-sm text-gray-600">Sailing Excellence</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-8 font-serif">{t('about.missionVision')}</h2>
              
              <div className="space-y-8">
                <div className="border-l-4 border-primary-600 pl-6">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-3">{t('about.mission')}</h3>
                  <p className="text-gray-700 leading-relaxed">
                    {t('about.missionDescription')}
                  </p>
                </div>
                
                <div className="border-l-4 border-gold-500 pl-6">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-3">{t('about.vision')}</h3>
                  <p className="text-gray-700 leading-relaxed">
                    {t('about.visionDescription')}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/1430677/pexels-photo-1430677.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Beautiful Lake Garda marina with Alps in background"
                className="rounded-xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6 font-serif">{t('about.ourStory')}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {t('about.storyDescription')}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">{t('about.theBeginning')}</h3>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>{t('about.beginningDescription')}</p>
                <p>{t('about.journeyDescription1')}</p>
                <p>{t('about.journeyDescription2')}</p>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Professional sailing instruction on Lake Garda"
                className="rounded-xl shadow-lg"
              />
              <div className="absolute -top-4 -right-4 bg-primary-600 text-white p-4 rounded-xl shadow-lg">
                <div className="text-center">
                  <p className="text-2xl font-bold">2009</p>
                  <p className="text-sm">Founded</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6 font-serif">{t('about.ourJourney')}</h2>
            <p className="text-xl text-gray-600">Key milestones in our 15-year history of sailing excellence</p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-primary-200 hidden lg:block"></div>
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} flex-col lg:space-x-0 space-y-4 lg:space-y-0`}>
                  <div className={`w-full lg:w-1/2 ${index % 2 === 0 ? 'lg:pr-8 lg:text-right' : 'lg:pl-8 lg:text-left'} text-center lg:text-left`}>
                    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                      <div className="flex items-center justify-center lg:justify-start mb-4">
                        <milestone.icon className="h-8 w-8 text-primary-600 mr-3" />
                        <div className="text-3xl font-bold text-primary-600">{milestone.year}</div>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">{milestone.title}</h3>
                      <p className="text-gray-700 leading-relaxed">{milestone.description}</p>
                    </div>
                  </div>
                  <div className="relative z-10 w-6 h-6 bg-primary-600 rounded-full border-4 border-white shadow-lg hidden lg:block"></div>
                  <div className="w-full lg:w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-primary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6 font-serif">{t('about.ourValues')}</h2>
            <p className="text-xl text-gray-600">The principles that guide everything we do</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 ${value.color} group-hover:scale-110 transition-transform duration-300`}>
                  <value.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed text-center">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet the Team */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6 font-serif">{t('about.meetTeam')}</h2>
            <p className="text-xl text-gray-600">The passionate professionals behind your sailing experience</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 group">
                <div className="relative overflow-hidden">
                  <img
                    src={member.image}
                    alt={`${member.name} - ${member.role}`}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-primary-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-700 text-sm mb-4 leading-relaxed">{member.description}</p>
                  <div className="space-y-1">
                    {member.specialties.map((specialty, idx) => (
                      <span key={idx} className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded mr-1">
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements & Recognition */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6 font-serif">{t('about.certifications')}</h2>
            <p className="text-xl text-gray-600">Our commitment to excellence is recognized by leading organizations</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 text-center group">
                <div className="bg-primary-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-100 transition-colors duration-300">
                  <achievement.icon className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{achievement.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{achievement.description}</p>
                <span className="text-xs text-primary-600 font-medium">{achievement.year}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Sets Us Apart */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6 font-serif">What Sets Us Apart</h2>
            <p className="text-xl text-gray-600">Why thousands of sailors choose Garda Racing for their Lake Garda experience</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {differentiators.map((item, index) => (
              <div key={index} className="group hover:scale-105 transition-transform duration-300">
                <div className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
                  <div className="bg-primary-100 w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary-200 transition-colors duration-300">
                    <item.icon className="h-7 w-7 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-serif">{t('about.readyToJoin')}</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            {t('about.joinCommunity')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/booking"
              className="bg-white text-primary-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg inline-flex items-center justify-center space-x-2"
            >
              <Calendar className="h-5 w-5" />
              <span>{t('cta.bookExperience')}</span>
            </Link>
            <Link
              to="/contact"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-primary-600 transition-all duration-300 inline-flex items-center justify-center space-x-2"
            >
              <Users className="h-5 w-5" />
              <span>{t('contact.title')}</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;