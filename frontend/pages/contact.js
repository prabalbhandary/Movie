import Link from "next/link";
import { HiMiniBars3BottomRight } from "react-icons/hi2";
import { AiFillSetting } from "react-icons/ai";
import { IoLogoInstagram } from "react-icons/io5";
import { RiTelegramLine } from "react-icons/ri";
import { SiGithub } from "react-icons/si";
import { FaArrowDown } from "react-icons/fa";
import { useState } from "react";
import Head from "next/head";
import useFetchData from "@/hooks/useFetchData";
import Loader from "@/components/Loader";

export default function contact() {
  const [followed, setFollowed] = useState(false);
  const { loading } = useFetchData("/api/getmovies");
  const handleFollowed = () => {
    setFollowed(!followed);
  };
  return (
    <>
      <Head>
        <title>Contact | Makmovies</title>
        <meta name="description" content="All the Web Series" />
      </Head>
      {loading ? (
        <Loader />
      ) : (
        <div className="contactpage">
          <div className="contactcard">
            <div className="contactdesign">
              <div className="topccard">
                <div className="tcardsvg">
                  <HiMiniBars3BottomRight style={{ cursor: "pointer" }} />
                  <AiFillSetting style={{ cursor: "pointer" }} />
                </div>
                <div className="usercoderimg">
                  <img src="/img/coder.jpg" alt="Prabal Bhandary" />
                </div>
                <div className="usercoderinfo">
                  <h1>PRABAL BHANDARY</h1>
                  <h3>Web Developer</h3>
                  <div className="usercodersvg">
                    <Link href="https://www.instagram.com/prabalb44" target="_blank">
                      <IoLogoInstagram />
                    </Link>
                    <Link href="https://www.facebook.com/prabal.bhandary.5" target="_blank">
                      <RiTelegramLine />
                    </Link>
                    <Link href="https://github.com/prabalbhandary" target="_blank">
                      <SiGithub />
                    </Link>
                  </div>
                </div>
              </div>
              <div className="bottomcard">
                <a
                  style={{ cursor: "pointer" }}
                  className="followbtn"
                  onClick={handleFollowed}
                >
                  {followed ? "Unfollow" : "Follow"}
                </a>
                <div className="bcardtext">
                  <p>Learn More About My Profile</p>
                  <FaArrowDown />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
