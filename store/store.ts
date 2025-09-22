import { create } from 'zustand'
import { ICON_STYLES } from '@/lib/const'
interface State {
  prompt: string
  style: (typeof ICON_STYLES)[number] | ''
  colors: string[]
  icons: string[]
}

interface Action {
  setPrompt: (text: string) => void
  setStyle: (style: State['style']) => void
  setColors: (colors: string[]) => void
  setIcons: (images: string[]) => void
}

const useStore = create<State & Action>()((set) => ({
  prompt: '',
  style: '',
  colors: [],
  icons: [],
  setPrompt: (text) => set({ prompt: text }),
  setStyle: (style) => set({ style }),
  setColors: (colors) => set({ colors }),
  setIcons: (icons) => set({ icons }),
}))

export default useStore
