import useFetchData from "@/hooks/useFetchData";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { IoLanguage, IoNotificationsSharp } from "react-icons/io5";
import { MdOutlineStickyNote2 } from "react-icons/md";
import { PiWindowsLogoBold } from "react-icons/pi";
import { VscThreeBars } from "react-icons/vsc";

export default function Header() {
  const { data: session } = useSession();
  const { alldata, loading } = useFetchData("/api/getmovies");
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [openSearch, setOpenSearch] = useState(false);
  const publishedMovies = alldata.filter((ab) => ab.status === "publish");
  const handleOpen = () => {
    setOpenSearch(!openSearch);
  };
  const handleClose = () => {
    setSearchQuery("");
    setOpenSearch(false);
  };
  const filteredMovies =
    searchQuery.trim() === ""
      ? publishedMovies
      : publishedMovies.filter((movie) =>
          movie.title.toLowerCase().includes(searchQuery.toLowerCase())
        );

  return (
    <>
      <header className="header">
        <div className="flex flex-sb">
          {session ? (
            <div className="headerbar">
              <VscThreeBars onClick={() => router.push("/")} />
            </div>
          ) : null}
          {session ? (
            <div className="searchheaderinput">
              <input
                type="text"
                placeholder="Search Here...."
                value={searchQuery}
                onClick={handleOpen}
              />
            </div>
          ) : null}
          {session ? (
            <ul className="flex gap-2">
              <Link href="/">
                <li>
                  <PiWindowsLogoBold />
                </li>
              </Link>
              <Link href="/">
                <li>
                  <IoLanguage />
                </li>
              </Link>
              <Link href="/">
                <li>
                  <IoNotificationsSharp />
                </li>
              </Link>
              <Link href="/">
                <li>
                  <MdOutlineStickyNote2 />
                </li>
              </Link>
              <Link href="/">
                <li>
                  <img src="/img/user.png" alt="User" />
                </li>
              </Link>
            </ul>
          ) : null}
        </div>
        {openSearch && (
          <div className="fixedsearchq">
            <input
              type="text"
              placeholder="Search Here...."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <div className="searchresultofinput">
                <>
                  {filteredMovies.length > 0 ? (
                    <>
                      {filteredMovies.slice(0, 10).map((movie) => {
                        return (
                          <div key={movie._id} className="siresult">
                            <img src={`${movie.smposter}`} alt="Movie Poster" />
                            <div className="simoveinfo">
                              <h3>{movie.title}</h3>
                              <div className="udbtns">
                                <Link
                                  href={`/movies/edit/${movie._id}`}
                                  onClick={handleClose}
                                >
                                  Update
                                </Link>
                                <Link
                                  href={`/movies/delete/${movie._id}`}
                                  onClick={handleClose}
                                >
                                  Delete
                                </Link>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </>
                  ) : (
                    <div className="w-100 flex flex-center">
                      No movies found
                    </div>
                  )}
                </>
              </div>
            )}
            <button className="closesearch" onClick={handleClose}>
              X
            </button>
          </div>
        )}
      </header>
    </>
  );
}
