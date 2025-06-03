import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import type { UpdateSaldoRequest, ApiResponse, Member } from '@/types/member';
import { memberStore } from '@/lib/store';

export async function POST(request: Request) {
  try {
    const body: UpdateSaldoRequest = await request.json();

    // Validate request body
    if (!body.name || !body.ship_id || !body.agency || !body.nominal || !body.code || body.type !== 'update saldo') {
      return NextResponse.json(
        { error: 'Invalid request body' },
        { status: 400 }
      );
    }

    // Find existing member
    const existingMember = memberStore.getByShipId(body.ship_id);
    if (!existingMember) {
      return NextResponse.json(
        { error: 'Member not found' },
        { status: 404 }
      );
    }

    // Verify member details
    if (existingMember.name !== body.name || existingMember.agency !== body.agency) {
      return NextResponse.json(
        { error: 'Member details do not match' },
        { status: 400 }
      );
    }

    const id = uuidv4();
    const updatedMember: Member = {
      ...body,
      id,
      createdAt: existingMember.createdAt,
      updatedAt: new Date(),
    };

    // Store updated member data
    memberStore.set(id, updatedMember);

    const response: ApiResponse = {
      message: 'Saldo updated',
      id,
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error('Error updating saldo:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 