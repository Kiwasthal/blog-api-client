import Image from 'next/image';
import MainImage from '../public/blog-main-image.jpg';
import MainHeader from './MainHeader';
import Glowing from './Glowing';
import { AnimatedTextUpper, AnimatedTextLower } from './MainSubHeader';

const IndexImageSlot = () => {
  return (
    <div className="w-screen h-screen relative border-gray-900 border-b-8 border-solid">
      <MainHeader />
      <Glowing />
      <AnimatedTextUpper />
      <AnimatedTextLower />
      <Image
        src={MainImage}
        layout="fill"
        objectFit="cover"
        quality={100}
        alt="picture of lantern"
        priority
      />
    </div>
  );
};

export default IndexImageSlot;
