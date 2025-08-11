import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { question } = await request.json()

    if (!question) {
      return NextResponse.json({ error: "No question provided" }, { status: 400 })
    }

    const response = await fetch("https://shubham1068-pdfanalyzer.hf.space/ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question }),
    })

    if (!response.ok) {
      throw new Error(`HF API error: ${response.status}`)
    }

    const result = await response.json()
    return NextResponse.json(result)
  } catch (error) {
    console.error("Error answering question:", error)
    return NextResponse.json({ error: "Failed to process question" }, { status: 500 })
  }
}
