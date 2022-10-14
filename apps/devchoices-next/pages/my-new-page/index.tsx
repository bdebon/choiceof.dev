import styles from './index.module.css'

/* eslint-disable-next-line */
export interface MyNewPageProps {}

export function MyNewPage(props: MyNewPageProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to MyNewPage!</h1>
    </div>
  )
}

export default MyNewPage
