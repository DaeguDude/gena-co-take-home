// app/api/users/route.ts

import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

// 인메모리 Mock 데이터 (타입 정의)
export interface User {
  id: number;
  name: string;
}

let users: User[] = [
  { id: 1, name: "김철수" },
  { id: 2, name: "이영희" },
];
console.log("users: ", users);
let nextUserId = 3; // 단순한 ID 생성을 위한 카운터

// GET 요청 처리 (예: /api/users 또는 /api/users?id=1)
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const idParam = searchParams.get("id");

  if (idParam) {
    const id = parseInt(idParam, 10);
    const user = users.find((u) => u.id === id);
    if (user) {
      return NextResponse.json(user);
    }
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  return NextResponse.json(users);
}

// POST 요청 처리 (예: /api/users)
export async function POST(request: NextRequest) {
  const body: { name: string } = await request.json();

  if (!body.name) {
    return NextResponse.json({ message: "Name is required" }, { status: 400 });
  }

  const newUser: User = { id: nextUserId++, name: body.name };
  users.push(newUser);

  console.log("새 사용자 생성:", newUser);
  return NextResponse.json(newUser, { status: 201 });
}

// --- DELETE 요청 처리 (새로 추가되는 부분) ---
// DELETE 요청 (예: DELETE /api/users?id=1)
export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const idParam = searchParams.get("id"); // 쿼리 파라미터 'id'에서 사용자 ID 가져오기

  if (!idParam) {
    return NextResponse.json(
      { message: "User ID is required" },
      { status: 400 }
    );
  }

  const idToDelete = parseInt(idParam, 10); // 숫자로 변환

  const initialLength = users.length; // 삭제 전 배열 길이 저장
  users = users.filter((user) => user.id !== idToDelete); // 해당 ID의 사용자 필터링

  if (users.length < initialLength) {
    revalidateTag("users");
    // 길이가 줄어들었다면 성공적으로 삭제된 것
    return NextResponse.json({
      message: `User with ID ${idToDelete} deleted successfully`,
    });
  } else {
    // 길이가 줄어들지 않았다면 해당 ID의 사용자가 없었던 것
    return NextResponse.json(
      { message: `User with ID ${idToDelete} not found` },
      { status: 404 }
    );
  }
}

// PUT 요청 처리 (선택 사항 - 일반적으로 [id] 라우트에서 처리하지만, 여기에 추가할 수도 있음)
/*
export async function PUT(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const idParam = searchParams.get('id');

  if (!idParam) {
    return NextResponse.json({ message: 'User ID is required for PUT' }, { status: 400 });
  }

  const idToUpdate = parseInt(idParam, 10);
  const body: Partial<User> = await request.json();

  const index = users.findIndex(user => user.id === idToUpdate);

  if (index !== -1) {
    users[index] = { ...users[index], ...body, id: idToUpdate };
    return NextResponse.json(users[index]);
  }
  return NextResponse.json({ message: `User with ID ${idToUpdate} not found` }, { status: 404 });
}
*/
