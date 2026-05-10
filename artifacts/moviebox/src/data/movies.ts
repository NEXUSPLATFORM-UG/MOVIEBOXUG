export interface Movie {
  id: string;
  title: string;
  href: string;
  poster: string;
  badge?: string;
}

export interface BannerSlide {
  id: string;
  title: string;
  subtitle: string;
  genres: string;
  year: string;
  href: string;
  bgImage: string;
  bgColor: string;
  type: "series" | "movie" | "animation";
}

const TMDB = "https://image.tmdb.org/t/p/w300";
const TMDB_BG = "https://image.tmdb.org/t/p/w1280";

export const bannerSlides: BannerSlide[] = [
  {
    id: "euphoria-s3",
    title: "Euphoria S3",
    subtitle: "Euphoria",
    genres: "Drama",
    year: "2025",
    href: "/web/tv-series/euphoria-s3",
    bgImage: `${TMDB_BG}/o7uk5ChRt3quPIv8PcvPfzyXdMo.jpg`,
    bgColor: "#66594a",
    type: "series",
  },
  {
    id: "the-last-of-us-s2",
    title: "The Last of Us S2",
    subtitle: "The Last of Us",
    genres: "Drama,Horror",
    year: "2025",
    href: "/web/tv-series/the-last-of-us-s2",
    bgImage: `${TMDB_BG}/9flBhDOaEFr8RDnzHjTYvT0NtbW.jpg`,
    bgColor: "#3d4a2d",
    type: "series",
  },
  {
    id: "citadel-s2",
    title: "Citadel S2",
    subtitle: "Citadel",
    genres: "Action,Thriller",
    year: "2025",
    href: "/web/tv-series/citadel-s2",
    bgImage: `${TMDB_BG}/A2xyMYMOr4csCiVNtfGsTgFVEb8.jpg`,
    bgColor: "#65493b",
    type: "series",
  },
  {
    id: "the-boys-s5",
    title: "The Boys S5",
    subtitle: "The Boys",
    genres: "Action,Comedy",
    year: "2025",
    href: "/web/tv-series/the-boys-s5",
    bgImage: `${TMDB_BG}/2zmTngn1tYC1AvfnrFLhxeD82hz.jpg`,
    bgColor: "#1c2832",
    type: "series",
  },
  {
    id: "final-destination-bloodlines",
    title: "Final Destination: Bloodlines",
    subtitle: "Final Destination: Bloodlines",
    genres: "Horror,Mystery",
    year: "2025",
    href: "/moviedetail/final-destination-bloodlines",
    bgImage: `${TMDB_BG}/2VK4d3mqqTc7LVZLnpnS8xMEuHm.jpg`,
    bgColor: "#2d2030",
    type: "movie",
  },
];

