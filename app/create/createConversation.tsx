'use client'
import { useState } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CheckIcon from '@mui/icons-material/Check';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

type ConversationData = { id: number; name: string }[];

interface CreateConversationProps {
  data: ConversationData;
}

const CreateConversation: React.FC<CreateConversationProps> = ({ data }) => {
  
  const [contacts, setContacts] = useState<number[]>([]);
  const [name, setName] = useState('')
  const createConversation = async () => {
    const title = name
    const participants = contacts
    // POST /conversations
    // body: { name: String, participants: Number[] }
    // add OPTION
    const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL_DEV + "/conversations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, participants }),
    });
    const data = await res.json();
    // nevigate back to home
    window.open('/', '_self');
}
  return (
    <>
      <div>
        {data.map((contact) => {
          return (
            <li key={contact.id} className="cursor-pointer list-none w-full">
              <div className=" p-2 " onClick={() => {
                if (contacts.includes(contact.id)) {
                  setContacts(contacts.filter((id) => id !== contact.id))
                } else {
                  setContacts([...contacts, contact.id])
                }
              }}>
                <div className='flex gap-2 border-solid border hover:border-blue-400 rounded p-4'>
                  <AccountCircleIcon color="primary" />
                  <div className='select-none	'>{contact.name}</div>
                  {contacts.includes(contact.id) &&
                    <CheckIcon color="primary" />
                  }
                </div>
              </div>
            </li>
          );
        }
        )}
      </div>
      <div className='flex gap-2 mt-8'>
        <TextField id="outlined-basic" label="Name" variant="outlined" value-={name}
          onChange={(event) => {
            setName(event.target.value)
          }} />
        <Button variant="outlined" onClick={() => {
          createConversation()
        }}>Create</Button>
      </div>
    </>
  )
}

export default CreateConversation