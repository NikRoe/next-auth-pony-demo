import dbConnect from "@/db/dbConnect";
import User from "@/db/models/User";

import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(request, response) {
  await dbConnect();

  const session = await getServerSession(request, response, authOptions);

  if (session) {
    const { id } = request.query;
    const user = await User.findById(id).populate("favoritePonies");

    if (request.method === "GET") {
      if (!user) {
        return response.status(404).json({ message: "User not found" });
      } else {
        return response.status(200).json(user);
      }
    }

    if (request.method === "POST") {
      user.favoritePonies.push(request.body.id);
      await user.save();
      return response.status(200).json({ message: "User updated " });
    }

    if (request.method === "PATCH") {
      user.favoritePonies.pull(request.body.id);
      await user.save();
      return response.status(200).json({ message: "User updated " });
    }
  } else {
    return response.status(403).json({
      message:
        "You must be signed in to view the protected content on this page.",
    });
  }
}
