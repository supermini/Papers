import React, { useState } from 'react'

interface FormData {
  name: string
  email: string
  type: string
  message: string
}

const WEBHOOK_URL = 'https://seu-servidor.com/webhook/frontend-pedidos'

const OrderForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    type: '',
    message: '',
  })

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const validateEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email)
  }

  const clearForm = () => {
    setFormData({ name: '', email: '', type: '', message: '' })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSuccess(null)
    setError(null)

    if (!formData.name) {
      setError('O nome é obrigatório.')
      return
    }

    if (!validateEmail(formData.email)) {
      setError('E-mail inválido.')
      return
    }

    if (!formData.type) {
      setError('Selecione um tipo de pedido.')
      return
    }

    setLoading(true)
    try {
      const res = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (!res.ok) {
        throw new Error('Erro ao enviar formulário')
      }
      setSuccess('Pedido enviado com sucesso!')
      clearForm()
    } catch (err) {
      setError('Não foi possível enviar. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
      {error && <div className="text-red-500">{error}</div>}
      {success && <div className="text-green-600">{success}</div>}
      <div className="grid gap-2">
        <label htmlFor="name" className="font-medium">Nome completo</label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="border rounded p-2"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div className="grid gap-2">
        <label htmlFor="email" className="font-medium">E-mail</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="border rounded p-2"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <div className="grid gap-2">
        <label htmlFor="type" className="font-medium">Tipo de pedido</label>
        <select
          id="type"
          name="type"
          required
          className="border rounded p-2"
          value={formData.type}
          onChange={handleChange}
        >
          <option value="">Selecione...</option>
          <option value="orcamento">Orçamento</option>
          <option value="suporte">Suporte</option>
          <option value="outro">Outro</option>
        </select>
      </div>
      <div className="grid gap-2">
        <label htmlFor="message" className="font-medium">Mensagem</label>
        <textarea
          id="message"
          name="message"
          required
          className="border rounded p-2 min-h-[120px]"
          value={formData.message}
          onChange={handleChange}
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {loading ? 'Enviando...' : 'Enviar'}
      </button>
    </form>
  )
}

export default OrderForm
