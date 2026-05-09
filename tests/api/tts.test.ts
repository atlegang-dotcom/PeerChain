const mockNextServer = jest.requireActual("../__mocks__/next-server")
jest.mock("next/server", () => mockNextServer)

import { GET, POST } from "@/api/tts/route"
import { NextRequest } from "next/server"

describe("TTS API", () => {
  describe("GET", () => {
    it("returns 400 when text param is missing", async () => {
      const req = new NextRequest("http://localhost:3000/api/tts")
      const res = await GET(req)
      expect(res.status).toBe(400)
      const body = await res.json()
      expect(body.success).toBe(false)
      expect(body.error).toContain("Text parameter is required")
    })

    it("returns preview data when text provided", async () => {
      const req = new NextRequest("http://localhost:3000/api/tts?text=Hello+world")
      const res = await GET(req)
      expect(res.status).toBe(200)
      const body = await res.json()
      expect(body.success).toBe(true)
      expect(body.preview).toBeDefined()
      expect(body.preview.text).toBe("Hello world")
      expect(body.preview.estimatedDuration).toBeDefined()
    })

    it("accepts optional voiceId parameter", async () => {
      const req = new NextRequest(
        "http://localhost:3000/api/tts?text=Hello&voiceId=customVoice"
      )
      const res = await GET(req)
      expect(res.status).toBe(200)
      const body = await res.json()
      expect(body.preview.voiceId).toBe("customVoice")
    })
  })

  describe("POST", () => {
    it("returns 500 when API key is not configured", async () => {
      const req = new NextRequest("http://localhost:3000/api/tts", {
        method: "POST",
        body: JSON.stringify({ text: "Hello world" }),
      })
      const res = await POST(req)
      expect(res.status).toBe(500)
      const body = await res.json()
      expect(body.success).toBe(false)
      expect(body.error).toContain("ElevenLabs API key not configured")
    })
  })
})

// Dynamically import POST with a fake API key to test validation
describe("TTS API - with API key", () => {
  let POST: typeof import("@/api/tts/route").POST

  beforeAll(async () => {
    process.env.ELEVENLABS_API_KEY = "test-key"
    jest.resetModules()
    const route = await import("@/api/tts/route")
    POST = route.POST
  })

  afterAll(async () => {
    process.env.ELEVENLABS_API_KEY = ""
    jest.resetModules()
  })

  it("returns 400 when text is missing", async () => {
    const NextRequest = mockNextServer.NextRequest
    const req = new NextRequest("http://localhost:3000/api/tts", {
      method: "POST",
      body: JSON.stringify({}),
    })
    const res = await POST(req)
    expect(res.status).toBe(400)
    const body = await res.json()
    expect(body.success).toBe(false)
    expect(body.error).toContain("Text is required")
  })
})
