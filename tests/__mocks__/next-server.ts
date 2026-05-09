class NextResponse extends Response {
  static json(body: unknown, init?: ResponseInit) {
    const json = JSON.stringify(body)
    const response = new Response(json, {
      ...init,
      headers: { "Content-Type": "application/json", ...init?.headers },
    })
    Object.defineProperty(response, "json", {
      value: async () => body,
    })
    return response as NextResponse
  }
}

class NextRequest extends Request {
  constructor(input: string | URL, init?: RequestInit) {
    super(input, init)
  }
  get url() {
    return super.url
  }
}

export { NextResponse, NextRequest }
