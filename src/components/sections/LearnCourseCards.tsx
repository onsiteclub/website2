import Image from 'next/image';

interface CourseCard {
  title: string;
  desc: string;
  quote: string;
  tags: string[];
  cta: string;
  url: string;
  image?: string;
}

const TAG_COLORS: Record<string, string> = {
  // EN
  MANDATORY: 'red', FREE: 'green', GOVERNMENT: 'blue', REQUIRED: 'red',
  SAFETY: 'orange', PPE: 'purple', CSA: 'blue', 'IN-PERSON': 'gray',
  PAID: 'orange', TRADE: 'yellow', APPRENTICESHIP: 'gray', LICENSED: 'purple',
  'HIGH-DEMAND': 'green', GUIDE: 'gray', TRADES: 'yellow', CAREERS: 'blue',
  ESSENTIAL: 'green', 'ALL TRADES': 'blue', BEGINNER: 'purple',
  WOOD: 'yellow', FRAMING: 'orange', DRYWALL: 'gray', FINISHING: 'blue',
  ELECTRICAL: 'purple', PLUMBING: 'blue', HVAC: 'orange',
  CONCRETE: 'gray', MASONRY: 'orange',
  // FR
  OBLIGATOIRE: 'red', GRATUIT: 'green', GOUVERNEMENT: 'blue', REQUIS: 'red',
  'SÉCURITÉ': 'orange', 'ÉPI': 'purple', 'EN PERSONNE': 'gray', PAYANT: 'orange',
  'MÉTIER': 'yellow', APPRENTISSAGE: 'gray', 'RÉGLEMENTÉ': 'purple', 'HAUTE DEMANDE': 'green',
  ESSENTIEL: 'green', 'TOUS MÉTIERS': 'blue', 'DÉBUTANT': 'purple',
  BOIS: 'yellow', CHARPENTE: 'orange', PLÂTRE: 'gray', FINITION: 'blue',
  'ÉLECTRICITÉ': 'purple', PLOMBERIE: 'blue', CVC: 'orange',
  'BÉTON': 'gray', 'MAÇONNERIE': 'orange',
  // ES
  OBLIGATORIO: 'red', GRATIS: 'green', GOBIERNO: 'blue', REQUERIDO: 'red',
  SEGURIDAD: 'orange', EPP: 'purple', PRESENCIAL: 'gray', PAGO: 'orange',
  OFICIO: 'yellow', APRENDIZAJE: 'gray', REGULADO: 'purple', 'ALTA DEMANDA': 'green',
  ESENCIAL: 'green', 'TODOS LOS OFICIOS': 'blue', PRINCIPIANTE: 'purple',
  MADERA: 'yellow', ESTRUCTURA: 'orange', YESO: 'gray', ACABADO: 'blue',
  'ELECTRICIDAD': 'purple', 'PLOMERÍA': 'blue',
  'ALBAÑILERÍA': 'orange',
  // PT
  'OBRIGATÓRIO': 'red', 'GRÁTIS': 'green', GOVERNO: 'blue',
  'SEGURANÇA': 'orange', EPI: 'purple', 'OFÍCIO': 'yellow',
  APRENDIZAGEM: 'gray', REGULAMENTADO: 'purple',
  ESSENCIAL: 'green', 'TODOS OS OFÍCIOS': 'blue', INICIANTE: 'purple',
  MADEIRA: 'yellow', ESTRUTURA: 'orange', ACABAMENTO: 'blue',
  'ELÉTRICA': 'purple', ENCANAMENTO: 'blue',
  ALVENARIA: 'orange',
};

const SLUG_IMAGES: Record<string, string> = {
  'construction-steps': '/images/learn.png',
  'safety-equipment': '/images/epis.png',
  'trades-guide': '/images/trades.png',
  'starter-kit': '/images/kit-tools.webp',
};

function getTagColor(tag: string): string {
  return TAG_COLORS[tag] || 'gray';
}

export default function LearnCourseCards({
  courses,
  slug,
}: {
  courses: CourseCard[];
  slug: string;
}) {
  const image = SLUG_IMAGES[slug] || '/images/learn.png';

  return (
    <div className="learn-course-grid">
      {courses.map((course, i) => {
        const isExternal = course.url.startsWith('http');
        const Tag = isExternal ? 'a' : 'a';
        const linkProps = isExternal
          ? { href: course.url, target: '_blank', rel: 'noopener noreferrer' }
          : { href: course.url };

        return (
          <Tag key={i} {...linkProps} className="learn-course-card">
            <div className="learn-course-img">
              <Image src={course.image || image} alt="" fill sizes="220px" />
            </div>
            <div className="learn-course-content">
              <div className="learn-course-tags">
                {course.tags.map((tag) => (
                  <span key={tag} className={`learn-tag learn-tag-${getTagColor(tag)}`}>
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className="learn-course-title">{course.title}</h3>
              <p className="learn-course-desc">{course.desc}</p>
              <blockquote className="learn-course-quote">{course.quote}</blockquote>
              <span className="learn-course-cta">{course.cta} &rarr;</span>
            </div>
          </Tag>
        );
      })}
    </div>
  );
}
