import styled from "styled-components";
import { useEffect, useState } from "react";

import FinanceCard from "../../../components/finance/list/FinanceCard";
import { IAccountbook } from "types";

const PageContainer = styled.main`
  /* padding: 0 2rem; */
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
`;

export default function FinanceList({ item }: any) {
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
            category={data.categoryName}
            method={data.paymentMethod}
          />
        ))}
      </PageContainer>
    </>
  );
}
