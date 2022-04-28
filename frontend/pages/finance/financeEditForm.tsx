import React, { useState } from "react";
import styled from "styled-components";

import Header from "../../components/common/Header";
import CostForm from "../../components/finance/form/CostForm";
import IncomeForm from "components/finance/form/IncomeForm";
import { IAccountBook, AccountType } from "types";

const PageContainer = styled.main`
  padding: 0 2rem;
`;

const CostIncomeTitle = styled.div`
  font-size: 2.4rem;
  font-weight: 500;
  margin: 3.4rem 0 1.6rem 0;
`;

interface FinanceEditFormProps {
  accountBook: IAccountBook;
}

const dummyData = {
  accountBookId: 1,
  accountType: "E",
  categoryType: 1,
  title: "오늘도 나는 돈을 쓴다",
  price: 100000,
  memo: "쓸데없는 지출",
  paymentMethod: "C",
  fixedExpenditureYn: "N",
  fixedIncomeYn: "N",
  periodType: "N",
  monthlyPeriod: null,
  weeklyPeriod: null,
  date: "2022-04-28 ",
} as IAccountBook;

export default function FinanceEditForm({ accountBook }: FinanceEditFormProps) {
  const { accountType } = dummyData;
  return (
    <>
      <Header label="가계부 내역 수정"></Header>
      <PageContainer>
        <CostIncomeTitle>
          {accountType === "E" ? "지출" : "수입"}
        </CostIncomeTitle>
        {accountType === "E" ? (
          <CostForm initCostForm={dummyData} />
        ) : (
          <IncomeForm initIncomeForm={dummyData} />
        )}
      </PageContainer>
    </>
  );
}
