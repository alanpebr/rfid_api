import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import type { NewMemberRequest, ApiResponse, Member } from '@/types/member';
import { memberStore } from '@/lib/store';

export async function POST(request: Request) {
  try {
    const body: NewMemberRequest = await request.json();

    // Validate request body
    if (!body.name || !body.ship_id || !body.agency || !body.nominal || body.type !== 'top up') {
      return NextResponse.json(
        { error: 'Invalid request body' },
        { status: 400 }
      );
    }

    // Check if member with same ship_id already exists
    const existingMember = memberStore.getByShipId(body.ship_id);
    if (existingMember) {
      return NextResponse.json(
        { error: 'Member with this ship_id already exists' },
        { status: 400 }
      );
    }

    const id = uuidv4();
    const member: Member = {
      ...body,
      id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Store member data
    memberStore.set(id, member);

    const response: ApiResponse = {
      message: 'Member created',
      id,
    };

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error('Error creating member:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 