export const popularSeries: Movie[] = [
  { id: "euphoria-s3",        title: "Euphoria S3",          href: "/web/tv-series/euphoria-s3",         poster: `${TMDB}/o7uk5ChRt3quPIv8PcvPfzyXdMo.jpg` },
  { id: "the-last-of-us-s2",  title: "The Last of Us S2",    href: "/web/tv-series/the-last-of-us-s2",    poster: `${TMDB}/uKvVjHNqB5VmOrdxqAt2F7J78ED.jpg` },
  { id: "citadel-s2",         title: "Citadel S2",           href: "/web/tv-series/citadel-s2",           poster: `${TMDB}/A2xyMYMOr4csCiVNtfGsTgFVEb8.jpg` },
  { id: "the-boys-s5",        title: "The Boys S5",          href: "/web/tv-series/the-boys-s5",          poster: `${TMDB}/2zmTngn1tYC1AvfnrFLhxeD82hz.jpg` },
  { id: "squid-game-s3",      title: "Squid Game S3",        href: "/web/tv-series/squid-game-s3",        poster: `${TMDB}/dDlEmu3EZ0P1UGx1gkTe2mn3XJR.jpg` },
  { id: "black-mirror-s7",    title: "Black Mirror S7",      href: "/web/tv-series/black-mirror-s7",      poster: `${TMDB}/7PnBhS7Vp0vLdIHOGr5XwH9Ns0N.jpg` },
  { id: "andor-s2",           title: "Andor S2",             href: "/web/tv-series/andor-s2",             poster: `${TMDB}/59SVNwLfoE4MJnOqFoD3cFPRDLQ.jpg` },
  { id: "severance-s2",       title: "Severance S2",         href: "/web/tv-series/severance-s2",         poster: `${TMDB}/b2pF0vMRqWv9HQT4aPLxPNBgknS.jpg` },
  { id: "from-s4",            title: "From S4",              href: "/web/tv-series/from-s4",              poster: `${TMDB}/npnCPGtDPPkCxnMFDSLaOqrfsmU.jpg` },
  { id: "yellowjackets-s3",   title: "Yellowjackets S3",     href: "/web/tv-series/yellowjackets-s3",     poster: `${TMDB}/g3VKyNMBuXFUHhFnIDAGzBnHZJh.jpg` },
  { id: "daredevil",          title: "Daredevil: Born Again", href: "/web/tv-series/daredevil-born-again", poster: `${TMDB}/nc6Z9tnSYeJwuFqiGm9BDAbYAOp.jpg` },
  { id: "silo-s2",            title: "Silo S2",              href: "/web/tv-series/silo-s2",              poster: `${TMDB}/7T2HtxNR0HPZS3DmVoGmIrEfXVN.jpg` },
];

export const popularMovies: Movie[] = [
  { id: "final-destination",  title: "Final Destination: Bloodlines", href: "/moviedetail/final-destination-bloodlines", poster: `${TMDB}/2VK4d3mqqTc7LVZLnpnS8xMEuHm.jpg` },
  { id: "sinners",            title: "Sinners",                       href: "/moviedetail/sinners",                       poster: `${TMDB}/u3B2YKUjW7PwznCNFHj2Pcs78P2.jpg` },
  { id: "minecraft",          title: "A Minecraft Movie",             href: "/moviedetail/a-minecraft-movie",             poster: `${TMDB}/iPPTGh2YWLDD8oLMQz3KQVC7lfW.jpg` },
  { id: "mission-impossible", title: "Mission: Impossible – The Final Reckoning", href: "/moviedetail/mission-impossible-final-reckoning", poster: `${TMDB}/z53D72EAOxGRqdr7KXXWp9dJiDe.jpg` },
  { id: "novocaine",          title: "Novocaine",                     href: "/moviedetail/novocaine",                     poster: `${TMDB}/5bfCpN5EHsADdUfSPJ8rnXMT38G.jpg` },
  { id: "warfare",            title: "Warfare",                       href: "/moviedetail/warfare",                       poster: `${TMDB}/lSuM97AXPKfSCCyH1UAnknPBcvH.jpg` },
  { id: "silent-hill",        title: "Silent Hill",                   href: "/moviedetail/silent-hill",                   poster: `${TMDB}/gXfNHXAK5KUbP2k0sEVR0SjVCqo.jpg` },
  { id: "primate",            title: "Primate",                       href: "/moviedetail/primate",                       poster: `${TMDB}/qHmKVrPKbmLHAKAOAAnBhTOlFSq.jpg` },
  { id: "we-bury-the-dead",   title: "We Bury the Dead",              href: "/moviedetail/we-bury-the-dead",              poster: `${TMDB}/m0OdBJLzPpuLCNhc3GPqSFJCCR6.jpg` },
  { id: "fnaf2",              title: "Five Nights at Freddy's 2",     href: "/moviedetail/five-nights-at-freddys-2",      poster: `${TMDB}/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg`, badge: "New" },
  { id: "fnaf",               title: "Five Nights at Freddy's",       href: "/moviedetail/five-nights-at-freddys",        poster: `${TMDB}/A4j8S6moJS2zNtRR8T9ukPqHiLa.jpg` },
  { id: "keeper",             title: "Keeper",                        href: "/moviedetail/keeper",                        poster: `${TMDB}/3NTAbAiao4JLzFQw6YxP1YZppM8.jpg` },
];

