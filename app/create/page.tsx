import Link from 'next/link';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import CreateConversation from './createConversation';


async function getContacts() {
    const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL_DEV + "/contacts");
    const data = await res.json();
    return data.contacts;
}

const Page = async () => {

    const contactsList = await getContacts();

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
            <CreateConversation data={contactsList} />
        </>
    )
}

export default Page