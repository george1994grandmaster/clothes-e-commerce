
import { AnimatedText } from "../types";

export default function AnimatedText({textColor, bgColor, border}: AnimatedText) {
  return (
    <div>
      <section className={`scrollContainer flex w-full bg-${bgColor} border-${border} py-5 overflow-hidden`}>
        <p className={`scrollText text-${textColor}`}>
          • Modern Ethno Clothes • Modern Ethno Clothes • Modern Ethno Clothes • Modern Ethno Clothes 
          • Modern Ethno Clothes • Modern Ethno Clothes • Modern Ethno Clothes • Modern Ethno Clothes 
          • Modern Ethno Clothes • Modern Ethno Clothes • Modern Ethno Clothes • Modern Ethno Clothes
          • Modern Ethno Clothes • Modern Ethno Clothes • Modern Ethno Clothes • Modern Ethno Clothes  
          • Modern Ethno Clothes • Modern Ethno Clothes • Modern Ethno Clothes 
        </p>
        <p className={`scrollText text-${textColor}`}>
          • Modern Ethno Clothes • Modern Ethno Clothes • Modern Ethno Clothes • Modern Ethno Clothes 
          • Modern Ethno Clothes • Modern Ethno Clothes • Modern Ethno Clothes • Modern Ethno Clothes 
          • Modern Ethno Clothes • Modern Ethno Clothes • Modern Ethno Clothes • Modern Ethno Clothes
          • Modern Ethno Clothes • Modern Ethno Clothes • Modern Ethno Clothes • Modern Ethno Clothes  
          • Modern Ethno Clothes • Modern Ethno Clothes • Modern Ethno Clothes
        </p>
      </section>
    </div>
  )
}

