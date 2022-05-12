import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";

import Header from "../../components/common/Header";
import CommunityForm from "components/community/CommunityForm";
import { getBoardsDetail } from "api/community";
import { IPost, IComment } from "types";
import { userInfoState } from "atoms/atoms";

type ImageInfo = { imgUrl: string; boardImgId: string };

interface IBoardContent {
  content: string;
  imgInfoList: ImageInfo[];
}

export default function CommunityEditForm() {
  const router = useRouter();
  const userInfo = useRecoilValue(userInfoState);

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
          if (data.data.memberId !== userInfo.memberId) {
            console.log("저리가", userInfo.memberId, data.data);
            router.push({
              pathname: "/community/detail",
              query: { boardId },
            });
            return;
          } else {
            setBoardDetail({
              content: data.data.content,
              imgInfoList: data.data.imgUrlList,
            });
          }
        }
      } catch (err) {
        console.error(err);
      }
    },
    [router, userInfo.memberId]
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
