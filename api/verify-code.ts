import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { code } = await request.json();

  // 从环境变量获取查询码
  const CORRECT_CODE = process.env.CHSI_CODE;

  if (!CORRECT_CODE) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }

  if (code === CORRECT_CODE) {
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ success: false }, { status: 401 });
}
