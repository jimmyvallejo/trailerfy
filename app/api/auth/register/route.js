import { connectToDB } from "@utils/database";
import User from "@app/models/user";
import bcrypt from "bcryptjs";

const saltRounds = 10;

export const POST = async (req) => {
  const salt = bcrypt.genSaltSync(saltRounds);

  const { name, email, password } = await req.json();

  try {
    await connectToDB();

    const hashedPass = await bcrypt.hashSync(password, salt);

    const data = {
      username: name,
      email: email,
      password: hashedPass,
    };

    const newUser = await User.create(data);

    return new Response(JSON.stringify(newUser), { status: 201 });
  } catch (error) {
     console.log(error) 
    return new Response(JSON.stringify(error), { status: 500 });
  }
};
