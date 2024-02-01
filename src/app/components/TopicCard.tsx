import React from 'react'
type TopicCardProps = {
    title: string;
    description: string;
};
export default function TopicCard(props: TopicCardProps) {
  return (
    <div className='rounded w-[150px] h-[100px] bg-slate-300 p-4'>
        <h1 className='text-sm'>{props.title}</h1>
    </div>
  )
}
