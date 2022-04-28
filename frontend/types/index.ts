export type AccountType = "E" | "I"; // E: 지출, I: 수입, ERD는 type이지만 예약어라 문제될까봐 accountType으로 수정
export type PaymentMethodType = "M" | "C" | "E" | "N"; // M: 현금, C: 카드, E: 기타, N: 없음
export type PeriodType = "M" | "W" | "D" | "N"; // M : 매월, W: 매주, D: 매일, N: 없음
export type SalaryType = "M" | "H" | "N"; // M: 월급, H: 시급, N: 없음

export interface IAccountBook {
  accountBookId: number;
  accountType: AccountType;
  categoryType: number;
  title: string;
  price: number;
  memo: string | null;
  paymentMethod: PaymentMethodType;
  fixedExpenditureYn: boolean;
  fixedIncomeYn: boolean;
  periodType: PeriodType;
  monthlyPeriod: number | null;
  weeklyPeriod: number | null;
  date: string | null;
}

export interface ICategory {
  categoryId: number;
  accountType: AccountType;
  name: string;
  imgUrl: string;
}

export interface IRoutine {
  routineId: number;
  memberId: number;
  title: string;
  content: string;
  repetition: string;
}

export interface IMember {
  memberId: number;
  kakaoId: string;
  email: string;
  nickname: string;
  profileUrl: string | null;
  salaryType: SalaryType;
  salary: number | null;
  workingHours: number | null;
  budget: number;
  surveyedYn: boolean;
}

export interface ITodo {
  todoId: number;
  memberId: number;
  date: string;
  content: string;
  completedYn: boolean;
}
