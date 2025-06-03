import { Member } from '@/types/member';

// Create a singleton store for members
class MemberStore {
  private static instance: MemberStore;
  private members: Map<string, Member>;

  private constructor() {
    this.members = new Map();
  }

  public static getInstance(): MemberStore {
    if (!MemberStore.instance) {
      MemberStore.instance = new MemberStore();
    }
    return MemberStore.instance;
  }

  public set(id: string, member: Member): void {
    this.members.set(id, member);
  }

  public get(id: string): Member | undefined {
    return this.members.get(id);
  }

  public getByShipId(shipId: string): Member | undefined {
    return Array.from(this.members.values()).find(member => member.ship_id === shipId);
  }

  public getAllMembers(): Member[] {
    return Array.from(this.members.values());
  }
}

export const memberStore = MemberStore.getInstance(); 