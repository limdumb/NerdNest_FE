import axios from "axios"

//토큰필요
export default async function logout(){
  try{
    await axios.post("/logout").then((res)=>{
      if(res.status === 200){
        alert("로그아웃이 완료 되었습니다 🙆🏻")
      }
    })
  }catch(err){
    console.error(err)
  }
}