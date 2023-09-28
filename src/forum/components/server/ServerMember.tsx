import { BsShieldFillCheck, BsShieldFillExclamation } from 'react-icons/bs';
import {
  Member,
  MemberRole,
  UserProfile as Profile,
  ServerWithMembersWithProfile as Server,
} from '../../../../types';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Stack, Typography } from '@mui/material';
import UserAvatar from '../avatars/UserAvatar';

interface ServerMembersProps {
  member: Member & { profile: Profile };
  server: Server;
}

const roleIconMap = {
  [MemberRole.GUEST]: null,
  [MemberRole.MODERATOR]: <BsShieldFillCheck />,
  [MemberRole.ADMIN]: <BsShieldFillExclamation style={{ color: '#f43f5e' }} />,
};

export default function ServerMember({ member }: ServerMembersProps) {
  const params = useParams();
  const navigate = useNavigate();

  const icon =
    roleIconMap[
      MemberRole[member.role as unknown as number] as unknown as MemberRole
    ];

  const onClick = () => {
    navigate(`/membros/forum/servers/${params.id}/conversations/${member?.id}`);
  };

  return (
    <Button
      onClick={onClick}
      sx={{
        textTransform: 'unset',
        justifyContent: 'start',
        gap: 1,
        color: (theme) => theme.palette.text.secondary,
        borderRadius: '10px',
        '&:hover': {
          background: params.memberId
            ? params.memberId === member.id
              ? (theme) =>
                  theme.palette.mode === 'dark' ? '#ffffff3e' : '#22222222'
              : ''
            : '',
        },
        background: params.memberId
          ? params.memberId === member.id
            ? (theme) =>
                theme.palette.mode === 'dark' ? '#ffffff29' : '#22222218'
            : ''
          : '',
        '& svg': {
          fontSize: '1.2rem',
        },
      }}
    >
      <UserAvatar
        src={member?.profile?.imageUrl}
        name={member.profile.name}
        className={{ width: 24, height: 24, fontSize: '.8rem' }}
      />
      <Typography
        color={(theme) => theme.palette.text.secondary}
        fontSize={'.95rem'}
      >
        {member.profile.name}
      </Typography>
      <Stack
        sx={{
          ml: 'auto',
          color: (theme) =>
            theme.palette.mode === 'dark' ? 'rgb(129 140 248)' : '#4f46e5',
        }}
      >
        {icon}
      </Stack>
    </Button>
  );
}
