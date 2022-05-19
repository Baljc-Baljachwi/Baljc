import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import Header from "../../components/common/Header";
import CommunityForm from "components/community/CommunityForm";

export default function CommunityCreateForm() {
  const router = useRouter();
  const selectedCategory = router.query;

  // 새로고침 hydration error 해결
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  if (!ready) {
    return null;
  }

  return (
    <>
      <Header
        label="게시글 작성"
        onClickBackButton={() => router.push("/community")}
      />
      <CommunityForm />
    </>
  );
}

CommunityCreateForm.requireAuth = true;
