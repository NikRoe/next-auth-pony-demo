import mongoose from "mongoose";
import "./Pony";

const { Schema } = mongoose;

const userSchema = new Schema({
  name: { type: String },
  image: { type: String },
  email: { type: String },
  favoritePonies: [{ type: Schema.Types.ObjectId, ref: "Pony" }],
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
