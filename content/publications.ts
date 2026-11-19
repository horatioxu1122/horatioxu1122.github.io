import type { Publication } from "./types";

// EDIT ME — newest first. Use **You** to bold your own name in `authors`.
// award: "Distinguished Paper Award",
// `id` is a short unique slug. `abstract` (optional) shows in the paper's window on /browse.
// For an abstract with paragraphs, use a list: abstract: ["First paragraph.", "Second paragraph."],
export const publications: Publication[] = [
  {
    id: "digital_money_2026",
    title: "Who Gets to Be a Bank? Digital Money, Regulatory Design, and the Remaking of Banking: Evidence from the United States, Hong Kong, and Singapore",
    abstract: [
      "Digital money is usually analyzed instrument by instrument: stablecoins, tokenized deposits, and central bank digital currency. That approach cannot explain why three jurisdictions with common-law origins and similar financial ambitions have responded to the same technology so differently. Within six months, the Office of the Comptroller of the Currency conditionally approved five national trust bank charters for digital-asset firms, and the Hong Kong Monetary Authority granted its first stablecoin issuer licenses to institutions tied to the city’s note-issuing banks, while the Monetary Authority of Singapore concentrated on wholesale settlement infrastructure. This Article argues that each jurisdiction is deciding a question that instrument labels obscure: who may perform bank-like functions, which public privileges they receive, and where public support ends.",
      "Drawing on a structured comparison, the Article identifies three regulatory grammars, each operating through a distinct legal technique. The United States relies on chartering: its charter-menu model distributes bank-like functions among national trust banks, full-service de novo banks, incumbent banks issuing deposit tokens, and state special-purpose institutions, and the GENIUS Act adds a statutory layer for stablecoin issuers. Hong Kong relies on licensing, anchoring stablecoin issuance in institutions close to its monetary architecture. Singapore relies on access to infrastructure, organizing tokenized finance around regulator-coordinated settlement networks and wholesale central bank money.",
      "The Article’s central claim is that digital money unbundles bank-like functions technologically, while law rebundles them institutionally by attaching public privileges and obligations to the entities that perform them. Each technique has a characteristic failure point: chartering produces an unstable regulatory perimeter, licensing confers public credibility that holders may mistake for a public backstop, and infrastructure access concentrates discretion in the governance of the settlement layer. The Article therefore proposes that regulatory obligations track the functions an entity performs and the public privileges it receives, and that the boundary of public support be declared ex ante rather than drawn in a crisis.",
    ],
    authors: "Wei Ye, **Jingyan Xu**, Erick W. Rengifo",
    venue: "SSRN",
    year: 2026,
    links: [
      { label: "SSRN", href: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=7674498" },
    ],
  },
  {
    id: "Model_Xu_2025",
    title: "A Model Fusion Approach for Enhancing Credit Approval Decision Making",
    abstract:
      "Credit default poses significant challenges to financial institutions and consumers, resulting in substantial financial losses and diminished trust. As such, credit default risk management has been a critical topic in the financial industry. In this paper, we present Combinatorial Fusion Analysis (CFA), a model fusion framework, that combines multiple machine learning algorithms to detect and predict credit card approval with high accuracy. We present the design methodology and implementation using five pre-trained models. The CFA results show an accuracy of 89.13% which is better than conventional machine learning and ensemble methods.",
    authors: "**Jingyan Xu**, Yuanhong Wu, Wei Ye, Christina Schweikert, D. Frank Hsu",
    venue: "2025 IEEE International Conference on AI x Business (AIxB)",
    year: 2025,
    links: [
      { label: "arXiv", href: "https://arxiv.org/abs/2601.12684" },
      { label: "PDF", href: "https://arxiv.org/pdf/2601.12684" },
    ],  },
  {
    id: "Enhancing_Xu_2025",
    title: "Enhancing SDG-Text Classification with Combinatorial Fusion Analysis and Generative AI",
    abstract:
      "(Natural Language Processing) NLP techniques such as text classification and topic discovery are very useful in many application areas including information retrieval, knowledge discovery, policy formulation, and decision-making. However, it remains a challenging problem in cases where the categories are unavailable, difficult to differentiate, or are interrelated. Social analysis with human context is an area that can benefit from text classification, as it relies substantially on text data. The focus of this paper is to enhance the classification of text according to the UN's Sustainable Development Goals (SDGs) by collecting and combining intelligence from multiple models. Combinatorial Fusion Analysis (CFA), a system fusion paradigm using a rank-score characteristic (RSC) function and cognitive diversity (CD), has been used to enhance classifier methods by combining a set of relatively good and mutually diverse classification models. We use a generative AI model to generate synthetic data for model training and then apply CFA to this classification task. The CFA technique achieves 96.73% performance, outperforming the best individual model. We compare the outcomes with those obtained from human domain experts. It is demonstrated that combining intelligence from multiple ML/AI models using CFA and getting input from human experts can, not only complement, but also enhance each other.",
    authors: "**Jingyan Xu**, Marcelo T. LaFleur, Christina Schweikert, D. Frank Hsu",
    venue: "2025 IEEE Conference on Pervasive and Intelligent Computing (PICom)",
    year: 2025,
    links: [
      { label: "arXiv", href: "https://arxiv.org/abs/2602.11168" },
      { label: "PDF", href: "https://arxiv.org/pdf/2602.11168" },
    ],  },
  {
    id: "Bitcoin_Wu_2025",
    title: "Bitcoin Price Prediction using Machine Learning and Combinatorial Fusion Analysis",
    abstract:
      "In this work, we propose to apply a new model fusion and learning paradigm, known as Combinatorial Fusion Analysis (CFA), to the field of Bitcoin price prediction. Price prediction of financial product has always been a big topic in finance, as the successful prediction of the price can yield significant profit. Every machine learning model has its own strength and weakness, which hinders progress toward robustness. CFA has been used to enhance models by leveraging rank-score characteristic (RSC) function and cognitive diversity in the combination of a moderate set of diverse and relatively well-performed models. Our method utilizes both score and rank combinations as well as other weighted combination techniques. Key metrics such as RMSE and MAPE are used to evaluate our methodology performance. Our proposal presents a notable MAPE performance of 0.19%. The proposed method greatly improves upon individual model performance, as well as outperforms other Bitcoin price prediction models.",
    authors: "Yuanhong Wu, Wei Ye, **Jingyan Xu**, D. Frank Hsu",
    venue: "2025 IEEE Conference on Artificial Intelligence (CAI)",
    year: 2025,
    links: [
      { label: "arXiv", href: "https://arxiv.org/abs/2602.00037" },
      { label: "PDF", href: "https://arxiv.org/pdf/2602.00037" },
    ],  },
  {
    id: "InFusionLayer_Roginek_2024",
    title: "InFusionLayer: a CFA-based ensemble tool to generate new classifiers for learning and modeling",
    abstract:
      "Ensemble learning is a well established body of methods for machine learning to enhance predictive performance by combining multiple algorithms/models. Combinatorial Fusion Analysis (CFA) has provided method and practice for combining multiple scoring systems, using rank-score characteristic (RSC) function and cognitive diversity (CD), including ensemble method and model fusion. However, there is no general-purpose Python tool available that incorporate these techniques. In this paper we introduce InFusionLayer, a machine learning architecture inspired by CFA at the system fusion level that uses a moderate set of base models to optimize unsupervised and supervised learning multiclassification problems. We demonstrate InFusionLayer's ease of use for PyTorch, TensorFlow, and Scikit-learn workflows by validating its performance on various computer vision datasets. Our results highlight the practical advantages of incorporating distinctive features of RSC function and CD, paving the way for more sophisticated ensemble learning applications in machine learning. We open-sourced our code to encourage continuing development and community accessibility to leverage CFA on github: https://github.com/ewroginek/Infusion",
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
