
import { AnimatedText } from "../types";

export default function AnimatedText({textColor, bgColor}: AnimatedText) {
  return (
    <div>
      <section className={`flex w-full bg-${bgColor} py-5 overflow-hidden`}>
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

