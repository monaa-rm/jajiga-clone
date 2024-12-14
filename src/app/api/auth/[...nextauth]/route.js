
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "../../../../../models/User";
import { verifyPassword } from "../../../../../utils/auth";
import connectDB from "../../../../../utils/connectDb";

export const authOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials, req) {
        const { phone, password, name } = credentials;
        try {
          await connectDB();
        } catch (error) {
          throw new Error("مشکلی در سرور رخ داده است");
        }
        if (!phone || !password) {
          throw new Error("لطفا اطلاعات معتبر وارد کنید");
        }
        const user = await User.findOne({ phone });
        if (!user) throw new Error("لطفا ثبت نام کنید");
        const isValid = await verifyPassword(password, user.password);
        if (!isValid) throw new Error("اطلاعات معتبر نیست");
        return { name, phone };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, trigger, session, user }) {
      if (trigger === "update") {
        // Note, that `session` can be any arbitrary object, remember to validate it!
        if (session?.name) token.name = session.name;
        if (session?.phone) token.phone = session.phone;
        if (session?.image) token.image = session.image;

        return token;
      }
      if (user) {
        token.phone = user.phone;
        token.name = user.name;
           token.image = user.image;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.phone = token.phone;
      session.user.name = token.name;
        session.user.image = token.image;

      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
