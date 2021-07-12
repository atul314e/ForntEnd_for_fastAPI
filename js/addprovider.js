window.addEventListener("DOMContentLoaded", ()=>{

    async function postData(url, param){
        const promise=await fetch(url, param)
        const response=await promise.json()
        return response
    }

    const submitBtn=document.getElementById("submit")

    submitBtn.addEventListener('click', (event)=>{
        const url='http://127.0.0.1:8000/healthcare'

        const data={
            "active":document.getElementById('active').checked,
            "name":document.getElementById('name').value,
            "qualification":document.getElementById('qualification').value,
            "speciality":document.getElementById('speciality').value,
            "phone":document.getElementById('phone').value,
            "department":document.getElementById('department').value,
            "organization":document.getElementById('organization').value,
            "location":document.getElementById('location').value,
            "address":document.getElementById('address').value
        }

        const param={
            method:'POST',
            headers:{'Content-Type':'application/json', 'Accept':'application/json'},
            body:JSON.stringify(data)
        }

        
        postData(url, param).then((data)=>{
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
           alert(data.message)
           if(data.message!="data has been added"){
               event.preventDefault()
           }
        }).catch((err)=>{
            alert(err)
        })
    })
})