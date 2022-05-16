import styled from "styled-components";
import withReveal from "react-reveal/withReveal";
import Fade from "react-reveal/Fade";

export interface IProps {
  onClick?: React.MouseEventHandler;
  screenHeight: number;
}

export const Layouts = {
  Wrapper: styled.section<{ backgroundColor?: string }>`
    height: 100vh;
    background: ${({ backgroundColor }) => backgroundColor};
    position: relative;
    flex: none;
    scroll-snap-align: start;
  `,

  Container: styled.div<{ reverse?: boolean }>`
    width: 80%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: ${({ reverse }) => (reverse ? "row-reverse" : "row")};
    margin: 0 auto;

    @media ${({ theme }) => theme.size.mobile} {
      flex-direction: column;
      justify-content: center;
      gap: 30px;
    }

    margin: auto;
  `,

  Content: withReveal(
    styled.article`
      flex: none;
      /* font-size: clamp(1.3rem, 2vw, 2rem); */
      font-size: clamp(1.3rem, 2vw, 3rem);
      letter-spacing: -0.05em;
      white-space: pre-line;
      line-height: 1.7;
      font-weight: 300;

      & b {
        font-weight: 500;
      }

      & em {
        font-weight: 600;
        color: ${({ theme }) => theme.color.main};
      }

      @media ${({ theme }) => theme.size.mobile} {
        width: 100%;
      }
    `,
    <Fade bottom delay={150} />
  ),

  Image: withReveal(
    styled.img`
      height: 80vh;
      scroll-snap-align: center;

      @media ${({ theme }) => theme.size.mobile} {
        height: 65vh;
      }
    `,
    <Fade delay={150} />
  ),

  ButtonWrapper: styled.div<{ screenHeight: number }>`
    position: absolute;
    bottom: ${({ screenHeight }) => `${screenHeight * 0.1}px`};

    @media ${({ theme }) => theme.size.tablet} {
      bottom: ${({ screenHeight }) => `${screenHeight * 0.15}px`};
    }
  `,

  ScrollDownButton: styled.button`
    &:before {
      font-size: 3rem;
      color: black;
      content: "⌄";
    }
  `,
};
