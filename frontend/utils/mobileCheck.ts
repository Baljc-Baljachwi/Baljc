export const isMobile = () =>
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

export const webviewCheck = () => {
  const type = navigator.userAgent.match(/KAKAOTALK|Twitter|Facebook|Instagram/) as string[] | null;
  return type?.length ? type[0] : null;
};
