import { getCAUData } from "../../../api/cau";
const DIVIDER_STRING='**************************************\n';

export const getCAUListInString=async ()=>{
    const data=await getCAUData('창업');
    const filteredList=data.data.list.map((item:any)=>({id:item.ORD_NO, title:item.SUBJECT, content:item.SUB_CONTENTS, wroteAt:item.WRITE_DATE}))
    const initialString:string=''
    const resultInString=filteredList.reduce((prev:string, cur:any)=>{
      return prev.concat(DIVIDER_STRING)
                .concat(`- ${cur.title}\n`)
                .concat(`- ${cur.content}\n`)
                .concat(`- ${cur.wroteAt}\n`)
    }, initialString);
    return `중앙대 창업 정보\n${resultInString}`;
}