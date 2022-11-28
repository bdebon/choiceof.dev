import { useCallback, useEffect } from 'react'
import { motion } from 'framer-motion'

export interface KeyboardControlProps {
  time: number,
  keys: {
    leftKeys: string[],
    rightKeys: string[],
    nextKeys: string[]
  },
  onLeft: () => void,
  onRight: () => void,
  onNext: () => void,
  showResult: boolean
}
export interface KeyContainerProps {
  title: string,
  responsiveTitle: string,
  keys: string[]
}

export function Key({children}: {children: React.ReactNode}) {
  return <kbd className='bg-white px-2 py-[1px] rounded font-medium text-black'>
    {children}
  </kbd>
}
export function KeyContainer(props: KeyContainerProps) {

  return <div className='flex flex-col items-center'>
    <h4 className='text-center mb-2 hidden lg:block'>{props.title}</h4>
    <h4 className='text-center mb-2 block lg:hidden'>{props.responsiveTitle}</h4>
    <div className='flex mt-[auto]'>
      {props.keys.map((key, k) => {
        if(k === 0) return <div key={k}><span>Press&nbsp;</span><Key>{key === ' '? 'Space': key}</Key></div>
        else if(k === 1) return <div><span>&nbsp;or&nbsp;</span><Key key={k}>{key === ' '? 'Space': key}</Key></div>
        else return
      })}
    </div>
  </div>
}

export function KeyboardControl(props: KeyboardControlProps) {

  const keyPress = useCallback((e: KeyboardEvent) => {
    if(props.keys.leftKeys.includes(e.key)){
      props.onLeft()
    }else if(props.keys.rightKeys.includes(e.key)){
      props.onRight()
    }else if(props.keys.nextKeys.includes(e.key) && props.showResult){
      props.onNext()
    }
  }, [])

  useEffect(() => {
    document.addEventListener('keyup', keyPress)
    return () => {
      document.removeEventListener('keyup', keyPress)
    }
  }, [])

  return <>
    <motion.div
      animate={{
        x: ['-50%', '-50%', '-50%', '-50%'],
        y: ['100%', '-10%', '-10%', '100%'],
        position: ['fixed', 'fixed', 'fixed', 'fixed']
      }}
      transition={{
        duration: props.time,
        ease: "easeInOut",
        times: [0, 0.1, 0.9, 1],
        type: 'keyframes',
        delay: 1,
        repeat: 0,
      }}
      className="hidden sm:flex fixed z-50 left-[50%] translate-x-[-50%] translate-y-[100%] bottom-0 bg-black/90 text-white text-sm sm:text-base  px-4 py-2 rounded-md justify-between gap-4"
    >
      <KeyContainer
        title='Left choice'
        responsiveTitle='Top choise'
        keys={props.keys.leftKeys}
      />
      <KeyContainer
        title='Next question'
        responsiveTitle='Next question'
        keys={props.keys.nextKeys}
      />
      <KeyContainer
        title='Right choice'
        responsiveTitle='Bottom choise'
        keys={props.keys.rightKeys}
      />
    </motion.div>
  </>
}

export default KeyboardControl
