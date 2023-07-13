import Chat from './ChatsList'


export default function Home() {
  return (
    <>
      <h1 className="text-4xl font-bold text-center">
        Zoom Scheduling App
      </h1>
      <div>
        <h2 className="text-2xl mb-4">Conversations</h2>
      </div>
      <Chat />
      <p className='text-center border-solid border-2 border-green-500 rounded p-2' >Create New Chat +</p>
    </>
  )
}
