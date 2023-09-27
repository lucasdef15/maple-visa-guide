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
import { useContext } from 'react';
import { DarkModeContext } from '../../../contexts/DarkModeContext';

interface ServerMembersProps {
  member: Member & { profile: Profile };
  server: Server;
}

const roleIconMap = {
  [MemberRole.GUEST]: null,
  [MemberRole.MODERATOR]: <BsShieldFillCheck />,
  [MemberRole.ADMIN]: <BsShieldFillExclamation style={{ color: '#f43f5e' }} />,
};

export default function ServerMember({ member, server }: ServerMembersProps) {
  const params = useParams();
  const navigate = useNavigate();

  const { darkMode } = useContext(DarkModeContext);

  const icon =
    roleIconMap[
      MemberRole[member.role as unknown as number] as unknown as MemberRole
    ];

  return (
    <Button
      sx={{
        textTransform: 'unset',
        justifyContent: 'start',
        gap: 1,
        color: (theme) => theme.palette.text.secondary,
        borderRadius: '10px',
        '&:hover': {
          background: darkMode
            ? 'hsla(0, 0%, 100%, 0.027)'
            : 'hsla(0, 0%, 13%, 0.05)',
        },
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
