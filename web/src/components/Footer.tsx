import React, { FC } from "react";
import { useContactsQuery, useSocialLinksQuery } from "../generated/graphql";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";

interface FooterProps {}
type LinkType = { text: string; link: string | null; iconSrc: string | null };
const Footer: FC<FooterProps> = ({}) => {
  const [{ data: links, fetching: fLinks, error: lError }] =
    useSocialLinksQuery();
  const [{ data: contacts, fetching: fcontacts, error: cError }] =
    useContactsQuery();

  let showContacts = true;
  if (!fcontacts) {
    let all = "";
    for (let i = 0; i < 4; i++) all += contacts?.contacts[i].contact;
    if (all === "") showContacts = false;
  }
  let showLinks = true;
  if (!fLinks) {
    if(links?.socialLinks) {
    const { facebook, iearnGlobal, instagram, youtube } = links?.socialLinks;
    const all = facebook + iearnGlobal + instagram + youtube;
    if (all === "") showLinks = false;
    } else showLinks = false;
  }

  return (
    <footer className="footer">
      <div className="footer-links">
        <div>
          {showLinks ? <h3>Socialiniai Tinklai</h3> : null}
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
        {!showContacts ? null : (
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
      <p>©2022 iEARN Žiežmarių klubas. Visos teisės saugomos.</p>
    </footer>
  );
};

export default Footer;
