import Link from 'next/link';
// Icons
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// Components
import SendMessage from './SendMessage';

const getConversation = async (id: string) => {

  const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL_DEV + `/conversations/${id}`, { next: { revalidate: 0 } });
  const data = await res.json();
  return data.conversation;
}

const Page = async (props: any) => {
  const id = props.params.slug as string
  const conversation = await getConversation(id)
  console.log(conversation)

  return (
    <>
      <div>
        <Link href={`/`}>
          <div className='flex items-center absolute top-6 left-6'>
            <ArrowBackIosIcon color="primary" />
          </div>
        </Link>
        <h1 className="text-4xl font-bold text-center">{conversation.title}</h1>
      </div>
      {/* Chat */}
      <div>
        <div className='flex flex-col gap-4 overflow-auto'>
          {conversation.messages?.map((message: any) => {
            return (
              <div key={message.id} className='self-start'>
                <div className='flex gap-2'>
                  <AccountCircleIcon color="primary" />
                  <div>
                    <div className="text-slate-400">{message.senderName}</div>
                    <div>{message.content}</div>
                    {/* created at */}
                    <div className="text-slate-400 text-xs">
                      <span>{new Date(message.createdAt).toLocaleTimeString()}</span>{' '}
                      <span>{new Date(message.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
          }
        </div>
        {/* Input */}
        <SendMessage id={id} />
      </div>
    </>
  )
}

export default Page