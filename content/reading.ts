import type { ReadingItem } from "./types";

// ─────────────────────────────────────────────────────────────
// EDIT ME — content for the "Reading list" page (/classic/reading).
// Items are grouped by `category` on the page, in first-seen order.
// `note` supports inline markdown (**bold**, *italic*, [text](url)).
// ─────────────────────────────────────────────────────────────

export const reading: ReadingItem[] = [
  {
    category: "Currently reading",
    title: "A Short History of Nearly Everything",
    author: "Bill Bryson",
    href: "https://www.amazon.com/dp/076790818X?lv=shuf&channelId=500&plpRedirect=mhFallback",
    note: "The book helps you to look through the history of the world through a scientific lens. I love science but know absolutely nothing about science, literally can't understand a thing about biology and chemistry (physics is ok-ish), that's why the book's approachable writing for a non-scientist is such a big plus. Anyone with at least a high school level knowledge of science can appreciate it fully, while large parts of it are accessible to most people even below that. Every paragraph dropps something interesting and it's written in funny tone. ",
  },
  {
    category: "(Recent) non-fiction Favorites / Must read",
    title: "Romney: A Reckoning",
    author: "McKay Coppins",
    rating: 5,
    note: "\"The best lack all conviction, while the worst are full of passionate intensity\"",
  },
  {
    category: "(Recent) non-fiction Favorites / Must read",
    title: "Abundance",
    author: "Ezra Klein and Derek Thompson",
    rating: 5,
    note: "\"...those of us who believe in a fairer, gentler, more sustainable world have a stake in bringing forward the technologies that will make that worlde possible. That is a political question as much as a technological one: those same technologies could become accelerators of inequality and despair if they're not embedded in just policies and institutions.\"",
  },
  {
    category: "(Recent) non-fiction Favorites / Must read",
    title: "Why nothing works",
    author: "Marc J. Dunkelman",
    rating: 5,
    note: "\"No one should be denied an opportunity to voice their opinion on a question that affects them in general or in specific. But neither should voice give any figure the ability to hijack the decision-making process altogether.\"",
  },
  {
    category: "(Recent) non-fiction Favorites / Must read",
    title: "Why Nations Fail: The Origins of Power, Prosperity, and Poverty",
    author: "Daron Acemoglu and James A. Robinson",
    rating: 5,
    note: "\"Economic institutions shape economic incentives: the incentives to become educated, to save and invest, to innovate and adopt new technologies, and so on. It is the political process that determines what economic institutions people live under, and it is the political institutions that determine how this process works.\"",
  },
  {
    category: "(Recent) non-fiction Favorites / Must read",
    title: "Read Write Own: Building the Next Era of the Internet",
    author: "Chris Dixon",
    rating: 4,
    note: "\"In these systems, money and power flow to the network center, to companies that own the networks, and away from users and developers at the network edges.\"",
  },
  {
    category: "(Recent) non-fiction Favorites / Must read",
    title: "War",
    author: "Bob Woodward",
    rating: 4,
    note: "\"Biden had later claimed during that meeting he said to Putin, 'I'm looking into your eyes and I don't think you have a soul.' Putin smiled and told Biden, through an interpreter, 'We understand one another.'\"",
  },
  {
    category: "(Recent) non-fiction Favorites / Must read",
    title: "Peril",
    author: "Bob Woodward and Robert Costa",
    rating: 4,
    note: "\"America was so bad, so lost, one young man said, 'I'm just going to move to South Korea.' South Korea? [Adam] Smith (then-Chairman of the HASC) thought to himself, confused. Why? The young man answered Smith's unvoiced question, telling other passengers, 'South Korea is 90 percent Christian.' In actuality, South Korea is 29 percent Christian. 'You should move to Idaho,' suggested one woman. 'I just don't think they have decent seafood in Idaho,' the young man replied. Smith thought that this young man wanted a fascist takeover of the United States, but at the end of the day, if he couldn't get decent sushi, it just might not be worth it.\"",
  },
  {
    category: "Papers worth re-reading",
    title: "The AI Layoff Trap",
    author: "Brett Hemenway Falk, Gerry Tsoukalas",
    href: "https://arxiv.org/abs/2603.20617",
    note: "Pretty interesting and \*relevant\* read on AI economy and the prison's dilemma corporations face: if AI leads to more layoffs and how we can prevent it via fiscal policy. ",
  },
  {
    category: "(Recent) fiction Favorites / Must read",
    title: "The President is Missing",
    author: "Bill Clinton and James Patterson",
    rating: 4,
    note: "Fast-paced and intense political thriller written by an \"insider\" and one of the best living novelists!",
  },
  {
    category: "(Recent) fiction Favorites / Must read",
    title: "The Terminal List",
    author: "Jack Carr",
    rating: 4,
    note: "Great read for tactics and CQB lovers, written by professional!",
  },
];
