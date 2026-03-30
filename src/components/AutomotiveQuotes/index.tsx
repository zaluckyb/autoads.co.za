'use client'

import React, { useEffect, useState } from 'react'
import { BookOpenCheck } from 'lucide-react'

const quotes = [
  "Online advertising is now the primary channel for automotive businesses.",
  "Visual content drives higher engagement than text-only ads.",
  "Mobile users make up most automotive ad traffic.",
  "Local targeting improves ad relevance.",
  "Trust is a key factor in automotive advertising success.",
  "Consistent branding increases long-term visibility.",
  "Automotive consumers research before making contact.",
  "Clear information reduces customer hesitation.",
  "High-quality ads reflect business professionalism.",
  "Digital platforms offer wider reach than print media.",
  "Automotive advertising is becoming increasingly visual.",
  "Customers respond better to clear, honest messaging.",
  "Strong branding builds recognition across platforms.",
  "Ads that explain value perform better.",
  "Businesses with updated ads gain more attention.",
  "Local exposure remains important in automotive marketing.",
  "Clear pricing improves customer trust.",
  "Online ads allow faster updates than traditional media.",
  "Visual consistency strengthens brand identity.",
  "Automotive audiences prefer simple, clear messaging.",
  "Repetition increases brand recall over time.",
  "Customers expect transparency in advertising.",
  "Digital ads allow precise audience targeting.",
  "Automotive businesses benefit from consistent online presence.",
  "Engaging visuals improve click-through rates.",
  "Professional presentation influences customer decisions.",
  "Automotive advertising relies heavily on first impressions.",
  "Clear calls-to-action improve engagement rates.",
  "Businesses advertising online reach broader audiences.",
  "Trust signals increase customer confidence.",
  "Automotive ads perform best when locally relevant.",
  "Visual storytelling enhances brand perception.",
  "Digital advertising allows measurable performance.",
  "Clean design improves message clarity.",
  "Automotive consumers value detailed information.",
  "Online visibility directly impacts brand awareness.",
  "Ads with clear intent perform better.",
  "Consistency across ads builds credibility.",
  "Automotive marketing is increasingly data-driven.",
  "Clear communication improves conversion rates.",
  "Digital platforms allow flexible ad placement.",
  "Professional ads create stronger brand impressions.",
  "Automotive advertising trends favour simplicity.",
  "Consumers expect modern, updated visuals.",
  "Online ads enable faster customer interaction.",
  "Strong branding helps businesses stand out.",
  "Automotive ads benefit from local relevance.",
  "Transparency builds long-term customer trust.",
  "Visual quality impacts perceived business quality.",
  "Digital exposure increases brand reach.",
  "Automotive audiences engage more with visual content.",
  "Clear messaging reduces bounce rates.",
  "Online advertising supports long-term brand growth.",
  "Automotive businesses benefit from platform visibility.",
  "Ads perform better when regularly refreshed.",
  "Digital ads allow better audience segmentation.",
  "Automotive brands rely on credibility signals.",
  "Visual-first platforms drive better engagement.",
  "Advertising consistency supports brand authority."
]

export const AutomotiveQuotes: React.FC = () => {
  const [quote, setQuote] = useState(quotes[0])

  useEffect(() => {
    // Pick a random quote on mount
    const random = quotes[Math.floor(Math.random() * quotes.length)]
    setQuote(random)
  }, [])

  return (
    <div className="rounded-[15px] border bg-muted shadow p-6 relative overflow-hidden group">
      <div className="pointer-events-none absolute top-2 right-2 w-20 h-20 md:w-28 md:h-28">
        <BookOpenCheck className="absolute inset-0 m-auto h-full w-full text-muted-foreground/25 rotate-12 transition-colors duration-300 group-hover:text-muted-foreground/50" />
      </div>
      
      <span className="text-sm font-bold text-[#db323e] mb-3 block uppercase tracking-wider">
        Industry Insights
      </span>
      
      <blockquote className="relative z-10">
        <p className="text-lg font-medium text-foreground leading-relaxed">
          {quote}
        </p>
      </blockquote>
    </div>
  )
}
