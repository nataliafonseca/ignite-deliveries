import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { prisma } from "../../../../database/prismaClient";

interface IAuthenticateClient {
  username: string;
  password: string;
}

export class AuthenticateClientUseCase {
  async execute({ username, password }: IAuthenticateClient) {
    const client = await prisma.client.findFirst({
      where: {
        username: {
          equals: username,
          mode: "insensitive",
        },
      },
    });

    if (!client) {
      throw new Error("Incorrect username/password combination.");
    }

    const passwordChecksOut = await compare(password, client.password);

    if (!passwordChecksOut) {
      throw new Error("Incorrect username/password combination.");
    }

    const token = sign({ username }, `${process.env.JWT_SECRET}`, {
      subject: client.id,
      expiresIn: "1d",
    });

    return { id: client.id, username, token };
  }
}
