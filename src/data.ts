/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BusinessConfig } from './types';

export const BUSINESS_DATA: Record<string, BusinessConfig> = {
  clinic: {
    id: 'clinic',
    name: 'Aura Wellness & Lifecare',
    tagline: 'Holistic clinical health & physical rehabilitation',
    primaryColor: 'emerald',
    gradientFrom: 'from-emerald-50 text-emerald-900',
    gradientTo: 'bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white',
    textColor: 'text-emerald-700',
    iconName: 'Activity',
    location: 'Suite 400, 1200 Medical Center Parkway, San Francisco, CA',
    phone: '(415) 555-0143',
    onboarding: [
      {
        title: 'Your Health, Elevated',
        description: 'Connect with board-certified clinical professionals and holistic specialists committed to your enduring vitality.',
        illustration: 'bg-gradient-to-tr from-emerald-150 to-emerald-50 border border-emerald-100'
      },
      {
        title: 'Effortless Care Coordination',
        description: 'Schedule, adjust, and view diagnostic updates in real time securely with zero wait time or hold-ups.',
        illustration: 'bg-gradient-to-br from-teal-50 to-emerald-50 border border-teal-100'
      },
      {
        title: 'Comprehensive Well-being',
        description: 'From routine checkups to integrative natural acupuncture, discover custom treatment pathways crafted for you.',
        illustration: 'bg-gradient-to-tr from-emerald-50 to-cyan-50 border border-emerald-100'
      }
    ],
    services: [
      {
        id: 'c-1',
        name: 'Comprehensive Health Audit',
        duration: 60,
        price: 185,
        description: 'A deep assessment of vital signs, lab analysis review, and structural bio-impedance composition mapping.',
        category: 'Diagnostic'
      },
      {
        id: 'c-2',
        name: 'Integrative Acupuncture Therapy',
        duration: 45,
        price: 120,
        description: 'Traditional meridian point therapy for acute tension relief, sleep regulation, and nervous system rebalancing.',
        category: 'Holistic'
      },
      {
        id: 'c-3',
        name: 'Myofascial Rehabilitation Session',
        duration: 50,
        price: 110,
        description: 'Targeted muscular trigger-point work and active movement mapping to restore spinal and joint mobility patterns.',
        category: 'Rehab'
      },
      {
        id: 'c-4',
        name: 'Clinical Nutritional Blueprint',
        duration: 40,
        price: 95,
        description: 'Analysis of digestive health bio-markers to establish a customized, inflammatory-reducing micro-nutrient regimen.',
        category: 'Holistic'
      }
    ],
    specialists: [
      {
        id: 's-c-1',
        name: 'Dr. Evelyn Vance, MD',
        role: 'Chief Medical Director',
        rating: 4.9,
        reviewsCount: 384,
        availability: 'Mon - Thu',
        bio: 'Dr. Vance completed her medical residency at Johns Hopkins and specializes in preventive medicine, cardiovascular longevity, and integrative clinical health.'
      },
      {
        id: 's-c-2',
        name: 'Dr. Marcus Thorne, DAOM',
        role: 'Oriental Medicine Specialist',
        rating: 4.85,
        reviewsCount: 228,
        availability: 'Tue, Wed, Fri',
        bio: 'A licensed acupuncturist and doctor of Asian medical practices. Marcus blends evidence-based neuroscience with meridian-based neurological release.'
      },
      {
        id: 's-c-3',
        name: 'Sarah Jenkins, LPC',
        role: 'Physical Rehabilitation Lead',
        rating: 4.94,
        reviewsCount: 162,
        availability: 'Mon, Wed, Thu',
        bio: 'Board-licensed clinical therapist and corrective movement therapist focusing on spinal decompression, joint posture therapy, and sports injury recovery.'
      }
    ]
  },
  salon: {
    id: 'salon',
    name: 'Nouveau Hair & Esthetics',
    tagline: 'Artisanal hair styling, facials, & beauty curation',
    primaryColor: 'rose',
    gradientFrom: 'from-rose-50 text-rose-900',
    gradientTo: 'bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white',
    textColor: 'text-rose-700',
    iconName: 'Sparkles',
    location: '88 Fashion Blvd, District 4, San Francisco, CA',
    phone: '(415) 555-0819',
    onboarding: [
      {
        title: 'Curated Self-Care Culture',
        description: 'Step into an oasis of elegant hair craftsmanship, aesthetic clinical facials, and meticulously detailed nail cosmetics.',
        illustration: 'bg-gradient-to-tr from-rose-100 to-amber-50 border border-rose-100'
      },
      {
        title: 'Award-Winning Stylists',
        description: 'Match with passionate beauty technicians and master color directors trained in bespoke high-end fashion profiles.',
        illustration: 'bg-gradient-to-tr from-amber-50 to-pink-50 border border-pink-100'
      },
      {
        title: 'Seamless Digital Booking',
        description: 'Lock in your favorite specialists and specific treatments in just three simple taps. Effortless modifications.',
        illustration: 'bg-gradient-to-br from-rose-50 to-violet-50 border border-rose-100'
      }
    ],
    services: [
      {
        id: 's-1',
        name: 'Balayage & Couture Hair Design',
        duration: 120,
        price: 240,
        description: 'Bespoke hand-painted dimensional highlights paired with a master-level dry cut, deep steam hydration, and signature styling.',
        category: 'Hair'
      },
      {
        id: 's-2',
        name: 'Luxurious Oxygen Facial Therapy',
        duration: 60,
        price: 145,
        description: 'Peptide-rich exfoliation followed by high-pressure pure oxygen micro-mists to instantly firm, brighten, and rehydrate target skin matrices.',
        category: 'Esthetics'
      },
      {
        id: 's-3',
        name: 'Japanese Non-Toxic Gel Manicure',
        duration: 75,
        price: 85,
        description: 'Precision cuticle remediation, protective base strengthening, and custom minimalist hand-painted premium gel cosmetics.',
        category: 'Nails'
      },
      {
        id: 's-4',
        name: 'Hot Stone Remedial Massage',
        duration: 90,
        price: 160,
        description: 'Deep-tissue muscle decompression using highly mineralized obsidian hot stones and local botanical extracts to relieve nervous fatigue.',
        category: 'Body Work'
      }
    ],
    specialists: [
      {
        id: 's-s-1',
        name: 'Chloe Mercier',
        role: 'Senior Creative Colorist',
        rating: 4.97,
        reviewsCount: 512,
        availability: 'Wed - Sun',
        bio: 'Trained in Paris with 12+ years expertise. Chloe is known for French balayage techniques, healthy hair philosophy, and face-framing structural geometry.'
      },
      {
        id: 's-s-2',
        name: 'Julian Romero',
        role: 'Aesthetic Skin Therapist',
        rating: 4.91,
        reviewsCount: 340,
        availability: 'Tue - Sat',
        bio: 'Certified advanced esthetician specializing in non-invasive skin rejuvenation, clinical chemical exfoliations, and lymphatic detox massage.'
      },
      {
        id: 's-s-3',
        name: 'Mia Novak',
        role: 'Nail Cosmetics Director',
        rating: 4.89,
        reviewsCount: 184,
        availability: 'Mon, Thu, Fri',
        bio: 'Mia focuses exclusively on hand health and non-toxic Japanese gel nail art. Her work has been showcased in progressive west coast beauty journals.'
      }
    ]
  },
  consultant: {
    id: 'consultant',
    name: 'Apex Strategy & Trust',
    tagline: 'High-performance advisory & enterprise growth services',
    primaryColor: 'indigo',
    gradientFrom: 'from-indigo-50 text-indigo-900',
    gradientTo: 'bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white',
    textColor: 'text-indigo-700',
    iconName: 'Briefcase',
    location: '40th Floor, Transamerica Pyramid, San Francisco, CA',
    phone: '(415) 555-0900',
    onboarding: [
      {
        title: 'Accelerate Enterprise Value',
        description: 'Book executive-level advisory with strategic partners to audit, reconstruct, and optimize your business architecture.',
        illustration: 'bg-gradient-to-tr from-indigo-100 to-indigo-50 border border-indigo-100'
      },
      {
        title: 'Subject Matter Leadership',
        description: 'Direct access to former venture partners, international tax lawyers, and brand architects who have scaled Fortune 500s.',
        illustration: 'bg-gradient-to-br from-indigo-50 to-slate-100 border border-slate-200'
      },
      {
        title: 'Precision Time Slot Integrity',
        description: 'Zero administrative friction. Calendar holds are automatically verified across our secured networks with immediate confirmation.',
        illustration: 'bg-gradient-to-tr from-slate-100 to-indigo-50 border border-indigo-100'
      }
    ],
    services: [
      {
        id: 'con-1',
        name: 'Corporate Capital Route Audit',
        duration: 90,
        price: 350,
        description: 'A deep examination of cash reserves, operational margins, cap tables, and legal structures to optimize for investment readiness.',
        category: 'Finance'
      },
      {
        id: 'con-2',
        name: 'Tax Compliance & Asset Security',
        duration: 60,
        price: 280,
        description: 'Corporate tax structure audit mapping, multi-state risk evaluations, and customized liability mitigation systems.',
        category: 'Compliance'
      },
      {
        id: 'con-3',
        name: 'Growth Strategy & Brand Workshop',
        duration: '75' as any as number, // will cast safely or use number
        price: 220,
        description: 'Collaborative product positioning analysis, customer acquisition cost diagnostic, and strategic multi-channel planning.',
        category: 'Strategy'
      }
    ],
    specialists: [
      {
        id: 's-con-1',
        name: 'Arthur Pendelton',
        role: 'Venture Capital Strategist',
        rating: 4.96,
        reviewsCount: 154,
        availability: 'Mon - Wed',
        bio: 'Former GP at Redwood Ventures. Arthur specializes in structural equity engineering, series A-D fundraising pipelines, and hyper-growth scaling.'
      },
      {
        id: 's-con-2',
        name: 'Elena Rostova',
        role: 'International Tax Attorney',
        rating: 4.98,
        reviewsCount: 96,
        availability: 'Tue, Thu, Fri',
        bio: 'Representing growth tech firms for 15+ years. Yale Law grad. Expert in cross-border tech licensing, IP allocation, and compliance frameworks.'
      },
      {
        id: 's-con-3',
        name: 'David Kim',
        role: 'Executive Brand Architect',
        rating: 4.92,
        reviewsCount: 204,
        availability: 'Wed, Thu',
        bio: 'Helped craft campaign portfolios for top tier consumer electronics companies. David specializes in brand-positioning alignment and product narrative structures.'
      }
    ]
  },
  fitness: {
    id: 'fitness',
    name: 'Summit Performance Lab',
    tagline: 'High-performance physical training & diet design',
    primaryColor: 'orange',
    gradientFrom: 'from-orange-50 text-orange-900',
    gradientTo: 'bg-orange-600 hover:bg-orange-700 active:bg-orange-850 text-white',
    textColor: 'text-orange-700',
    iconName: 'Flame',
    location: '12 Pier South Development Wharf, San Francisco, CA',
    phone: '(415) 555-0322',
    onboarding: [
      {
        title: 'Unlock Human Potential',
        description: 'Move away from guesswork. Choose elite performance mentors devoted to precise biomechanical health and peak metabolic state.',
        illustration: 'bg-gradient-to-tr from-orange-100 to-amber-50 border border-orange-100'
      },
      {
        title: 'Dynamic Progress Feedback',
        description: 'Review physical progression analytics, body composition history, and upcoming coaching programs in one unified app interface.',
        illustration: 'bg-gradient-to-tr from-stone-100 to-orange-50 border border-orange-100'
      },
      {
        title: 'Instant Workout Scheduling',
        description: 'Align sessions with your active work calendar instantly. Simple self-service cancellation up to 6 hours before start.',
        illustration: 'bg-gradient-to-br from-orange-50 to-stone-100 border border-orange-100'
      }
    ],
    services: [
      {
        id: 'f-1',
        name: 'Biomechanical & Mobility Audit',
        duration: 75,
        price: 150,
        description: 'Evaluating muscle firing orders, standard overhead squats, and structural gait deficits to map specific injury-proofing correctives.',
        category: 'Assessment'
      },
      {
        id: 'f-2',
        name: '1-on-1 Olympic Lifting Mechanics',
        duration: 60,
        price: 130,
        description: 'Highly technical coaching focusing strictly on the clean & jerk and snatch bar paths, hip-extension speed, and overhead lock stability.',
        category: 'Athletic'
      },
      {
        id: 'f-3',
        name: 'High-Density HIIT Progression',
        duration: 45,
        price: 95,
        description: 'Custom micro-programmed anaerobic output circuits designed to drive VO2max limits under precision cardiac rate tracking.',
        category: 'Conditioning'
      },
      {
        id: 'f-4',
        name: 'Macro-Nutrient & Diet Blueprint',
        duration: 45,
        price: 85,
        description: 'Caloric rate calculation based on your basal metabolic factors and daily physical work output to boost functional tissue synthesis.',
        category: 'Nutrition'
      }
    ],
    specialists: [
      {
        id: 's-f-1',
        name: 'Coach Jaxon Cruz',
        role: 'Strength & Biomechanics Lead',
        rating: 4.95,
        reviewsCount: 420,
        availability: 'Mon - Fri',
        bio: 'BS in Kinesiology, CSCS. Jaxon is dedicated to athletic biomechanics, joint integrity, and translating force curves into elite athletic power.'
      },
      {
        id: 's-f-2',
        name: 'Coach Elena Briggs',
        role: 'Olympic Lift Master Specialist',
        rating: 4.98,
        reviewsCount: 260,
        availability: 'Tue, Thu, Sat',
        bio: 'Former competitive weightlifter. Elena specializes in precision bar speed, technical lifting mechanics, and nervous system mental conditioning.'
      },
      {
        id: 's-f-3',
        name: 'Liam O\'Connor',
        role: 'Movement Restoration Director',
        rating: 4.91,
        reviewsCount: 195,
        availability: 'Mon, Wed, Thu',
        bio: 'Focuses on functional mobility matrices, fascia hydration techniques, and athletic rehabilitation programs helping recover from chronic wear.'
      }
    ]
  }
};
