jest.mock("next/server", () => {
  const original = jest.requireActual("../__mocks__/next-server")
  return original
})

jest.mock("@solana/web3.js", () => {
  const original = jest.requireActual("../__mocks__/@solana/web3.js")
  return original
})

jest.mock("@coral-xyz/anchor", () => ({
  Program: class {},
  AnchorProvider: class {},
  web3: {},
}))

jest.mock("@solana/spl-token", () => ({
  getAssociatedTokenAddress: jest.fn(),
  createAssociatedTokenAccountInstruction: jest.fn(),
}))

import { POST, GET } from "@/api/sessions/route"
import { NextRequest } from "next/server"

describe("Sessions API", () => {
  describe("POST", () => {
    it("returns 400 when required fields are missing", async () => {
      const req = new NextRequest("http://localhost:3000/api/sessions", {
        method: "POST",
        body: JSON.stringify({}),
      })
      const res = await POST(req)
      expect(res.status).toBe(400)
      const body = await res.json()
      expect(body.success).toBe(false)
      expect(body.error).toContain("Missing required fields")
    })

    it("returns 400 when sessionId is missing", async () => {
      const req = new NextRequest("http://localhost:3000/api/sessions", {
        method: "POST",
        body: JSON.stringify({ student: "abc", mentor: "def" }),
      })
      const res = await POST(req)
      expect(res.status).toBe(400)
    })

    it("returns 200 with transaction data when all fields provided", async () => {
      const req = new NextRequest("http://localhost:3000/api/sessions", {
        method: "POST",
        body: JSON.stringify({
          sessionId: "11111111111111111111111111111111",
          student: "11111111111111111111111111111111",
          mentor: "11111111111111111111111111111111",
          duration: 60,
          sessionType: "OneOnOne",
        }),
      })
      const res = await POST(req)
      expect(res.status).toBe(200)
      const body = await res.json()
      expect(body.success).toBe(true)
      expect(body.data).toBeDefined()
      expect(body.data.transaction).toBeDefined()
      expect(body.data.message).toContain("Session logged")
    })
  })

  describe("GET", () => {
    it("returns sessions list with user query param", async () => {
      const req = new NextRequest("http://localhost:3000/api/sessions?user=testuser")
      const res = await GET(req)
      expect(res.status).toBe(200)
      const body = await res.json()
      expect(body.success).toBe(true)
      expect(Array.isArray(body.data)).toBe(true)
    })

    it("returns sessions list without user param", async () => {
      const req = new NextRequest("http://localhost:3000/api/sessions")
      const res = await GET(req)
      expect(res.status).toBe(200)
      const body = await res.json()
      expect(body.success).toBe(true)
    })
  })
})
