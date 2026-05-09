class PublicKey {
  constructor(key: string) {
    this.key = key
  }
  key: string
  toBase58() {
    return this.key
  }
  toString() {
    return this.key
  }
}

class Transaction {
  add() {}
  serialize() {
    return Buffer.from("mock")
  }
  recentBlockhash = ""
  feePayer: PublicKey | null = null
}

const SystemProgram = {
  transfer() {
    return { programId: new PublicKey("11111111111111111111111111111111") }
  },
}

class Connection {
  constructor(endpoint: string, commitment?: string) {}
  async getLatestBlockhash() {
    return { blockhash: "mock-blockhash", lastValidBlockHeight: 0 }
  }
}

export { PublicKey, Transaction, SystemProgram, Connection }
