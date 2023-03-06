import axios from "axios"

export default function createCategory(categoryName: string){
  try{
    axios.post("/category", categoryName).then((res)=>{
      if(res.status) alert("카테고리가 생성 되었습니다.")
    })
  }catch(err){
    console.error(err)
  }
}