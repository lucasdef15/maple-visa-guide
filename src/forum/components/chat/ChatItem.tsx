import {
  Box,
  Button,
  FormControl,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import { Member, UserProfile as Profile } from '../../../../types';
import UserAvatar from '../avatars/UserAvatar';
import ActionTooltip from '../actionTooltip/ActionTooltip';
import { BsShieldFillCheck, BsShieldFillExclamation } from 'react-icons/bs';
import { FaFilePdf } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BiEdit, BiTrash } from 'react-icons/bi';
import * as z from 'zod';
import axios from 'axios';
import qs from 'query-string';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import { useModal } from '../../hooks/use-modal-store';
import { useNavigate, useParams } from 'react-router-dom';

interface ChatItemprops {
  id: string;
  content: string;
  member: Member & {
    profile: Profile;
  };
  timestamp: string;
  imageB64: string;
  userImage: string;
  deleted: boolean;
  currentMember: Member;
  isUpdated: boolean;
  socketUrl: string;
  socketQuery: Record<string, string>;
  fileData: {
    type: string;
    data: any;
  };
  fileType: string;
}

interface RoleIconMapProps {
  [key: string]: null | string | JSX.Element;
}

const roleIconMap: RoleIconMapProps = {
  GUEST: null,
  MODERATOR: <BsShieldFillCheck style={{ color: '#4f46e5' }} />,
  ADMIN: <BsShieldFillExclamation style={{ color: '#f43f5e' }} />,
};

const formSchema = z.object({
  content: z.string().min(1),
});

