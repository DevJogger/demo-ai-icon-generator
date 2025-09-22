import InputPanel from '@/components/input-panel/input-panel'

export default function Home() {
  return (
    <main className='flex min-h-dvh flex-col items-center justify-center gap-8 p-8'>
      <section className='mx-auto flex w-full max-w-3xl flex-col justify-center gap-8 py-8'>
        <h1 className='text-center text-2xl font-medium'>What icons do you want to create?</h1>
        <InputPanel />
      </section>
      <section className='bg-muted mx-auto flex h-56 w-full max-w-3xl rounded-xl'></section>
    </main>
  )
}
