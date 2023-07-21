import Link from "next/link";
import ChatIcon from '@mui/icons-material/Chat';

type ConversationData = { id: number; title: string; senderName: string; lastMessage: string }[];

async function getConversations() {

  const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL_DEV + "/conversations?page=1", { next: { revalidate: 0 } });
  const data = await res.json();
  return data.conversations;
}

export const Chats = async () => {
  const conversations: ConversationData = await getConversations();
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
                    <div className="font-semibold">{contact.title}</div>
                    <div>{contact.senderName}</div>
                    <div className="text-slate-400">{contact.lastMessage}</div>
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
