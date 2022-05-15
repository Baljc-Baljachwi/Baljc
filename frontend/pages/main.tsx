import React, { Suspense } from "react";
// import LoginModalButton from 'components/Main/LoginModalButton';
import styled from "styled-components";
import { useState, memo, useEffect, useRef } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
// import Description from 'components/Main/Description';
// import Navbar from 'components/common/Navbar';
// import Balloon from 'components/Main/Balloon';
import { isMobile } from "utils/mobileCheck";

const OnboardingPage1 = React.lazy(
  () => import("components/onboardingContent/onboarding1")
);
const OnboardingPage2 = React.lazy(
  () => import("components/onboardingContent/onboarding2")
);
const OnboardingPage3 = React.lazy(
  () => import("components/onboardingContent/onboarding3")
);

const Main = () => {
  const [count, setCount] = useState({ user: 0, post: 0 });
  const [isLoading, setIsLoading] = useState(true);
  //   const loginUser = useRecoilValue(loginUserState) as LoginUserType;
  //   const { onLoginStepReset, onLoginStepNext, setLoginStep } = useLoginStep();
  //   const setLoginUser = useSetRecoilState(loginUserState);

  //   const history = useHistory();

  const heightRef = useRef<HTMLDivElement>(null);
  const screenHeight = heightRef.current?.clientHeight as number;

  //   const counter = {
  //     0: useCountUp(count.post, 0, 400),
  //     1: useCountUp(count.user, 0, 400),
  //   };

  //   const { onFetchReceivedMessages } = useReceivedMessage();
  //   const { onFetchNotifications } = useNotification();

  //   const fetchUserData = async (uid: string) => {
  //     return await getUserData(uid);
  //   };

  //   const fetchCount = async () => {
  //     const count = await getUserPostCount();
  //     setIsLoading(false);
  //     setCount(count);
  //   };

  const onClickScrollDown: React.MouseEventHandler<HTMLElement> = (e) => {
    const scrollPosistion = isMobile() ? screenHeight : window.innerHeight;
    const target = e.target as HTMLElement;
    const id = target.dataset.pageId;

    window.scroll({ behavior: "smooth", top: Number(id) * scrollPosistion });
  };

  //   const loginStatusHandler = async (user: any) => {
  //     if (user) {
  //       const res = await fetchUserData(user.uid);
  //       setIsLoading(false);

  //       switch (res?.auth_status) {
  //         case 'approved': {
  //           setLoginUser({ ...loginUser, ...res });
  //           onFetchReceivedMessages(user.uid);
  //           onFetchNotifications(user.uid);
  //           history.push('/home');
  //           break;
  //         }

  //         case 'rejected': {
  //           setLoginUser({ ...loginUser, ...res });
  //           setLoginStep(AUTH_REJECTED_STEP);
  //           break;
  //         }

  //         case 'waiting': {
  //           setLoginUser({ ...loginUser, ...res });
  //           setLoginStep(AUTH_WAITING_STEP);
  //           break;
  //         }

  //         default: {
  //           onLoginStepNext();
  //           break;
  //         }
  //       }
  //     }

  //     await fetchCount();
  //   };

  //   useEffect(() => {
  //     const unsubscribe = authService.onAuthStateChanged(loginStatusHandler);

  //     return () => {
  //       onLoginStepReset();
  //       unsubscribe();
  //     };
  //   }, []);

  return (
    <Wrapper>
      <OnboardingPage1 />
      <OnboardingPage2 />
      <OnboardingPage3 />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const NavbarWrapper = styled.div`
  @media ${({ theme }) => theme.size.mobile} {
    display: none;
  }
`;

const MobileLogoWrapper = styled.div`
  display: none;
  margin: 0 auto;
  width: clamp(130px, 20vw, 150px);
  margin-top: 30px;
  @media ${({ theme }) => theme.size.mobile} {
    display: inline;
  }
`;

const Container = styled.div`
  height: 100vh;
  flex: none;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Contents = styled.div`
  display: flex;
  margin: 20px auto;
  flex-direction: column;
  align-items: center;
`;

const ButtonWrapper = styled.div<{ isLoading: boolean }>`
  visibility: ${({ isLoading }) => isLoading && `hidden`};
  margin: 0 auto 10%;

  @media ${({ theme }) => theme.size.mobile} {
    margin: 0 auto 30%;
  }
`;

const AuthWaitingText = styled.p`
  color: ${({ theme }) => theme.color.main};
  font-size: 16px;
  text-align: center;
  margin-bottom: 16px;
`;

const AvatarWrapper = styled.div`
  /* width: clamp(360px, 30vw, 600px); */
  width: clamp(360px, 40vw, 600px);
`;

const Paragraph = styled.p`
  font-size: clamp(1rem, 2vw, 1.5rem);
  line-height: 25px;
  font-weight: 300;
  text-align: center;

  @media ${({ theme }) => theme.size.mobile} {
    font-size: 18px;
  }

  & em {
    color: ${({ theme }) => theme.color.main};
    font-weight: bold;
  }
`;

const DetailButton = styled.button`
  font-weight: 400;
  font-size: 18px;
  padding: 10px 36px;
  border-radius: 113.374px;
  background-color: white;
  color: ${({ theme }) => theme.color.main};
  border: 1.13374px solid ${({ theme }) => theme.color.main};
  margin-right: 12px;
`;

export default memo(Main);
