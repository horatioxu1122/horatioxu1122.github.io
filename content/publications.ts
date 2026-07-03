import type { Publication } from "./types";

// EDIT ME — newest first. Use **You** to bold your own name in `authors`.
// award: "Distinguished Paper Award",
// `id` is a short slug used by the terminal command `cat pub <id>`.
export const publications: Publication[] = [
  {
    id: "Model_Xu_2025",
    title: "A Model Fusion Approach for Enhancing Credit Approval Decision Making",
    authors: "**Jingyan Xu**, Yuanhong Wu, Wei Ye, Christina Schweikert, D. Frank Hsu",
    venue: "2025 IEEE International Conference on AI x Business (AIxB)",
    year: 2025,
    links: [
      { label: "arXiv", href: "https://arxiv.org/abs/2601.12684" },
      { label: "PDF", href: "https://arxiv.org/pdf/2601.12684" },
    ],
    abstract:
      "One short paragraph summarizing the contribution. The terminal shows this when a visitor runs `cat pub example26`.",
  },
  {
    id: "Enhancing_Xu_2025",
    title: "Enhancing SDG-Text Classification with Combinatorial Fusion Analysis and Generative AI",
    authors: "**Jingyan Xu**, Marcelo T. LaFleur, Christina Schweikert, D. Frank Hsu",
    venue: "2025 IEEE Conference on Pervasive and Intelligent Computing (PICom)",
    year: 2025,
    links: [
      { label: "arXiv", href: "https://arxiv.org/abs/2602.11168" },
      { label: "PDF", href: "https://arxiv.org/pdf/2602.11168" },
    ],
    abstract:
      "One short paragraph summarizing the contribution. The terminal shows this when a visitor runs `cat pub example26`.",
  },
  {
    id: "Bitcoin_Wu_2025",
    title: "Bitcoin Price Prediction using Machine Learning and Combinatorial Fusion Analysis",
    authors: "Yuanhong Wu, Wei Ye, **Jingyan Xu**, D. Frank Hsu",
    venue: "2025 IEEE Conference on Artificial Intelligence (CAI)",
    year: 2025,
    links: [
      { label: "arXiv", href: "https://arxiv.org/abs/2602.00037" },
      { label: "PDF", href: "https://arxiv.org/pdf/2602.00037" },
    ],
    abstract:
      "One short paragraph summarizing the contribution. The terminal shows this when a visitor runs `cat pub example26`.",
  },
  {
    id: "InFusionLayer_Roginek_2024",
    title: "InFusionLayer: a CFA-based ensemble tool to generate new classifiers for learning and modeling",
    authors: "Eric Roginek, **Jingyan Xu**, D. Frank Hsu",
    venue: "2024 IEEE 36th International Conference on Tools with Artificial Intelligence (ICTAI)",
    year: 2024,
    links: [
      { label: "PDF", href: "https://arxiv.org/pdf/2603.10049" },
      { label: "arXiv", href: "https://arxiv.org/abs/2603.10049" },
      { label: "Code", href: "https://github.com/ewroginek/InFusion"},
    ],
  },
];
