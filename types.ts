export interface ServerWithMembersWithProfile {
  id: string;
  name: string;
  profileId: string;
  createdAt: string;
  updatedAt: string;
  imageUrl: string;
  inviteCode: string;
  channels?: Channel[];
  members?: Member[];
}

export enum ChannelType {
  TEXT,
  AUDIO,
  VIDEO,
}
export enum MemberRole {
  ADMIN,
  MODERATOR,
  GUEST,
}

export interface Channel {
  id: string;
  name: string;
  type: ChannelType;
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

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export interface Message {
  id: string;
  content: string;
  imageB64: string | null;
  fileName: string | null;
  fileData: Buffer | null;
  fileType: string | null;
  memberId: string;
  channelId: string;
  deleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}