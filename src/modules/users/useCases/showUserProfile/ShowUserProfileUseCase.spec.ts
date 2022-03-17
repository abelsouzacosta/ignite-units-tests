import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { ShowUserProfileUseCase } from "./ShowUserProfileUseCase";

let repository: InMemoryUsersRepository;
let create: CreateUserUseCase;
let show: ShowUserProfileUseCase;

describe("Show user profile use case", () => {
  beforeEach(() => {
    repository = new InMemoryUsersRepository();
    create = new CreateUserUseCase(repository);
    show = new ShowUserProfileUseCase(repository);
  });

  it("Should be able to list an user profile", async () => {
    let user = {
      name: "Abel Souza Costa Junior",
      email: "abelsouzacosta@gmail.com",
      password: "123456"
    }

    let { id } = await create.execute(user);

    let userProfile = await show.execute(id as string);

    expect(userProfile.name).toBe(user.name);
  })
});
