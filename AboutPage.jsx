import React from 'react';
import AboutPhotoMarquee from './AboutPhotoMarquee.jsx';
import './about-page.css';

const storyLinks = {
  'Poki Studios': 'https://pokistudios.com/',
  MYOB: 'https://www.makeyourownbreakfast.in/',
};

// Exact selections from the author; colors follow the portfolio palette in order.
const storyHighlights = [
  ['That curiosity led me down a rabbit hole, and somewhere along the way, I discovered design', 'purple'],
  ['I actually wanted to become a dancer.', 'blue'],
  ['I wanted to pursue hotel management and build a career around food.', 'yellow'],
  ['Branding was something I immediately fell in love with, and even today, logo design is one of the things I genuinely enjoy doing.', 'green'],
  ['found an unpaid internship where I worked as a designer for around six months.', 'pink'],
  ['Robin and Shweta', 'blue'],
  ['that’s where I earned my first salary - ₹10,000.', 'purple'],
  ['Rahul Sir saying he was looking for a designer at Dacoit.', 'blue'],
  ['rejection', 'green'],
  ['He gave me an opportunity to work with FBI (now Inner Circle).', 'yellow'],
  ['I met people who became some of my closest friends.', 'pink'],
  ['I’ve designed brands and products, worked on events, designed merch, websites, visuals, campaigns, and a bunch of things', 'green'],
  ['creative generalist', 'pink'],
  ['That’s also how I’m building MYOB (Make Your Own Breakfast)', 'purple'],
];

function linkStoryText(paragraph) {
  return paragraph.split(/(Poki Studios|\bMYOB\b)/g).map((text, index) => (
    Object.hasOwn(storyLinks, text)
      ? <a key={index} href={storyLinks[text]} target="_blank" rel="noopener noreferrer" title="Opens in a new tab">{text}</a>
      : text
  ));
}

function renderStoryText(paragraph) {
  const matches = storyHighlights
    .map(([text, color]) => ({ text, color, start: paragraph.indexOf(text) }))
    .filter(match => match.start !== -1)
    .sort((a, b) => a.start - b.start);
  const parts = [];
  let cursor = 0;
  for (const { text, color, start } of matches) {
    parts.push(<React.Fragment key={`text-${start}`}>{linkStoryText(paragraph.slice(cursor, start))}</React.Fragment>);
    parts.push(<mark key={`highlight-${start}`} className={`about-highlight about-highlight--${color}`}>{linkStoryText(text)}</mark>);
    cursor = start + text.length;
  }
  parts.push(<React.Fragment key="remainder">{linkStoryText(paragraph.slice(cursor))}</React.Fragment>);
  return parts;
}

// The author's supplied story, kept verbatim and split into reading paragraphs.
const story = `It’s been five years since I first got introduced to design.

I was 18, in 11th standard, trying to figure out what I wanted to do next. It was March 2021, and someone in my neighbourhood was working on animation. I remember being really intrigued by that. That curiosity led me down a rabbit hole, and somewhere along the way, I discovered design - graphic design, products, UI/UX, branding, and everything around it.

I’ve always been a creative person. I was never the studious kid or the brightest student in the room. Most of my hobbies growing up involved making or creating something.

For the longest time, I actually wanted to become a dancer. I danced professionally, went for auditions, got selected for a few, and genuinely considered pursuing it as a career. Eventually, I had to step away because making a stable living through dance felt difficult at the time.

Cooking was another thing I had always loved. At one point, I wanted to pursue hotel management and build a career around food. But then COVID happened, those plans changed, and somewhere in the middle of all that, I found design.

And I haven’t really stopped since.

I started with graphic design, mostly social media and branding. Branding was something I immediately fell in love with, and even today, logo design is one of the things I genuinely enjoy doing.

Eventually, I discovered UI/UX, which was becoming a pretty demanding field at the time. I started learning more about it, experimenting, putting my work online, and meeting a lot of people through the internet.

I got incredibly lucky very early on. Within my first week of learning design, I found an unpaid internship where I worked as a designer for around six months. Looking back, those were probably some of the most important six months of my career.

I learned a lot. My managers, Robin and Shweta, were extremely helpful and gave me the space to learn, make mistakes, and improve. They now run their own design studio, Poki Studios.

After those six months, the internship turned into a paid role, and that’s where I earned my first salary - ₹10,000. I still remember that because it was the first time something I had started learning out of curiosity actually paid me.

Since then, it has mostly been about growing, learning, meeting new people, and constantly trying things I had never done before.

A couple of years later, I randomly opened Twitter one day and came across a post from Rahul Sir saying he was looking for a designer at Dacoit. I applied. He liked my work, partly because we had a few mutual connections and references, and gave me a chance.

I went through the interview and did an assignment. The assignment wasn’t exactly what he was looking for at the time, so that opportunity didn’t work out.

But that rejection ended up opening another door.

He gave me an opportunity to work with FBI (now Inner Circle). That was also my introduction to Web3.

I spent the next two years working in Web3, designing for some incredible brands and products. More importantly, I met people who became some of my closest friends. I got to work alongside people who were building interesting things, taking risks, and doing incredibly well in their own careers.

Somewhere along the way, I also stopped thinking of myself as just a brand designer or a product designer.

For the past three years, I’ve pretty much tried to do anything creative that I could get my hands on. I’ve designed brands and products, worked on events, designed merch, websites, visuals, campaigns, and a bunch of things that don’t really fit neatly under one design title.

I think that’s why I’ve slowly moved towards calling myself a creative generalist. I like being able to move between different mediums instead of limiting myself to one part of design. If something sounds interesting and I can figure out how to make it, I usually want to try it.

I started as an 18-year-old trying to figure out what to do after school. I’m 23 now, and in some ways, I’m still figuring things out just at a very different scale.

Right now, I’m exploring how far I can push AI to build my own products, tools, and ideas. That’s also how I’m building MYOB (Make Your Own Breakfast) - a product that came from my personal love for cooking. For someone who was never very technical, being able to turn something I care about into a real product still feels pretty crazy.

I still don’t know exactly what I want to be, and I think I’m okay with that. I just want to keep learning, making things, and seeing where they take me.`;

export default function AboutPage() {
  return <main className="about-page" id="about-content" aria-labelledby="about-title">
    <article>
      <h1 id="about-title" tabIndex={-1}>I Never Really Had a Plan</h1>
      <div className="about-page__story">
        {story.split('\n\n').map((paragraph, index) => <p key={index}>{renderStoryText(paragraph)}</p>)}
      </div>
    </article>
    <AboutPhotoMarquee />
  </main>;
}