export const animeList: Movie[] = [
  { id: "dandadan",           title: "DanDaDan S2",            href: "/web/animated-series/dandadan-s2",         poster: `${TMDB}/wRuNYoFhWqvTBnRGAMDHv2LSRIl.jpg` },
  { id: "my-hero-academia",   title: "My Hero Academia",        href: "/web/animated-series/my-hero-academia",    poster: `${TMDB}/ivOLM47yJt90P19RH826RcFMgth.jpg` },
  { id: "bleach-tybw",        title: "Bleach: TYBW",            href: "/web/animated-series/bleach-tybw",         poster: `${TMDB}/2EewmxXe72ogD0EaWM8gqa0MPLT.jpg` },
  { id: "one-piece",          title: "One Piece",               href: "/web/animated-series/one-piece",           poster: `${TMDB}/cMD9Ygz11zjJzAovURpO75Gc7f5.jpg` },
  { id: "jujutsu-kaisen",     title: "Jujutsu Kaisen S3",       href: "/web/animated-series/jujutsu-kaisen-s3",   poster: `${TMDB}/oiQDW7YCHZ2djFmM8WRQGFbg2r9.jpg` },
  { id: "dragon-ball-daima",  title: "Dragon Ball Daima",       href: "/web/animated-series/dragon-ball-daima",   poster: `${TMDB}/y3PNTGPMkiT42SKw21nGRblk8F6.jpg` },
  { id: "attack-on-titan",    title: "Attack on Titan",         href: "/web/animated-series/attack-on-titan",     poster: `${TMDB}/hYqkAr3RhiPRRSBKP1sQKD3YhxJ.jpg` },
  { id: "demon-slayer",       title: "Demon Slayer S4",         href: "/web/animated-series/demon-slayer-s4",     poster: `${TMDB}/wrjA16O2xt2bWMcFMpQMFXAbfW0.jpg` },
  { id: "solo-leveling",      title: "Solo Leveling S2",        href: "/web/animated-series/solo-leveling-s2",    poster: `${TMDB}/geCRueV3ElhRTr0xtJuEWJt6dJ1.jpg` },
  { id: "re-zero",            title: "Re:ZERO S3 Part 2",       href: "/web/animated-series/rezero-s3p2",         poster: `${TMDB}/bMrGRFDTHVj7kEAKX5vLgJLVBUQ.jpg` },
  { id: "wind-breaker",       title: "Wind Breaker S2",         href: "/web/animated-series/wind-breaker-s2",     poster: `${TMDB}/1xCBhJZc9mVj8RIgPVRbN5XjQNO.jpg` },
  { id: "kaiju-no-8",         title: "Kaiju No. 8 S2",          href: "/web/animated-series/kaiju-no-8-s2",       poster: `${TMDB}/pqYHe4yiGr4BkLCxpWgn35xJtG2.jpg` },
];

