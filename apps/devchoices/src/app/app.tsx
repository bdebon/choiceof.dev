// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss'
import NxWelcome from './nx-welcome'
import { CardChoice } from '@benjamincode/shared/ui'

export function App() {
  return (
    <>
      <NxWelcome title="devchoices" />
      <CardChoice
        title="test"
        onClick={() => {}}
        imgUrl="https://images.unsplash.com/photo-1616169950079-8b8f8b9b9b1a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
        totalCount={100}
        voteCount={40}
      />
      <div />
    </>
  )
}

export default App
