import AnimatedText from '../components/animatedText';

export default function Contact() {

  return (
    <>
      <AnimatedText bgColor="yellow" textColor="dark"/>
        <div className="py-48">
          <div className="container">
            <div className="flex flex-col items-center">
              <p className="text-2xl text-white font-medium mb-4">Contact Us</p>
              <p className="text-2xl text-white font-medium mb-4">+1 888 656 342</p>
              <p className="text-2xl text-white font-medium"> ohamid@uioct.com</p>
            </div>
          </div>
        </div>
      <AnimatedText bgColor="orange" textColor="dark"/>
    </>
    
  )
}