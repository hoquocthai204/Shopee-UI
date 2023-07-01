import { CoinInformation } from './coinInformation';

export interface WalletInformation {
  id?: number;
  balance: number;
  blockedBalance: number;
  coin: CoinInformation;
  userId: number;
}
