import { BigInt } from "@graphprotocol/graph-ts"
import {
  BentoBoxV1,
  LogDeploy,
  LogDeposit,
  LogFlashLoan,
  LogRegisterProtocol,
  LogSetMasterContractApproval,
  LogStrategyDivest,
  LogStrategyInvest,
  LogStrategyLoss,
  LogStrategyProfit,
  LogStrategyQueued,
  LogStrategySet,
  LogStrategyTargetPercentage,
  LogTransfer,
  LogWhiteListMasterContract,
  LogWithdraw,
  OwnershipTransferred
} from "../generated/BentoBoxV1/BentoBoxV1"
import { ExampleEntity } from "../generated/schema"

export function handleLogDeploy(event: LogDeploy): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = ExampleEntity.load(event.transaction.from.toHex())

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (!entity) {
    entity = new ExampleEntity(event.transaction.from.toHex())

    // Entity fields can be set using simple assignments
    entity.count = BigInt.fromI32(0)
  }

  // BigInt and BigDecimal math are supported
  entity.count = entity.count + BigInt.fromI32(1)

  // Entity fields can be set based on event parameters
  entity.masterContract = event.params.masterContract
  entity.data = event.params.data

  // Entities can be written to the store with `.save()`
  entity.save()

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // - contract.DOMAIN_SEPARATOR(...)
  // - contract.balanceOf(...)
  // - contract.masterContractApproved(...)
  // - contract.masterContractOf(...)
  // - contract.nonces(...)
  // - contract.owner(...)
  // - contract.pendingOwner(...)
  // - contract.pendingStrategy(...)
  // - contract.strategy(...)
  // - contract.strategyData(...)
  // - contract.toAmount(...)
  // - contract.toShare(...)
  // - contract.totals(...)
  // - contract.whitelistedMasterContracts(...)
  // - contract.withdraw(...)
}

export function handleLogDeposit(event: LogDeposit): void {}

export function handleLogFlashLoan(event: LogFlashLoan): void {}

export function handleLogRegisterProtocol(event: LogRegisterProtocol): void {}

export function handleLogSetMasterContractApproval(
  event: LogSetMasterContractApproval
): void {}

export function handleLogStrategyDivest(event: LogStrategyDivest): void {}

export function handleLogStrategyInvest(event: LogStrategyInvest): void {}

export function handleLogStrategyLoss(event: LogStrategyLoss): void {}

export function handleLogStrategyProfit(event: LogStrategyProfit): void {}

export function handleLogStrategyQueued(event: LogStrategyQueued): void {}

export function handleLogStrategySet(event: LogStrategySet): void {}

export function handleLogStrategyTargetPercentage(
  event: LogStrategyTargetPercentage
): void {}

export function handleLogTransfer(event: LogTransfer): void {}

export function handleLogWhiteListMasterContract(
  event: LogWhiteListMasterContract
): void {}

export function handleLogWithdraw(event: LogWithdraw): void {}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {}
