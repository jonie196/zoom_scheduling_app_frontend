import Link from "next/link";

export const Chats = () => {
  const conversations = [ // /conversations
    {
      id: 1,
      title: 'Test Chat Title',
      senderName: 'Peter Pan',
      lastMessage: 'test message',
    },
  ];
  console.log(conversations);
  return (
    <>
      {conversations.map((contact) => {
        return (
          <li key={contact.id} className="cursor-pointer list-none w-full">
            <Link href={`/chat/${contact.id}`}>
              <div className="border-solid border-2 border-slate-200 rounded p-2 ">
                <div>{contact.senderName}</div>
                <div className="text-slate-400">{contact.lastMessage}</div>
                <div>{contact.title}</div>
              </div>
            </Link>
          </li>
        );
      })}
    </>
  );
};

export default Chats;
