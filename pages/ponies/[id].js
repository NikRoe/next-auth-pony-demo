import DetailCard from "@/components/DetailCard";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import useSWR, { mutate } from "swr";

export default function DetailPage() {
  const router = useRouter();
  const { id } = router.query;

  const session = useSession();
  const userId = session.data?.user.id;

  const {
    data: user,
    userError,
    userIsLoading,
    mutate,
  } = useSWR(userId ? `/api/user/${userId}` : null);

  const {
    data: pony,
    error,
    isLoading,
  } = useSWR(id ? `/api/ponies/${id}` : null);

  if (error || userError) return <div>failed to load</div>;
  if (isLoading || userIsLoading) return <div>loading...</div>;
  if (!pony) return null;

  async function toggleFavorite(id) {
    if (session.status === "unauthenticated") {
      alert("Please sign in to add favorites");
      return;
    }

    const foundEntry = user.favoritePonies.find(
      (favorite) => favorite._id === id
    );

    const response = await fetch(`/api/user/${userId}`, {
      method: foundEntry ? "PATCH" : "POST",
      body: JSON.stringify({ id }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) mutate();
  }

  const isFavorite = user?.favoritePonies.map((pony) => pony._id).includes(id);

  return (
    <DetailCard
      id={id}
      toggleFavorite={toggleFavorite}
      isFavorite={isFavorite}
      pony={pony}
    />
  );
}
