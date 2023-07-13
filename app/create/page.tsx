'use client'
import { useState } from 'react';
import Link from 'next/link';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CheckIcon from '@mui/icons-material/Check';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Page = () => {
    const [contacts, setContacts] = useState<number[]>([]);
    const [name, setName] = useState('')
    // use API: /contacts
    const data = {
        contacts: [{
            id: 1,
            name: "Peter Pan",

        },
        {
            id: 2,
            name: "Wendy Darling",
        }],
    }
    const createConversation = () => {
        const title = name
        const participants = contacts
        // POST /conversations
        // body: { name: String, participants: Number[] }
    }
    return (
        <>
            <div>
                <Link href={`/`}>
                    <div className='flex items-center absolute top-6 left-6'>
                        <ArrowBackIosIcon color="primary" />
                    </div>
                </Link>

                <h1 className="text-4xl font-bold text-center">
                    Create new Chat
                </h1>
            </div>
            <h2 className="text-2xl mb-4">Add Contacts</h2>
            <div>
                {data.contacts.map((contact) => {
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

export default Page