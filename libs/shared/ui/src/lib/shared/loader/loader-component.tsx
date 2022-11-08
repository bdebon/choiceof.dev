import styles from './loader-component.module.css'

export interface LoaderComponentProp {
  fullPage?: boolean
}

export default function LoaderComponent(props: LoaderComponentProp)
  : JSX.Element {
  return (
    <div className={`${styles['content']} ${props.fullPage && styles['loader_fixed']}`}>
      <div className={styles['donut_spinner']}/>
    </div>
  )
}
