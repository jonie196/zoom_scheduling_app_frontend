import Link from 'next/link';
// Icons
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Page = (props: any) => {
  const chatId = props.params.slug
  // fetch /conversation/:id
  const data = {
    id: 1,
    title: 'Test Chat Title',
    senderName: 'Peter Pan',
    senderId: 1,
    partcipants: [
      "Pater Pan",
      "Wendy Darling",
    ],
    messages: [
      {
        id: 1,
        createdAt: 1234567890,
        content: 'test message',
        senderName: 'Peter Pan',
        senderId: 1,
        type: 'text',
      },
      {
        id: 2,
        createdAt: 1234567899,
        content: 'test message',
        senderName: 'Wendy Darling',
        senderId: 2,
        type: 'text',
      },
      {
        id: 2,
        createdAt: 1234567899,
        content: 'test message',
        senderName: 'Wendy Darling',
        senderId: 2,
        type: 'text',
      },
      {
        id: 2,
        createdAt: 1234567899,
        content: 'test message messagemes sagemessagemes sagemessagem essagemessa gemessagemessage',
        senderName: 'Wendy Darling',
        senderId: 2,
        type: 'text',
      },
      {
        id: 2,
        createdAt: 1234567899,
        content: 'test message',
        senderName: 'Wendy Darling',
        senderId: 2,
        type: 'text',
      },
      {
        id: 2,
        createdAt: 1234567899,
        content: 'test message',
        senderName: 'Wendy Darling',
        senderId: 2,
        type: 'text',
      },
    ],
    name: 'Test Chat Title',
  }
  return (
    <>
      <div>
        <Link href={`/`}>
          <div className='flex items-center absolute top-6 left-6'>
            <ArrowBackIosIcon />
          </div>
        </Link>
        <h1 className="text-4xl font-bold text-center">{data.title}</h1>
      </div>
      {/* Chat */}
      <div>
        <div className='flex flex-col gap-4'>
          {data.messages.map((message: any) => {
            return (
              <div key={message.id} className='self-start'>
                <div className='flex gap-2'>
                  <AccountCircleIcon color="primary" />
                  <div>
                    <div className="text-slate-400">{message.senderName}</div>
                    <div>{message.content}</div>
                    {/* created at */}
                    <div className="text-slate-400 text-xs">
                      <span>{new Date(message.createdAt * 1000).toLocaleTimeString()}</span>{' '}
                      <span>{new Date(message.createdAt * 1000).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
          }
        </div>
        {/* Input */}
        <div className='flex gap-2 mt-8'>
          <TextField
            id="outlined-multiline-flexible"
            label="Message"
            multiline
            maxRows={4}
            value-='Test'
          />
          <Button variant="outlined">Send</Button>
        </div>
      </div>
    </>
  )
}

export default Page