import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useReveal } from '../components/shared/useReveal'
import { CONTACT } from '../data/content'
import { usePageMeta } from '../components/shared/usePageMeta'
import '../styles/comparison.css'

const LOGO = '/assets/logo/aurenov-logo.png'

const CONCEPTS = [
  {
    path: '/concept-1',
    number: '01',
    name: 'Luxe architectural',
    tagline: 'Éditorial · calme · précis',
    description:
      'Une direction inspirée des studios d’architecture haut de gamme : typographie serif élégante, espaces généreux, photographie architecturale et or utilisé avec retenue.',
    palette: ['#f7f3eb', '#1b2537', '#c29a4b', '#857d6d'],
    fonts: 'Cormorant Garamond + Jost',
  },
  {
    path: '/concept-2',
    number: '02',
    name: 'Technique premium',
    tagline: 'Moderne · net · affirmé',
    description:
      'Une direction inspirée des marques technologiques : grille affirmée, contraste navy profond, accents bleu électrique et jaune, détails techniques qui inspirent confiance.',
    palette: ['#0a1a2f', '#2f6bff', '#f5b301', '#f4f6fa'],
    fonts: 'Space Grotesk + Inter',
  },
  {
    path: '/concept-3',
    number: '03',
    name: 'Artisanat local premium',
    tagline: 'Chaleureux · humain · rassurant',
    description:
      'Une direction inspirée des marques locales haut de gamme : tons chauds, formes arrondies, photographie humaine et une impression d’accompagnement personnalisé.',
    palette: ['#14424f', '#efe7da', '#dfa32e', '#fbf8f3'],
    fonts: 'Fraunces + Figtree',
  },
]

function Reveal({ children, delay = 0, className = '' }: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const { ref } = useReveal()
  return (
    <div ref={ref} className={`reveal ${className}`} style={{ ['--reveal-delay' as string]: `${delay}s` }}>
      {children}
    </div>
  )
}

/** Miniature du concept 01 — miniature construite avec son vrai langage visuel. */
function Preview1() {
  return (
    <div className="preview preview--c1">
      <div className="preview__browser-bar">
        <span></span><span></span><span></span>
        <em>aurenov.fr/concept-1</em>
      </div>
      <div className="preview__stage preview__stage--c1">
        <div className="preview-c1__text">
          <span className="preview-c1__overline">Aurenov — Neuf &amp; rénovation</span>
          <strong className="preview-c1__title">
            Le confort de votre maison, <em>pensé dans les moindres détails.</em>
          </strong>
          <span className="preview-c1__btn">Demander un devis</span>
        </div>
        <div className="preview-c1__figure">
          <img src="/assets/images/c1-g1.webp" alt="Aperçu du concept 01 : intérieur épuré et lumineux" loading="lazy" width={900} height={1013} />
        </div>
      </div>
    </div>
  )
}

function Preview2() {
  return (
    <div className="preview preview--c2">
      <div className="preview__browser-bar">
        <span></span><span></span><span></span>
        <em>aurenov.fr/concept-2</em>
      </div>
      <div className="preview__stage preview__stage--c2">
        <div className="preview-c2__text">
          <span className="preview-c2__kicker">Aurenov — Neuf &amp; rénovation</span>
          <strong className="preview-c2__title">
            Votre confort.<br /><span>Notre expertise technique.</span>
          </strong>
          <span className="preview-c2__btn">Obtenir mon devis</span>
        </div>
        <div className="preview-c2__figure">
          <img src="/assets/images/c2-g1.webp" alt="Aperçu du concept 02 : maison contemporaine aux lignes nettes" loading="lazy" width={900} height={748} />
          <span className="preview-c2__corner" aria-hidden="true"></span>
          <span className="preview-c2__corner preview-c2__corner--br" aria-hidden="true"></span>
        </div>
      </div>
    </div>
  )
}

function Preview3() {
  return (
    <div className="preview preview--c3">
      <div className="preview__browser-bar">
        <span></span><span></span><span></span>
        <em>aurenov.fr/concept-3</em>
      </div>
      <div className="preview__stage preview__stage--c3">
        <div className="preview-c3__figure">
          <img src="/assets/images/c3-g3.webp" alt="Aperçu du concept 03 : salle de bain chaleureuse et lumineuse" loading="lazy" width={900} height={775} />
        </div>
        <div className="preview-c3__card">
          <strong className="preview-c3__title">
            Un habitat plus confortable, <span>des installations en toute confiance.</span>
          </strong>
          <span className="preview-c3__btn">Parlons de votre projet</span>
        </div>
      </div>
    </div>
  )
}

