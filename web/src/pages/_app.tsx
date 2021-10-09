import type { AppProps } from "next/app";
import "../styles/Styles.css";
import "../styles/Header.css";
import "../styles/Footer.css";
import "../styles/Admin-Projects.css";
import "../styles/Admin-Gallery.css";
import "../styles/Admin-Members.css";
import "../styles/Dropzone.css";
import "../styles/Article.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "../styles/Card.scss";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};
export default MyApp;
