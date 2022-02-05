import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { prisma } from "../../../../database/prismaClient";

interface IAuthenticateDeliveryman {
  username: string;
  password: string;
}

export class AuthenticateDeliverymanUseCase {
  async execute({ username, password }: IAuthenticateDeliveryman) {
    const deliveryman = await prisma.deliveryman.findFirst({
      where: {
        username: {
          equals: username,
          mode: "insensitive",
        },
      },
    });

    if (!deliveryman) {
      throw new Error("Incorrect username/password combination.");
    }

    const passwordChecksOut = await compare(password, deliveryman.password);

    if (!passwordChecksOut) {
      throw new Error("Incorrect username/password combination.");
    }

    const token = sign({ username }, `${process.env.JWT_SECRET}`, {
      subject: deliveryman.id,
      expiresIn: "1d",
    });

    return { id: deliveryman.id, username, token };
  }
}
