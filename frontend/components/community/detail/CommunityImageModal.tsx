import styled from "styled-components";
import Image from "next/image";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";

import Icon from "components/common/Icon";

const ModalOverlay = styled.div<{ visible: boolean }>`
  box-sizing: border-box;
  display: ${(props) => (props.visible ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: #00000086;
  z-index: 999;
`;

const ModalWrapper = styled.div<{ visible: boolean }>`
  box-sizing: border-box;
  display: ${(props) => (props.visible ? "block" : "hidden")};
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  overflow: auto;
  outline: 0;
`;

const IconWrapper = styled.div`
  display: flex;
  flex-direction: row-reverse;
  position: relative;
  top: 8rem;
  padding: 0 2rem;
`;

const ModalInner = styled.div`
  display: flex;
  justify-content: center;
  align-self: center;
  position: relative;
  top: 28%;
  font-size: 14px;
  color: #00000086;
  margin: 0;
  padding: 0;

  .swiper {
    width: 100%;
    height: 100%;
  }

  .swiper-slide {
    text-align: center;
    font-size: 18px;

    /* Center slide text vertically */
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
  }

  .image {
    object-fit: contain;
  }
`;

interface ImageProps {
  open: boolean;
  setOpen: any;
  imageList: Array<string>;
}

export default function CommunityImageModal({
  open,
  setOpen,
  imageList,
}: ImageProps) {
  const onClose = () => {
    setOpen(false);
  };
  const onMaskClick = (e: any) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <>
      {open ? (
        <>
          <ModalOverlay visible={open} />
          <ModalWrapper visible={open} tabIndex={-1} onClick={onMaskClick}>
            <IconWrapper tabIndex={1} onClick={onClose}>
              <Icon mode="fas" icon="xmark" color="#ffffff" size="3rem" />
            </IconWrapper>
            <ModalInner
              tabIndex={0}
              className="modal-inner"
              onClick={onMaskClick}
            >
              <Swiper
                slidesPerView={1}
                pagination={true}
                modules={[Pagination]}
                className="mySwiper"
              >
                {imageList?.map((image, idx) => (
                  <SwiperSlide
                    key={idx}
                    style={{
                      width: "100%",
                      height: "30rem",
                      position: "relative",
                    }}
                  >
                    {/* <Image src={image} alt="" width={400} height={300} /> */}
                    <Image src={image} alt="" layout="fill" className="image" />
                  </SwiperSlide>
                ))}
              </Swiper>
            </ModalInner>
          </ModalWrapper>
        </>
      ) : null}
    </>
  );
}
