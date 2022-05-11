import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";

import Header from "../../components/common/Header";
import CommunityForm from "components/community/CommunityForm";
import { getBoardsDetail } from "api/community";
import { IPost, IComment } from "types";
import { memberIdState } from "atoms/atoms";

interface IBoardContent {
  content: string;
  imgInfoList: string[];
}

export default function CommunityEditForm() {
  const router = useRouter();
  const memberId = useRecoilValue(memberIdState);

  // 새로고침 hydration error 해결
  const [ready, setReady] = useState(false);

  const [boardContent, setBoardDetail] = useState<IBoardContent>({
    content: "",
    imgInfoList: [],
  });

  const fetchBoard = useCallback(
    async (boardId: string) => {
      try {
        const data = await (await getBoardsDetail(boardId)).data;
        if (data.code === 1703) {
          // 창작자 아니면 인가 거부
          if (data.data.memberId !== memberId) {
            router.push({ pathname: "/community/detail", query: { boardId } });
            return;
          } else {
            setBoardDetail(data.data);
          }
        }
      } catch (err) {
        console.error(err);
      }
    },
    [router, memberId]
  );

  useEffect(() => {
    setReady(true);
    const boardId = router.query.boardId;
    if (boardId) {
      fetchBoard(boardId as string);
      // getBoardsDetail(boardId as string)
      //   .then((res) => {
      //     console.log(res.data);
      //     if (res.data.code === 1703) {
      //       // 창작자 아니면 인가 거부
      //       if (res.data.data.memberId !== memberId) {
      //         router.push();
      //         return;
      //       }
      //       console.log(res.data.data);
      //       setBoardDetail(res.data.data);
      //       setCommentList(res.data.data.commentList);
      //     }
      //   })
      //   .catch((err) => console.error(err));
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
