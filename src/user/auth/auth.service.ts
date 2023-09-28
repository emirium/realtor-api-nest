import { ConflictException, HttpException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { UserRole } from "@prisma/client";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";

interface SignupParams {
  name: string;
  phone: string;
  email: string;
  password: string;
}

interface SigninParams {
  email: string;
  password: string;
}

@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService) {}

  async signup({ email, password, name, phone }: SignupParams) {
    const userExists = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });

    if (userExists) throw new ConflictException("User already exists");

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.prismaService.user.create({
      data: {
        name,
        email,
        phone,
        password: hashedPassword,
        role: UserRole.BUYER,
      },
    });
    
    return await this.generateJWT(name, user.id);
  }

  async signin({ email, password }: SigninParams) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) throw new HttpException("Invalid credentials", 400);

    const hashedPassword = user.password;
    const validPassword = await bcrypt.compare(password, hashedPassword);
    if (!validPassword) throw new HttpException("Invalid credentials", 400);

    return await this.generateJWT(user.name, user.id);
  }

  private async generateJWT(name: string, id: number) {
    return jwt.sign({ name, id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 * 2 });
  }
}
