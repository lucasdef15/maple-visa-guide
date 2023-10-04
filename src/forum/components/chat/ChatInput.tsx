import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { FormControl, IconButton, Paper } from '@mui/material';
import { CgMathPlus } from 'react-icons/cg';
import InputBase from '@mui/material/InputBase';
import axios from 'axios';
import qs from 'query-string';
import { useModal } from '../../hooks/use-modal-store';
import EmojiPicker from '../emojiPicker/EmojiPicker';

interface ChatInputProps {
  apiUrl: string;
  query: Record<string, any>;
  name: string;
  type: 'conversation' | 'channel';
}

const formSchema = z.object({
  content: z.string().min(1),
});

type FormValues = z.infer<typeof formSchema>;

export default function ChatInput({
  apiUrl,
  query,
  name,
  type,
}: ChatInputProps) {
  const { onOpen } = useModal();
  const { control, handleSubmit, formState, reset } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: '',
    },
  });

  const isLoading = formState.isSubmitting;

  const onSubmit = async (values: FormValues) => {
    try {
      const url = qs.stringifyUrl({
        url: apiUrl,
      });
      reset();
      await axios.post(url, {
        ...values,
        serverId: query.serverId,
        channelId: query.channelId,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <FormControl>
      <Paper
        component='form'
        elevation={0}
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          p: '10px 15px',
          display: 'flex',
          alignItems: 'center',
          borderRadius: '5px',
          margin: '25px 20px',
          color: (theme) =>
            theme.palette.mode === 'dark'
              ? 'rgb(228 228 231)'
              : 'rgb(82 82 91)',
          background: (theme) =>
            theme.palette.mode === 'dark'
              ? 'rgba(63, 63, 70, 0.7)'
              : 'rgba(228, 228, 231, 0.9)',
        }}
      >
        <IconButton
          size='small'
          onClick={() => onOpen('messageFile', { apiUrl, query })}
          sx={{
            color: (theme) =>
              theme.palette.mode === 'dark' ? '#121212' : '#fff',
            background: (theme) =>
              theme.palette.mode === 'dark'
                ? 'rgb(161 161 170)'
                : 'rgb(113 113 122)',
            '&:hover': {
              background: (theme) =>
                theme.palette.mode === 'dark'
                  ? 'rgb(212 212 216)'
                  : 'rgb(82 82 91)',
            },
          }}
        >
          <CgMathPlus />
        </IconButton>
        <Controller
          name='content'
          control={control}
          render={({ field }) => (
            <>
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                autoFocus
                margin='dense'
                disabled={isLoading}
                placeholder={`Message ${
                  type === 'conversation' ? name : '#' + name
                }`}
                id='content'
                type='text'
                {...field}
              />
              <EmojiPicker
                onChange={(emoji: string) =>
                  field.onChange(`${field.value} ${emoji}`)
                }
              />
            </>
          )}
        />
      </Paper>
    </FormControl>
  );
}
