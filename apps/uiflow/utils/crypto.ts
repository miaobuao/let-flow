import { argon2id } from 'hash-wasm';

export function argon2idEncrypt(text: string) {
  return argon2id({
    parallelism: 6,
    memorySize: 20480,
    hashLength: 512,
    iterations: 16,
    password: text,
    salt: 'let-flow @miaobuao',
  });
}
