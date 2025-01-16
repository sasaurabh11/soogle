import { NextResponse } from "next/server";

export async function POST(req: any) {
  const { email, subject, message, cc, bcc } = await req.json();
  const WEB3FORMS_ACCESS_KEY = process.env.NEXT_PUBLIC_WEB_3_API_KEY!;

  if (!email || !message) {
    return NextResponse.json(
      { status: "error", message: "Missing required fields" },
      { status: 400 }
    );
  }

  try {
    const payload = {
      access_key: WEB3FORMS_ACCESS_KEY,
      email,
      subject: subject || "No Subject",
      message,
      cc: cc || "",
      bcc: bcc || "",
    };

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const responseData = await response.json();

    if (response.ok) {
      return NextResponse.json(
        { status: "success", message: "Email sent successfully!", data: responseData },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { status: "error", message: "Failed to send email", error: responseData },
        { status: response.status }
      );
    }
  } catch (error: any) {
    console.error("Error occurred:", error.message);
    return NextResponse.json(
      {
        status: "error",
        message: "An error occurred while sending the email",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
