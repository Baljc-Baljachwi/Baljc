// declare global {
//   interface Window {
//     gtag: (param1: string, param2: string, param3: object) => void;
//   }
// }

// 조회수 측정하는 함수 생성
export const pageview = (url: string) => {
  const uri = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS || "";
  window.gtag("config", uri, {
    page_path: url,
  });
};

export const event = ({ action, params }: any) => {
  window.gtag("event", action, params);
};
