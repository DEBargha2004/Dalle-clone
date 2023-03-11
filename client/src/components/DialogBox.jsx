import React, { useEffect } from 'react'
import { Button } from '@mui/material';

const DialogBox = ({ open, data, prompt, display, creator,share,setItemdata }) => {
    const handleClick = (e) => {
        if (e.target === e.currentTarget) {
            display()
        }
    }
    const handleDownload = () => {
        const link = document.createElement('a')
        link.href = `${data}`
        link.download = prompt
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }
    const dialogBoxAdjuster = () => {
        let dialogBoxHeight = window.innerHeight*0.5+'px'
        let currentTop = window.scrollY
        return {
            dialogBoxHeight,
            currentTop
        }
    }
    useEffect(()=>{
        if(open){
            document.documentElement.style.overflow = 'hidden'
        }else{
            document.documentElement.style.overflow = ''
        }
    },[open])
    dialogBoxAdjuster()
    return (
        <>
            {open &&
                <div
                    className='absolute w-full h-full bg-slate-800 left-0 bg-opacity-20 flex justify-center items-center shadow-2xl shadow-slate-700'
                    onClick={handleClick}
                    style={{top:dialogBoxAdjuster().currentTop}}
                >
                    <div
                        className={`w-[50%] bg-white rounded-lg flex justify-center items-center p-7 dialog-box`}
                        style={{height:dialogBoxAdjuster().dialogBoxHeight}}
                    >
                        <div className=' h-full mr-5'>
                            <img alt='dialog' src={`${data}`} className='h-full object-cover' />
                        </div>
                        <div
                            className='flex flex-col justify-between h-full w-[50%]'
                        >
                            <div>
                                <div className='overflow-y-scroll dialog-prompt max-h-[70%] min-h-fit'>
                                    <p className='text-slate-600 font-medium text-lg'>{prompt}</p>
                                </div>
                                <div>
                                    <p className='pt-3 text-base text-slate-400'>Created by {creator}</p>
                                </div>
                            </div>
                            <div className='flex justify-around'>
                                {window.location.pathname === '/Create' && <Button 
                                className='w-[40%] bg-black' 
                                variant='contained' 
                                onClick={()=>{
                                    share({imagedata : data})
                                    display()
                                }}
                                >
                                Share
                                </Button>}
                                <Button className='bg-white text-black' variant='contained' onClick={handleDownload} style={{width:window.location.pathname ==='/' ? '100%': '40%'}} >Download</Button>
                            </div>
                        </div>
                    </div>
                </div> 
            }
        </>
    )
}

export default DialogBox;