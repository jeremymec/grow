import { GetServerSidePropsContext } from "next";
import { User } from "@/models/user";
import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import Plants from "./plants";
import { Plant } from "@/models/plant";
import { cookies } from 'next/headers';

export interface IndexProps {
  user: User
}

export default function Index(props: IndexProps) {
  
  const [userInput, setUserInput] = useState("");
  const [plants, setPlants] = useState<Plant[]>([]);

  useEffect(() => {

      const response = fetch(`/api/users/${props.user.id}/plants`);
      response.then((res) => {
        res.json().then((data) => {
          setPlants(data as Plant[]);
        });
      });
  }, [props.user]);

  const handleCreateUserClick = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    

    response.json().then((data) => {
      toast("User created successfully");
      setCurrentUser(data);
    });
  };

  const handleLoginClick = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const response = await fetch(`/api/users/${userInput}`);

    if (response.ok) {
      response.json().then((data) => {
        toast("Login Successful");
        setCurrentUser(data);
      });
    } else {
      toast("There was a problem logging in with that user code");
    }
  };

  const loggedInFragment = currentUser && (
    <p>Currently logged in with code {currentUser.code}</p>
  );
  const guestFragment = !currentUser && (
    <div>
      <label>
        User Code:{" "}
        <input
          value={userInput}
          onInput={(e) => setUserInput((e.target as HTMLTextAreaElement).value)}
        ></input>
      </label>
      <button onClick={handleLoginClick}>Login</button>
      <br />
      <button onClick={handleCreateUserClick}>Create User</button>
      <ToastContainer />
    </div>
  );

  return (
    <div>
      <Plants plants={plants}></Plants>
      {loggedInFragment}
      {guestFragment}
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {

  let user = null;

  const userCode = context.req.cookies['userCode']
  let createUser = false;

  if (userCode) {
    const verifyResponse = await fetch(`/api/users/verify/${userCode}`);
    if (verifyResponse.ok) {
      user = await verifyResponse.json() as User
    } else {
      createUser = true;
    }
  } else {
    createUser = true;
  }

  if (createUser) {
    const createResponse = await fetch('/api/users/create');
    user = await createResponse.json() as User
  }

  if (!user) {
    throw("An error has occured in the create user flow.")
  }

  return {
    props: {user: user}, // will be passed to the page component as props
  };
}
