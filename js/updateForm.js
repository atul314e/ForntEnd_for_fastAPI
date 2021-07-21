document.addEventListener("DOMContentLoaded", (event) => {

    async function getData(){
        let url=`http://127.0.0.1:8000/healthcare/${sessionStorage.getItem('id')}`
        let response=await fetch(url)
        let data=await response.json()
        return data
    } 

    async function updateData(id){
        console.log("start updatedata")
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
        let url=`http://127.0.0.1:8000/healthcare/${id}`
        let params={
            method:'PUT',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(data)
        }
        let response=await fetch(url, params)
        let processedResponse=await response.json()
        console.log("end update data")
        return processedResponse
    }

    function updateProvider(event){
        event.preventDefault()
        console.log(`data of provider ${sessionStorage.getItem('id')} has been updated"`)
        updateData(sessionStorage.getItem('id')).then((data)=>{
            if(data.message==`data of provider ${sessionStorage.getItem('id')} has been updated`){
                document.getElementById("getAll").click()
            }
                
            alert(data.message)
        })
        console.log("end update") 
    }

    const Data=()=>{
        const data=getData()
        data.then((result)=>{
            console.log(result.providers)
            let html=``
            html+=`<form class="Form">
                <div class="form-floating mb-3">
                <input type="text" class="form-control" id="ID" value="${result.providers.providerID}" placeholder="Enter name" disabled>
                <label for="ID">ID</label>
                </div>            
                <div class="form-floating mb-3">
                  <input type="text" class="form-control" id="name" value="${result.providers.name}" placeholder="Enter name">
                  <label for="name">Name</label>
                </div>
                <div class="mb-3 form-check">
                    <input type="checkbox" class="form-check-input" id="active" checked>
                    <label class="form-check-label" for="active">Active</label>
                  </div>
                <div class="form-floating mb-3">
                  <input type="text" class="form-control" id="qualification" value="${result.providers.qualification}" placeholder="qualification">
                  <label for="qualification">Qualification</label>
                </div>
                <div class="form-floating mb-3">
                    <input type="text" class="form-control" id="speciality" value="${result.providers.speciality}" placeholder="speciality">
                    <label for="speciality">Speciality</label>
                </div>
                <div class="form-floating mb-3">
                    <input type="text" class="form-control" id="phone" value="${result.providers.phone}" placeholder="phone">
                    <label for="phone">Phone</label>
                </div>
                <div class="form-floating mb-3">
                    <input type="text" class="form-control" id="department" value="${result.providers.department}" placeholder="department">
                    <label for="department">Department</label>
                </div>
                <div class="form-floating mb-3">
                    <input type="text" class="form-control" id="organization" value="${result.providers.organization}" placeholder="organization">
                    <label for="organization">Organization</label>
                </div>
                <div class="form-floating mb-3">
                    <input type="text" class="form-control" id="location" value="${result.providers.location}" placeholder="location">
                    <label for="location">Location</label>
                </div>
                <div class="form-floating mb-3">
                    <input type="text" class="form-control" id="address" value="${result.providers.address}" placeholder="address">
                    <label for="address">Address</label>
                </div>
                <div class="form-floating mb-3">
                    <textarea class="form-control" placeholder="Add Description" id="floatingTextarea">${result.providers.description}</textarea>
                    <label for="floatingTextarea">Description</label>
              </div>
                <button type="submit" id="submit" class="btn btn-primary">Update</button>
              </form>`
            const ele=document.querySelector(".FORM")
            ele.innerHTML=html
        })
    }

    Data()

    document.querySelector('.FORM').addEventListener('click', (event)=>{
        console.log(event.target.id)
        if(event.target.id=="submit")
            updateProvider(event)
    })
});