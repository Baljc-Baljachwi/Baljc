import styled from "styled-components";

import FinanceCard from "../../../components/finance/list/FinanceCard";

const PageContainer = styled.main`
  /* padding: 0 2rem; */
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
`;

export default function FinanceList({ item }: any, date: string) {
  return (
    <>
      <PageContainer>
        {item?.map((data: any, idx: string) => (
          <FinanceCard
            key={idx}
            accountbookId={data.accountbookId}
            isFixed={
              data.fixedExpenditureYn === "Y" || data.fixedIncomeYn === "Y"
                ? true
                : false
            }
            type={data.type}
            title={data.title}
            price={data.price}
            method={data.paymentMethod}
            categoryName={data.categoryName}
            date={date}
          />
        ))}
      </PageContainer>
    </>
  );
}
