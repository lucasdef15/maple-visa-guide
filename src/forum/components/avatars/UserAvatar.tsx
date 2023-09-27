import { Avatar } from '@mui/material';
import React from 'react';

interface UserAvatarProps {
  src?: string;
  name?: string;
  className?: object | null;
}

export default function UserAvatar({ src, className, name }: UserAvatarProps) {
  const base64ImageData = `data:image/jpeg;base64,${src}`;

  return (
    <Avatar alt={name} src={src ? base64ImageData : ''} sx={className}>
      {src ? '' : name?.slice(0, 1)}
    </Avatar>
  );
}
