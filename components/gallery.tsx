'use client'
import store from '@/store/store'
import Image from 'next/image'

export default function Gallery() {
  const icons = store((state) => state.icons)

  const handleDownload = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    const img = e.currentTarget
    const link = document.createElement('a')
    link.href = img.src
    link.download = 'icon.png'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <section className='mx-auto grid w-full max-w-3xl grid-cols-4 gap-4 rounded-xl'>
      {icons.map((icon) => (
        <Image
          key={icon}
          src={icon}
          alt=''
          width={512}
          height={512}
          className='w-auto cursor-pointer hover:ring-2 ring-purple-600'
          onClick={handleDownload}
        />
      ))}
    </section>
  )
}
