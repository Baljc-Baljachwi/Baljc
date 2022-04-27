import styled from "styled-components";
import Header from "../../../components/common/Header";

const Container = styled.div`
  height: 100vh;
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
  padding: 2rem 0;
`;

const DivisionLine = styled.hr`
  border-top: 2px solid lightgray;
`;

const ExpenditureDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: none;
  border-radius: 1rem;
  width: 100%;
  background-color: #ffffff;
  filter: drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.25));

  font-size: 1.6rem;
  padding: 1.6rem 2rem;
  gap: 2rem;
`;

const DetailContents = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1.6rem;
  span {
    font-size: 2rem;
  }
`;

// type TypeTitle = "지출" | "수입";

interface FinanceDetailProps {
  isFixed: boolean;
  isExpenditure: boolean;
  // title: TypeTitle;
  title: string;
  price: string;
  method: string;
  category: string;
}

const financeDetail = ({
  isFixed,
  isExpenditure,
  title,
  price,
  method,
  category,
}: FinanceDetailProps) => {
  return (
    <>
      <Container>
        <Header label="가계부 내역 상세 조회" icon="pencil"></Header>
        <PageContainer>
          {/* <PageTitle
            color={isExpenditure ? TypeTitle === "지출" : TypeTitle === "수입"}
          > */}
          <PageTitle>지출</PageTitle>
          <DivisionLine />
          <ExpenditureDetailContainer>
            <DetailContents>
              제목
              <span>커블 체어(당근 거래)</span>
            </DetailContents>
            <DetailContents>
              금액
              <span>26,000 원</span>
            </DetailContents>
            <DetailContents>
              날짜
              <span>2022년 4월 29일 오후 7:54</span>
            </DetailContents>
            <DetailContents>
              결제수단
              <span>현금</span>
            </DetailContents>
            <DetailContents>
              카테고리
              <span>쇼핑</span>
            </DetailContents>
            <DetailContents>
              메모
              <span>커블 체어 득템했음! 🥕</span>
            </DetailContents>
          </ExpenditureDetailContainer>
        </PageContainer>
      </Container>
    </>
  );
};

export default financeDetail;
