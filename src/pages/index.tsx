import { GetServerSidePropsContext } from 'next'
import { User } from '@/models/user';
import { useState } from 'react';

export default function Home() {

  const [currentUser, setCurrentUser] = useState<User>();

  const handleCreateUserClick = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    
    const response = await fetch("/api/create_user");

    console.log(response);
    
    response.json().then(data => {
      console.log(data);
    })

  }

  return (
    <div>
      <p>Test DB Connection</p>
      <button onClick={handleCreateUserClick}>Create User</button>
    </div>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {

  return {
    props: {}, // will be passed to the page component as props
  }
}