export interface Member {
  id: string;
  name: string;
  ship_id: string;
  agency: string;
  type: 'top up' | 'update saldo';
  nominal: string;
  code?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface NewMemberRequest {
  name: string;
  ship_id: string;
  agency: string;
  type: 'top up';
  nominal: string;
}

export interface UpdateSaldoRequest {
  name: string;
  ship_id: string;
  agency: string;
  type: 'update saldo';
  nominal: string;
  code: string;
}

export interface ApiResponse {
  message: string;
  id: string;
} 