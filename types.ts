export interface ServerWithMembersWithProfile {
  id: string;
  name: string;
  profileId: string;
  createdAt: string;
  updatedAt: string;
  imageUrl: string;
  inviteCode: string;
  channels: Channel[];
  members: Member[];
}

export interface Channel {
  id: string;
  name: string;
  type: string;
  profileId: string;
  serverId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Member {
  id: string;
  role: string;
  profileId: string;
  serverId: string;
  createdAt: string;
  updatedAt: string;
  profile: UserProfile;
}

interface UserProfile {
  id: string;
  name: string;
  email: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
}
