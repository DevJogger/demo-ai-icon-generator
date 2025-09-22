import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import store from '@/store/store'
import { ICON_STYLES } from '@/lib/const'

export default function StylePicker() {
  const style = store((state) => state.style)
  const setStyle = store((state) => state.setStyle)

  return (
    <Select value={style} onValueChange={setStyle}>
      <SelectTrigger className=''>
        <SelectValue placeholder='Style' />
      </SelectTrigger>
      <SelectContent>
        {ICON_STYLES.map((style) => (
          <SelectItem key={style} value={style}>
            {style}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
