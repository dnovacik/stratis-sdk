/// <reference types="node" />

declare module 'bs58check' {
  function encode(payload: Buffer): string
  function decode(string: string): Buffer
  function decodeUnsafe(string: string): Buffer | undefined
}