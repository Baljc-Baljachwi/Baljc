import React, { useEffect, useState } from "react";
import styled from "styled-components";

import Header from "../../components/common/Header";
import { IAccountbook } from "types";
import FinanceForm from "components/finance/form/FinanceForm";
import { useRouter } from "next/router";
import { getAccountbooks } from "api/accountbook";

const PageContainer = styled.main`
  padding: 0 2rem;
`;

const CostIncomeTitle = styled.div`
  font-size: 2.4rem;
  font-weight: 500;
  margin: 3.4rem 0 1.6rem 0;
`;

interface FinanceEditFormProps {
  accountbook: IAccountbook;
}

const dummyData = {
  accountbookId: "abc",
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
} as IAccountbook;

export default function FinanceEditForm({ accountbook }: FinanceEditFormProps) {
  // 지출, 수입 구분
  const router = useRouter();

  const { type } = dummyData;
  const [initForm, setInitForm] = useState<IAccountbook>();

  useEffect(() => {
    const accountbookId = router.query.accountbookId;
    console.log("accountbookId :", accountbookId);
    if (accountbookId && typeof accountbookId === "string") {
      getAccountbooks(accountbookId).then((res) => {
        console.log(res.data.data);
      });
    }
  }, [router.query.accountbookId]);

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
