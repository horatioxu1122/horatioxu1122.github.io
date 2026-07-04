import type { AboutContent } from "./types";

// ─────────────────────────────────────────────────────────────
// EDIT ME — content for the "About me" page (/classic/about).
//
// `blocks` is an ordered list rendered top to bottom. Each block is one of:
//   { type: "text",    body: ["paragraph", ...] }          // plain prose
//   { type: "videos",  urls: ["https://youtu.be/...", ...] } // embedded players
//   { type: "section", title: "Heading", body: [...], list?: true } // titled block
//
// Reorder or repeat blocks however you like — e.g. text → videos → text → videos.
// Inline markdown (**bold**, *italic*, [text](url)) is supported in any body/text.
// ─────────────────────────────────────────────────────────────

export const about: AboutContent = {
  blocks: [
    {
      type: "text",
      body: [
        "This is where I unleash the self-centric side of me and talk a little more about me personally. I was born in Shanghai, and moved to New York ever since after spending 13 years of my life there. I received my BS degree from [Applied Mathematics and Statistics](https://www.stonybrook.edu/ams/) and [Economics](https://www.stonybrook.edu/commcms/economics/) departments at [Stony Brook University](https://www.stonybrook.edu/) ![Stony Brook](/logos/stonybrook.png) after hellish 4 years. I completed my Master degree in [Data Science](https://www.fordham.edu/academics/departments/computer-and-information-science/academic-programs/graduate-programs/master-of-science-in-data-science/) at [Fordham University](https://www.fordham.edu/) ![Fordham](/logos/fordham.png). I became a Ph.D. student in 2024.",
        "I was a D2 tennis varsity player during the last two years of high school. For those two years, we played Townsend Harris, Forest Hills, Francis Lewis, and Bayside High, and achieved perfect standing. Eventually, we rose to the No. 3 seed (No. 1 in Queens!) in PSAL playoffs. ",
        "I'm also a quasi-professional piano player. I started playing since 4 and had taken nearly every piano exam on this planet. I attended [Mannes School of Music Pre-College](https://www.newschool.edu/mannes/prep/) ![Mannes](/logos/mannes.png) from 2016-2018. I botched my admission chances to Julliard Pre-College when I submitted an unedited recording of me playing (lol). Luckily I was able to join Mannes (which didn't have a two-round audition rule) and studied under the guidance of wonderful [Irina Edelman](https://www.newschool.edu/mannes/faculty/Irina-Edelman/). ",
        "Here are the (edited) video recordings that I submitted for audition:",
      ],
    },
    {
      type: "videos",
      urls: [
        "https://youtu.be/Np4xL9BpZQM?si=MUVCjxvLGcVUy-Le",
        "https://youtu.be/gj9oLF3Yp8I?si=03RWnPdK8dv1vmDA",
      ],
    },
    {
      type: "text",
      body: [
        "As I graduated Mannes Prep, I've grown more interested in transcribing music into readable music sheets. Some of my works are uploaded [here](https://space.bilibili.com/66518067).",
        "I'm also a highly passionate political science/national security/naval warfare enthusiast. I've been a proud and terminally online member of the Election Twitter and NatSec Twitter for many years (I'm followed by Larry Sabato and Yuan Yi Zhu!). Interact with my politics-focused alt Twitter account through my main profile on homepage!"
      ],
    },
    {
      type: "section",
      title: "Non-Academic Awards",
      list: true,
      body: [
        "1st Place Winner - American Protégé International Music Talent Competition",
        "Associated Board of the Royal Schools of Music (ABRSM) - Grade 8 Piano, Grade 5 Music Theory",
        "Shanghai Conservatory of Music International Examination Board - Grade 2 Piano, Grade 4 Piano, Grade 6 Piano, Grade 8 Piano, Grade 10 Piano, Grade 10 Music Theory",
      ],
    },
  ],
};
