import jwt from "jsonwebtoken";
import  {User, hashPassword , UserRole} from "../../src/entities/user";
import env from "../../src/env";

export default async function () {
  const admin = await User.create({
    role: UserRole.ADMIN,
    avatar: "",
    email: "admin@app.com",
    hashedPassword: await hashPassword("adminadmin"),
    nickname: "admin",
  }).save();
  const JWT = await jwt.sign({ userId: admin.id }, env.JWT_PRIVATE_KEY);
  return { admin, JWT };
}