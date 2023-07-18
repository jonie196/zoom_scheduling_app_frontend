'use client'
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


const SendMessage = ({ id }: { id: string }) => {
    const [message, setMessage] = useState('')
    const sendMessage = async () => {
        const content = message
        const senderId = 1
        let type = 'Text'
        const scheduleRegex = /^Schedule for \d{2}:\d{2} \d{2}\/\d{2}\/\d{2}$/;
        const rescheduleRegex = /^Reschedule \d{2}:\d{2} \d{2}\/\d{2}\/\d{2} to \d{2}:\d{2} \d{2}\/\d{2}\/\d{2}$/;
        const cancelRegex = /^Cancel \d{2}:\d{2} \d{2}\/\d{2}\/\d{2}$/;

        if (scheduleRegex.test(message) || rescheduleRegex.test(message) || cancelRegex.test(message)) {
            type = 'Meeting';
        }
        // /conversation/:id/message
        // POST (content: String, senderId: Number, type: String)

        const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL_DEV + `/conversations/${id}/messages`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ content, senderId, type }),
        });
        window.location.reload();
    }
    return (
        <>
            <div className='flex gap-2 mt-8'>
                <TextField
                    id="outlined-multiline-flexible"
                    label="Message"
                    multiline
                    maxRows={4}
                    value-={message}
                    onChange={(event) => {
                        setMessage(event.target.value)
                    }}
                />
                <Button variant="outlined" onClick={() => {
                    if (message === '') return
                    sendMessage()
                }}>Send</Button>
            </div>
        </>
    )
}

export default SendMessage