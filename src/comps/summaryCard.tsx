import React from 'react'
// import { FaUsers } from 'react-icons/fa6'


type SummaryCardProps = {
    title: string;
    desc?: string;
    icon: React.ReactNode;
    total: string;
    className?: string;
}

const SummaryCard = ({title, desc, icon, total, className}: SummaryCardProps) => {
  return (
    <div className={className ? `flex justify-between items-center border-none shadow-none text-left w-[200px] p-5 rounded-xl ${className} : ` : `flex justify-between bg-glass items-center border-none shadow-none text-left w-[200px] p-5 rounded-xl `}>
              <div>
                {/* <FaUsers size={50} className='text-slate-400' />  */}
                {icon}
                  <h1 className='text-primary'>{title}</h1>
                  <small>{desc}</small>
              </div>
              <div>
                <h1 className='font-bold text-xl'>{total}</h1>
              </div>
          </div>
  )
}

export default SummaryCard