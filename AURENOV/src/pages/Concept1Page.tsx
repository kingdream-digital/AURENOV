import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Phone, Mail, ArrowRight, Plus } from 'lucide-react'
import { Accordion } from '../components/shared/Accordion'
import { useQuoteForm } from '../components/shared/useQuoteForm'
import { useReveal } from '../components/shared/useReveal'
import { usePageMeta } from '../components/shared/usePageMeta'
import { CONTACT, NAV_ITEMS, WHY_POINTS, PROCESS_STEPS, FAQ_ITEMS, GALLERY_NOTE } from '../data/content'
import '../styles/concept1.css'

const LOGO = '/assets/logo/aurenov-logo.png'

const SERVICES = [
  {
    id: 'climatisation',
    index: '01',
    title: 'Climatisation',
    tagline: 'Une température agréable, une installation discrète.',
    description:
      'Installation, nettoyage et entretien de climatisation : nous étudions votre intérieur pour proposer un emplacement et une puissance adaptés, puis réalisons une pose propre et soignée.',
    items: ['Installation de climatisation', 'Nettoyage complet des unités', 'Entretien périodique', 'Entretien courant & contrôle'],
    image: '/assets/images/c1-clim.webp',
    imageAlt: 'Unité de climatisation murale blanche et discrète dans un intérieur contemporain',
  },
  {
    id: 'electricite',
    index: '02',
    title: 'Électricité',
    tagline: 'Des installations sûres, pensées pour durer.',
    description:
      'Installations électriques, mises à niveau et rénovations : un travail rigoureux, des tableaux ordonnés et des finitions nettes, pour un logement conforme à vos usages.',
    items: ['Installation électrique', 'Mise à niveau & rénovation', 'Tableaux & circuits', 'Éclairage intégré'],
    image: '/assets/images/c1-elec.webp',
    imageAlt: 'Cuisine contemporaine à l’éclairage intégré soigné',
  },
  {
    id: 'plomberie',
    index: '03',
    title: 'Plomberie',
    tagline: 'Des équipements sanitaires fiables et élégants.',
    description:
      'Installation et rénovation sanitaire : salles de bain, cuisines et équipements. Nous intervenons avec méthode pour des raccordements propres et un rendu irréprochable.',
    items: ['Installation sanitaire', 'Rénovation de salle de bain', 'Remplacement d’équipements', 'Entretien & réparations'],
    image: '/assets/images/c1-plomb.webp',
    imageAlt: 'Salle de bain contemporaine avec baignoire et grande fenêtre',
  },
]

const GALLERY = [
  { src: '/assets/images/c1-g1.webp', alt: 'Salon épuré aux tonalités claires et mobilier minimaliste', caption: 'Intérieurs calmes et lumineux' },
  { src: '/assets/images/c1-g2.webp', alt: 'Cuisine blanche et bois avec accès direct à l’extérieur', caption: 'Des espaces pensés dans le détail' },
  { src: '/assets/images/c1-g3.webp', alt: 'Salle de bain claire avec douche et sanitaires modernes', caption: 'Des finitions précises' },
  { src: '/assets/images/c1-g4.webp', alt: 'Coin détente avec fauteuil long près d’une baie vitrée', caption: 'Le confort, au quotidien' },
]

function Reveal({ children, delay = 0, className = '', as: Tag = 'div' }: {
  children: React.ReactNode
  delay?: number
  className?: string
  as?: 'div' | 'section' | 'figure' | 'li' | 'article'
}) {
  const { ref } = useReveal()
  return (
    <Tag
      ref={ref as never}
      className={`reveal ${className}`}
      style={{ ['--reveal-delay' as string]: `${delay}s` }}
    >
      {children}
    </Tag>
  )
}

