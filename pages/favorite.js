import Card from "@/components/Card";
import List from "@/components/List";
import { useSession } from "next-auth/react";
import useSWR from "swr";

export default function Favorite() {
  const session = useSession();
  const userId = session.data?.user.id;

  const {
    data: user,
    error,
    isLoading,
  } = useSWR(userId ? `/api/user/${userId}` : null);

  if (!session.data) {
    return <h2>Please sign in to view your favorite ponies</h2>;
  }

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <>
      <h2>Your Favorite Little Ponies</h2>
      <List>
        {user.favoritePonies.map((pony) => {
          return <Card key={pony._id} pony={pony} />;
        })}
      </List>
    </>
  );
}
