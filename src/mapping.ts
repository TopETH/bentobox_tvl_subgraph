import { 
  ethereum,
  BigInt,
  Address
} from "@graphprotocol/graph-ts"
import {
  LogDeposit,
  LogWithdraw,
  LogStrategyProfit,
  LogStrategyLoss,
  LogStrategyDivest,
  LogStrategyInvest
} from "../generated/BentoBoxV1/BentoBoxV1"
import { ERC20 } from "../generated/ERC20/ERC20"
import { BalanceEntity } from "../generated/schema"

function calcAmount(token: Address, amount: BigInt, isDeposit: bool): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = BalanceEntity.load(token.toHex())

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (!entity) {
    entity = new BalanceEntity(token.toHex())

    // Entity fields can be set using simple assignments
    entity.deposit_sum = BigInt.fromI32(0)
    entity.withdraw_sum = BigInt.fromI32(0)

    let contract = ERC20.bind(token)
    entity.decimals = BigInt.fromI32(contract.decimals())
  }

  // BigInt and BigDecimal math are supported
  if(isDeposit)
    entity.deposit_sum = entity.deposit_sum.plus(amount)
  else
    entity.withdraw_sum = entity.withdraw_sum.plus(amount)

  entity.tvl = entity.deposit_sum.minus(entity.withdraw_sum)

  // Entities can be written to the store with `.save()`
  entity.save()
}

export function handleDeposit(event: LogDeposit): void {
  calcAmount(event.params.token, event.params.amount, true);
}

export function handleWithdraw(event: LogWithdraw): void {
  calcAmount(event.params.token, event.params.amount, false);
}

export function handleHarvestEarn(event: LogStrategyProfit): void {
  calcAmount(event.params.token, event.params.amount, true);
}

export function handleHarvestLost(event: LogStrategyLoss): void {
  calcAmount(event.params.token, event.params.amount, false);
}

export function handleDivest(event: LogStrategyDivest): void {
  calcAmount(event.params.token, event.params.amount, true);
}

export function handleInvest(event: LogStrategyInvest): void {
  calcAmount(event.params.token, event.params.amount, false);
}

export function handleBlock(block: ethereum.Block): void { }