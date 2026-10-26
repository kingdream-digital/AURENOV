import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Phone, Mail, ArrowRight, Plus, Snowflake, Zap, Droplets, HeartHandshake,
  Sparkles, Home, MessageCircle, BadgeCheck, X, Menu,
} from 'lucide-react'
import { Accordion } from '../components/shared/Accordion'
import { useQuoteForm } from '../components/shared/useQuoteForm'
import { useReveal } from '../components/shared/useReveal'
import { usePageMeta } from '../components/shared/usePageMeta'
import { CONTACT, NAV_ITEMS, WHY_POINTS, PROCESS_STEPS, FAQ_ITEMS, GALLERY_NOTE } from '../data/content'
import '../styles/concept3.css'

const LOGO = '/assets/logo/aurenov-logo.png'

const SERVICES = [
  {
    id: 'climatisation',
    icon: Snowflake,
    title: 'Climatisation',
    description:
      'Installation, nettoyage et entretien : nous vous aidons à choisir une solution adaptée à votre logement, puis nous l’installons proprement et prenons le temps de tout vous expliquer.',
    items: ['Installation', 'Nettoyage complet', 'Entretien périodique', 'Conseils d’utilisation'],
    image: '/assets/images/c3-clim.webp',
    imageAlt: 'Personne détendue dans un salon confortable bénéficiant d’une climatisation discrète',
  },
  {
    id: 'electricite',
    icon: Zap,
    title: 'Électricité',
    description:
      'De la petite amélioration à la rénovation complète : des installations électriques réalisées avec soin, expliquées simplement et vérifiées avant de partir.',
    items: ['Installation électrique', 'Mise à niveau', 'Rénovation', 'Éclairage'],
    image: '/assets/images/c3-elec.webp',
    imageAlt: 'Électricien attentif, en chemise à carreaux et casque, travaillant sur une installation',
  },
  {
    id: 'plomberie',
    icon: Droplets,
    title: 'Plomberie',
    description:
      'Salles de bain, cuisines, équipements : nous intervenons avec méthode et respectons votre logement, pour des installations fiables et des finitions nettes.',
    items: ['Installation sanitaire', 'Rénovation', 'Remplacement d’équipements', 'Entretien & réparation'],
    image: '/assets/images/c3-plomb.webp',
    imageAlt: 'Plombier professionnel en tenue de travail, souriant, sur un chantier propre',
  },
]

const WHY_ICONS = [HeartHandshake, Sparkles, Home, MessageCircle]

const GALLERY = [
  { src: '/assets/images/c3-g1.webp', alt: 'Cuisine chaleureuse en bois clair avec plan de travail spacieux', caption: 'Des espaces qui donnent envie' },
  { src: '/assets/images/c3-work.webp', alt: 'Intervention soignée sur des équipements sanitaires', caption: 'Un travail méthodique' },
  { src: '/assets/images/c3-g3.webp', alt: 'Salle de bain lumineuse avec baignoire et grande fenêtre', caption: 'Des finitions nettes' },
  { src: '/assets/images/c3-g2.webp', alt: 'Salle de bain rénovée avec vasque, miroir et sanitaires modernes', caption: 'Rénové avec soin' },
]

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

