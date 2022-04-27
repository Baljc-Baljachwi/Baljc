import styled from "styled-components";
import FinanceCard from "./FinanceCard";

const PageContainer = styled.main`
  /* padding: 0 2rem; */
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export default function FinanceList() {
  return (
    <>
      <PageContainer>
        <FinanceCard
          isFixed={true}
          isExpenditure={true}
          title="통신비"
          price="-34,980 원"
          category="대중교통"
          method="입출금통장"
        />
        <FinanceCard
          isFixed={true}
          isExpenditure={false}
          title="월급"
          price="+1,000,000 원"
          category="월급"
          method="입출금통장"
        />
        <FinanceCard
          isFixed={false}
          isExpenditure={true}
          title="성재랑 문방구 쇼핑"
          price="-12,000 원"
          category="쇼핑"
          method="카드"
        />
        <FinanceCard
          isFixed={false}
          isExpenditure={true}
          title="도현 생일 선물"
          price="-20,000 원"
          category="쇼핑"
          method="카드"
        />
      </PageContainer>
    </>
  );
}