export default function ChatItem({
  id,
  content,
  member,
  timestamp,
  imageB64,
  userImage,
  deleted,
  currentMember,
  isUpdated,
  socketQuery,
  socketUrl,
  fileData,
  fileType,
}: ChatItemprops) {
  const [isEditing, setIsEditing] = useState(false);
  const [isMassageHovered, setIsMassageHovered] = useState(false);
  const { onOpen } = useModal();

  const params = useParams();
  const navigate = useNavigate();

  const onMemberClick = () => {
    if (member.id === currentMember.id) return;

    navigate(
      `/membros/forum/servers/${params?.id}/conversations/${member?.id}`
    );
  };

  const isAdmin = currentMember?.role === 'ADMIN';
  const isModerator = currentMember?.role === 'MODERATOR';
  const isOwner = currentMember?.id === member?.id;
  const canDeleteMessage = !deleted && (isAdmin || isModerator || isOwner);
  const canEditMessage = !deleted && isOwner && !fileData;
  const isPDF = fileType === 'pdf';
  const isImage = !isPDF && imageB64;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: content,
    },
  });

  useEffect(() => {
    form.reset({
      content: content,
    });
  }, [content, form]);

  useEffect(() => {
    const handleKeyDown = (event: any) => {
      if (event.key === 'Escape' || event.keyCode === 27) {
        setIsEditing(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const base64ImageData = `data:image/jpeg;base64,${imageB64}`;

  const handleImageClick = () => {
    const newTab = window.open();
    newTab?.document.write(
      '<img src="' + base64ImageData + '" width="900" height="600">'
    );
    newTab?.document.close();
  };

  const handlePDFClick = () => {
    // Create a Blob object from the binary data
    const pdfBlob = new Blob([new Uint8Array(fileData?.data)], {
      type: 'application/pdf',
    });
    // Create a URL for the Blob object
    const pdfUrl = URL.createObjectURL(pdfBlob);
    // Open a new tab with the PDF using an <object> tag
    const newTab = window.open();
    newTab?.document.write(
      `<object data="${pdfUrl}" type="application/pdf" width="100%" height="100%"/>`
    );
    newTab?.document.close();
  };

  const isLoading = form.formState.isSubmitting;

  const onsubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const url = qs.stringifyUrl({
        url: `${socketUrl}/${id}`,
        query: socketQuery,
      });

      await axios.patch(url, values);

      form.reset();
      setIsEditing(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Stack
      sx={{
        position: 'relative',
        '&:hover': { background: 'rgba(34, 34, 34, 0.048)' },
      }}
      onMouseEnter={() => setIsMassageHovered(true)}
      onMouseLeave={() => setIsMassageHovered(false)}
    >
      <Stack direction={'row'} alignItems={'start'} sx={{ my: 2, pl: '20px' }}>
        <Stack onClick={onMemberClick} sx={{ cursor: 'pointer' }}>
          <UserAvatar src={userImage} name={member?.profile?.name} />
        </Stack>
        <Stack
          alignItems={'start'}
          direction={'column'}
          sx={{ ml: 1, width: '100%' }}
        >
          <Stack direction={'row'} spacing={1}>
            <Stack
              onClick={onMemberClick}
              direction={'row'}
              alignItems={'center'}
              spacing={1}
            >
              <Typography
                fontWeight={600}
                fontSize={16}
                sx={{
                  '&:hover': { textDecoration: 'underline', cursor: 'pointer' },
                }}
              >
                {member.profile.name}
              </Typography>
              <ActionTooltip title={member?.role} placement='bottom'>
                <div>{roleIconMap[member?.role]}</div>
              </ActionTooltip>
            </Stack>
            <Typography
              fontWeight={400}
              fontSize={13}
              color={(theme) => theme.palette.text.secondary}
            >
              {timestamp}
            </Typography>
          </Stack>
          {isImage && (
            <Box
              component={'a'}
              onClick={handleImageClick}
              sx={{
                cursor: 'pointer',
                position: 'relative',
                aspectRatio: '1 / 1',
                borderRadius: '10px',
                overflow: 'hidden',
                border: '1px solid grey',
                background: '#222',
                width: 250,
                height: 250,
                marginTop: 1,
              }}
            >
              <img
                src={base64ImageData}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </Box>
          )}
          {isPDF && (
            <>
              <Stack
                direction={'row'}
                alignItems={'center'}
                sx={{
                  width: '96%',
                  background: 'rgba(18, 18, 18, 0.075)',
                  borderRadius: '10px',
                  fontSize: '2rem',
                  mt: 1,
                  p: 1,
                  color: 'rgb(129 140 248)',
                }}
                spacing={1}
              >
                <FaFilePdf />
                <Box
                  component={'a'}
                  onClick={handlePDFClick}
                  sx={{
                    color: (theme) =>
                      theme.palette.mode === 'dark'
                        ? 'rgb(99 102 241)'
                        : 'rgb(129 140 248)',
                    fontSize: '1rem',
                    fontWeight: 600,
                    '&:hover': {
                      cursor: 'pointer',
                      textDecoration: 'underline',
                    },
                  }}
                >
                  PDF File
                </Box>
              </Stack>
            </>
          )}
          {!fileData && !isEditing && !isImage && (
            <Typography
              sx={{
                fontSize: deleted ? '.85rem' : '1rem',
                color: deleted ? (theme) => theme.palette.text.secondary : '',
                fontStyle: deleted ? 'italic' : '',
              }}
            >
              {content}
              {isUpdated && !deleted && (
                <Typography
                  component={'span'}
                  color={(theme) => theme.palette.text.secondary}
                  sx={{ fontSize: '.8rem', mx: 1 }}
                >
                  (edited)
                </Typography>
              )}
            </Typography>
          )}
          {!fileData && isEditing && (
            <FormControl {...form} sx={{ width: '100%' }}>
              <Paper
                onSubmit={form.handleSubmit(onsubmit)}
                elevation={0}
                component='form'
                sx={{
                  p: '2px 4px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '.5rem',
                  width: '90%',
                  borderRadius: '5px',
                  background: (theme) =>
                    theme.palette.mode === 'dark'
                      ? 'rgba(63, 63, 70, .75)'
                      : 'rgba(228, 228, 231, .9)',
                }}
              >
                <Controller
                  name='content'
                  control={form.control}
                  render={({ field }) => (
                    <>
                      <InputBase
                        sx={{
                          ml: 1,
                          flex: 1,
                        }}
                        autoFocus
                        margin='dense'
                        disabled={isLoading}
                        placeholder='Edited message'
                        id='content'
                        type='text'
                        {...field}
                      />
                    </>
                  )}
                />
                <Button
                  type='submit'
                  size='small'
                  variant='contained'
                  disabled={isLoading}
                  sx={{
                    borderRadius: '5px',
                    textTransform: 'unset',
                    background: (theme) =>
                      theme.palette.mode === 'dark' ? '#121212' : '#333',
                  }}
                >
                  Save
                </Button>
              </Paper>
              <Typography
                fontSize={12}
                sx={{ mt: 0.5, color: 'rgb(161 161 170)' }}
              >
                Press scape to cancel, enter to save
              </Typography>
            </FormControl>
          )}
        </Stack>
      </Stack>
      {canDeleteMessage && (
        <motion.div
          animate={isMassageHovered ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.2 }}
          style={{ marginLeft: 'auto' }}
        >
          <Stack
            direction={'row'}
            sx={{
              display: isMassageHovered ? 'flex' : 'none',
              position: 'absolute',
              p: 1,
              right: 25,
              top: -25,
            }}
          >
            {canEditMessage && (
              <ActionTooltip title={'Edit'} placement={'top'}>
                <IconButton
                  onClick={() => setIsEditing(true)}
                  component={'span'}
                  sx={{ width: '35px', height: '35px' }}
                >
                  <BiEdit />
                </IconButton>
              </ActionTooltip>
            )}
            <ActionTooltip title={'Delete'} placement={'top'}>
              <IconButton
                component={'span'}
                onClick={() =>
                  onOpen('deleteMessage', {
                    apiUrl: `${socketUrl}/${id}`,
                    query: socketQuery,
                  })
                }
                sx={{ width: '35px', height: '35px' }}
              >
                <BiTrash />
              </IconButton>
            </ActionTooltip>
          </Stack>
        </motion.div>
      )}
    </Stack>
  );
}