export default function Concept1Page() {
  usePageMeta(
    'Aurenov — Climatisation, électricité & plomberie | Concept 01',
    'Direction 01 « Luxe architectural » : installation, entretien et nettoyage de climatisation, travaux d’électricité et de plomberie pour un habitat confortable et durable. Demandez votre devis.',
  )
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const form = useQuoteForm()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  return (
    <div className="c1">
      <a className="skip-link" href="#contenu">Aller au contenu</a>

      {/* ————— HEADER ————— */}
      <header className={`c1-header ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="container c1-header__inner">
          <Link to="/" className="c1-header__brand" aria-label="Aurenov — retour à la comparaison">
            <img src={LOGO} alt="Logo Aurenov — Neuf et rénovation : électricité, plomberie, climatisation" width={180} height={167} />
          </Link>
          <nav className="c1-header__nav" aria-label="Navigation principale">
            <ul role="list">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
          </nav>
          <a href="#contact" className="c1-btn c1-btn--ghost c1-header__cta">
            Demander un devis
          </a>
          <button
            type="button"
            className={`c1-burger ${menuOpen ? 'is-open' : ''}`}
            aria-expanded={menuOpen}
            aria-controls="c1-mobile-menu"
            aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span /><span />
          </button>
        </div>
      </header>

      <div id="c1-mobile-menu" className={`c1-mobile-menu ${menuOpen ? 'is-open' : ''}`} hidden={!menuOpen}>
        <nav aria-label="Navigation mobile">
          <ul role="list">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <a href={item.href} onClick={() => setMenuOpen(false)}>{item.label}</a>
              </li>
            ))}
          </ul>
          <a href="#contact" className="c1-btn c1-btn--solid" onClick={() => setMenuOpen(false)}>
            Demander un devis
          </a>
        </nav>
      </div>

      <main id="contenu">
        {/* ————— HERO ————— */}
        <section className="c1-hero" id="accueil" aria-label="Introduction">
          <div className="container c1-hero__inner">
            <div className="c1-hero__content">
              <p className="c1-overline">Aurenov — Neuf &amp; rénovation</p>
              <h1 className="c1-hero__title">
                Le confort de votre maison,<br />
                <em>pensé dans les moindres détails.</em>
              </h1>
              <p className="c1-hero__lead">
                Climatisation, électricité et plomberie : des solutions soignées
                pour un habitat confortable, fonctionnel et durable.
              </p>
              <div className="c1-hero__actions">
                <a href="#contact" className="c1-btn c1-btn--solid">Demander un devis</a>
                <a href="#services" className="c1-btn c1-btn--ghost">Découvrir nos services</a>
              </div>
            </div>
            <figure className="c1-hero__figure">
              <img
                src="/assets/images/c1-hero-900.webp"
                srcSet="/assets/images/c1-hero-900.webp 900w, /assets/images/c1-hero.webp 1800w"
                sizes="(max-width: 900px) 100vw, 52vw"
                alt="Séjour contemporain baigné de lumière naturelle, avec grandes baies vitrées et mobilier épuré"
                width={1800} height={2250}
              />
            </figure>
          </div>
          <div className="container c1-hero__meta" aria-hidden="false">
            <span><Phone size={15} aria-hidden="true" /> {CONTACT.phone}</span>
            <span className="c1-hero__meta-line" aria-hidden="true"></span>
            <span><Mail size={15} aria-hidden="true" /> {CONTACT.email}</span>
          </div>
        </section>

        {/* ————— SERVICES ————— */}
        <section className="c1-section c1-services-intro" id="services" aria-labelledby="services-title">
          <div className="container">
            <Reveal>
              <p className="c1-overline">Nos services</p>
              <h2 id="services-title" className="c1-section__title">
                Trois expertises,<br /><em>une même exigence.</em>
              </h2>
              <p className="c1-section__lead">
                Chaque intervention est préparée avec attention et réalisée avec soin —
                de la première étude à la finition.
              </p>
            </Reveal>
          </div>
        </section>

        {SERVICES.map((service, i) => (
          <section key={service.id} id={service.id} className={`c1-section c1-service ${i % 2 ? 'is-reversed' : ''}`} aria-labelledby={`${service.id}-title`}>
            <div className="container c1-service__inner">
              <Reveal className="c1-service__figure-wrap">
                <figure className="c1-service__figure">
                  <img
                    src={service.image}
                    alt={service.imageAlt}
                    loading="lazy"
                    width={1200} height={800}
                  />
                </figure>
                <span className="c1-service__index" aria-hidden="true">{service.index}</span>
              </Reveal>
              <div className="c1-service__content">
                <Reveal>
                  <p className="c1-overline">{service.tagline}</p>
                  <h3 id={`${service.id}-title`} className="c1-service__title">{service.title}</h3>
                  <p className="c1-service__desc">{service.description}</p>
                  <ul role="list" className="c1-service__items">
                    {service.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <a href="#contact" className="c1-link-arrow">
                    Demander un devis <ArrowRight size={16} aria-hidden="true" />
                  </a>
                </Reveal>
              </div>
            </div>
          </section>
        ))}

        {/* ————— POURQUOI AURENOV ————— */}
        <section className="c1-section c1-why" aria-labelledby="why-title">
          <div className="container">
            <Reveal>
              <p className="c1-overline c1-overline--light">Notre approche</p>
              <h2 id="why-title" className="c1-section__title c1-section__title--light">
                Pourquoi<br /><em>Aurenov&nbsp;?</em>
              </h2>
            </Reveal>
            <ul role="list" className="c1-why__grid">
              {WHY_POINTS.map((point, i) => (
                <Reveal as="li" key={point.title} delay={i * 0.07} className="c1-why__item">
                  <span className="c1-why__num" aria-hidden="true">0{i + 1}</span>
                  <h3 className="c1-why__title">{point.title}</h3>
                  <p className="c1-why__text">{point.text}</p>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        {/* ————— GALERIE ————— */}
        <section className="c1-section c1-gallery" aria-labelledby="gallery-title">
          <div className="container">
            <Reveal>
              <div className="c1-gallery__head">
                <div>
                  <p className="c1-overline">Savoir-faire</p>
                  <h2 id="gallery-title" className="c1-section__title">Le soin du détail,<br /><em>partout.</em></h2>
                </div>
                <p className="c1-gallery__note">{GALLERY_NOTE}</p>
              </div>
            </Reveal>
            <div className="c1-gallery__grid">
              {GALLERY.map((item, i) => (
                <Reveal as="figure" key={item.src} delay={i * 0.06} className={`c1-gallery__item c1-gallery__item--${i + 1}`}>
                  <img src={item.src} alt={item.alt} loading="lazy" width={900} height={1100} />
                  <figcaption>{item.caption}</figcaption>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ————— PROCESSUS ————— */}
        <section className="c1-section c1-process" aria-labelledby="process-title">
          <div className="container">
            <Reveal>
              <p className="c1-overline">Le déroulé</p>
              <h2 id="process-title" className="c1-section__title">Un parcours simple,<br /><em>sans surprise.</em></h2>
            </Reveal>
            <ol role="list" className="c1-process__grid">
              {PROCESS_STEPS.map((step, i) => (
                <Reveal as="li" key={step.number} delay={i * 0.07} className="c1-process__step">
                  <span className="c1-process__num">{step.number}</span>
                  <h3 className="c1-process__title">{step.title}</h3>
                  <p className="c1-process__text">{step.text}</p>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        {/* ————— FOCUS CLIMATISATION ————— */}
        <section className="c1-section c1-clim-feature" aria-labelledby="clim-feature-title">
          <div className="container c1-clim-feature__inner">
            <div className="c1-clim-feature__content">
              <Reveal>
                <p className="c1-overline c1-overline--light">Climatisation</p>
                <h2 id="clim-feature-title" className="c1-section__title c1-section__title--light">
                  Une climatisation<br /><em>adaptée à votre intérieur.</em>
                </h2>
                <p className="c1-clim-feature__text">
                  Chaque logement est différent : emplacement des unités, puissance,
                  discrétion visuelle et confort d’usage. Nous vous accompagnons
                  de l’étude à l’entretien, pour une installation qui dure.
                </p>
                <div className="c1-clim-feature__actions">
                  <a href="#contact" className="c1-btn c1-btn--gold">Parler de mon projet</a>
                </div>
              </Reveal>
            </div>
            <Reveal className="c1-clim-feature__figure-wrap">
              <figure className="c1-clim-feature__figure">
                <img src="/assets/images/c1-ac.webp" alt="Unité de climatisation murale intégrée avec discrétion dans une pièce claire" loading="lazy" width={1200} height={846} />
              </figure>
            </Reveal>
          </div>
        </section>

        {/* ————— FAQ ————— */}
        <section className="c1-section c1-faq" aria-labelledby="faq-title">
          <div className="container c1-faq__inner">
            <Reveal>
              <p className="c1-overline">Questions fréquentes</p>
              <h2 id="faq-title" className="c1-section__title">Vous vous<br /><em>demandez&nbsp;?</em></h2>
            </Reveal>
            <Reveal className="c1-faq__list">
              <Accordion
                className="c1-faq__root"
                items={FAQ_ITEMS}
                render={({ entry, open, toggle, buttonProps, regionProps }) => (
                  <div className={`c1-faq__item ${open ? 'is-open' : ''}`}>
                    <h3>
                      <button type="button" className="c1-faq__question" {...buttonProps} onClick={toggle}>
                        <span>{entry.question}</span>
                        <Plus className="c1-faq__icon" size={18} aria-hidden="true" />
                      </button>
                    </h3>
                    <div className="c1-faq__panel" {...regionProps} aria-hidden={!open}>
                      <div className="c1-faq__panel-inner">
                        <p>{entry.answer}</p>
                      </div>
                    </div>
                  </div>
                )}
              />
            </Reveal>
          </div>
        </section>

        {/* ————— CONTACT ————— */}
        <section className="c1-section c1-contact" id="contact" aria-labelledby="contact-title">
          <div className="container c1-contact__inner">
            <div className="c1-contact__info">
              <Reveal>
                <p className="c1-overline">Contact &amp; devis</p>
                <h2 id="contact-title" className="c1-section__title">Parlons de<br /><em>votre projet.</em></h2>
                <p className="c1-contact__lead">
                  Décrivez-nous votre besoin : nous revenons vers vous
                  pour en discuter et préparer une proposition adaptée.
                </p>
                <div className="c1-contact__details">
                  <a href={CONTACT.phoneHref} className="c1-contact__line">
                    <Phone size={16} aria-hidden="true" /> {CONTACT.phone}
                  </a>
                  <a href={`mailto:${CONTACT.email}`} className="c1-contact__line">
                    <Mail size={16} aria-hidden="true" /> {CONTACT.email}
                  </a>
                  <p className="c1-contact__line c1-contact__line--muted">{CONTACT.placeholders.hours}</p>
                </div>
              </Reveal>
            </div>

            <Reveal className="c1-contact__form-wrap">
              <form className="c1-form" noValidate onSubmit={form.submit} aria-label="Formulaire de demande de devis">
                {form.state.status === 'success' ? (
                  <div className="c1-form__success" role="status">
                    <h3 className="c1-form__success-title">Formulaire vérifié ✓</h3>
                    <p>
                      Prototype de démonstration : les informations saisies sont valides,
                      mais aucune donnée n’a encore été transmise. En production, ce
                      formulaire sera relié à un service d’envoi sécurisé.
                    </p>
                    <button type="button" className="c1-btn c1-btn--ghost" onClick={form.reset}>
                      Saisir une autre demande
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="c1-form__row">
                      <div className="c1-form__field">
                        <label htmlFor="c1-name">Nom</label>
                        <input
                          id="c1-name" name="name" type="text" autoComplete="name"
                          value={form.state.values.name}
                          onChange={(e) => form.setValue('name', e.target.value)}
                          data-invalid={!!form.state.errors.name}
                          aria-describedby={form.state.errors.name ? 'c1-name-error' : undefined}
                        />
                        {form.state.errors.name && <p id="c1-name-error" className="c1-form__error">{form.state.errors.name}</p>}
                      </div>
                      <div className="c1-form__field">
                        <label htmlFor="c1-email">Adresse e-mail</label>
                        <input
                          id="c1-email" name="email" type="email" autoComplete="email"
                          value={form.state.values.email}
                          onChange={(e) => form.setValue('email', e.target.value)}
                          data-invalid={!!form.state.errors.email}
                          aria-describedby={form.state.errors.email ? 'c1-email-error' : undefined}
                        />
                        {form.state.errors.email && <p id="c1-email-error" className="c1-form__error">{form.state.errors.email}</p>}
                      </div>
                    </div>
                    <div className="c1-form__row">
                      <div className="c1-form__field">
                        <label htmlFor="c1-phone">Téléphone <span className="c1-form__optional">(facultatif)</span></label>
                        <input
                          id="c1-phone" name="phone" type="tel" autoComplete="tel"
                          value={form.state.values.phone}
                          onChange={(e) => form.setValue('phone', e.target.value)}
                          data-invalid={!!form.state.errors.phone}
                          aria-describedby={form.state.errors.phone ? 'c1-phone-error' : undefined}
                        />
                        {form.state.errors.phone && <p id="c1-phone-error" className="c1-form__error">{form.state.errors.phone}</p>}
                      </div>
                      <div className="c1-form__field">
                        <label htmlFor="c1-service">Type de prestation</label>
                        <select
                          id="c1-service" name="service"
                          value={form.state.values.service}
                          onChange={(e) => form.setValue('service', e.target.value)}
                          data-invalid={!!form.state.errors.service}
                          aria-describedby={form.state.errors.service ? 'c1-service-error' : undefined}
                        >
                          <option value="">Choisir…</option>
                          {form.serviceOptions.map((option) => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                        {form.state.errors.service && <p id="c1-service-error" className="c1-form__error">{form.state.errors.service}</p>}
                      </div>
                    </div>
                    <div className="c1-form__field">
                      <label htmlFor="c1-message">Description du projet</label>
                      <textarea
                        id="c1-message" name="message" rows={5}
                        value={form.state.values.message}
                        onChange={(e) => form.setValue('message', e.target.value)}
                        data-invalid={!!form.state.errors.message}
                        aria-describedby={form.state.errors.message ? 'c1-message-error' : undefined}
                      />
                      {form.state.errors.message && <p id="c1-message-error" className="c1-form__error">{form.state.errors.message}</p>}
                    </div>
                    <div className="c1-form__field c1-form__field--check">
                      <label className="c1-form__check">
                        <input
                          type="checkbox"
                          checked={form.state.values.consent}
                          onChange={(e) => form.setValue('consent', e.target.checked)}
                          data-invalid={!!form.state.errors.consent}
                          aria-describedby={form.state.errors.consent ? 'c1-consent-error' : undefined}
                        />
                        <span>
                          J’accepte que mes informations soient utilisées pour être recontacté
                          au sujet de ma demande.
                        </span>
                      </label>
                      {form.state.errors.consent && <p id="c1-consent-error" className="c1-form__error">{form.state.errors.consent}</p>}
                    </div>
                    <div className="c1-form__submit">
                      <button type="submit" className="c1-btn c1-btn--solid" disabled={form.state.status === 'submitting'}>
                        {form.state.status === 'submitting' ? 'Envoi en cours…' : 'Envoyer ma demande'}
                      </button>
                      <p className="c1-form__hint">Prototype — aucune donnée n’est réellement transmise.</p>
                    </div>
                  </>
                )}
              </form>
            </Reveal>
          </div>
        </section>
      </main>

      {/* ————— FOOTER ————— */}
      <footer className="c1-footer">
        <div className="container">
          <div className="c1-footer__top">
            <div className="c1-footer__brand">
              <Link to="/" aria-label="Aurenov — retour à la comparaison" className="c1-footer__logo">
                <img src={LOGO} alt="Logo Aurenov" width={150} height={139} />
              </Link>
              <p className="c1-footer__desc">
                Climatisation, électricité et plomberie pour l’habitat.
                Des installations soignées, un accompagnement clair.
              </p>
            </div>
            <nav className="c1-footer__nav" aria-label="Services (pied de page)">
              <h2 className="c1-footer__heading">Services</h2>
              <ul role="list">
                {SERVICES.map((s) => (
                  <li key={s.id}><a href={`#${s.id}`}>{s.title}</a></li>
                ))}
                <li><a href="#contact">Devis &amp; contact</a></li>
              </ul>
            </nav>
            <div className="c1-footer__contact">
              <h2 className="c1-footer__heading">Contact</h2>
              <ul role="list">
                <li><a href={CONTACT.phoneHref}>{CONTACT.phone}</a></li>
                <li><a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></li>
                <li className="c1-footer__muted">{CONTACT.placeholders.address}</li>
                <li className="c1-footer__muted">{CONTACT.placeholders.area}</li>
              </ul>
            </div>
          </div>
          <div className="c1-footer__bottom">
            <p>© {new Date().getFullYear()} Aurenov — {CONTACT.placeholders.legal}</p>
            <ul role="list" className="c1-footer__legal">
              <li><a href="#accueil">Mentions légales</a></li>
              <li><a href="#accueil">Politique de confidentialité</a></li>
            </ul>
          </div>
          <nav className="c1-footer__concepts" aria-label="Autres concepts">
            <span className="c1-footer__concepts-label">Direction 01 — Luxe architectural ·</span>
            <Link to="/concept-2">Voir le concept 02</Link>
            <Link to="/concept-3">Voir le concept 03</Link>
            <Link to="/">Comparer les trois directions</Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}
