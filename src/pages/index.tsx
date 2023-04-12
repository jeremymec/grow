import { GetServerSidePropsContext } from "next";
import { User } from "@/models/user";
import { FormEvent, useState } from "react";

export default function Home() {
  const [currentUser, setCurrentUser] = useState<User>();
  const [userInput, setUserInput] = useState("");

  const handleCreateUserClick = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const response = await fetch("/api/create_user");

    response.json().then((data) => {
      setCurrentUser(data);
    });
  };

  const handleLoginClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    console.log(userInput);
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
