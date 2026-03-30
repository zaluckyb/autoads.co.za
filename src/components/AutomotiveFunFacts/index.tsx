'use client'

import React, { useEffect, useState } from 'react'
import { Megaphone } from 'lucide-react'

const facts = [
 "Clear images help your ad stand out instantly.",
"Use real photos instead of stock images to build trust.",
"Ads with a clear headline get more attention.",
"Keep your message short and easy to scan.",
"Highlight your main service or product first.",
"Include your location to attract local customers.",
"Consistent branding improves recognition over time.",
"Use high-quality images with good lighting.",
"Mention what makes your business different.",
"Ads with prices receive more enquiries.",
"Avoid cluttered images with too much text.",
"Update your ad regularly to keep it fresh.",
"Mobile-friendly ads reach more users.",
"A clear call-to-action increases engagement.",
"Make sure your contact details are correct.",
"Simple designs perform better than complex ones.",
"Focus on benefits, not just features.",
"Use professional logos for credibility.",
"Ads with multiple images perform better.",
"Keep text readable on small screens.",
"Highlight promotions or limited offers clearly.",
"Use consistent colours across your ads.",
"Proofread your ad before publishing.",
"Avoid using all capital letters in text.",
"Clear pricing builds customer confidence.",
"Show your product or service in real use.",
"Local ads often perform better than generic ones.",
"Make your headline informative, not vague.",
"Avoid overcrowding your ad with too much information.",
"Include your business hours when relevant.",
"Strong visuals increase click-through rates.",
"Ads with a clear purpose perform best.",
"Keep branding visible but not overpowering.",
"Refresh images to improve repeat engagement.",
"Tell customers exactly what you offer.",
"Use contrast to make important details stand out.",
"Short ads are more likely to be read fully.",
"Show before-and-after results when possible.",
"Use trusted symbols or certifications if applicable.",
"Highlight warranties or guarantees clearly.",
"Avoid blurry or low-resolution images.",
"Ads with contact options get more responses.",
"Make sure your ad matches your business category.",
"Include relevant keywords naturally in text.",
"Clear offers outperform generic messages.",
"Keep your tone professional and friendly.",
"Visual consistency builds brand recognition.",
"Show your team or workspace to humanise your brand.",
"Focus on one main message per ad.",
"Ads that solve a problem perform better.",
"Avoid excessive punctuation in headlines.",
"Make sure your logo is clearly visible.",
"Highlight seasonal services when relevant.",
"Use spacing to improve readability.",
"Keep your ad updated with current information.",
"Clear benefits encourage action.",
"Avoid misleading claims in your ads.",
"Test different headlines over time.",
"Show professionalism in every detail.",
"A clean ad design builds instant trust."
]

export const AutomotiveFunFacts: React.FC = () => {
  const [fact, setFact] = useState(facts[0])

  useEffect(() => {
    // Pick a random fact on mount
    const random = facts[Math.floor(Math.random() * facts.length)]
    setFact(random)
  }, [])

  return (
    <div className="rounded-[15px] border bg-muted shadow p-6 relative overflow-hidden group">
      <div className="pointer-events-none absolute top-2 right-2 w-20 h-20 md:w-28 md:h-28">
        <Megaphone className="absolute inset-0 m-auto h-full w-full text-muted-foreground/25 rotate-12 transition-colors duration-300 group-hover:text-muted-foreground/50" />
      </div>
      
      <span className="text-sm font-bold text-[#db323e] mb-3 block uppercase tracking-wider">
        Advertising Tips
      </span>
      
      <p className="relative z-10 text-lg font-medium text-foreground leading-relaxed">
        {fact}
      </p>
    </div>
  )
}
