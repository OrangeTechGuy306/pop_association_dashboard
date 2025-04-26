

export const TrimText = (text: string)=>{
    if(text.length > 50){
        return text.substring(0, 50) + "..."
    }else{
        return text
    }
}