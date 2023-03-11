import React, { useEffect, useState } from 'react'
import { Button } from '@mui/material';
import Input from '../components/Input'
import { surpriseMePrompts } from '../constants/defaultvalue'
import { Skeleton } from '@mui/material';
import DialogBox from '../components/DialogBox';
import handleShare from '../functions/share';
import randomName from '../functions/randomname';
import Generate from '../functions/Generate';
import displayer from '../functions/displayer';

const Create = ({ caller, formData, setFormData, imageData, setImageData, setLoggedIn, loggedin }) => {
  const [dialog, setDialog] = useState({
    image: '',
    open: false
  })
  useEffect(() => {
    if (loggedin) {
      if (formData.isLoading) {
        caller()
      }
    }
  }, [formData.isLoading])
  useEffect(() => {
    if (localStorage.getItem('generatedImage')) {
      setImageData(JSON.parse(localStorage.getItem('generatedImage')))
    }
    if (localStorage.getItem('formData')) {
      setFormData(JSON.parse(localStorage.getItem('formData')))
    }
  }, [])
  return (
    <div className={`h-[90%] flex justify-around items-center ${formData.isLoading || imageData ? 'w-[80%] ml-[10%]' : ''}`}>
      {(formData.isLoading || imageData) ?
        (imageData?.length ?
          <div
            className='w-full h-full flex justify-around flex-col'
          >
            <div
              className='w-full text-left'
            >
              <h1
                className='text-3xl font-semibold mb-5'
              >
                Prompt
              </h1>
              <p
                className='text-slate-500 text-base'
              >
                {formData.prompt}
              </p>
            </div>
            <div className='w-full flex justify-around'>
              {imageData.map((item, index) => <div className='result-image-container'>
                <img src={`${item.b64_json}`} key={index} alt='result' className='h-[250px] w-[250px] rounded-[5px] result-image' onClick={() => setDialog({ image: item.b64_json, open: true })} />
              </div>)
              }
            </div>
            <DialogBox
              open={dialog.open}
              data={dialog.image}
              prompt={formData.prompt}
              display={() => displayer(setDialog)}
              creator={imageData[0].fullname}
              share={(item) => handleShare(item, formData, setLoggedIn)}
            />
          </div> :
          <>
            <div
              className='w-full h-full flex justify-around flex-col'
            >
              <div
                className='w-full text-left'
              >
                <Skeleton variant='rectangular' height={30} width={110} className='mb-5' />
                <Skeleton variant='rectangular' height={15} width={500} />
              </div>
              <div className='w-full flex justify-around'>
                <Skeleton variant='rectangular' height={250} width={250} />
                <Skeleton variant='rectangular' height={250} width={250} />
                <Skeleton variant='rectangular' height={250} width={250} />
                <Skeleton variant='rectangular' height={250} width={250} />
              </div>
            </div>
          </>) :
        <div className='w-[90%]'>
          <div className='flex justify-start'>
            <p className='text-slate-600 text-lg'>Start with a detailed description</p>
            <Button
              className='ml-2 text-sm text-white bg-slate-400 hover:bg-slate-500'
              variant='contained'
              onClick={() => randomName(formData, setFormData)}
            >
              Surprise Me
            </Button>
          </div>
          <div className='w-full flex items-center justify-center'>
            <Input
              field='prompt'
              placeholder={surpriseMePrompts[2]}
              setFormData={setFormData}
              formData={formData}
              bool={formData.compPrompt}
            />
            <Button
              className='text-slate-500 text-[14px] font-bold shadow-lg hover:bg-white w-[10%]'
              onClick={() => Generate(formData, setFormData)}
            >
              Generate
            </Button>
          </div>
        </div>
      }
    </div>
  )
}

export default Create;
