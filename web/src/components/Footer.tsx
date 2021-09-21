import React, { FC } from "react";
import { useContactsQuery, useSocialLinksQuery } from "../generated/graphql";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";

interface FooterProps {}
type LinkType = { text: string; link: string | null; iconSrc: string | null };
const Footer: FC<FooterProps> = ({}) => {
  const footerLinks = [
    {
      name: "Socialiniai Tinklai",
      links: [
        {
          text: "Instagram",
          link: "https://www.instagram.com/iearn_ziezmariai_lithuania/",
          iconSrc: null,
        },
        {
          text: "Facebook",
          link: "https://www.instagram.com/iearn_ziezmariai_lithuania/",
          iconSrc: null,
        },
        {
          text: "YouTube",
          link: "https://www.instagram.com/iearn_ziezmariai_lithuania/",
          iconSrc: null,
        },
        {
          text: "iEARN",
          link: "https://www.instagram.com/iearn_ziezmariai_lithuania/",
          iconSrc: null,
        },
      ],
    },
    {
      name: "Kontaktai",
      links: [
        {
          text: "Instagram",
          link: null,
          iconSrc: null,
        },
        {
          text: "Kocienė@gmail.com",
          link: null,
          iconSrc: null,
        },
        {
          text: "Bachūras420@bing.com",
          link: null,
          iconSrc: null,
        },
        {
          text: "+370 6841 2129",
          link: null,
          iconSrc: null,
        },
      ],
    },
  ];

  const [{ data: links, fetching: fLinks, error: lError }] =
    useSocialLinksQuery();
  const [{ data: contacts, fetching: fcontacts, error: cError }] =
    useContactsQuery();

  return (
    <footer className="footer">
      <div className="footer-links">
        <div>
          <h3>Socialiniai Tinklai</h3>
          <ul>
            {!links?.socialLinks.instagram ? null : (
              <li>
                <a
                  rel="noopener noreferrer"
                  target="_blank"
                  href={links?.socialLinks.instagram}
                >
                  <FaInstagram />
                  &nbsp;
                  <span>Instagram</span>
                </a>
              </li>
            )}
            {!links?.socialLinks.facebook ? null : (
              <li>
                <a
                  rel="noopener noreferrer"
                  target="_blank"
                  href={links?.socialLinks.facebook}
                >
                  <FaFacebook />
                  &nbsp;
                  <span>Facebook</span>
                </a>
              </li>
            )}
            {!links?.socialLinks.youtube ? null : (
              <li>
                <a
                  rel="noopener noreferrer"
                  target="_blank"
                  href={links?.socialLinks.youtube}
                >
                  <FaYoutube />
                  &nbsp;
                  <span>Youtube</span>
                </a>
              </li>
            )}
            {!links?.socialLinks.iearnGlobal ? null : (
              <li>
                <a
                  rel="noopener noreferrer"
                  target="_blank"
                  href={links?.socialLinks.iearnGlobal}
                >
                  <span>iEARN</span>
                </a>
              </li>
            )}
          </ul>
        </div>
        {!contacts ? null : (
          <div>
            <h3>Kontaktai</h3>
            <ul>
              {contacts?.contacts.map((c) => (
                <li key={c.id}>
                  <a>
                    <span>{c.contact}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <hr />
      <p>©2021 iEARN Žiežmarių klubas. Visos teisės saugomos.</p>
    </footer>
  );
};

export default Footer;
