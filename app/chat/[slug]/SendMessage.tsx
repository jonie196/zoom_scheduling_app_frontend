'use client'
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';



const SendMessage = ({ id }: { id: string }) => {
    const [message, setMessage] = useState('')
    const redirect_url = process.env.NEXT_PUBLIC_ZOOM_REDIRECT_URI as string
    const storedCode = localStorage.getItem('code') as string
    console.log(storedCode)
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

        if (type === 'Meeting') {
            // const res = await fetch("https://zoom.us/oauth/token", {
            //     method: "POST",
            //     headers: {
            //         "Host": "zoom.us",
            //         "Content-Type": "application/x-www-form-urlencoded",
            //         "Authorization": 'Basic ' + process.env.NEXT_PUBLIC_ZOOM_AUTHORIZATION,
            //     },
            //     body: JSON.stringify({ grant_type: "authorization_code", code: storedCode, redirect_uri: process.env.NEXT_PUBLIC_ZOOM_REDIRECT_URI}),
            // })
            // const data = await res.json();
            // console.log(data)
            const clientId = 'your_client_id'; // Replace with your actual Zoom client ID
            const clientSecret = 'your_client_secret'; // Replace with your actual Zoom client secret
            const redirectUri = 'your_redirect_uri'; // Replace with your actual Zoom redirect URI
            const codeVerifier = 'your_code_verifier'; // Replace with your actual code verifier

            const url = 'https://zoom.us/oauth/token';

            const formData = new URLSearchParams();
            formData.append('code', storedCode);
            formData.append('grant_type', 'authorization_code');
            formData.append('redirect_uri', redirect_url);

            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    'Authorization': `Basic ${process.env.NEXT_PUBLIC_ZOOM_AUTHORIZATION}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Host': 'zoom.us',
                },
                body: formData.toString(),
            });

            const data = await res.json();
            console.log(data);
        }

        const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL_DEV + `/conversations/${id}/messages`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ content, senderId, type }),
        });

        // window.location.reload();

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