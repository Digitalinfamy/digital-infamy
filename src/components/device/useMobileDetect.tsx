import { useEffect, useState } from "react";

const getMobileDetect = (userAgent: NavigatorID['userAgent']) => {
  const isAndroid = () => Boolean(userAgent.match(/Android/i))
  const isIos = () => Boolean(userAgent.match(/iPhone|iPad|iPod/i))
  const isOpera = () => Boolean(userAgent.match(/Opera Mini/i))
  const isWindows = () => Boolean(userAgent.match(/IEMobile/i))
  const isSSR = () => Boolean(userAgent.match(/SSR/i))
  const isMobile = () => Boolean(isAndroid() || isIos() || isOpera() || isWindows())
  const isDesktop = () => Boolean(!isMobile() && !isSSR())
  return {
    isMobile,
    isDesktop,
    isAndroid,
    isIos,
    isSSR,
  }
}
const useMobileDetect = () => {
  const [nav, setNav] = useState<any | null>(undefined)
  useEffect(() => {
    if (navigator) {
      setNav(navigator);
    }
  }, [])
  const userAgent = typeof nav === 'undefined' ? 'SSR' : nav.userAgent
  return getMobileDetect(userAgent)
}

export default useMobileDetect;