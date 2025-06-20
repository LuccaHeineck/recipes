import SkeletonCard from '@/components/skeletonCard'
import React from 'react'

export default function loading() {
  return (
    <main>
        <div className='grid grid-cols-3 gap-8'>
        {"abcdefghi".split('').map(i => (
            <SkeletonCard key={i} />
        ))}
    </div>
    </main>
  )
}
