import React, { useState } from "react";
import styled from "styled-components";

import Header from "../../components/common/Header";
import CostForm from "../../components/finance/form/CostForm";
import IncomeForm from "components/finance/form/IncomeForm";
import { IAccountBook } from "types";
import FinanceForm from "components/finance/form/financeForm";

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
  accountBookId: "abc",
  type: "E",
  categoryId: "123",
  title: "오늘도 나는 돈을 쓴다",
  price: 100000,
  memo: "쓸데없는 지출",
  paymentMethod: "C",
  fixedExpenditureYn: "N",
  fixedIncomeYn: "N",
  startDate: "",
  endDate: "",
  monthlyPeriod: null,
  date: null,
} as IAccountBook;

export default function FinanceEditForm({ accountBook }: FinanceEditFormProps) {
  // 지출, 수입 구분
  const { type } = dummyData;

  // 입력 폼에 date, time 따로
  const [date, time] = dummyData.date
    ? dummyData.date.split("T")
    : [null, null];
  console.log(date, time);
  return (
    <>
      <Header label="가계부 내역 수정"></Header>
      <PageContainer>
        <CostIncomeTitle>{type === "E" ? "지출" : "수입"}</CostIncomeTitle>
        <FinanceForm type={type} initForm={{ ...dummyData, date, time }} />
        {/* {type === "E" ? (
          <CostForm initCostForm={{ ...dummyData, date, time }} />
        ) : (
          <IncomeForm initIncomeForm={{ ...dummyData, date, time }} />
        )} */}
      </PageContainer>
    </>
  );
}