export default function Concept3Page() {
  usePageMeta(
    'Aurenov — Climatisation, électricité & plomberie | Concept 03',
    'Direction 03 « Artisanat local premium » : pose et nettoyage de climatisation, travaux d’électricité et de plomberie — un accompagnement clair et un travail soigné pour votre logement. Parlons de votre projet.',
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
    <div className="c3">
      <a className="skip-link" href="#contenu">Aller au contenu</a>

      {/* ————— HEADER ————— */}
      <header className={`c3-header ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="container c3-header__inner">
          <Link to="/" className="c3-header__brand" aria-label="Aurenov — retour à la comparaison">
            <img src={LOGO} alt="Logo Aurenov — Neuf et rénovation : électricité, plomberie, climatisation" width={180} height={167} />
          </Link>
          <nav className="c3-header__nav" aria-label="Navigation principale">
            <ul role="list">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}><a href={item.href}>{item.label}</a></li>
              ))}
            </ul>
          </nav>
          <a href="#contact" className="c3-btn c3-btn--primary c3-header__cta">Parlons de votre projet</a>
          <button
            type="button"
            className="c3-burger"
            aria-expanded={menuOpen}
            aria-controls="c3-mobile-menu"
            aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
        </div>
      </header>

      <div id="c3-mobile-menu" className={`c3-mobile-menu ${menuOpen ? 'is-open' : ''}`} hidden={!menuOpen}>
        <nav aria-label="Navigation mobile">
          <ul role="list">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}><a href={item.href} onClick={() => setMenuOpen(false)}>{item.label}</a></li>
            ))}
          </ul>
          <a href="#contact" className="c3-btn c3-btn--primary" onClick={() => setMenuOpen(false)}>Parlons de votre projet</a>
        </nav>
      </div>

      <main id="contenu">
        {/* ————— HERO ————— */}
        <section className="c3-hero" id="accueil" aria-label="Introduction">
          <div className="container">
            <Reveal className="c3-hero__figure">
              <img
                src="/assets/images/c3-hero-900.webp"
                srcSet="/assets/images/c3-hero-900.webp 900w, /assets/images/c3-hero.webp 1800w"
                sizes="(max-width: 700px) 100vw, 92vw"
                alt="Cuisine lumineuse et accueillante avec table en bois près d’une grande fenêtre"
                width={1800} height={2250}
              />
            </Reveal>
            <Reveal className="c3-hero__card">
              <p className="c3-eyebrow">Aurenov — Neuf &amp; rénovation</p>
              <h1 className="c3-hero__title">
                Un habitat plus confortable,<br />
                <span>des installations en toute confiance.</span>
              </h1>
              <p className="c3-hero__lead">
                De la pose au nettoyage de votre climatisation, en passant par vos
                travaux d’électricité et de plomberie, Aurenov vous accompagne
                dans vos projets.
              </p>
              <div className="c3-hero__actions">
                <a href="#contact" className="c3-btn c3-btn--primary">Parlons de votre projet</a>
                <a href="#services" className="c3-btn c3-btn--secondary">Nos prestations</a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ————— SERVICES ————— */}
        <section className="c3-section c3-services" id="services" aria-labelledby="services-title">
          <div className="container">
            <Reveal>
              <p className="c3-eyebrow">Nos prestations</p>
              <h2 id="services-title" className="c3-title">
                Trois savoir-faire,<br /><span>une même attention pour votre logement.</span>
              </h2>
            </Reveal>
            <div className="c3-services__grid">
              {SERVICES.map((service, i) => (
                <Reveal as="article" key={service.id} delay={i * 0.08} className="c3-service">
                  <a href={`#${service.id}`} className="c3-service__link" aria-labelledby={`${service.id}-title`}>
                    <figure className="c3-service__figure">
                      <img src={service.image} alt={service.imageAlt} loading="lazy" width={1200} height={800} />
                      <span className="c3-service__icon" aria-hidden="true">
                        <service.icon size={22} strokeWidth={1.8} />
                      </span>
                    </figure>
                    <div className="c3-service__body">
                      <h3 id={`${service.id}-title`} className="c3-service__title">{service.title}</h3>
                      <p className="c3-service__desc">{service.description}</p>
                      <ul role="list" className="c3-service__items">
                        {service.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                      <span className="c3-link-arrow">En savoir plus <ArrowRight size={15} aria-hidden="true" /></span>
                    </div>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ————— DÉTAIL SERVICES ————— */}
        {SERVICES.map((service, i) => (
          <section key={service.id} id={service.id} className={`c3-section c3-detail ${i % 2 ? 'is-reversed' : ''}`} aria-labelledby={`${service.id}-detail-title`}>
            <div className="container c3-detail__inner">
              <Reveal className="c3-detail__media">
                <figure className="c3-detail__figure">
                  <img src={service.image} alt={service.imageAlt} loading="lazy" width={1200} height={800} />
                </figure>
              </Reveal>
              <div className="c3-detail__body">
                <Reveal>
                  <p className="c3-eyebrow">Prestation {i + 1} · {service.title}</p>
                  <h3 id={`${service.id}-detail-title`} className="c3-title c3-title--detail">{service.title}</h3>
                  <p className="c3-detail__desc">{service.description}</p>
                  <ul role="list" className="c3-detail__list">
                    {service.items.map((item) => (
                      <li key={item}>
                        <BadgeCheck size={18} aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <a href="#contact" className="c3-link-arrow c3-link-arrow--inline">Demander un devis <ArrowRight size={15} aria-hidden="true" /></a>
                </Reveal>
              </div>
            </div>
          </section>
        ))}

        {/* ————— POURQUOI AURENOV ————— */}
        <section className="c3-section c3-why" aria-labelledby="why-title">
          <div className="container">
            <Reveal>
              <p className="c3-eyebrow">Notre approche</p>
              <h2 id="why-title" className="c3-title">Ce qui compte<br /><span>pour vous, compte pour nous.</span></h2>
            </Reveal>
            <ul role="list" className="c3-why__grid">
              {WHY_POINTS.map((point, i) => {
                const Icon = WHY_ICONS[i]
                return (
                  <Reveal as="li" key={point.title} delay={i * 0.07} className="c3-why__item">
                    <span className="c3-why__icon" aria-hidden="true"><Icon size={24} strokeWidth={1.7} /></span>
                    <h3 className="c3-why__title">{point.title}</h3>
                    <p className="c3-why__text">{point.text}</p>
                  </Reveal>
                )
              })}
            </ul>
          </div>
        </section>

        {/* ————— GALERIE ————— */}
        <section className="c3-section c3-gallery" aria-labelledby="gallery-title">
          <div className="container">
            <Reveal>
              <div className="c3-gallery__head">
                <div>
                  <p className="c3-eyebrow">Le souci du détail</p>
                  <h2 id="gallery-title" className="c3-title">Un travail fier,<br /><span>un logement respecté.</span></h2>
                </div>
                <p className="c3-gallery__note">{GALLERY_NOTE}</p>
              </div>
            </Reveal>
            <div className="c3-gallery__grid">
              {GALLERY.map((item, i) => (
                <Reveal as="figure" key={item.src} delay={i * 0.07} className="c3-gallery__item">
                  <img src={item.src} alt={item.alt} loading="lazy" width={900} height={700} />
                  <figcaption>{item.caption}</figcaption>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ————— PROCESSUS ————— */}
        <section className="c3-section c3-process" aria-labelledby="process-title">
          <div className="container">
            <Reveal>
              <p className="c3-eyebrow">Étape par étape</p>
              <h2 id="process-title" className="c3-title">Un accompagnement<br /><span>simple et clair.</span></h2>
            </Reveal>
            <ol role="list" className="c3-process__grid">
              {PROCESS_STEPS.map((step, i) => (
                <Reveal as="li" key={step.number} delay={i * 0.07} className="c3-process__step">
                  <span className="c3-process__num" aria-hidden="true">{step.number}</span>
                  <h3 className="c3-process__title">{step.title}</h3>
                  <p className="c3-process__text">{step.text}</p>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        {/* ————— FOCUS CLIMATISATION ————— */}
        <section className="c3-section c3-clim" aria-labelledby="clim-title">
          <div className="container c3-clim__inner">
            <Reveal className="c3-clim__media">
              <figure className="c3-clim__figure">
                <img src="/assets/images/c3-clim.webp" alt="Intérieur confortable et lumineux, climatisé avec discrétion" loading="lazy" width={1200} height={800} />
              </figure>
            </Reveal>
            <div className="c3-clim__body">
              <Reveal>
                <p className="c3-eyebrow c3-eyebrow--light">Climatisation</p>
                <h2 id="clim-title" className="c3-title c3-title--light">
                  Une climatisation<br /><span>adaptée à votre intérieur.</span>
                </h2>
                <p className="c3-clim__lead">
                  Nous prenons le temps d’étudier votre logement avant de recommander
                  une solution : emplacement, puissance, usage. Et quand l’installation
                  est en place, nous restons présents pour l’entretien et le nettoyage.
                </p>
                <div className="c3-clim__actions">
                  <a href="#contact" className="c3-btn c3-btn--accent">Parler de mon projet</a>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ————— FAQ ————— */}
        <section className="c3-section c3-faq" aria-labelledby="faq-title">
          <div className="container c3-faq__inner">
            <Reveal>
              <p className="c3-eyebrow">Questions fréquentes</p>
              <h2 id="faq-title" className="c3-title">Vous hésitez ?<br /><span>Nous répondons.</span></h2>
            </Reveal>
            <Reveal className="c3-faq__list">
              <Accordion
                items={FAQ_ITEMS}
                render={({ entry, open, toggle, buttonProps, regionProps }) => (
                  <div className={`c3-faq__item ${open ? 'is-open' : ''}`}>
                    <h3>
                      <button type="button" className="c3-faq__question" {...buttonProps} onClick={toggle}>
                        <span>{entry.question}</span>
                        <Plus className="c3-faq__icon" size={18} aria-hidden="true" />
                      </button>
                    </h3>
                    <div className="c3-faq__panel" {...regionProps} aria-hidden={!open}>
                      <div className="c3-faq__panel-inner">
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
        <section className="c3-section c3-contact" id="contact" aria-labelledby="contact-title">
          <div className="container c3-contact__inner">
            <div className="c3-contact__info">
              <Reveal>
                <p className="c3-eyebrow">Contact &amp; devis</p>
                <h2 id="contact-title" className="c3-title">Racontez-nous<br /><span>votre projet.</span></h2>
                <p className="c3-contact__lead">
                  Un devis, un conseil, une simple question ? Écrivez-nous ou
                  appelez-nous directement — nous prenons le temps de vous répondre.
                </p>
                <div className="c3-contact__channels">
                  <a href={CONTACT.phoneHref} className="c3-contact__channel">
                    <span className="c3-contact__icon"><Phone size={19} aria-hidden="true" /></span>
                    <span><strong>Téléphone</strong>{CONTACT.phone}</span>
                  </a>
                  <a href={`mailto:${CONTACT.email}`} className="c3-contact__channel">
                    <span className="c3-contact__icon"><Mail size={19} aria-hidden="true" /></span>
                    <span><strong>E-mail</strong>{CONTACT.email}</span>
                  </a>
                </div>
                <p className="c3-contact__note">{CONTACT.placeholders.hours}</p>
              </Reveal>
            </div>

            <Reveal className="c3-contact__form-wrap">
              <form className="c3-form" noValidate onSubmit={form.submit} aria-label="Formulaire de demande de devis">
                {form.state.status === 'success' ? (
                  <div className="c3-form__success" role="status">
                    <span className="c3-form__success-badge" aria-hidden="true"><BadgeCheck size={26} /></span>
                    <h3 className="c3-form__success-title">C’est bien reçu de votre côté ✓</h3>
                    <p>
                      Prototype de démonstration : votre saisie est valide, mais aucune
                      donnée n’a encore été transmise. En production, ce formulaire sera
                      relié à un service d’envoi sécurisé.
                    </p>
                    <button type="button" className="c3-btn c3-btn--secondary" onClick={form.reset}>
                      Saisir une autre demande
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="c3-form__row">
                      <div className="c3-form__field">
                        <label htmlFor="c3-name">Nom</label>
                        <input
                          id="c3-name" name="name" type="text" autoComplete="name"
                          value={form.state.values.name}
                          onChange={(e) => form.setValue('name', e.target.value)}
                          data-invalid={!!form.state.errors.name}
                          aria-describedby={form.state.errors.name ? 'c3-name-error' : undefined}
                        />
                        {form.state.errors.name && <p id="c3-name-error" className="c3-form__error">{form.state.errors.name}</p>}
                      </div>
                      <div className="c3-form__field">
                        <label htmlFor="c3-email">Adresse e-mail</label>
                        <input
                          id="c3-email" name="email" type="email" autoComplete="email"
                          value={form.state.values.email}
                          onChange={(e) => form.setValue('email', e.target.value)}
                          data-invalid={!!form.state.errors.email}
                          aria-describedby={form.state.errors.email ? 'c3-email-error' : undefined}
                        />
                        {form.state.errors.email && <p id="c3-email-error" className="c3-form__error">{form.state.errors.email}</p>}
                      </div>
                    </div>
                    <div className="c3-form__row">
                      <div className="c3-form__field">
                        <label htmlFor="c3-phone">Téléphone <span className="c3-form__optional">(facultatif)</span></label>
                        <input
                          id="c3-phone" name="phone" type="tel" autoComplete="tel"
                          value={form.state.values.phone}
                          onChange={(e) => form.setValue('phone', e.target.value)}
                          data-invalid={!!form.state.errors.phone}
                          aria-describedby={form.state.errors.phone ? 'c3-phone-error' : undefined}
                        />
                        {form.state.errors.phone && <p id="c3-phone-error" className="c3-form__error">{form.state.errors.phone}</p>}
                      </div>
                      <div className="c3-form__field">
                        <label htmlFor="c3-service">Type de prestation</label>
                        <select
                          id="c3-service" name="service"
                          value={form.state.values.service}
                          onChange={(e) => form.setValue('service', e.target.value)}
                          data-invalid={!!form.state.errors.service}
                          aria-describedby={form.state.errors.service ? 'c3-service-error' : undefined}
                        >
                          <option value="">Choisir…</option>
                          {form.serviceOptions.map((option) => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                        {form.state.errors.service && <p id="c3-service-error" className="c3-form__error">{form.state.errors.service}</p>}
                      </div>
                    </div>
                    <div className="c3-form__field">
                      <label htmlFor="c3-message">Description du projet</label>
                      <textarea
                        id="c3-message" name="message" rows={5}
                        value={form.state.values.message}
                        onChange={(e) => form.setValue('message', e.target.value)}
                        data-invalid={!!form.state.errors.message}
                        aria-describedby={form.state.errors.message ? 'c3-message-error' : undefined}
                      />
                      {form.state.errors.message && <p id="c3-message-error" className="c3-form__error">{form.state.errors.message}</p>}
                    </div>
                    <div className="c3-form__field c3-form__field--check">
                      <label className="c3-form__check">
                        <input
                          type="checkbox"
                          checked={form.state.values.consent}
                          onChange={(e) => form.setValue('consent', e.target.checked)}
                          data-invalid={!!form.state.errors.consent}
                          aria-describedby={form.state.errors.consent ? 'c3-consent-error' : undefined}
                        />
                        <span>
                          J’accepte que mes informations soient utilisées pour être recontacté
                          au sujet de ma demande.
                        </span>
                      </label>
                      {form.state.errors.consent && <p id="c3-consent-error" className="c3-form__error">{form.state.errors.consent}</p>}
                    </div>
                    <div className="c3-form__submit">
                      <button type="submit" className="c3-btn c3-btn--primary" disabled={form.state.status === 'submitting'}>
                        {form.state.status === 'submitting' ? 'Envoi en cours…' : 'Envoyer ma demande'}
                      </button>
                      <p className="c3-form__hint">Prototype — aucune donnée n’est réellement transmise.</p>
                    </div>
                  </>
                )}
              </form>
            </Reveal>
          </div>
        </section>
      </main>

      {/* ————— FOOTER ————— */}
      <footer className="c3-footer">
        <div className="container">
          <div className="c3-footer__top">
            <div className="c3-footer__brand">
              <Link to="/" aria-label="Aurenov — retour à la comparaison" className="c3-footer__logo">
                <img src={LOGO} alt="Logo Aurenov" width={150} height={139} />
              </Link>
              <p className="c3-footer__desc">
                Climatisation, électricité et plomberie pour l’habitat.
                Un artisan de confiance, un travail soigné.
              </p>
            </div>
            <nav className="c3-footer__nav" aria-label="Services (pied de page)">
              <h2 className="c3-footer__heading">Prestations</h2>
              <ul role="list">
                {SERVICES.map((s) => (
                  <li key={s.id}><a href={`#${s.id}`}>{s.title}</a></li>
                ))}
                <li><a href="#contact">Devis &amp; contact</a></li>
              </ul>
            </nav>
            <div className="c3-footer__contact">
              <h2 className="c3-footer__heading">Contact</h2>
              <ul role="list">
                <li><a href={CONTACT.phoneHref}>{CONTACT.phone}</a></li>
                <li><a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></li>
                <li className="c3-footer__muted">{CONTACT.placeholders.address}</li>
                <li className="c3-footer__muted">{CONTACT.placeholders.area}</li>
              </ul>
            </div>
          </div>
          <div className="c3-footer__bottom">
            <p>© {new Date().getFullYear()} Aurenov — {CONTACT.placeholders.legal}</p>
            <ul role="list" className="c3-footer__legal">
              <li><a href="#accueil">Mentions légales</a></li>
              <li><a href="#accueil">Politique de confidentialité</a></li>
            </ul>
          </div>
          <nav className="c3-footer__concepts" aria-label="Autres concepts">
            <span className="c3-footer__concepts-label">Direction 03 — Artisanat local premium ·</span>
            <Link to="/concept-1">Voir le concept 01</Link>
            <Link to="/concept-2">Voir le concept 02</Link>
            <Link to="/">Comparer les trois directions</Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}
