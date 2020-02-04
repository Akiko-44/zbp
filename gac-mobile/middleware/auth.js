import { native } from '~/plugins/native'

export default function ({ route, store, redirect }) {
  if (process.client && !store.state.user.token) {
    console.log('auth middleware', native.isApp(), store.state.user.token)
    if (native.isApp()) {
      native.goToLogin()
    } else {
      // redirect('/user/login', { from: location.origin + route.fullPath })
      redirect('/user/login')
      localStorage.setItem('fromUrl',  location.origin + route.fullPath)
    }
  }
}
