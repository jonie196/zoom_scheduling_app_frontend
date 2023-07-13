import Link from "next/link";
import ChatIcon from '@mui/icons-material/Chat';

export const Chats = () => {
  const conversations = [ // use API: /conversations
    {
      id: 1,
      title: 'Test Chat Title',
      senderName: 'Peter Pan',
      lastMessage: 'test message',
    },
    {
      id: 2,
      title: 'Test Chat Title',
      senderName: 'Peter Pan',
      lastMessage: 'test message',
    },
    {
      id: 3,
      title: 'Test Chat Title',
      senderName: 'Peter Pan',
      lastMessage: 'test message',
    },
  ];
  return (
    <>
      <div className="w-full flex flex-col gap-2">
        {conversations.map((contact) => {
          return (
            <li key={contact.id} className="cursor-pointer list-none w-full">
              <Link href={`/chat/${contact.id}`}>

                <div className="border-solid border hover:border-blue-400 rounded p-2 flex gap-2">
                  <ChatIcon color="primary" />
                  <div>
                    <div>{contact.senderName}</div>
                    <div className="text-slate-400">{contact.lastMessage}</div>
                    <div>{contact.title}</div>
                  </div>
                </div>
              </Link>
            </li>
          );
        })}
      </div>
    </>
  );
};

export default Chats;
