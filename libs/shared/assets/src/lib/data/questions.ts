import { QuestionInterface } from '@benjamincode/shared/interfaces'

export const questions: QuestionInterface[] = [
  {
    slug: 'tab-or-space',
    choiceLeft: {
      title: 'Tabs',
      img_path: 'https://picsum.photos/1920/1080',
    },
    choiceRight: {
      title: 'Spaces',
      img_path: 'https://picsum.photos/1921/1080',
    },
  },
  {
    slug: 'notepad-or-emacs',
    choiceLeft: {
      title: 'Notepad',
      img_path: 'https://picsum.photos/1902/1081',
    },
    choiceRight: {
      title: 'Emacs',
      img_path: 'https://picsum.photos/1922/1082',
    },
  },
]
