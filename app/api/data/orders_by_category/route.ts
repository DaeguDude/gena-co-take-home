import { NextResponse } from "next/server";

export async function GET() {
  const data = {
    labels: [
      "Electronics",
      "Clothing",
      "Home & Kitchen",
      "Books",
      "Sports",
      "Beauty",
      "Toys",
    ],
    values: [540, 420, 310, 160, 280, 230, 195],
  };

  return NextResponse.json(data);
}
