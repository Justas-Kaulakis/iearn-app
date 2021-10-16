import type { AppProps } from "next/app";
import "../styles/Styles.css";
import "../styles/Admin-Projects.css";
import "../styles/Admin-Gallery.css";
import "../styles/Admin-Members.css";
import "../styles/Dropzone.css";
import "../styles/Article.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "../styles/Header.scss";
import "../styles/Card.scss";
import "../styles/Nariai.scss";
import "../styles/Footer.scss";
import "../styles/Aboutus.scss";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};
export default MyApp;
