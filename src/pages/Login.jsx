import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import Button from '../components/Button'
import Card from '../components/Card'
import useAuth from '../hooks/useAuth'

export default function Login() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { register, handleSubmit, reset, formState: { errors } } = useForm()
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/events'

  const onSubmit = async (data) => {
    setLoading(true); setError(null)
    try { await login(data); navigate(from, { replace: true }) }
    catch (err) {
      setError('Error de autenticación. Revisa tus credenciales.')
      reset()
    }
    finally { setLoading(false) }
  }

  return (
    <div className="max-w-md mx-auto">
      <Card>
        <h1 className="text-2xl font-semibold mb-2">Bienvenido a {import.meta.env.VITE_APP_NAME || 'la plataforma'}</h1>
        <p className="opacity-80 mb-6">Tu sesión permanece activa tras recargar.</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="label">Correo</label>
            <input className="input" type="email" {...register("email", { required: true, pattern: /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/ })} />
            {errors.email?.type === "pattern" && <span className="text-red-600 text-sm">El correo debe tener un formato válido</span>}
          </div>
          <div>
            <label className="label">Contraseña</label>
            <input className="input" type="password" required {...register("password", { required: true })} />
            {errors.password && <span className="text-red-600 text-sm">La contraseña es obligatoria</span>}
          </div>
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <Button disabled={loading}>{loading ? 'Ingresando...' : 'Entrar'}</Button>
        </form>

        <p className="text-sm mt-4">
          ¿No tienes cuenta? <Link to="/register" className="underline">Regístrate</Link>
        </p>

      </Card>
    </div>
  )
}