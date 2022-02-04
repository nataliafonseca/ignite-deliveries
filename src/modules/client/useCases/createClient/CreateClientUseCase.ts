import { prisma } from "../../../../database/prismaClient";
import { hash } from "bcrypt";

interface ICreateClient {
  username: string;
  password: string;
}

export class CreateClientUseCase {
  async execute({ username, password }: ICreateClient) {
    const usernameUnavailable = await prisma.client.findFirst({
      where: {
        username: {
          mode: "insensitive",
        },
      },
    });

    if (usernameUnavailable) {
      throw new Error("This username is unavailable.");
    }

    const hashedPassword = await hash(password, 10);

    const client = await prisma.client.create({
      data: { username, password: hashedPassword },
    });

    return client;
  }
}
