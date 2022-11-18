import { TwitterIcon, TwitterShareButton } from 'next-share'

export interface ShareTwitterProps {
  websiteUrl: string
  questionSlug: string
  showResult: boolean
}

export function ShareTwitter(props: ShareTwitterProps) {
  const { websiteUrl, questionSlug, showResult } = props
  const showResultButton = props.showResult
    ? `transition-opacity duration-300 delay-700 !opacity-100`
    : `opacity-0 pointer-events-none`

  return (
    <TwitterShareButton
      url={`${websiteUrl}/question/${questionSlug}/`}
      title={`You  won't believe what people voted on this one...`}
    >
      <div
        className={`left-1/2 -translate-x-1/2 flex items-center justify-center gap-2 !delay-1000 !duration-500 absolute bottom-16 lg:bottom-14 -translate-y-full ${
          showResultButton || ''
        }`}
      >
        <p className="font-medium mix-blend-overlay text-xs text-white bg-black/30 py-1 px-2">Share this question on</p>
        <TwitterIcon size={32} round />
      </div>
    </TwitterShareButton>
  )
}

export default ShareTwitter
