import Link from "next/link";
import { HiMiniBars3BottomRight } from "react-icons/hi2";
import { AiFillSetting } from "react-icons/ai";
import { IoLogoInstagram } from "react-icons/io5";
import { RiTelegramLine } from "react-icons/ri";
import { SiGithub } from "react-icons/si";
import { FaArrowDown } from "react-icons/fa";
import { useState } from "react";
import Head from "next/head";

export default function contact() {
  const [followed, setFollowed] = useState(false);
  const handleFollowed = () => {
    setFollowed(!followed);
  };
  return (
    <>
      <Head>
        <title>Contact | Makmovies</title>
        <meta name="description" content="All the Web Series" />
      </Head>

      <div className="contactpage">
        <div className="contactcard">
          <div className="contactdesign">
            <div className="topccard">
              <div className="tcardsvg">
                <HiMiniBars3BottomRight />
                <AiFillSetting />
              </div>
              <div className="usercoderimg">
                <img src="/img/coder.jpg" alt="Prabal Bhandary" />
              </div>
              <div className="usercoderinfo">
                <h1>PRABAL BHANDARY</h1>
                <h3>Web Developer</h3>
                <div className="usercodersvg">
                  <Link href="/">
                    <IoLogoInstagram />
                  </Link>
                  <Link href="/">
                    <RiTelegramLine />
                  </Link>
                  <Link href="/">
                    <SiGithub />
                  </Link>
                </div>
              </div>
            </div>
            <div className="bottomcard">
              <Link className="followbtn" onClick={handleFollowed} style={{cursor:"pointer"}}>
                {followed ? "Unfollow" : "Follow"}
              </Link>
              <div className="bcardtext">
                <p>Learn More About My Profile</p>
                <FaArrowDown />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
