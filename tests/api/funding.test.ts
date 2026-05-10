jest.mock("next/server", () => {
  const original = jest.requireActual("../__mocks__/next-server")
  return original
})

jest.mock("@solana/web3.js", () => {
  const original = jest.requireActual("../__mocks__/@solana/web3.js")
  return original
})

import { POST, GET } from "@/api/funding/route"
import { NextRequest } from "next/server"

describe("Funding API", () => {
  describe("POST", () => {
    it("returns 400 when required fields are missing", async () => {
      const req = new NextRequest("http://localhost:3000/api/funding", {
        method: "POST",
        body: JSON.stringify({}),
      })
      const res = await POST(req)
      expect(res.status).toBe(400)
      const body = await res.json()
      expect(body.success).toBe(false)
      expect(body.error).toContain("Missing required fields")
    })

    it("returns 400 when requestId is missing", async () => {
      const req = new NextRequest("http://localhost:3000/api/funding", {
        method: "POST",
        body: JSON.stringify({ amount: 1000, reason: "Test" }),
      })
      const res = await POST(req)
      expect(res.status).toBe(400)
    })

    it("returns 200 with funding data when all fields provided", async () => {
      const req = new NextRequest("http://localhost:3000/api/funding", {
        method: "POST",
        body: JSON.stringify({
          requestId: "req-123",
          amount: 1000000000,
          reason: "Need course materials",
          reputationScore: 25,
        }),
      })
      const res = await POST(req)
      expect(res.status).toBe(200)
      const body = await res.json()
      expect(body.success).toBe(true)
      expect(body.data.requestId).toBe("req-123")
      expect(body.data.status).toBe("Pending")
    })
  })

  describe("GET", () => {
    it("returns funding requests list", async () => {
      const req = new NextRequest("http://localhost:3000/api/funding?user=testuser")
      const res = await GET(req)
      expect(res.status).toBe(200)
      const body = await res.json()
      expect(body.success).toBe(true)
      expect(Array.isArray(body.data)).toBe(true)
    })

    it("returns empty string requester when no user param", async () => {
      const req = new NextRequest("http://localhost:3000/api/funding")
      const res = await GET(req)
      expect(res.status).toBe(200)
      const body = await res.json()
      expect(body.data[0].requester).toBe("")
    })
  })
})
