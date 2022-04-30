import React, { useState } from "react";
import styled from "styled-components";

import Header from "../../components/common/Header";
import CostForm from "../../components/finance/form/CostForm";
import IncomeForm from "components/finance/form/IncomeForm";
import FinanceForm from "components/finance/form/financeForm";
import { AccountType } from "types";

const PageContainer = styled.main`
  padding: 0 2rem;
`;

const ToggleCostIncome = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 3.4rem;
`;

const CostIncomeButton = styled.button<{ isSelected: boolean }>`
  padding: 1rem 5rem;
  color: ${(props) => (props.isSelected ? "#3d3d3d" : "#cacaca")};
  font-weight: ${(props) => (props.isSelected ? "700" : "400")};
  border: none;
  background-color: #ffffff;
  font-family: "Noto Sans KR";
  font-size: 2.4rem;
`;

export default function FinanceCreateForm() {
  const [accountType, setAccountType] = useState<AccountType>("E");

  function handleToggleAccountType(event: any) {
    setAccountType(event.target.value);
  }
  return (
    <>
      <Header label="가계부 내역 추가" />
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
        <FinanceForm type={accountType} />
        {/* {accountType === "E" ? <CostForm /> : <IncomeForm />} */}
      </PageContainer>
    </>
  );
}
