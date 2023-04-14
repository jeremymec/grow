import { GetServerSidePropsContext } from "next";
import { User } from "@/models/user";
import { useState } from "react";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

export default function Home() {
  const [currentUser, setCurrentUser] = useState<User>();
  const [userInput, setUserInput] = useState("");

  const handleCreateUserClick = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const response = await fetch("/api/users/create");

    response.json().then((data) => {
      toast("User created successfully")
      setCurrentUser(data);
    });
  };

  const handleLoginClick = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const response = await fetch(`/api/users/${userInput}`)
    
    if (response.ok) {
      response.json().then((data) => {
        toast("Login Successful")
        setCurrentUser(data);
      })
    } else {
      toast("There was a problem logging in with that user code")
    }


  };

  const loggedInFragment = currentUser && (
    <p>Currently logged in with code {currentUser.code}</p>
  );
  const guestFragment = !currentUser && (
    <div>
      <label>
        User Code: <input value={userInput} onInput={e=> setUserInput((e.target as HTMLTextAreaElement).value)}></input>
      </label>
      <button onClick={handleLoginClick}>Login</button>
      <br />
      <button onClick={handleCreateUserClick}>Create User</button>
      <ToastContainer />
    </div>
  );

  return (
    <div>
      {loggedInFragment}
      {guestFragment}
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {}, // will be passed to the page component as props
  };
}
