'use client'
import { useEffect } from 'react';
import Chat from './ChatsList'
import Link from 'next/link'
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';




export default function Home(props: any) {

  const code = props.searchParams.code as string

  useEffect(() => {
    if (!localStorage.getItem('code') || localStorage.getItem('code') !== code) {

      localStorage.setItem('code', code);
    }
  }, [code]);


  return (
    <>
      <h1 className="text-4xl font-bold text-center">
        Zoom Scheduling App
      </h1>
      <div>
        <h2 className="text-2xl mb-4">Conversations</h2>
      </div>
      <Chat />
      <Link href={"/create"}>
        <Button variant="outlined">Create new Chat</Button>
      </Link>
    </>
  )
}
