import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";
import { IncorrectEmailOrPasswordError } from "./IncorrectEmailOrPasswordError";

let repository: InMemoryUsersRepository;
let authenticate: AuthenticateUserUseCase;
let create: CreateUserUseCase;

describe("Authenticate user use case", () => {
  beforeEach(() => {
    repository = new InMemoryUsersRepository();
    create = new CreateUserUseCase(repository);
    authenticate = new AuthenticateUserUseCase(repository)
  })

  it("Should be able to authenticate an user with valid credentials", async () => {
    let user = {
      name: "Abel Souza Costa Junior",
      email: "abelsouzacosta@gmail.com",
      password: "123456"
    };

    await create.execute(user);

    let result = await authenticate.execute({
      email: user.email,
      password: user.password,
    })

    expect(result).toHaveProperty("token")
  })

  it("Should not be able to authenticate a user if an invlid email is provided", () => {
    expect(async () => {
      let user = {
        name: "Abel Souza Costa Junior",
        email: "abelsouzacosta@gmail.com",
        password: "123456"
      };

      await create.execute(user);

      await authenticate.execute({
        email: "another@mail.com",
        password: user.password,
      })
    }).rejects.toBeInstanceOf(IncorrectEmailOrPasswordError)
  })
});
