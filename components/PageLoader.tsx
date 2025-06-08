'use client';
import { assets } from '@/assets/assets';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function PageLoader() {
  const pathname = usePathname();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 1000); // simulate load delay

    return () => clearTimeout(timeout);
  }, [pathname]);

  return loading ? (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/70 backdrop-blur-sm">
        <div className='flex flex-col gap-0.5 items-center'>
            <Image 
         src={assets.logo}
         alt='loading logo'
         className='animate-pulse h-50 w-50'/>
      <span className="text-orange-600 text-xl animate-pulse">Loading...</span>
        </div>
        
    </div>
  ) : null;
}
