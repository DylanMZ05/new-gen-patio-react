import { useEffect } from "react";
import type { AppProps } from "next/app";
import { sendMetaEvent } from "../../utils/sendMetaEvents";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    sendMetaEvent({
      eventName: "PageView", // Evento de visualización de página
    });
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;