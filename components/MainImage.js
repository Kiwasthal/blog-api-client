import Image from 'next/image';
import MainImage from '../public/blog-main-image.jpg';
import MainHeader from './MainHeader';
import { AnimatedTextUpper, AnimatedTextLower } from './MainSubHeader';

const IndexImageSlot = () => {
  return (
    <div className="w-screen h-screen relative border-black border-b-8 border-solid">
      <MainHeader />
      <AnimatedTextUpper />
      <AnimatedTextLower />
      <Image
        src={MainImage}
        layout="fill"
        objectFit="cover"
        quality={100}
        alt="picture of lantern"
      />
    </div>
  );
};

export default IndexImageSlot;
