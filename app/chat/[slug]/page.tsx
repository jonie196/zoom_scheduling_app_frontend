import Link from 'next/link';
// Icons
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// Components
import SendMessage from './SendMessage';

const getMessages = async (id: string) => {
  const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL_DEV + `/conversations/${id}/messages?page=0`, { next: { revalidate: 0 } });
  const data = await res.json();
  return data.messages;
}

const getConversation = async (id: string) => {
  const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL_DEV + `/conversations/${id}`, { next: { revalidate: 0 } });
  const data = await res.json();
  return data.conversation;
}

// const getAccessToken = async (code:string) => {
//   const url = 'https://zoom.us/oauth/token';
//   const redirect_url = process.env.NEXT_PUBLIC_ZOOM_REDIRECT_URI as string
//   // const storedCode = localStorage.getItem('code') as string
  
//   const formData = new URLSearchParams();
//   formData.append('code', code);
//   formData.append('grant_type', 'authorization_code');
//   formData.append('redirect_uri', redirect_url);
//   const res = await fetch(url, {
//     method: 'POST',
//     headers: {
//       'Authorization': `Basic ${process.env.NEXT_PUBLIC_ZOOM_AUTHORIZATION}`,
//       'Content-Type': 'application/x-www-form-urlencoded',
//       'Host': 'zoom.us',
//     },
//     body: formData.toString(),
//   });
//   return res.json();
// }

const Page = async (props: any) => {

  const id = props.params.slug as string
  const messages = await getMessages(id)
  const conversation = await getConversation(id)

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
          {messages?.map((message: any) => {
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