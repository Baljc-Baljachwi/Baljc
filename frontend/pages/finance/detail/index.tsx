import { getAccountbooks, getCategories } from "api/accountbook";
import { useRouter } from "next/router";
import Image from "next/image";
import { useState, useEffect, Fragment } from "react";
import styled from "styled-components";
import { IAccountbook } from "types";
import Header from "../../../components/common/Header";

const Container = styled.div``;

const PageContainer = styled.main`
  font-family: "Noto Sans KR", sans-serif;
  padding: 0 2rem 5rem 2rem;
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
  color: #878b93;
  span {
    font-size: 2rem;
    color: #3d3d3d;
  }
  .fixedDateTime {
    font-size: 1.6rem;
    color: #878b93;
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

// type TypeTitle = "μ§μΆ" | "μμ";
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
        if (res.data.code === 1302) {
          setFinanceDetailInfo(res.data.data);
          getCategories(res.data.data.type).then((res) => {
            if (res.data.code === 1300) {
              setCategoryList(res.data.data);
            } else {
              confirm("μΉ΄νκ³ λ¦¬ μ‘°ν μ€ν¨");
            }
          });
        } else {
          confirm("κ°κ³λΆ μμΈ μ‘°ν μ€ν¨!");
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

  // YYYY-MM-DDTHH:MM:SS => YYYYλ MMμ DDμΌ HHμ MMλΆ
  function datetimeParsing(datetime: string) {
    if (!datetime) {
      return "";
    }
    const [date, time] = datetime.split("T");
    const [year, month, day] = date.split("-");
    const [hour, minute, _] = time.split(":");

    const amPm = parseInt(hour) >= 12 ? "μ€ν" : "μ€μ ";
    const newHour = parseInt(hour) >= 12 ? parseInt(hour) - 12 : hour;
    return `${year}λ ${month}μ ${day}μΌ ${amPm} ${newHour}μ ${minute}λΆ`;
  }

  // κΈ°κ° νμ±
  function fixedDateTimeParsing(startDate: string, endDate: string) {
    if (!startDate || !endDate) {
      return "";
    }
    const [startYear, startMonth, startDay] = startDate.split("-");
    const [endYear, endMonth, endDay] = endDate.split("-");
    return `${startYear}λ ${startMonth}μ ~ ${endYear}λ ${endMonth}μ`;
  }

  function onClickEditButton() {
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
          label="κ°κ³λΆ λ΄μ­ μμΈ μ‘°ν"
          icon="pencil"
          onClickRightButton={onClickEditButton}
          onClickBackButton={() => router.push("/finance")}
        />
        <PageContainer>
          <PageTitle>
            {financeDetailInfo?.type === "E" ? "μ§μΆ" : "μμ"}
          </PageTitle>

          <ExpenditureDetailContainer>
            <DetailContents>
              μ λͺ©
              <span>{financeDetailInfo?.title || "μ λͺ©"}</span>
            </DetailContents>
            <DetailContents>
              κΈμ‘
              <span>{financeDetailInfo?.price.toLocaleString() || "0"} μ</span>
            </DetailContents>
            <DetailContents>
              λ μ§
              {financeDetailInfo?.date ? (
                <span>{datetimeParsing(financeDetailInfo?.date || "")}</span>
              ) : (
                <>
                  <span>λ§€μ {financeDetailInfo?.monthlyPeriod}μΌ</span>
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
                κ²°μ μλ¨
                <span>
                  {financeDetailInfo?.paymentMethod === "C"
                    ? "μΉ΄λ"
                    : financeDetailInfo?.paymentMethod === "M"
                    ? "νκΈ"
                    : "κΈ°ν"}
                </span>
              </DetailContents>
            )}

            <DetailContents>
              μΉ΄νκ³ λ¦¬
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
            <DetailContents style={{ paddingBottom: "4rem" }}>
              λ©λͺ¨
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
