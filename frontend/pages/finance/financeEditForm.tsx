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

interface IAccountbookForm extends IAccountbook {
  time: string | null;
}

export default function FinanceEditForm({ accountbook }: FinanceEditFormProps) {
  // 지출, 수입 구분
  const router = useRouter();

  const [initForm, setInitForm] = useState<IAccountbookForm>();

  useEffect(() => {
    const accountbookId = router.query.accountbookId;
    console.log("accountbookId :", accountbookId);

    if (accountbookId && typeof accountbookId === "string") {
      getAccountbooks(accountbookId).then((res) => {
        console.log(res.data);
        if (res.data.code === 1302) {
          const data = res.data.data;

          // 데이터 형식 파싱
          const [date, time] = data.date ? data.date.split("T") : [null, null];
          const startDate = data.startDate ? data.startDate.slice(0, 7) : null;
          const endDate = data.endDate ? data.endDate.slice(0, 7) : null;

          setInitForm({ ...data, date, time, startDate, endDate });
        } else {
          console.log(res.data.message);
        }
      });
    }
  }, [router.query.accountbookId]);

  return (
    <>
      <Header label="가계부 내역 수정"></Header>
      <PageContainer>
        <CostIncomeTitle>
          {initForm?.type === "E"
            ? "지출"
            : initForm?.type === "I"
            ? "수입"
            : ""}
        </CostIncomeTitle>
        {initForm && <FinanceForm type={initForm.type} initForm={initForm} />}
      </PageContainer>
    </>
  );
}
