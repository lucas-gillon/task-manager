import "bootstrap/dist/css/bootstrap.css";
import "../styles/style.css"
import type { AppProps } from "next/app";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { SSRProvider } from "react-bootstrap";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SSRProvider>
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </SSRProvider>

  );
}
