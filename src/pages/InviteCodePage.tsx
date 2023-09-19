import { useParams } from 'react-router-dom';
import InviteCode from './InviteCode';

export default function InviteCodePage() {
  const params = useParams();
  return (
    <>
      <InviteCode params={params} />
    </>
  );
}
