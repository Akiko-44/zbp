import Login from './'

export default function createLoginView(title, loginType) {
  return {
    render(h) {
      return h(Login, { props: { title, loginType }})
    }
  }
}
