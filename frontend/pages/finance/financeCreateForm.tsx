import React, { useState, useEffect } from "react";
import styled from "styled-components";

import Header from "../../components/common/Header";
import FinanceForm from "components/finance/form/FinanceForm";
import { AccountType } from "types";
import { useRouter } from "next/router";

const PageContainer = styled.main`
  padding: 0 2rem;
`;

const ToggleCostIncome = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
  gap: 1rem;
`;

const CostIncomeButton = styled.button<{ isSelected: boolean }>`
  padding: 1.5rem 3rem;
  color: ${(props) => (props.isSelected ? "#3d3d3d" : "#cacaca")};
  font-weight: ${(props) => (props.isSelected ? "700" : "400")};
  border: none;
  background-color: #ffffff;
  font-family: "Noto Sans KR";
  font-size: 2.4rem;
  border-bottom: ${(props) => (props.isSelected ? "2px solid #000000" : "")};
  margin-bottom: 1.5rem;
`;

export default function FinanceCreateForm() {
  const router = useRouter();
  const { date } = router.query;
  const [accountType, setAccountType] = useState<AccountType>("E");

  function handleToggleAccountType(event: any) {
    setAccountType(event.target.value);
  }

  const [ready, setReady] = useState(false);
  useEffect(() => {
    setReady(true);
  }, []);
  if (!ready) {
    return null;
  }
  return (
    <>
      <Header
        label="가계부 내역 추가"
        onClickBackButton={() => router.push("/finance")}
      />
      <PageContainer>
        <ToggleCostIncome>
          <CostIncomeButton
            onClick={handleToggleAccountType}
            value="E"
            isSelected={accountType === "E"}
          >
            지출
          </CostIncomeButton>
          <CostIncomeButton
            onClick={handleToggleAccountType}
            value="I"
            isSelected={accountType === "I"}
          >
            수입
          </CostIncomeButton>
        </ToggleCostIncome>
        <FinanceForm type={accountType} date={date} />
      </PageContainer>
    </>
  );
}

FinanceCreateForm.requireAuth = true;
