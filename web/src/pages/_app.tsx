import type { AppProps } from "next/app";
import "../styles/Styles.css";
import "../styles/Admin-Members.scss";
import "../styles/Dropzone.scss";
import "../styles/Carousel.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "../styles/Admin-Aboutus.scss";
import "../styles/Admin-Projects.scss";
import "../styles/Admin-Gallery.scss";
import "../styles/Header.scss";
import "../styles/Card.scss";
import "../styles/Footer.scss";
import "../styles/Aboutus.scss";
import "../styles/Article.scss";
import "../styles/Karta.scss";
import "../styles/Gallery.scss";
import "../styles/Admin-Menu.scss";

import "@fancyapps/ui/dist/carousel.css";
// import "@fancyapps/ui/dist/fancybox.css";
import "../styles/FancyApp.scss";
import "../styles/Nariai.scss";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};
export default MyApp;
