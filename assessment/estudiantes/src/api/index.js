import fetch from '@/utils/fetch'

export const ObtenerLeccionPorId = (id) => fetch(`/api/lecciones/detalle/${id}`)

export const ObtenerEstadosRealtime = (estudianteId) => fetch(`/api/paralelos/estudiante/${estudianteId}`)

export const ObtenerLeccionRealtimeDatos = () => fetch(`/api/estudiantes/leccion/datos_leccion`)

export const ObtenerDatosIniciales = () => fetch(`/api/estudiantes/leccion/datos_leccion`)

export const VerificarCodigo = ({ paraleloId, correo, codigo }) => fetch(`/api/realtime/estudiante/verificarCodigo/${paraleloId}/${correo}/${codigo}`)

export const Responder = (respuesta) => fetch(`/api/respuestas/`, respuesta, 'POST')

export const Login = (payload) => fetch(`/api/login/session`, payload, 'POST')

export const GetUsuario = (correo) => fetch(`/api/login/estudiantes/${correo}`)
