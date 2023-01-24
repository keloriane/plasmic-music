import React from 'react';
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import * as S from './lineAnimation.style'
 

gsap.registerPlugin(ScrollTrigger);
type LineAnimationComponent = {
    paragraph:string
    split:string
    duration:number
    y?:number | string
    each?:number
    ease?:string
    x?:number | string
    trigger?: string

}


const LineAnimation:React.FC<LineAnimationComponent> = ({paragraph,x, y, duration, each, ease, split, trigger}) => {
    const quotes:string[] = paragraph.split(split)
    const lines = React.useRef<HTMLDivElement[]>([]);
    lines.current = []  
    const addToRefs = (el:HTMLDivElement) => {
        if(el && !lines.current.includes(el)){
            lines.current.push(el)
        }
    } 
    React.useEffect(() => {
        let ctx = gsap.context(() => {
            if(trigger) {
                gsap.from(lines.current , { 
                    y:y ,
                    x:x,
                    duration:duration, 
                    scrollTrigger:{
                        id:trigger,
                        start: "bottom bottom",
              
                        trigger:lines.current
                    },
                    stagger:{
                    each:each,
                    ease:ease,
                }})
                
            }else {
                gsap.from(lines.current , { 
                    y:y ,
                    x:x,
                    duration:duration, 
                    stagger:{
                    each:each,
                    ease:ease,
                }})

            }
        }, lines.current);
        
        return () => ctx.revert();
    },[])
    return (
        <S.lineContainer className="quote-container">
        {
            quotes.map((lines, i) => (<S.lineContainer className='lines' key={i}>
                    <div className="inner-line" ref={addToRefs}>
                        {lines}
                    </div>
                </S.lineContainer>))
        }
        </S.lineContainer>
    )
}

export default LineAnimation