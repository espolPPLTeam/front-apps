import router from './router'
import { store } from '@/store'
router.beforeEach((to, from, next) => {
  let path = to['path']
  if (path === '/lecciones') {
    // store.dispatch('Inicializar').then(() => {
    //   next()
    // })
    next()
  } else if (path === '/leccionRealtime') {
    // store.dispatch('Inicializar').then(() => {
    //   let estadoLeccion = store.getters['realtime/estado']
    //   if (estadoLeccion !== 'redirigirlo-directamente') {
    //     router.push('/lecciones')
    //   } else {
    //     next()
    //   }
    // })
    next()
  } else if (path === '/ingresarCodigo') {
    store.dispatch('GetUsuario').then(() => {
      let codigoTmp = 'aaa' // se usa cualquier string por funcionamiento de la api
      let paraleloId = store.getters['estudiante/paralelo']
      let correo = store.getters['estudiante/correo']
      store.dispatch('realtime/Codigo', { paraleloId, correo, codigo: codigoTmp }).then(() => { next() })
    })
  } else {
    next()
  }
})
