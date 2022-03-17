import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository"
import { CreateUserUseCase } from "./CreateUserUseCase";

let repository: InMemoryUsersRepository;
let create: CreateUserUseCase;

describe("Create User Use Case", () => {
  beforeEach(() =>{
    repository = new InMemoryUsersRepository()
    create = new CreateUserUseCase(repository)
  })

  it("Should be able to create an user instance", async () => {
    let user = {
      name: "Abel Souza Costa Junior",
      email: "abelsouzacosta@gmail.com",
      password: "123456"
    }

    await create.execute(user);

    let userCreated = await repository.findByEmail(user.email);

    expect(userCreated).toHaveProperty("id");
  })
})
