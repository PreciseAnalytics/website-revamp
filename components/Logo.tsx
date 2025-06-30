import Image from 'next/image';

export default function Logo({ ...rest }) {
  return (
    <Image 
      src="/logo.png" 
      alt="Precise Analytics Logo" 
      width={350} 
      height={100} 
      style={{ height: 'auto' }}
      {...rest} 
    />
  );
}