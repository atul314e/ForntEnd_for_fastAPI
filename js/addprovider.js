window.addEventListener("DOMContentLoaded", ()=>{

    async function postData(url, param){
        const promise=await fetch(url, param)
        const response=await promise.json()
        return response
    }
    
    async function postImage(urlImg, imgParam){
        console.log("inside")
        const promise=await fetch(urlImg, imgParam)
        const response=await promise.json()
        console.log(response)
        return response
    }

    const submitBtn=document.getElementById("submit")

    submitBtn.addEventListener('click', (event)=>{
       // event.preventDefault()
        const url='http://127.0.0.1:8000/healthcare'
        const urlImg='http://127.0.0.1:8000/uploadimage'
        const filename=document.getElementById('inputGroupFile01').files.length!=0?document.getElementById('inputGroupFile01').files[0].name:"default.jpeg"
        console.log(document.getElementById('inputGroupFile01').files)
        const data={
            "active":document.getElementById('active').checked,
            "name":document.getElementById('name').value,
            "qualification":document.getElementById('qualification').value,
            "speciality":document.getElementById('speciality').value,
            "phone":document.getElementById('phone').value,
            "department":document.getElementById('department').value,
            "organization":document.getElementById('organization').value,
            "location":document.getElementById('location').value,
            "address":document.getElementById('address').value,
            "image":filename,
            "description":document.getElementById('floatingTextarea').value
        }

        const param={
            method:'POST',
            headers:{'Content-Type':'application/json', 'Accept':'application/json'},
            body:JSON.stringify(data)
        }

        const imgParam={
            method:'POST',
            headers:{'Content-Type':'image/jpeg', 'Accept':'image/jpeg'},
            body:document.getElementById('inputGroupFile01').files[0]
        }

        postData(url, param).then((data)=>{
            console.log(filename)
            /*
            const ele=document.querySelector('.toaster')
            const html=`<div class="toast align-items-center" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="d-flex">
              <div class="toast-body">
              Hello, world! This is a toast message.
             </div>
              <button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
          </div>`
            ele.innerHTML=html
            */
           if(data.message!="data has been added"){   
               event.preventDefault()
           }
           else{
               if(filename!='default.jpeg'){
                    postImage(urlImg, imgParam).then((data)=>{
                        console.log(urlImg)
                    })
               }
           }
           alert(data.message)
        }).catch((err)=>{
            window.open("../error/oops.html", "_self")
            
            console.log(err)
            
        })
    })
})