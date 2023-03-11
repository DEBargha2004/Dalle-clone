import { ImageList, ImageListItem } from "@mui/material";
import size from "../functions/size";
import React from 'react'
import itemArranger from "../functions/itemArranger";
import sizedefiner from "../functions/sizedefiner";


const QuiltedImage = ({setCur,itemData}) =>  {
    console.log(itemData);
    return (
        <>
            <ImageList
                cols={4}
                variant='quilted'
                className="w-full quilted-list"
            >
                {sizedefiner(itemArranger(itemData)).map((item,index) => (
                    <ImageListItem
                        cols={item.cols || 1}
                        rows={item.rows || 1}
                        key={index.toString()}
                    >
                        <img
                            src={item.img || item.base64data}
                            alt=""
                            style={size(item.rows)}
                            className='showcase-image rounded-md'
                            onClick={()=>setCur({open:true,data:item.base64data,prompt:item.prompt,name:item.username})}
                        />
                    </ImageListItem>
                ))}
            </ImageList>
        </>
    )
}

export default QuiltedImage;




