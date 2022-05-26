import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";

import Header from "../../components/common/Header";
import CommunityForm from "components/community/CommunityForm";
import { getBoardsDetail } from "api/community";
import { userInfoState } from "atoms/atoms";

type ImageInfo = { imgUrl: string; boardImgId: string };

interface IBoardContent {
  categoryName: string;
  content: string;
  imgInfoList: ImageInfo[];
}

export default function CommunityEditForm() {
  const router = useRouter();
  const userInfo = useRecoilValue(userInfoState);

  // 새로고침 hydration error 해결
  const [ready, setReady] = useState(false);

  const [boardContent, setBoardDetail] = useState<IBoardContent>({
    categoryName: "",
    content: "",
    imgInfoList: [],
  });

  const fetchBoard = useCallback(
    async (boardId: string) => {
      try {
        const data = await (await getBoardsDetail(boardId)).data;
        if (data.code === 1703) {
          // 창작자 아니면 인가 거부
          if (data.data.memberId !== userInfo.memberId) {
            router.push({
              pathname: "/community/detail",
              query: { boardId },
            });
            return;
          } else {
            const { categoryName, content, imgUrlList } = data.data;
            setBoardDetail({ categoryName, content, imgInfoList: imgUrlList });
          }
        }
      } catch (err) {
        console.log(err);
      }
    },
    [router, userInfo.memberId]
  );

  useEffect(() => {
    setReady(true);
    const boardId = router.query.boardId;
    if (boardId) {
      fetchBoard(boardId as string);
    }
  }, [router.query.boardId, fetchBoard]);

  if (!ready) {
    return null;
  }

  return (
    <>
      <Header
        label="게시글 수정"
        onClickBackButton={() => router.push("/community")}
      />
      <CommunityForm boardContent={boardContent} />
    </>
  );
}

CommunityEditForm.requireAuth = true;
