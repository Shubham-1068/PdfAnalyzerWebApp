import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 })
    }

    const hfFormData = new FormData()
    hfFormData.append("file", file)

    const response = await fetch("https://shubham1068-pdfanalyzer.hf.space/process-pdf", {
      method: "POST",
      body: hfFormData,
    })

    if (!response.ok) {
      throw new Error(`HF API error: ${response.status}`)
    }

    const result = await response.json()
    return NextResponse.json(result)
  } catch (error) {
    console.error("Error processing PDF:", error)
    return NextResponse.json({ error: "Failed to process PDF" }, { status: 500 })
  }
}
