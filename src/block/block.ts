import { IBlock } from "../models/block";

export const deserialize = (hexString: string, headerOnly: boolean = false): IBlock => {
  return {
    id: '1',
    idHex: '2',
    height: 3,
    timestamp: 4,
    version: 1
  }
}