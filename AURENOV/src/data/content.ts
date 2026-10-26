/**
 * Contenu partagé entre les trois concepts.
 * Les textes sont identiques (ou presque) pour permettre au propriétaire
 * de comparer les directions visuelles à contenu équivalent.
 *
 * Règle projet : ne jamais inventer de données entreprise
 * (avis clients, années d'expérience, certifications, zone couverte…).
 */

export const CONTACT = {
  phone: '06 11 67 33 00',
  phoneHref: 'tel:+33611673300',
  email: 'aurelien.perret09@gmail.com',
  placeholders: {
    address: '[Adresse de l’entreprise]',
    area: '[Zone d’intervention]',
    hours: '[Horaires]',
    siret: '[SIRET]',
    legal: '[Informations légales]',
  },
} as const

export const NAV_ITEMS = [
  { label: 'Accueil', href: '#accueil' },
  { label: 'Nos services', href: '#services' },
  { label: 'Climatisation', href: '#climatisation' },
  { label: 'Électricité', href: '#electricite' },
  { label: 'Plomberie', href: '#plomberie' },
  { label: 'Contact', href: '#contact' },
] as const

export interface ServiceContent {
  id: string
  index: string
  title: string
  tagline: string
  description: string
  items: string[]
  image: string
  imageAlt: string
}

export const WHY_POINTS = [
  {
    title: 'Accompagnement personnalisé',
    text: 'Chaque logement est différent. Nous prenons le temps d’écouter vos besoins avant de proposer une solution adaptée.',
  },
  {
    title: 'Travail soigné',
    text: 'Des installations nettes, réfléchies et réalisées avec soin, pour un résultat durable et discret dans votre intérieur.',
  },
  {
    title: 'Solutions adaptées au logement',
    text: 'Les recommandations tiennent compte de votre habitat, de son usage et de vos contraintes techniques.',
  },
  {
    title: 'Clarté des échanges',
    text: 'Des explications claires, un interlocuteur identifiable et un devis qui correspond à votre projet.',
  },
] as const

export const PROCESS_STEPS = [
  {
    number: '01',
    title: 'Présentez votre projet',
    text: 'Décrivez votre besoin en quelques mots : climatisation, électricité, plomberie ou rénovation.',
  },
  {
    number: '02',
    title: 'Échangeons sur vos besoins',
    text: 'Nous discutons ensemble de votre logement, de vos habitudes et de vos attentes.',
  },
  {
    number: '03',
    title: 'Recevez une proposition adaptée',
    text: 'Vous obtenez un devis clair, détaillé et conforme à ce qui a été convenu ensemble.',
  },
  {
    number: '04',
    title: 'Organisons votre intervention',
    text: 'L’intervention est planifiée proprement, réalisée avec soin et vérifiée avant de partir.',
  },
] as const

export const FAQ_ITEMS = [
  {
    question: 'Quels types de travaux réalise Aurenov ?',
    answer:
      'Aurenov intervient sur l’installation, l’entretien et le nettoyage de climatisation, ainsi que sur des travaux d’électricité et de plomberie dans l’habitat : installations neuves, rénovations et remises en état. Pour vérifier que votre projet correspond à nos prestations, le plus simple est de nous le décrire directement.',
  },
  {
    question: 'Proposez-vous la pose et le nettoyage de climatisation ?',
    answer:
      'Oui. La pose de climatisation (installation) et son entretien régulier — notamment le nettoyage des unités et des filtres — font partie des prestations proposées. Un entretien périodique aide à conserver une installation propre et fonctionnelle.',
  },
  {
    question: 'Comment demander un devis ?',
    answer:
      'Vous pouvez demander un devis via le formulaire de cette page ou par téléphone. Décrivez votre projet aussi précisément que possible : nous revenons ensuite vers vous pour en discuter et préparer une proposition adaptée.',
  },
  {
    question: 'Comment se déroule une intervention ?',
    answer:
      'Après un échange sur vos besoins et l’acceptation du devis, l’intervention est planifiée à une date qui vous convient. Le chantier est réalisé avec soin, puis le résultat est vérifié avec vous avant la fin de l’intervention.',
  },
  {
    question: 'Puis-je vous contacter pour un projet de rénovation ?',
    answer:
      'Oui. Que ce soit pour une mise à niveau électrique, une salle de bain à repenser ou l’installation d’une climatisation dans le cadre d’une rénovation, présentez-nous votre projet : nous étudierons ensemble la solution la plus adaptée.',
  },
] as const

export const SERVICE_OPTIONS = [
  'Climatisation — installation',
  'Climatisation — entretien ou nettoyage',
  'Électricité',
  'Plomberie',
  'Rénovation / plusieurs corps de métier',
  'Autre demande',
] as const

export const GALLERY_NOTE =
  'Photos d’illustration présentées à titre d’exemple de style et de finitions.'
