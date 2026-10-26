import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Phone, Mail, ArrowRight, Plus, Wind, Zap, Droplets, Check, Menu, X,
  ClipboardList, MessagesSquare, FileText, CalendarCheck,
} from 'lucide-react'
import { Accordion } from '../components/shared/Accordion'
import { useQuoteForm } from '../components/shared/useQuoteForm'
import { useReveal } from '../components/shared/useReveal'
import { usePageMeta } from '../components/shared/usePageMeta'
import { CONTACT, NAV_ITEMS, WHY_POINTS, PROCESS_STEPS, FAQ_ITEMS, GALLERY_NOTE } from '../data/content'
import '../styles/concept2.css'

const LOGO = '/assets/logo/aurenov-logo.png'

const SERVICES = [
  {
    id: 'climatisation',
    code: 'C·01',
    icon: Wind,
    title: 'Climatisation',
    description:
      'Installation, nettoyage et entretien de climatisation. Une étude de votre intérieur pour un emplacement et une puissance adaptés, une pose propre et vérifiée.',
    items: ['Installation', 'Nettoyage complet', 'Entretien périodique', 'Contrôle de fonctionnement'],
    image: '/assets/images/c2-clim.webp',
    imageAlt: 'Unité de climatisation blanche installée sur un mur de brique',
  },
  {
    id: 'electricite',
    code: 'C·02',
    icon: Zap,
    title: 'Électricité',
    description:
      'Installations électriques, mises à niveau et rénovation. Des tableaux ordonnés, des circuits clairement identifiés et des finitions rigoureuses.',
    items: ['Installation électrique', 'Mise à niveau', 'Rénovation partielle ou totale', 'Éclairage'],
    image: '/assets/images/c2-elec.webp',
    imageAlt: 'Électricien installant du câblage électrique avec casque de sécurité',
  },
  {
    id: 'plomberie',
    code: 'C·03',
    icon: Droplets,
    title: 'Plomberie',
    description:
      'Installations sanitaires, rénovation et entretien. Salles de bain, cuisines et équipements : des raccordements méthodiques et étanches.',
    items: ['Installation sanitaire', 'Rénovation salle de bain', 'Remplacement d’équipements', 'Entretien & réparation'],
    image: '/assets/images/c2-plomb.webp',
    imageAlt: 'Plombier travaillant sur des tuyaux encastrés dans un mur',
  },
]

const GALLERY = [
  { src: '/assets/images/c2-g1.webp', alt: 'Maison contemporaine avec pergola et architecture géométrique', tag: 'Résidentiel' },
  { src: '/assets/images/c2-panel.webp', alt: 'Technicien vérifiant un tableau électrique au tournevis', tag: 'Tableau électrique' },
  { src: '/assets/images/c2-g2.webp', alt: 'Intervention de plomberie dans une salle de bain en rénovation', tag: 'Plomberie' },
  { src: '/assets/images/c2-g3.webp', alt: 'Unités extérieures de climatisation alignées sur un bâtiment', tag: 'Units extérieures' },
]

const PROCESS_ICONS = [ClipboardList, MessagesSquare, FileText, CalendarCheck]

function Reveal({ children, delay = 0, className = '', as: Tag = 'div' }: {
  children: React.ReactNode
  delay?: number
  className?: string
  as?: 'div' | 'section' | 'figure' | 'li' | 'article'
}) {
  const { ref } = useReveal()
  return (
    <Tag ref={ref as never} className={`reveal ${className}`} style={{ ['--reveal-delay' as string]: `${delay}s` }}>
      {children}
    </Tag>
  )
}

