import { useState } from 'react'
import { SERVICE_OPTIONS } from '../../data/content'

/**
 * Logique de formulaire de devis partagée entre les trois concepts.
 * Prototype front-end : aucun envoi réel n'est effectué.
 * Branchement prévu : remplacer `simulateSubmit` par un appel
 * fetch() vers un backend / service d'e-mail (voir README-DEV.md).
 */

export interface QuoteFormState {
  values: {
    name: string
    email: string
    phone: string
    service: string
    message: string
    consent: boolean
  }
  errors: Partial<Record<'name' | 'email' | 'phone' | 'service' | 'message' | 'consent', string>>
  status: 'idle' | 'submitting' | 'success'
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const PHONE_RE = /^(?:\+?\d[\d\s().-]{7,}\d)$/

export function useQuoteForm() {
  const [state, setState] = useState<QuoteFormState>({
    values: { name: '', email: '', phone: '', service: '', message: '', consent: false },
    errors: {},
    status: 'idle',
  })

  const setValue = (field: keyof QuoteFormState['values'], value: string | boolean) => {
    setState((s) => ({
      ...s,
      values: { ...s.values, [field]: value },
      errors: { ...s.errors, [field]: undefined },
    }))
  }

  const validate = (): boolean => {
    const errors: QuoteFormState['errors'] = {}
    const v = state.values
    if (v.name.trim().length < 2) errors.name = 'Veuillez indiquer votre nom.'
    if (!EMAIL_RE.test(v.email.trim()))
      errors.email = 'Veuillez saisir une adresse e-mail valide (exemple : nom@domaine.fr).'
    if (v.phone.trim().length > 0 && !PHONE_RE.test(v.phone.trim()))
      errors.phone = 'Veuillez saisir un numéro de téléphone valide, ou laisser ce champ vide.'
    if (!v.service) errors.service = 'Veuillez choisir un type de prestation.'
    if (v.message.trim().length < 10)
      errors.message = 'Décrivez votre projet en quelques mots (10 caractères minimum).'
    if (!v.consent)
      errors.consent = 'Votre accord est nécessaire pour traiter votre demande.'
    setState((s) => ({ ...s, errors }))
    return Object.keys(errors).length === 0
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (state.status === 'submitting') return
    if (!validate()) {
      // Focus the first invalid field for keyboard / screen-reader users.
      requestAnimationFrame(() => {
        const invalid = document.querySelector<HTMLElement>('[data-invalid="true"]')
        invalid?.focus()
      })
      return
    }
    setState((s) => ({ ...s, status: 'submitting', errors: {} }))
    // Prototype : simule l'attente d'un envoi. Aucune donnée ne quitte le navigateur.
    await new Promise((r) => setTimeout(r, 900))
    setState((s) => ({ ...s, status: 'success' }))
  }

  const reset = () =>
    setState({
      values: { name: '', email: '', phone: '', service: '', message: '', consent: false },
      errors: {},
      status: 'idle',
    })

  return { state, setValue, submit, reset, serviceOptions: SERVICE_OPTIONS }
}
