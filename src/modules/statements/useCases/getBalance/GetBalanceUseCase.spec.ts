import { InMemoryUsersRepository } from "../../../users/repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "../../../users/useCases/createUser/CreateUserUseCase";
import { ICreateUserDTO } from "../../../users/useCases/createUser/ICreateUserDTO";
import { OperationType } from "../../entities/Statement";
import { InMemoryStatementsRepository } from "../../repositories/in-memory/InMemoryStatementsRepository";
import { CreateStatementUseCase } from "../createStatement/CreateStatementUseCase";
import { GetBalanceError } from "./GetBalanceError";
import { GetBalanceUseCase } from "./GetBalanceUseCase";

let repository: InMemoryStatementsRepository;
let userRepository: InMemoryUsersRepository;
let createUser: CreateUserUseCase;
let createStatementUseCase: CreateStatementUseCase;
let getBalanceUseCase: GetBalanceUseCase;

describe("Get Balance", () => {
  beforeEach(() => {
    repository = new InMemoryStatementsRepository()
    userRepository = new InMemoryUsersRepository()
    createStatementUseCase = new CreateStatementUseCase(userRepository, repository)
    getBalanceUseCase = new GetBalanceUseCase(repository, userRepository)
    createUser = new CreateUserUseCase(userRepository)
  })

  it("should be able to get balance", async () => {
    const user: ICreateUserDTO = {
      email: "user@teste.com",
      password: "1234",
      name: "User Test",
    };

    const userCreated = await createUser.execute(user);

    expect(userCreated).toHaveProperty("id");
    const user_id = userCreated.id as string

    await createStatementUseCase.execute({
      user_id,
      type: "deposit" as OperationType,
      amount: 100,
      description: "Dinheiro",
    })

    const balance = await getBalanceUseCase.execute({user_id})

    expect(balance.statement[0]).toHaveProperty("id")
    expect(balance.statement.length).toBe(1)
    expect(balance.balance).toEqual(100)
  })

  it("should not be able to get balance from non-existing user", async () => {
    expect(async () => {
      const user_id = "user_non_existent"
      await getBalanceUseCase.execute({user_id})
    }).rejects.toBeInstanceOf(GetBalanceError)
  })
})