export const blackShows: Movie[] = [
  { id: "sistas",             title: "Sistas",                  href: "/moviedetail/sistas",                      poster: `${TMDB}/gKG5QGz5Ngf8fgWpBsXZs5GlRdB.jpg` },
  { id: "family-business",    title: "The Family Business",     href: "/moviedetail/the-family-business",         poster: `${TMDB}/vhyFCHIp5CdZTwxz1uFNYOoAPdw.jpg` },
  { id: "bel-air",            title: "Bel-Air",                 href: "/moviedetail/bel-air",                     poster: `${TMDB}/7BJbr6XFItubFbN2DpMYdYinCiU.jpg` },
  { id: "abbott-elementary",  title: "Abbott Elementary",       href: "/moviedetail/abbott-elementary",           poster: `${TMDB}/hfvHBbDFUeqhJmOEIqoFk3XNUXH.jpg` },
  { id: "a-man-in-full",      title: "A Man in Full",           href: "/moviedetail/a-man-in-full",               poster: `${TMDB}/A2FPiM7vNEjV68RoiUMCpfJNMSZ.jpg` },
  { id: "snowfall",           title: "Snowfall",                href: "/moviedetail/snowfall",                    poster: `${TMDB}/mvp9mSa7UBmKA0TSTQxX4xhLFjD.jpg` },
  { id: "power",              title: "Power",                   href: "/moviedetail/power",                       poster: `${TMDB}/ggFHVNu6YYI5L9pCfOacjizRGt.jpg` },
  { id: "the-oval",           title: "Tyler Perry's The Oval",  href: "/moviedetail/the-oval",                    poster: `${TMDB}/2bMEUAXzUHkK1lPuNKNQzGi8gCl.jpg` },
  { id: "raising-kanan",      title: "Power Book III: Raising Kanan", href: "/moviedetail/raising-kanan",         poster: `${TMDB}/9JiBqFwFN3WFEWFUePT4yIWnOdN.jpg` },
  { id: "ghost",              title: "Power Book II: Ghost",    href: "/moviedetail/power-ghost",                 poster: `${TMDB}/6B5gClvSmJNUXCKtcLEAKPv1cDr.jpg` },
  { id: "queen-sugar",        title: "Queen Sugar",             href: "/moviedetail/queen-sugar",                 poster: `${TMDB}/rFZZ5zMYgDdm3ksFBEHbzAzpqTy.jpg` },
  { id: "grown-ish",          title: "Grown-ish",               href: "/moviedetail/grown-ish",                   poster: `${TMDB}/1ZkZ0bDPMbKqIVKFGHMvYqKlxEK.jpg` },
];

export const trendingShows: Movie[] = [
  { id: "swapped",            title: "Swapped",                 href: "/web/animated-series/swapped",             poster: `${TMDB}/tPWkStNmjCDzQN0bqYhJanKfHt7.jpg` },
  { id: "man-on-fire",        title: "Man on Fire",             href: "/moviedetail/man-on-fire",                 poster: `${TMDB}/d9MPAl1Y65JQEFNt1SGpJwPtGpT.jpg` },
  { id: "bad-boys-5",         title: "Bad Boys: Ride or Die",   href: "/moviedetail/bad-boys-ride-or-die",        poster: `${TMDB}/oGythE98MYleE6mZlGs5oBGkux1.jpg` },
  { id: "companion",          title: "Companion",               href: "/moviedetail/companion",                   poster: `${TMDB}/f9O4vJMoL2EMp7xhHo6FLnSNNEH.jpg` },
  { id: "predator-badlands",  title: "Predator: Badlands",      href: "/moviedetail/predator-badlands",           poster: `${TMDB}/eTZOJHXhOS4AoMbJ1DFk0CT7e3r.jpg` },
  { id: "locked",             title: "Locked",                  href: "/moviedetail/locked",                      poster: `${TMDB}/bSTIdMCfrHM10qLyLmA5Y01q4Mv.jpg` },
  { id: "the-studio",         title: "The Studio",              href: "/web/tv-series/the-studio",                poster: `${TMDB}/5Eip60UDiPLASyKjmHJR5NKDfXF.jpg` },
  { id: "they-will-kill-you", title: "They Will Kill You",      href: "/moviedetail/they-will-kill-you",          poster: `${TMDB}/kErZdKGNOAGkpjl17VVQM7R4k1N.jpg` },
  { id: "apex",               title: "Apex",                    href: "/moviedetail/apex",                        poster: `${TMDB}/7mNDfCJRFjKHCZkOl7IFLR6Hnyp.jpg` },
  { id: "the-elixir",         title: "The Elixir",              href: "/moviedetail/the-elixir",                  poster: `${TMDB}/i5t2rAGNkAuH08zRBf4RuCZSzJ4.jpg` },
  { id: "long-walk",          title: "The Long Walk",           href: "/moviedetail/the-long-walk",               poster: `${TMDB}/6WxhEvFsauuACfv8HyoVX6mZKFl.jpg` },
  { id: "warfare",            title: "Warfare",                 href: "/moviedetail/warfare",                     poster: `${TMDB}/lSuM97AXPKfSCCyH1UAnknPBcvH.jpg` },
];
