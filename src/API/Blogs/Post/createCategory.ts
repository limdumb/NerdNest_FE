import axios from "axios"

export default async function createCategory(categoryName: string){
  try{
    await axios.post("/category", categoryName).then((res)=>{
      if(res.status) alert("카테고리가 생성 되었습니다.")
    })
  }catch(err){
    console.error(err)
  }
}