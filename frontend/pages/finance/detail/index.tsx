import { getAccountbooks, getCategories } from "api/accountbook";
import { useRouter } from "next/router";
import Image from "next/image";
import { useState, useEffect, Fragment } from "react";
import styled from "styled-components";
import { IAccountbook } from "types";
import Header from "../../../components/common/Header";

const Container = styled.div`
  /* height: 100%; */
`;

const PageContainer = styled.main`
  font-family: "Noto Sans KR", sans-serif;
  padding: 0 2rem;
  background-color: #ffffff;
  color: #3d3d3d;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const PageTitle = styled.span`
  display: flex;
  font-size: 2.4rem;
  font-weight: 500;
  padding: 1rem 0;
  margin-top: 1rem;
`;

// const DivisionLine = styled.hr`
//   border-top: 2px solid lightgray;
// `;

const ExpenditureDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: none;
  border-radius: 1rem;
  width: 100%;
  background-color: #f4f4f4;
  filter: drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.25));

  font-size: 1.6rem;
  padding: 1.6rem 2rem;
  gap: 2.5rem;
`;

const DetailContents = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1.6rem;
  gap: 0.5rem;
  span {
    font-size: 2rem;
  }
  .fixedDateTime {
    font-size: 1.6rem;
    color: #767676;
  }
`;

const CategoryContent = styled.div`
  display: flex;
  align-items: center;
  span {
    padding-left: 1rem;
    line-height: 3.4rem;
  }
`;

const CategoryImage = styled.label`
  position: relative;
  width: 3.2rem;
  height: 3.2rem;
  box-sizing: content-box;
  border-radius: 50%;
`;

// type TypeTitle = "지출" | "수입";
interface IFinanceDetail extends IAccountbook {
  categoryName: string;
}

interface Category {
  categoryId: string;
  type: "E" | "I";
  name: string;
  imgUrl: string;
}

const FinanceDetail = () => {
  const router = useRouter();
  const [financeDetailInfo, setFinanceDetailInfo] = useState<IFinanceDetail>();
  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const [categoryImageUrl, setCategoryImageUrl] = useState<string>();

  useEffect(() => {
    const accountbookId = router.query.accountbookId;
    if (accountbookId && typeof accountbookId === "string") {
      getAccountbooks(accountbookId).then((res) => {
        // console.log(res.data);
        if (res.data.code === 1302) {
          setFinanceDetailInfo(res.data.data);
          getCategories(res.data.data.type).then((res) => {
            // console.log(res.data);
            if (res.data.code === 1300) {
              // console.log(res.data.data);
              setCategoryList(res.data.data);
            } else {
              // console.log(res.data.message);
              confirm("카테고리 조회 실패");
            }
          });
        } else {
          // console.log(res.data.message);
          confirm("가계부 상세 조회 실패!");
        }
      });
    }
  }, [router.query.accountbookId]);

  useEffect(() => {
    setCategoryImageUrl(
      categoryList.find(
        (category) => category.categoryId === financeDetailInfo?.categoryId
      )?.imgUrl
    );
  }, [categoryList, setCategoryImageUrl, financeDetailInfo]);

  // console.log(
    categoryList.find(
      (category) => category.categoryId === financeDetailInfo?.categoryId
    )?.imgUrl
  );

  // YYYY-MM-DDTHH:MM:SS => YYYY년 MM월 DD일 HH시 MM분
  function datetimeParsing(datetime: string) {
    if (!datetime) {
      return "";
    }
    const [date, time] = datetime.split("T");
    const [year, month, day] = date.split("-");
    const [hour, minute, _] = time.split(":");

    const amPm = parseInt(hour) >= 12 ? "오후" : "오전";
    const newHour = parseInt(hour) >= 12 ? parseInt(hour) - 12 : hour;
    return `${year}년 ${month}월 ${day}일 ${amPm} ${newHour}시 ${minute}분`;
  }

  // 기간 파싱
  function fixedDateTimeParsing(startDate: string, endDate: string) {
    if (!startDate || !endDate) {
      return "";
    }
    const [startYear, startMonth, startDay] = startDate.split("-");
    const [endYear, endMonth, endDay] = endDate.split("-");
    return `${startYear}년 ${startMonth}월 ~ ${endYear}년 ${endMonth}월`;
  }

  function onClickEditButton() {
    // console.log("Edit Button Clicked !!");
    if (!financeDetailInfo) {
      return;
    }
    router.push({
      pathname: "/finance/financeEditForm",
      query: { accountbookId: financeDetailInfo.accountbookId },
    });
  }

  const [ready, setReady] = useState(false);
  useEffect(() => {
    setReady(true);
  }, []);
  if (!ready) {
    return null;
  }

  return (
    <>
      <Container>
        <Header
          label="가계부 내역 상세 조회"
          icon="pencil"
          onClickRightButton={onClickEditButton}
          onClickBackButton={() => router.push("/finance")}
        />
        <PageContainer>
          {/* <PageTitle
            color={isExpenditure ? TypeTitle === "지출" : TypeTitle === "수입"}
          > */}
          <PageTitle>
            {financeDetailInfo?.type === "E" ? "지출" : "수입"}
          </PageTitle>
          {/* <DivisionLine /> */}
          <ExpenditureDetailContainer>
            <DetailContents>
              제목
              <span>{financeDetailInfo?.title || "제목"}</span>
            </DetailContents>
            <DetailContents>
              금액
              <span>{financeDetailInfo?.price || "0"} 원</span>
            </DetailContents>
            <DetailContents>
              날짜
              {financeDetailInfo?.date ? (
                <span>{datetimeParsing(financeDetailInfo?.date || "")}</span>
              ) : (
                <>
                  <span>매월 {financeDetailInfo?.monthlyPeriod}일</span>
                  <span className="fixedDateTime">
                    {fixedDateTimeParsing(
                      financeDetailInfo?.startDate || "",
                      financeDetailInfo?.endDate || ""
                    )}
                  </span>
                </>
              )}
            </DetailContents>
            {financeDetailInfo?.type === "E" && (
              <DetailContents>
                결제수단
                <span>
                  {financeDetailInfo?.paymentMethod === "C"
                    ? "카드"
                    : financeDetailInfo?.paymentMethod === "M"
                    ? "현금"
                    : "기타"}
                </span>
              </DetailContents>
            )}

            <DetailContents>
              카테고리
              <CategoryContent>
                {categoryImageUrl && (
                  <CategoryImage>
                    <Image
                      src={categoryImageUrl}
                      alt={financeDetailInfo?.categoryName}
                      layout="fill"
                    />
                  </CategoryImage>
                )}
                <span>{financeDetailInfo?.categoryName}</span>
              </CategoryContent>
            </DetailContents>
            <DetailContents>
              메모
              <span>{financeDetailInfo?.memo}</span>
            </DetailContents>
          </ExpenditureDetailContainer>
        </PageContainer>
      </Container>
    </>
  );
};

export default FinanceDetail;

FinanceDetail.requireAuth = true;
