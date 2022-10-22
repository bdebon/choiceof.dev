import { QuestionInterface } from '@benjamincode/shared/interfaces'

export const questions: QuestionInterface[] = [
  {
    slug: 'tab-or-space',
    choiceLeft: {
      title: 'Tabs',
      img_path: '/assets/img/tab.png',
    },
    choiceRight: {
      title: 'Spaces',
      img_path: '/assets/img/space.jpg',
    },
  },
  {
    slug: 'notepad-or-emacs',
    choiceLeft: {
      title: 'Notepad',
      img_path: '/assets/img/2.webp',
    },
    choiceRight: {
      title: 'Emacs',
      img_path: '/assets/img/3.webp',
    },
  },
  {
    slug: 'svn-or-cvs',
    choiceLeft: {
      title: 'SVN',
      img_path: '/assets/img/4.webp',
    },
    choiceRight: {
      title: 'CVS',
      img_path: '/assets/img/5.webp',
    },
  },
  {
    slug: 'fortran-or-cobol',
    choiceLeft: {
      title: 'FORTRAN',
      img_path: '/assets/img/6.webp',
    },
    choiceRight: {
      title: 'COBOL',
      img_path: '/assets/img/7.webp',
    },
  },
]