const PREVIEWS = [<Preview1 key="1" />, <Preview2 key="2" />, <Preview3 key="3" />]

export default function ComparisonPage() {
  usePageMeta(
    'Aurenov — Trois directions créatives pour votre futur site',
    'Découvrez trois directions de design premium pour le site Aurenov : luxe architectural, technique premium et artisanat local premium. Comparez et ouvrez chaque concept.',
  )
  return (
    <div className="cmp">
      <a className="skip-link" href="#contenu">Aller au contenu</a>

      <header className="cmp-header">
        <div className="container cmp-header__inner">
          <img src={LOGO} alt="Logo Aurenov" width={180} height={167} className="cmp-header__logo" />
          <div className="cmp-header__text">
            <strong>Présentation de design</strong>
            <span>Trois directions créatives · {CONTACT.phone}</span>
          </div>
        </div>
      </header>

      <main id="contenu">
        <section className="cmp-intro">
          <div className="container">
            <Reveal>
              <p className="cmp-intro__eyebrow">Projet de refonte — Aurenov</p>
              <h1 className="cmp-intro__title">
                Trois directions possibles<br />
                <span>pour le futur site Aurenov.</span>
              </h1>
              <p className="cmp-intro__lead">
                Climatisation, électricité, plomberie : Aurenov accompagne les
                particuliers dans leurs travaux d’habitat. Cette présentation propose
                trois identités visuelles distinctes — mêmes contenus, trois
                expériences différentes. Ouvrez chaque concept, explorez-le sur
                desktop et mobile, puis comparez.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="cmp-concepts" aria-label="Les trois concepts">
          <div className="container">
            {CONCEPTS.map((concept, i) => (
              <Reveal key={concept.path} delay={0.05} className="cmp-concept">
                <article className="cmp-concept__card">
                  <div className="cmp-concept__preview">
                    {PREVIEWS[i]}
                  </div>
                  <div className="cmp-concept__info">
                    <div className="cmp-concept__head">
                      <span className="cmp-concept__number">{concept.number}</span>
                      <div>
                        <h2 className="cmp-concept__name">{concept.name}</h2>
                        <p className="cmp-concept__tagline">{concept.tagline}</p>
                      </div>
                    </div>
                    <p className="cmp-concept__desc">{concept.description}</p>
                    <div className="cmp-concept__meta">
                      <div className="cmp-concept__palette" aria-label="Palette de couleurs">
                        {concept.palette.map((color) => (
                          <span key={color} style={{ background: color }} title={color} />
                        ))}
                      </div>
                      <p className="cmp-concept__fonts">{concept.fonts}</p>
                    </div>
                    <Link to={concept.path} className="cmp-concept__link">
                      Ouvrir le concept {concept.number} <ArrowRight size={16} aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="cmp-note">
          <div className="container">
            <Reveal>
              <h2 className="cmp-note__title">Comment choisir&nbsp;?</h2>
              <div className="cmp-note__grid">
                <div>
                  <h3>Luxe architectural</h3>
                  <p>Si vous voulez positionner Aurenov comme un spécialiste haut de gamme, proche d’un studio d’architecture.</p>
                </div>
                <div>
                  <h3>Technique premium</h3>
                  <p>Si vous voulez mettre en avant la précision technique et la modernité des installations.</p>
                </div>
                <div>
                  <h3>Artisanat local premium</h3>
                  <p>Si vous voulez renforcer la proximité et la confiance, avec une image chaleureuse et professionnelle.</p>
                </div>
              </div>
              <p className="cmp-note__hint">
                Chaque concept est un site complet et navigable — pas une maquette.
                Les éléments marqués entre crochets sont des informations
                entreprise à compléter.
              </p>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="cmp-footer">
        <div className="container cmp-footer__inner">
          <p>© {new Date().getFullYear()} Aurenov — Présentation interne de design</p>
          <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
        </div>
      </footer>
    </div>
  )
}
