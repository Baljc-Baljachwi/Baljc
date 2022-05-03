export type AccountType = "E" | "I"; // [수입/지출] E: 지출, I: 수입, ERD는 type이지만 예약어라 문제될까봐 accountType으로 수정
export type PaymentMethodType = "M" | "C" | "E" | "N"; // [결제수단] M: 현금, C: 카드, E: 기타, N: 없음
export type PeriodType = "M" | "W" | "D" | "N"; // [주기유형] M : 매월, W: 매주, D: 매일, N: 없음
export type SalaryType = "M" | "H" | "N"; // [급여유형] M: 월급, H: 시급, N: 없음
export type YNType = "Y" | "N"; // boolean 대신 true: "Y", false: "N"

export interface IAccountbook {
  accountbookId?: string;
  type: AccountType;
  categoryId?: string;
  title: string;
  price: number;
  memo?: string | null;
  paymentMethod: PaymentMethodType;
  fixedExpenditureYn: YNType;
  fixedIncomeYn: YNType;
  monthlyPeriod: number | null;
  startDate?: string | null;
  endDate?: string | null;
  date: string | null;
}

export interface ICategory {
  categoryId: string;
  accountType: AccountType;
  name: string;
  imgUrl: string;
}

export interface IRoutine {
  routineId: string;
  title: string;
  repetition: number;
}

export interface IMember {
  // memberId: number;
  // kakaoId: string;
  // email: string;
  nickname: string;
  profileUrl: string | null;
  salaryType: SalaryType;
  salary: number | null;
  workingHours: number | null;
  budget: number;
  // surveyedYn: YNType;
}

export interface ITodo {
  todoId: number;
  memberId: number;
  date: string;
  content: string;
  completedYn: YNType;
}

export interface IAlarm {
  accountAlarmYn: YNType;
  accountAlarmTime: string;
  todoAlarmYn: YNType;
  todoAlarmTime: string;
}

export interface ICalendar {
  year: number | string;
  month: number | string;
}
export interface IDaily extends ICalendar {
  day: number | string;
}
