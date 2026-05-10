import * as anchor from "@coral-xyz/anchor"
import { Program } from "@coral-xyz/anchor"
import { Peerchain } from "../target/types/peerchain"
import { expect } from "chai"

describe("peerchain", () => {
  const provider = anchor.AnchorProvider.env()
  anchor.setProvider(provider)

  const program = anchor.workspace.Peerchain as Program<Peerchain>

  it("initializes the treasury", async () => {
    const treasury = anchor.web3.Keypair.generate()
    const tx = await program.methods
      .initializeTreasury()
      .accounts({
        treasury: treasury.publicKey,
        authority: provider.wallet.publicKey,
      })
      .signers([treasury])
      .rpc()

    const treasuryAccount = await program.account.treasuryPool.fetch(
      treasury.publicKey
    )
    expect(treasuryAccount.authority.toString()).to.equal(
      provider.wallet.publicKey.toString()
    )
    expect(treasuryAccount.totalFunds.toNumber()).to.equal(0)
    expect(treasuryAccount.activeRequests.toNumber()).to.equal(0)
  })

  it("creates a user profile", async () => {
    const [userProfilePda] = anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from("user-profile"), provider.wallet.publicKey.toBuffer()],
      program.programId
    )

    await program.methods
      .createUser("Alice")
      .accounts({
        userProfile: userProfilePda,
        authority: provider.wallet.publicKey,
      })
      .rpc()

    const profile = await program.account.userProfile.fetch(userProfilePda)
    expect(profile.name).to.equal("Alice")
    expect(profile.reputation.toNumber()).to.equal(0)
    expect(profile.totalSessions.toNumber()).to.equal(0)
  })

  it("logs a mentorship session", async () => {
    const student = provider.wallet.publicKey
    const mentor = anchor.web3.Keypair.generate().publicKey

    const [userProfilePda] = anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from("user-profile"), student.toBuffer()],
      program.programId
    )

    const sessionId = "session-" + Date.now()
    const [sessionPda] = anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from("session"), Buffer.from(sessionId)],
      program.programId
    )

    await program.methods
      .logSession(sessionId, new anchor.BN(60), { oneOnOne: {} })
      .accounts({
        session: sessionPda,
        studentProfile: userProfilePda,
        mentorProfile: userProfilePda, // Same profile for testing
        student: student,
        mentor: mentor,
      })
      .rpc()

    const session = await program.account.mentorshipSession.fetch(sessionPda)
    expect(session.sessionId).to.equal(sessionId)
    expect(session.completed).to.equal(true)
  })

  it("updates reputation", async () => {
    const user = provider.wallet.publicKey

    const [reputationPda] = anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from("reputation"), user.toBuffer()],
      program.programId
    )

    await program.methods
      .updateReputation(new anchor.BN(30), 5)
      .accounts({
        reputation: reputationPda,
        user: user,
      })
      .rpc()

    const reputation = await program.account.reputationState.fetch(
      reputationPda
    )
    expect(reputation.sessionsCompleted.toNumber()).to.equal(1)
    expect(reputation.score.toNumber()).to.be.greaterThan(0)
  })

  it("requests funding with sufficient reputation", async () => {
    const requestId = "fund-" + Date.now()
    const requester = provider.wallet.publicKey

    const [fundingPda] = anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from("funding"), Buffer.from(requestId)],
      program.programId
    )

    const [treasuryPda] = anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from("treasury")],
      program.programId
    )

    await program.methods
      .requestFunding(requestId, new anchor.BN(1000000000), "Need study materials")
      .accounts({
        fundingRequest: fundingPda,
        treasury: treasuryPda,
        requester: requester,
      })
      .rpc()

    const funding = await program.account.fundingRequest.fetch(fundingPda)
    expect(funding.requestId).to.equal(requestId)
    expect(funding.amount.toNumber()).to.equal(1000000000)
    expect(funding.status).to.deep.equal({ pending: {} })
  })
})