export default function Concept2Page() {
  usePageMeta(
    'Aurenov — Climatisation, électricité & plomberie | Concept 02',
    'Direction 02 « Technique premium » : installation, entretien et nettoyage de climatisation, travaux d’électricité et de plomberie — une expertise technique au service de votre confort. Obtenez votre devis.',
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
    return () => { document.body.style.overflow = '' }
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
    <div className="c2">
      <a className="skip-link" href="#contenu">Aller au contenu</a>

      {/* ————— HEADER ————— */}
      <header className={`c2-header ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="container c2-header__inner">
          <Link to="/" className="c2-header__brand" aria-label="Aurenov — retour à la comparaison">
            <img src={LOGO} alt="Logo Aurenov — Neuf et rénovation : électricité, plomberie, climatisation" width={180} height={167} />
          </Link>
          <nav className="c2-header__nav" aria-label="Navigation principale">
            <ul role="list">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}><a href={item.href}>{item.label}</a></li>
              ))}
            </ul>
          </nav>
          <a href="#contact" className="c2-btn c2-btn--primary c2-header__cta">Obtenir mon devis</a>
          <button
            type="button"
            className="c2-burger"
            aria-expanded={menuOpen}
            aria-controls="c2-mobile-menu"
            aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
        </div>
      </header>

      <div id="c2-mobile-menu" className={`c2-mobile-menu ${menuOpen ? 'is-open' : ''}`} hidden={!menuOpen}>
        <nav aria-label="Navigation mobile">
          <ul role="list">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}><a href={item.href} onClick={() => setMenuOpen(false)}>{item.label}</a></li>
            ))}
          </ul>
          <a href="#contact" className="c2-btn c2-btn--primary" onClick={() => setMenuOpen(false)}>Obtenir mon devis</a>
        </nav>
      </div>

      <main id="contenu">
        {/* ————— HERO (split) ————— */}
        <section className="c2-hero" id="accueil" aria-label="Introduction">
          <div className="c2-hero__content">
            <div className="c2-hero__text">
              <p className="c2-kicker"><span className="c2-kicker__dot" aria-hidden="true"></span> Aurenov — Neuf &amp; rénovation</p>
              <h1 className="c2-hero__title">
                Votre confort.<br />
                <span className="c2-hero__title-accent">Notre expertise technique.</span>
              </h1>
              <p className="c2-hero__lead">
                Installation, entretien et nettoyage de climatisation, travaux
                d’électricité et plomberie : des solutions adaptées à votre habitat.
              </p>
              <div className="c2-hero__actions">
                <a href="#contact" className="c2-btn c2-btn--primary">Obtenir mon devis <ArrowRight size={16} aria-hidden="true" /></a>
                <a href="#services" className="c2-btn c2-btn--ghost">Nos expertises</a>
              </div>
              <div className="c2-hero__contact">
                <span>Ou directement :</span>
                <a href={CONTACT.phoneHref}><Phone size={15} aria-hidden="true" /> {CONTACT.phone}</a>
              </div>
            </div>
          </div>
          <div className="c2-hero__visual">
            <img
              src="/assets/images/c2-hero-900.webp"
              srcSet="/assets/images/c2-hero-900.webp 900w, /assets/images/c2-hero.webp 1800w"
              sizes="(max-width: 980px) 100vw, 48vw"
              alt="Maison contemporaine aux grandes baies vitrées et lawn soigné"
              width={1800} height={1013}
            />
            <div className="c2-hero__frame" aria-hidden="true">
              <span></span><span></span><span></span><span></span>
            </div>
            <p className="c2-hero__spec">
              <span className="c2-hero__spec-label">Installation</span>
              Habitat contemporain — intégration soignée
            </p>
          </div>
        </section>

        {/* ————— SERVICES ————— */}
        <section className="c2-section c2-services" id="services" aria-labelledby="services-title">
          <div className="container">
            <Reveal>
              <div className="c2-section-head">
                <div>
                  <p className="c2-kicker">Nos expertises</p>
                  <h2 id="services-title" className="c2-title">Trois métiers, <span className="c2-title__accent">une même rigueur.</span></h2>
                </div>
                <p className="c2-section-head__aside">
                  Des interventions préparées, expliquées et vérifiées —
                  de la première étude à la mise en service.
                </p>
              </div>
            </Reveal>
            <div className="c2-services__grid">
              {SERVICES.map((service, i) => (
                <Reveal as="article" key={service.id} delay={i * 0.08} className={`c2-service ${i === 0 ? 'is-featured' : ''}`} >
                  <a href={`#${service.id}`} className="c2-service__anchor" aria-labelledby={`${service.id}-title`}>
                    <div className="c2-service__top">
                      <span className="c2-service__code">{service.code}</span>
                      <service.icon size={26} strokeWidth={1.6} aria-hidden="true" />
                    </div>
                    <h3 id={`${service.id}-title`} className="c2-service__title">{service.title}</h3>
                    <p className="c2-service__desc">{service.description}</p>
                    <ul role="list" className="c2-service__items">
                      {service.items.map((item) => (
                        <li key={item}><Check size={14} aria-hidden="true" /> {item}</li>
                      ))}
                    </ul>
                    <span className="c2-service__more">Voir le détail <ArrowRight size={15} aria-hidden="true" /></span>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ————— DÉTAIL SERVICES (modules visuels) ————— */}
        {SERVICES.map((service, i) => (
          <section key={service.id} id={service.id} className={`c2-section c2-detail ${i % 2 ? 'is-reversed' : ''}`} aria-labelledby={`${service.id}-detail-title`}>
            <div className="container c2-detail__inner">
              <Reveal className="c2-detail__media">
                <figure className="c2-detail__figure">
                  <img src={service.image} alt={service.imageAlt} loading="lazy" width={1200} height={800} />
                  <span className="c2-detail__tag">{service.code}</span>
                </figure>
              </Reveal>
              <div className="c2-detail__body">
                <Reveal>
                  <p className="c2-kicker">{service.code} — {service.title}</p>
                  <h3 id={`${service.id}-detail-title`} className="c2-title c2-title--section">{service.title}</h3>
                  <p className="c2-detail__desc">{service.description}</p>
                  <ul role="list" className="c2-detail__specs">
                    {service.items.map((item) => (
                      <li key={item}>
                        <span className="c2-detail__spec-key">{item.split(' ')[0]}</span>
                        <span className="c2-detail__spec-value">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <a href="#contact" className="c2-link-arrow">Demander un devis <ArrowRight size={15} aria-hidden="true" /></a>
                </Reveal>
              </div>
            </div>
          </section>
        ))}

        {/* ————— POURQUOI AURENOV ————— */}
        <section className="c2-section c2-why" aria-labelledby="why-title">
          <div className="container">
            <Reveal>
              <div className="c2-section-head">
                <div>
                  <p className="c2-kicker">Notre approche</p>
                  <h2 id="why-title" className="c2-title">Pourquoi <span className="c2-title__accent">Aurenov ?</span></h2>
                </div>
              </div>
            </Reveal>
            <ul role="list" className="c2-why__grid">
              {WHY_POINTS.map((point, i) => (
                <Reveal as="li" key={point.title} delay={i * 0.06} className="c2-why__item">
                  <span className="c2-why__index">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="c2-why__title">{point.title}</h3>
                  <p className="c2-why__text">{point.text}</p>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        {/* ————— GALERIE ————— */}
        <section className="c2-section c2-gallery" aria-labelledby="gallery-title">
          <div className="container">
            <Reveal>
              <div className="c2-section-head">
                <div>
                  <p className="c2-kicker">Applications</p>
                  <h2 id="gallery-title" className="c2-title">Des installations <span className="c2-title__accent">précises.</span></h2>
                </div>
                <p className="c2-section-head__aside">{GALLERY_NOTE}</p>
              </div>
            </Reveal>
            <div className="c2-gallery__grid">
              {GALLERY.map((item, i) => (
                <Reveal as="figure" key={item.src} delay={i * 0.06} className={`c2-gallery__item c2-gallery__item--${i + 1}`}>
                  <img src={item.src} alt={item.alt} loading="lazy" width={900} height={700} />
                  <figcaption>
                    <span className="c2-gallery__tag">{item.tag}</span>
                  </figcaption>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ————— PROCESSUS ————— */}
        <section className="c2-section c2-process" aria-labelledby="process-title">
          <div className="container">
            <Reveal>
              <div className="c2-section-head">
                <div>
                  <p className="c2-kicker">Méthode</p>
                  <h2 id="process-title" className="c2-title">Comment ça <span className="c2-title__accent">se passe.</span></h2>
                </div>
              </div>
            </Reveal>
            <ol role="list" className="c2-process__grid">
              {PROCESS_STEPS.map((step, i) => {
                const Icon = PROCESS_ICONS[i]
                return (
                  <Reveal as="li" key={step.number} delay={i * 0.07} className="c2-process__step">
                    <div className="c2-process__head">
                      <Icon size={22} strokeWidth={1.7} aria-hidden="true" />
                      <span className="c2-process__num">{step.number}</span>
                    </div>
                    <h3 className="c2-process__title">{step.title}</h3>
                    <p className="c2-process__text">{step.text}</p>
                  </Reveal>
                )
              })}
            </ol>
          </div>
        </section>

        {/* ————— FOCUS CLIMATISATION ————— */}
        <section className="c2-section c2-clim" aria-labelledby="clim-title">
          <div className="container c2-clim__inner">
            <div className="c2-clim__body">
              <Reveal>
                <p className="c2-kicker c2-kicker--light">Climatisation</p>
                <h2 id="clim-title" className="c2-title c2-title--light">Une climatisation <span className="c2-title__accent">adaptée à votre intérieur.</span></h2>
                <p className="c2-clim__lead">
                  Emplacement des unités, puissance, discrétion et usage :
                  chaque paramètre compte pour une installation réussie et durable.
                </p>
                <ul role="list" className="c2-clim__list">
                  <li><Check size={16} aria-hidden="true" /> Étude d’implantation avant la pose</li>
                  <li><Check size={16} aria-hidden="true" /> Nettoyage complet des unités et filtres</li>
                  <li><Check size={16} aria-hidden="true" /> Entretien périodique pour un fonctionnement durable</li>
                </ul>
                <div className="c2-clim__actions">
                  <a href="#contact" className="c2-btn c2-btn--yellow">Parler de mon projet</a>
                </div>
              </Reveal>
            </div>
            <Reveal className="c2-clim__media">
              <figure className="c2-clim__figure">
                <img src="/assets/images/c2-maint.webp" alt="Technicien procédant à l’entretien et au nettoyage d’une unité de climatisation" loading="lazy" width={1200} height={800} />
              </figure>
              <figure className="c2-clim__figure c2-clim__figure--secondary">
                <img src="/assets/images/c2-g3.webp" alt="Unités extérieures de climatisation installées proprement sur un bâtiment" loading="lazy" width={1200} height={675} />
              </figure>
            </Reveal>
          </div>
        </section>

        {/* ————— FAQ ————— */}
        <section className="c2-section c2-faq" aria-labelledby="faq-title">
          <div className="container c2-faq__inner">
            <Reveal>
              <p className="c2-kicker">FAQ</p>
              <h2 id="faq-title" className="c2-title">Questions <span className="c2-title__accent">fréquentes.</span></h2>
            </Reveal>
            <Reveal className="c2-faq__list">
              <Accordion
                items={FAQ_ITEMS}
                render={({ entry, open, toggle, buttonProps, regionProps }) => (
                  <div className={`c2-faq__item ${open ? 'is-open' : ''}`}>
                    <h3>
                      <button type="button" className="c2-faq__question" {...buttonProps} onClick={toggle}>
                        <span className="c2-faq__q-index" aria-hidden="true">Q</span>
                        <span>{entry.question}</span>
                        <Plus className="c2-faq__icon" size={18} aria-hidden="true" />
                      </button>
                    </h3>
                    <div className="c2-faq__panel" {...regionProps} aria-hidden={!open}>
                      <div className="c2-faq__panel-inner">
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
        <section className="c2-section c2-contact" id="contact" aria-labelledby="contact-title">
          <div className="container c2-contact__inner">
            <div className="c2-contact__info">
              <Reveal>
                <p className="c2-kicker">Contact &amp; devis</p>
                <h2 id="contact-title" className="c2-title">Décrivez votre <span className="c2-title__accent">projet.</span></h2>
                <p className="c2-contact__lead">
                  Une question, un besoin, une envie de faire évoluer vos installations ?
                  Décrivez votre projet, nous revenons vers vous rapidement.
                </p>
                <div className="c2-contact__channels">
                  <a href={CONTACT.phoneHref} className="c2-contact__channel">
                    <span className="c2-contact__channel-icon"><Phone size={18} aria-hidden="true" /></span>
                    <span>
                      <strong>Téléphone</strong>
                      {CONTACT.phone}
                    </span>
                  </a>
                  <a href={`mailto:${CONTACT.email}`} className="c2-contact__channel">
                    <span className="c2-contact__channel-icon"><Mail size={18} aria-hidden="true" /></span>
                    <span>
                      <strong>E-mail</strong>
                      {CONTACT.email}
                    </span>
                  </a>
                </div>
                <p className="c2-contact__note">{CONTACT.placeholders.hours}</p>
              </Reveal>
            </div>

            <Reveal className="c2-contact__form-wrap">
              <form className="c2-form" noValidate onSubmit={form.submit} aria-label="Formulaire de demande de devis">
                {form.state.status === 'success' ? (
                  <div className="c2-form__success" role="status">
                    <span className="c2-form__success-badge" aria-hidden="true"><Check size={22} /></span>
                    <h3 className="c2-form__success-title">Formulaire vérifié</h3>
                    <p>
                      Prototype de démonstration : les informations saisies sont valides,
                      mais aucune donnée n’a encore été transmise. En production, ce
                      formulaire sera relié à un service d’envoi sécurisé.
                    </p>
                    <button type="button" className="c2-btn c2-btn--ghost" onClick={form.reset}>
                      Saisir une autre demande
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="c2-form__row">
                      <div className="c2-form__field">
                        <label htmlFor="c2-name">Nom</label>
                        <input
                          id="c2-name" name="name" type="text" autoComplete="name"
                          value={form.state.values.name}
                          onChange={(e) => form.setValue('name', e.target.value)}
                          data-invalid={!!form.state.errors.name}
                          aria-describedby={form.state.errors.name ? 'c2-name-error' : undefined}
                        />
                        {form.state.errors.name && <p id="c2-name-error" className="c2-form__error">{form.state.errors.name}</p>}
                      </div>
                      <div className="c2-form__field">
                        <label htmlFor="c2-email">Adresse e-mail</label>
                        <input
                          id="c2-email" name="email" type="email" autoComplete="email"
                          value={form.state.values.email}
                          onChange={(e) => form.setValue('email', e.target.value)}
                          data-invalid={!!form.state.errors.email}
                          aria-describedby={form.state.errors.email ? 'c2-email-error' : undefined}
                        />
                        {form.state.errors.email && <p id="c2-email-error" className="c2-form__error">{form.state.errors.email}</p>}
                      </div>
                    </div>
                    <div className="c2-form__row">
                      <div className="c2-form__field">
                        <label htmlFor="c2-phone">Téléphone <span className="c2-form__optional">(facultatif)</span></label>
                        <input
                          id="c2-phone" name="phone" type="tel" autoComplete="tel"
                          value={form.state.values.phone}
                          onChange={(e) => form.setValue('phone', e.target.value)}
                          data-invalid={!!form.state.errors.phone}
                          aria-describedby={form.state.errors.phone ? 'c2-phone-error' : undefined}
                        />
                        {form.state.errors.phone && <p id="c2-phone-error" className="c2-form__error">{form.state.errors.phone}</p>}
                      </div>
                      <div className="c2-form__field">
                        <label htmlFor="c2-service">Type de prestation</label>
                        <select
                          id="c2-service" name="service"
                          value={form.state.values.service}
                          onChange={(e) => form.setValue('service', e.target.value)}
                          data-invalid={!!form.state.errors.service}
                          aria-describedby={form.state.errors.service ? 'c2-service-error' : undefined}
                        >
                          <option value="">Choisir…</option>
                          {form.serviceOptions.map((option) => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                        {form.state.errors.service && <p id="c2-service-error" className="c2-form__error">{form.state.errors.service}</p>}
                      </div>
                    </div>
                    <div className="c2-form__field">
                      <label htmlFor="c2-message">Description du projet</label>
                      <textarea
                        id="c2-message" name="message" rows={5}
                        value={form.state.values.message}
                        onChange={(e) => form.setValue('message', e.target.value)}
                        data-invalid={!!form.state.errors.message}
                        aria-describedby={form.state.errors.message ? 'c2-message-error' : undefined}
                      />
                      {form.state.errors.message && <p id="c2-message-error" className="c2-form__error">{form.state.errors.message}</p>}
                    </div>
                    <div className="c2-form__field c2-form__field--check">
                      <label className="c2-form__check">
                        <input
                          type="checkbox"
                          checked={form.state.values.consent}
                          onChange={(e) => form.setValue('consent', e.target.checked)}
                          data-invalid={!!form.state.errors.consent}
                          aria-describedby={form.state.errors.consent ? 'c2-consent-error' : undefined}
                        />
                        <span>
                          J’accepte que mes informations soient utilisées pour être recontacté
                          au sujet de ma demande.
                        </span>
                      </label>
                      {form.state.errors.consent && <p id="c2-consent-error" className="c2-form__error">{form.state.errors.consent}</p>}
                    </div>
                    <div className="c2-form__submit">
                      <button type="submit" className="c2-btn c2-btn--primary" disabled={form.state.status === 'submitting'}>
                        {form.state.status === 'submitting' ? 'Envoi en cours…' : 'Envoyer ma demande'} <ArrowRight size={16} aria-hidden="true" />
                      </button>
                      <p className="c2-form__hint">Prototype — aucune donnée n’est réellement transmise.</p>
                    </div>
                  </>
                )}
              </form>
            </Reveal>
          </div>
        </section>
      </main>

      {/* ————— FOOTER ————— */}
      <footer className="c2-footer">
        <div className="container">
          <div className="c2-footer__top">
            <div className="c2-footer__brand">
              <Link to="/" aria-label="Aurenov — retour à la comparaison" className="c2-footer__logo">
                <img src={LOGO} alt="Logo Aurenov" width={150} height={139} />
              </Link>
              <p className="c2-footer__desc">
                Climatisation, électricité et plomberie pour l’habitat.
                Une expertise technique au service de votre confort.
              </p>
            </div>
            <nav className="c2-footer__nav" aria-label="Services (pied de page)">
              <h2 className="c2-footer__heading">Expertises</h2>
              <ul role="list">
                {SERVICES.map((s) => (
                  <li key={s.id}><a href={`#${s.id}`}>{s.title}</a></li>
                ))}
                <li><a href="#contact">Devis &amp; contact</a></li>
              </ul>
            </nav>
            <div className="c2-footer__contact">
              <h2 className="c2-footer__heading">Contact</h2>
              <ul role="list">
                <li><a href={CONTACT.phoneHref}>{CONTACT.phone}</a></li>
                <li><a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></li>
                <li className="c2-footer__muted">{CONTACT.placeholders.address}</li>
                <li className="c2-footer__muted">{CONTACT.placeholders.area}</li>
              </ul>
            </div>
          </div>
          <div className="c2-footer__bottom">
            <p>© {new Date().getFullYear()} Aurenov — {CONTACT.placeholders.legal}</p>
            <ul role="list" className="c2-footer__legal">
              <li><a href="#accueil">Mentions légales</a></li>
              <li><a href="#accueil">Politique de confidentialité</a></li>
            </ul>
          </div>
          <nav className="c2-footer__concepts" aria-label="Autres concepts">
            <span className="c2-footer__concepts-label">Direction 02 — Technique premium ·</span>
            <Link to="/concept-1">Voir le concept 01</Link>
            <Link to="/concept-3">Voir le concept 03</Link>
            <Link to="/">Comparer les trois directions</Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}
