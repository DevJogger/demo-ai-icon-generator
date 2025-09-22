import { create } from 'zustand'
import { ICON_STYLES } from '@/lib/const'
interface State {
  prompt: string
  style: (typeof ICON_STYLES)[number] | ''
  colors: string[]
}

interface Action {
  setPrompt: (text: string) => void
  setStyle: (style: State['style']) => void
  setColors: (colors: string[]) => void
}

const useStore = create<State & Action>()((set) => ({
  prompt: '',
  style: '',
  colors: [],
  setPrompt: (text) => set({ prompt: text }),
  setStyle: (style) => set({ style }),
  setColors: (colors) => set({ colors }),
}))

export default useStore
