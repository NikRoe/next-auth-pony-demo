import { useSession, signIn, signOut } from "next-auth/react";

export default function LoginButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button type="button" onClick={() => signOut()}>
          Sign out
        </button>
      </>
    );
  } else {
    return (
      <>
        Not signed in <br />
        <button type="button" onClick={() => signIn()}>
          Sign in
        </button>
      </>
    );
  }
}
