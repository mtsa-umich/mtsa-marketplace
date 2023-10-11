'use client';

import Image from 'next/image'

import { useRouter } from 'next/navigation'

const Logo = () => {
  const router = useRouter();

  return (
    <a href='/'>
      <Image
          alt='logo'
          src= '/images/marketplace-logo.png'
          className='block cursor-pointer pb-3 px-4 pt-4'
          height='65'
          width='400'
        />
    </a>
  )
}

export default Logo
