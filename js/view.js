document.addEventListener("DOMContentLoaded", (event) => {

    function deleteitem(id){
        console.log("delete called")
        let url=`http://127.0.0.1:8000/healthcare/${id}`
        fetch(url,{
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            }
        }).then((processedRespose)=>{
            return processedRespose.json()
        }).then((data)=>{
            alert(data.message)
            window.open("../index.html","_self");
        })
    }

    function updateitem(id){
        sessionStorage.setItem('id', id)
        window.open("./updateForm.html","_self");
    }

    function convertBlobToBase64(blob) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onerror = reject;
          reader.onload = () => {
            resolve(reader.result);
          };
          reader.readAsDataURL(blob);
      
        });
      
      }

    async function getData(){
        let url=`http://127.0.0.1:8000/healthcare/${sessionStorage.getItem('id')}`
        let response=await fetch(url)
        let data=await response.json()
        return data
    } 

    async function getImage(){
        let url=`http://127.0.0.1:8000/image/${sessionStorage.getItem('id')}`
        let response=await fetch(url)
        let data=await convertBlobToBase64(await response.blob())
        return data
    } 


    const Data=()=>{
        const ele=document.querySelector(".LIST")
        html=``
        const data=getData()
        data.then((result)=>{
            document.querySelector(".name").innerHTML=result.providers.name
            document.querySelector(".phone").innerHTML=`(<i class="fa fa-phone fa-sm"></i>: ${result.providers.phone})`
            html+=`
            <li class="list-group-item"><b>Speciality:</b> ${result.providers.speciality}</li>
            <li class="list-group-item"><b>Organization:</b> ${result.providers.organization}</li>
            <li class="list-group-item"><b>Qualification:</b> ${result.providers.qualification}</li>
            <li class="list-group-item"><b>Location:</b> ${result.providers.location}</li>
            <li class="list-group-item"><b>Address:</b> ${result.providers.address}</li>
            `
            ele.innerHTML=html
            document.querySelector(".delete").name=result.providers.providerID
            document.querySelector(".update").name=result.providers.providerID
            document.querySelector(".des").innerHTML=result.providers.description
            console.log(result)
        }).catch((err)=>{
            window.open("../error/oops.html", "_self")
            
            console.log(err)
            
        })

        const image=getImage()
        image.then((img)=>{
            profilePic=document.querySelector('.image')
            profilePic.src=img
        })
    }

    document.querySelector('.content').addEventListener('click', (event)=>{
        console.log(event.target.name)
        console.log(event.target.innerText)
        if(event.target.innerText.trim() == 'Delete')
            deleteitem(event.target.name)
        else if(event.target.innerText.trim() == 'Update')
            updateitem(event.target.name)
    })

    Data()
});