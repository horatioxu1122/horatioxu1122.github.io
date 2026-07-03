import type { Profile } from "./types";

// ─────────────────────────────────────────────────────────────
// EDIT ME — this is the single source of truth for your identity.
// Both the terminal and the classic website read from here.
// ─────────────────────────────────────────────────────────────

export const profile: Profile = {
  name: "Jingyan (Horatio) Xu",
  nickname: undefined, // e.g. "Ray"
  pronunciation: undefined, // e.g. "hoh-RAY-shee-oh"
  nameNote: 'My name is pronounced "JING-yahn shoo", in case you\'d like to call me that.',
  title: "PhD Student in Computer Science",
  affiliation: "Fordham University",
  // affiliationLogo: "/logos/fordham.png",
  location: "New York, USA",
  tagline: "I research in AI safety to prevent or reduce harms caused by AI systems.",
  bio: [
    "Hello! I'm a third-year PhD candidate at [Department of Computer and Information Sciences](https://www.fordham.edu/academics/departments/computer-and-information-science/), [Fordham University](https://www.fordham.edu/) ![Fordham](/logos/fordham.png), and a member of the Labratory of Informatics and Data Mining. I am currently advised by [Dr. D. Frank Hsu](https://www.fordham.edu/academics/departments/computer-and-information-science/faculty-and-administration/frank-hsu/).",
  ],
  researchInterests: [
    {
      title: "Model fusion",
      description:
        "Detect and mitigate biases in AI, and apply model fusion techniques in real world AI and computational-X applications.",
    },
    {
      title: "Legal compliance for AI",
      description:
        "Design and develop policies or legality-aware AI systems to prevent consumer loss.",
    },
    {
      title: "Computational social science",
      description:
        "Investigate how new technologies can socially, culturally, and economically shape entire societies; predict elections.",
    },
  ],
  researchArea: "safety and trustworthiness in ML/AI",
  // EDIT ME — a paragraph or two expanding on your research directions.
  researchOverview: [
    "My primary research focuses on model fusion through Combinatorial Fusion Analysis (CFA): a paradigm that detect biases and mitigates them through fusion of multiple diverse/biased models to convert raw data to actionable knowledge (through informatics) and develop efficient and effective intelligent systems. Recent work spans NLP, computational finance, and quantum-classical hybrid computing systems. The CFA contributes broadly to numerous [X-informatics/computational-X](https://www.microsoft.com/en-us/research/wp-content/uploads/2009/10/Fourth_Paradigm.pdf) domains.", 
    "In addition, I'm also interested in area where computer science is related to technology law, ethics, and policy, especially related to security, privacy, transparency in digital technologies and political science. Lately, my research contributes to realizing legally responsible and explainable AI. "
  ],
  email: "jxu246@fordham.edu",
  socials: [
    { label: "Google Scholar", href: "https://scholar.google.com/citations?user=kdYFjUwAAAAJ&hl=en", handle: "Scholar" },
    { label: "GitHub", href: "https://github.com/horatioxu1122", handle: "@horatioxu1122" },
    { label: "Twitter", href: "https://x.com/horatioxu1122", handle: "@horatioxu1122" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/jingyanxu1999/", handle: "in/jingyanxu1999" },
    { label: "Substack", href:"https://horatioxu.substack.com/"},
  ],
  cv: "/CV.pdf", // drop a cv.pdf into /public
  photo: "/profile.jpg", // drop a square profile.jpg into /public (optional)
};
