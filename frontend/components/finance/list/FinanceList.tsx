import styled from "styled-components";
import { useRouter } from "next/router";
import dayjs from "dayjs";

import FinanceCard from "./FinanceCard";
import FloatingButton from "components/common/FloatingButton";
import { useEffect } from "react";

const PageContainer = styled.main`
  /* padding: 0 2rem; */
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
  const date = dayjs(dayMonthYear).format("YYYY-MM-DD");

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
      <FloatingButton
        onClick={() => {
          router.push({
            pathname: "/finance/financeCreateForm",
            query: { date },
          });
        }}
      />
    </>
  );
}
