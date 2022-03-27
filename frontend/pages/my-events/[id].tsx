import { NextPage } from "next";

import { useRouter } from "next/router";
import { MyEventDetail } from "src/component/MyEventDetail";

const MyEventDetailPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const eventId = String(id);
  return (
    <>
      <MyEventDetail id={eventId} />
    </>
  );
};

export default MyEventDetailPage;
