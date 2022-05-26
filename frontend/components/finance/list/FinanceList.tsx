import styled from "styled-components";
import { useRouter } from "next/router";

import FinanceCard from "./FinanceCard";

const PageContainer = styled.main`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
`;

const Day = styled.div`
  font-size: 1.5rem;
  padding-top: 1.5rem;
`;

interface FinanceListProps {
  item: any;
  dayMonthYear: any;
}

export default function FinanceList({ item, dayMonthYear }: FinanceListProps) {
  const router = useRouter();
  const data: any = item[1];

  return (
    <>
      <PageContainer>
        <Day>{item[0]}일 </Day>
        {data
          ? data.map((data: any, idx: string) => (
              <FinanceCard
                key={idx}
                isFixed={
                  data.fixedExpenditureYn === "Y" || data.fixedIncomeYn === "Y"
                    ? true
                    : false
                }
                accountbookId={data.accountbookId}
                type={data.type}
                title={data.title}
                price={data.price}
                categoryName={data.categoryName}
                method={data.paymentMethod}
              />
            ))
          : null}
      </PageContainer>
    </>
  );
}
