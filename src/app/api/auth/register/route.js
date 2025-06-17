// app/api/auth/register/route.js
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { z } from "zod";
import "@/lib/mongodb";
import User from "@/models/user.model";

const signupSchema = z.object({
  username: z.string().min(3),
  email: z.string().email(),
  role: z.enum(["student", "teacher", "researcher"]),
  password: z.string().min(6),
});

export async function POST(req) {
  try {
    const { username, email, role, password } = signupSchema.parse(
      await req.json()
    );

    if (await User.findOne({ email })) {
      return NextResponse.json(
        { error: "Email already in use" },
        { status: 400 }
      );
    }

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      name: username,
      email,
      role,
      password: hash,
    });

    return NextResponse.json(
      {
        message: "Registered successfully",
        user: { id: user._id, email, role },
      },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json(
      { error: err.message || "Invalid data" },
      { status: 400 }
    );
  }
}
